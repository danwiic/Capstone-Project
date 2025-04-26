import { useEffect, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import Loading from "../components/loader/Loading";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface WishlistItem {
  productId: string;
}

const userId = "633e0998-764d-481c-89a8-76b775070326"

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[] | null>(null);

  useEffect(() => {
    setWishlist([
      {
        productId: "1",
      },
    ]);
  }, []);

  if (!wishlist) return <Loading />;

  return (
    <Navbar>
      <div className="px-30 py-10 flex flex-col gap-4">
        <span className="text-xl font-semibold">My Wishlist</span>
        {wishlist && wishlist?.length > 0 ? (
          <>
            <div className=" flex justify-center items-center">
              <div className="w-full max-w-[100rem] grid grid-cols-5 gap-4">

              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center max-w-[100rem]">
            <div className="flex flex-col items-center gap-4">
              <Heart size={200} className=" text-gray-300" />
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
