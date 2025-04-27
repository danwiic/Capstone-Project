import prisma from "../config/db";

export const insertNewCategory = async (req: any, res: any) => {
  const { name } = req.body;

  try {
    if (!name)
      return res.status(406).json({ error: "Category name is required" });

    const existingCategory = await prisma.productCategory.findUnique({
      where: {
        name: name,
      },
    });

    if (existingCategory)
      return res.status(406).json({ error: "Category already exists" });

    const category = await prisma.productCategory.create({
      data: {
        name,
      },
    });
    return res
      .status(201)
      .json({ message: "Category name is created", category });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCategories = async (req: any, res: any) => {
  try {
    const categories = await prisma.productCategory.findMany({
      take: 5,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        products: {
          take: 1,
        },
      },
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchCategory = async (req: any, res: any) => {
  try {
    const category = await prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (!category || category.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getFiveProducts = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const products = await prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,

        products: {
          take: 5,
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            description: true,
            ProductImage: { select: { imageUrl: true } },
            ProductVariant: { select: { price: true, stock: true } },
            brand: { select: { name: true } },
          },
        },
      },
      where: {
        id: id,
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getFiveCategories = async (req: any, res: any) => {
  try {
    const categories = await prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,
        products: {
          take: 1,
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            description: true,
            ProductImage: { select: { imageUrl: true } },
            ProductVariant: { select: { price: true, stock: true } },
            brand: { select: { name: true } },
          },
        },
      },
      take: 5,
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
