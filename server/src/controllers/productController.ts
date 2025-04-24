import prisma from "../config/db";

export const createProduct = async (req: any, res: any) => {
  const {
    name,
    description,
    categoryId,
    brandId,
    images = [],
    price,
    stock,
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
              stock: stock,
            }
          : {
              ProductVariant: {
                create: variants.map((v: any) => ({
                  sku: v.sku,
                  variantName: v.variantName,
                  price: v.price,
                  stock: v.stock,
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

export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        ProductImage: {
          select: {
            imageUrl: true,
          },
        },
      },
    });
    if (!products) return res.status(404).json({ error: "No products found" });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
