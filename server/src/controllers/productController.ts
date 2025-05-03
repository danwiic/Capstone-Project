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
        ProductVariant: {
          select: {
            id: true,
            price: true,
            stock: true,
            variantName: true,
            createdAt: true,
          },
        },
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
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          category: { select: { name: true } },
          brand: { select: { name: true } },
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
