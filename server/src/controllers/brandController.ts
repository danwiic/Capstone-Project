import prisma from "../config/db";

export const createNewBrand = async (req: any, res: any) => {
  const { name } = req.body;

  const existingBrand = await prisma.productBrand.findUnique({
    where: { name },
  });

  if (existingBrand) {
    return res.status(406).json({ error: "Brand already exists" });
  }
  try {
    const newBrand = await prisma.productBrand.create({
      data: {
        name,
      },
    });

    return res
      .status(201)
      .json({ message: "Brand created successfully", newBrand });
  } catch (error) {
    console.error("Error creating brand:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBrands = async (req: any, res: any) => {
  try {
    const brands = await prisma.productBrand.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }

    return res.status(200).json({ brands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
