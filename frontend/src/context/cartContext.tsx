import { createContext, useState } from "react";

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
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

type CartProviderProps = {
  children: React.ReactNode;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
