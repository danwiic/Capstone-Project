import { useEffect, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import Loading from "../components/loader/Loading";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlistContext } from "../context/WishlistContext";
import ProductCart from "../components/Card/ProductCart";

export default function Wishlist() {
  const { wishlistItems, refreshWishlist } = useWishlistContext();
  const [loading, setLoading] = useState(true);
  console.log(wishlistItems, "wishlistItems");
  
  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        await refreshWishlist();
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadWishlist();
  }, [refreshWishlist]);
  
  if (loading) return <Loading />;
  
  return (
    <Navbar>
      <div className="px-30 py-10 flex flex-col gap-4">
        <span className="text-xl font-semibold">My Wishlist</span>
        {wishlistItems?.length > 0 ? (
          <div className="flex justify-center items-center">
            <div className="w-full max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {wishlistItems.map((item) => (
                <ProductCart
                  key={item.id}
                  product={{
                    productId: item.product.id,
                    name: item.product.name,
                    imageUrl: item.product.ProductImage[0]?.imageUrl || "",
                    price:
                      item.product.price ||
                      item.product.ProductVariant[0]?.price,
                    stock:
                      item.product.stock ||
                      item.product.ProductVariant[0]?.stock,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <Heart size={120} className="text-gray-300" />
              <span className="text-lg font-semibold text-gray-600">
                Your wishlist is empty.
              </span>
              <Link to="/products">
                <button
                  className="bg-mayormoto-pink text-white px-4 py-2
                  text-sm rounded hover:bg-mayormoto-pink/80 cursor-pointer"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
}