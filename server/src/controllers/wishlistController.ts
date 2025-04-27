import prisma from "../config/db";

export const addToWishlist = async (req: any, res: any) => {
  const { userId, productId } = req.body;

  const existingWishlist = await prisma.wishList.findFirst({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (existingWishlist) {
    return res.status(400).json({ message: "Product already in wishlist" });
  }

  try {
    const newWishlistItem = await prisma.wishList.create({
      data: {
        userId: userId,
        productId: productId,
      },
    });

    return res.status(200).json(newWishlistItem);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getWishListByUserId = async (req: any, res: any) => {
  const { userId } = req.params;

  try {
    const wishlist = await prisma.wishList.findMany({
      where: { userId: userId },
      include: {
        product: {
          select: {
            id: true, 
            name: true,
            price: true,
            stock: true,
            ProductImage: true, 
            ProductVariant: true,
          },
        },
      },
    });

    if (!wishlist || wishlist.length === 0) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromWishlist = async (req: any, res: any) => {
  const { userId, productId } = req.body;

  try {
    const deletedWishlist = await prisma.wishList.deleteMany({
      where: {
        userId,
        productId,
      },
    });

    if (deletedWishlist.count === 0) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
