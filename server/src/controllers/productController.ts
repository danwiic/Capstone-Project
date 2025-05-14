import cloudinary from "../config/cloudinary";
import prisma from "../config/db";

export const createProduct = async (req: any, res: any) => {
  const {
    name,
    description,
    categoryId,
    brandId,
    images = [],
    price,
    variants = [],
  } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        brandId,
        ProductImage: {
          create: images.map((url: string) => ({ imageUrl: url })),
        },
        ...(variants.length === 0
          ? {
              price: price,
            }
          : {
              ProductVariant: {
                create: variants.map((v: any) => ({
                  sku: v.sku,
                  variantName: v.variantName,
                  price: v.price,
                })),
              },
            }),
      },
    });
    res.status(201).json({ product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getTenProducts = async (req: any, res: any) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category: { select: { name: true } },
        brand: { select: { name: true } },
        ProductImage: { select: { imageUrl: true } },
        ProductVariant: { select: { price: true } },
      },
      take: 10,
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        const ratingStats = await prisma.review.aggregate({
          where: { productId: product.id },
          _sum: { rating: true },
          _count: { rating: true },
        });

        return {
          ...product,
          noOfReviews: ratingStats._count.rating || 0,
          averageRating:
            ratingStats._count.rating > 0
              ? (ratingStats._sum.rating ?? 0) / ratingStats._count.rating
              : 0,
        };
      })
    );

    res.status(200).json(enrichedProducts);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getOneProduct = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const getProduct = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        ProductImage: {
          select: {
            imageUrl: true,
          },
        },
        ProductVariant: true,
      },
    });

    if (!getProduct)
      return res.status(404).json({ error: "Product not found" });

    return res.status(200).json(getProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDetailedProduct = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const product = await prisma.product
      .findUnique({
        where: { id },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          brand: {
            select: {
              name: true,
            },
          },
          ProductImage: true,
          ProductVariant: {
            include: {
              batches: true,
              logs: true,
            },
          },
          logs: true,
        },
      })
      .then(async (product) => {
        if (!product || !product.ProductVariant) return [];
        const totalStock = await prisma.productVariant.aggregate({
          where: { productId: product.id },
          _sum: { stock: true },
        });
        return {
          ...product,
          totalStock: totalStock?._sum?.stock || 0,
        };
      });

    if (!product) return res.status(404).json([]);

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  const { page = 1, limit = 16 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;
  const take = limitNumber > 0 ? limitNumber : undefined;
  const skip = offset > 0 ? offset : undefined;

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / limitNumber);

  try {
    const products = await prisma.product
      .findMany({
        include: {
          category: { select: { id: true, name: true } },
          brand: { select: { id: true, name: true } },
          ProductImage: { select: { imageUrl: true } },
          ProductVariant: { select: { id: true, price: true, stock: true } },
        },
        take,
        skip,
        orderBy: { createdAt: "desc" },
      })
      .then(async (products) => {
        const enrichedProducts = await Promise.all(
          products.map(async (product) => {
            const ratingStats = await prisma.review.aggregate({
              where: { productId: product.id },
              _sum: { rating: true },
              _count: { rating: true },
            });

            return {
              ...product,
              noOfReviews: ratingStats._count.rating || 0,
              averageRating:
                ratingStats._count.rating > 0
                  ? (ratingStats._sum.rating ?? 0) / ratingStats._count.rating
                  : 0,
            };
          })
        );
        return enrichedProducts;
      });

    return res.status(200).json({
      products,
      totalProducts,
      totalPages,
      currentPage: pageNumber,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ======================== Product Variant ======================== //
export const updateVariant = async (req: any, res: any) => {
  const { userId, id, sku, variantName, price, reOrderLevel } = req.body;

  try {
    const currentVariant = await prisma.productVariant.findUnique({
      where: { id },
    });

    if (!currentVariant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    const dataToUpdate: any = {};
    const changes: {
      field: string;
      oldValue: string | number;
      newValue: string | number;
    }[] = [];

    if (sku !== undefined && sku !== currentVariant.sku) {
      dataToUpdate.sku = sku;
      changes.push({
        field: "sku",
        oldValue: currentVariant.sku ?? "",
        newValue: sku,
      });
    }
    if (
      variantName !== undefined &&
      variantName !== currentVariant.variantName
    ) {
      dataToUpdate.variantName = variantName;
      changes.push({
        field: "variantName",
        oldValue: currentVariant.variantName,
        newValue: variantName,
      });
    }
    if (price !== undefined && price !== currentVariant.price) {
      dataToUpdate.price = price;
      changes.push({
        field: "price",
        oldValue: currentVariant.price.toString(),
        newValue: price,
      });
    }
    if (
      reOrderLevel !== undefined &&
      reOrderLevel !== currentVariant.reOrderLevel
    ) {
      dataToUpdate.reOrderLevel = reOrderLevel;
      changes.push({
        field: "reOrderLevel",
        oldValue: currentVariant.reOrderLevel ?? 0,
        newValue: reOrderLevel,
      });
    }

    // Skip update if nothing has changed
    if (Object.keys(dataToUpdate).length === 0) {
      return res
        .status(200)
        .json({ message: "No changes detected", variant: currentVariant });
    }

    const updatedVariant = await prisma.productVariant.update({
      where: { id },
      data: dataToUpdate,
    });

    for (const change of changes) {
      await prisma.productAuditLog.create({
        data: {
          productId: updatedVariant.productId,
          variantId: updatedVariant.id,
          action: "update",
          field: change.field,
          oldValue: change.oldValue.toString(),
          newValue: change.newValue.toString(),
          userId,
        },
      });
    }

    return res.status(200).json(updatedVariant);
  } catch (error) {
    console.error("Error updating product variant:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStock = async (req: any, res: any) => {};

export const deleteProduct = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
