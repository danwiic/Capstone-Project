import { createContext, useContext, useState } from "react";
import axios from "axios";

// Type Definitions
type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    ProductImage: {
      id: string;
      imageUrl: string;
    }[];
  };
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (
    userId: string,
    productId: string,
    variantId: string | null,
    quantity: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (
    userId: string,
    productId: string,
    variantId: string | null,
    quantity: number
  ) => {
    try {
      const res = await axios.post("http://localhost:3000/cart/add", {
        userId,
        productId,
        variantId,
        quantity,
      });
      setCart((prev) => [...prev, res.data.cartItem]); 
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      console.log("Removing cart item with ID:", cartItemId);  // Debug log
      await axios.delete(`http://localhost:3000/cart/delete/${cartItemId}`);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId)); 
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const res = await axios.put(`http://localhost:3000/cart/update/${cartItemId}`, {
        quantity,
      });
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      ); // Update the cart item locally
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

