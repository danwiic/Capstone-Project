import prisma from "../config/db";

export const insertNewCategory = async (req: any, res: any) => {
  const { name } = req.body;

  try {
    if (!name) return res.status(406).json({ error: "Category name is required" });

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) return res.status(406).json({ error: "Category already exists" });

    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ message: "Category name is created" });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
