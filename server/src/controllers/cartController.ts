import prisma from "../config/db";

// --- ADD to Cart ---
export const addToCart = async (req: any, res: any) => {
    const { userId, productId, variantId, quantity } = req.body;
  
    try {
      let cart = await prisma.cart.findFirst({ where: { userId } });
  
      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
        });
      }
  
      // 🛠 VariantId handling: convert "" to null
      const cleanVariantId = variantId && variantId !== "" ? variantId : null;
  
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
          variantId: cleanVariantId, // Important: variantId is either real or null
        },
      });
  
      if (existingCartItem) {
        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: { increment: quantity || 1 },
          },
        });
        return res.status(200).json({ message: "Product quantity updated in cart" });
      }
  
      const cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: cleanVariantId,
          quantity: quantity || 1,
          price: await getProductPrice(productId, cleanVariantId),
        },
      });
  
      return res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
// --- GET User's Cart Items ---
export const getUserCart = async (req: any, res: any) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                ProductImage: true,
                brand: true,
              },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart.items);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// --- UPDATE Cart Item Quantity ---
export const updateCartItem = async (req: any, res: any) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return res.status(200).json({ message: "Cart item updated", updatedItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// --- DELETE Cart Item ---
export const deleteCartItem = async (req: any, res: any) => {
  const { cartItemId } = req.params;

  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return res.status(200).json({ message: "Cart item deleted" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// --- Helper to get price ---
async function getProductPrice(productId: string, variantId?: string) {
  if (variantId) {
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });
    if (!variant) throw new Error("Variant not found");
    return variant.price;
  } else {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");
    return product.price || 0;
  }
}
