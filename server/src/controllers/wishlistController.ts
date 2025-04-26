import prisma from "../config/db";

export const addToWishlist = async (req: any, res: any) => {
  const { userId, productId } = req.body;

  try {
    const existingWishlist = await prisma.wishList.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (existingWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    return res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getWishListByUserId = async (req: any, res: any) => {
  const { userId } = req.params;

  try {
    const wishlist = await prisma.wishList.findMany({
      where: { id: userId },
    });

    if (!wishlist) {
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
        userId: userId,
        productId: productId,
      },
    });

    if (!deletedWishlist) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
