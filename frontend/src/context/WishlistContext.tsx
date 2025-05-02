import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useUserContext } from "./userContext";

// Define more specific interface types
interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductImage {
  imageUrl: string;
}

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  ProductImage: ProductImage[];
  ProductVariant: ProductVariant[];
}

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlistItem: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { user } = useUserContext();

  const refreshWishlist = useCallback(async () => {
    if (!user) return;

    if (user?.id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/wishlist/${user.id}`
        );
        setWishlistItems(response.data);

        if (response.data.length === 0) {
          return setWishlistItems([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    } else {
      setWishlistItems([]);
    }
  }, [user?.id]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some((item) => item.productId === productId);
    },
    [wishlistItems]
  );

  const toggleWishlistItem = useCallback(
    async (productId: string) => {
      if (!user) return;

      const inWishlist = isInWishlist(productId);

      try {
        const url = inWishlist
          ? "http://localhost:3000/wishlist/delete"
          : "http://localhost:3000/wishlist/add";

        await axios({
          method: inWishlist ? "delete" : "post",
          url,
          data: { userId: user.id, productId },
        });

        // ✅ Optimistically update wishlistItems instead of refetching
        setWishlistItems((prev) => {
          if (inWishlist) {
            // If the product is already in wishlist, remove it
            return prev.filter((item) => item.productId !== productId);
          } else {
            // If the product was not in wishlist, add a placeholder
            return [
              ...prev,
              {
                id: productId, // Or generate a temp ID
                userId: user.id,
                productId: productId,
                product: {
                  id: productId,
                  name: "Loading...", // Placeholder while adding
                  stock: 0,
                  price: 0,
                  ProductImage: [],
                  ProductVariant: [],
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ];
          }
        });
      } catch (error) {
        console.error("Error toggling wishlist:", error);
      }
    },
    [user?.id, isInWishlist]
  );

  const value = {
    wishlistItems,
    isInWishlist,
    toggleWishlistItem,
    refreshWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  }
  return context;
};
