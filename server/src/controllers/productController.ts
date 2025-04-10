// orderCon.ts
import prisma from "../config/db";

// Create Order function
export const createProduct = async (req: any, res: any) => {
  const {
    name,
    categoryId,
    price,
    stock,
    imageUrls, // Array of image URLs to associate with the product
    description,
    addedById,
    updatedById,
  } = req.body;

  try {
    // Validate required fields
    if (!name || !price || !stock) {
      return res
        .status(406)
        .json({ error: "Name, price, and stock are required" });
    }

    // Create the product along with associated images in a single transaction
    const product = await prisma.product.create({
      data: {
        name,
        categoryId,
        price,
        stock,
        imageUrl: imageUrls ? imageUrls[0] : null, // Assuming you want the first image to be the main one
        description,
        addedById,
        updatedById,
        ProductImage: {
          create:
            imageUrls?.map((url: string) => ({
              url, // Insert each image URL into the ProductImage table
            })) || [],
        },
      },
      include: {
        ProductImage: true, // Include associated images in the response
      },
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: true, // Include associated images in the response
      },
    });
    if(!products) return res.status(404).json({ error: "No products found" });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
