import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/formatMoney";
import Rate from "../rating/Rate";
import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductModal from "../modal/ProductModal";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
type ProductCardProps = {
  productId: string;
  imageUrl: string;
  name?: string;
  brand?: string;
  price: number;
  cardDesign?: string;
  rating?: number;
  noOfReviews?: number;
  ProductVariant?: {
    price: number;
  }[];
};

type Product = {
  product: ProductCardProps;
};

export default function ProductCard({ product }: Product) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/wishlist/${user?.id}`
        );
        const wishlist = res.data;
        const found = wishlist.some(
          (item: any) => item.productId === product.productId
        );
        setIsInWishlist(found);
      } catch (error) {}
    };

    checkWishlist();
  }, [product.productId, user?.id]);

  const toggleWishlist = async () => {
    setIsInWishlist((prev) => !prev);

    try {
      const url = isInWishlist
        ? "http://localhost:3000/wishlist/delete"
        : "http://localhost:3000/wishlist/add";

      await axios({
        method: isInWishlist ? "delete" : "post",
        url,
        data: { userId: user?.id, productId: product.productId },
      });
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      setIsInWishlist((prev) => !prev);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`rounded-xs flex flex-col w-full group ${product.cardDesign}
        py-4 px-4 justify-center hover:-translate-y-5 transition-all duration-300
        gap-2 bg-white hover:shadow-1 border border-gray-200`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full h-32 overflow-hidden relative">
            <img
              src={product?.imageUrl || product?.imageUrl[0]}
              alt="/"
              loading="lazy"
              className="w-auto h-full transition-all duration-200
                  cursor-pointer scale-80 group-hover:scale-90"
            />
            <div
              className="flex flex-col gap-1 absolute top-0 right-0 opacity-0  
            group-hover:opacity-100"
            >
              {user && (
                <button
                  className="rounded-full  group-hover:opacity-100
                   transition-all duration-200
                   border p-2 border-gray-300 hover:text-white
                   text-lg cursor-pointer"
                  title={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
                  onClick={toggleWishlist}
                >
                  {isInWishlist ? (
                    <FaHeart className="text-mayormoto-pink" />
                  ) : (
                    <FaRegHeart className="text-mayormoto-pink" />
                  )}
                </button>
              )}
              <button
                className="rounded-full  
                       transition-all duration-200
                       border p-2 border-gray-300 hover:bg-mayormoto-blue hover:text-white
                       text-lg cursor-pointer"
                title="Quick view"
                onClick={openModal}
              >
                <FaRegEye />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 cursor-pointer w-11/12">
            <span className="font-medium text-xs uppercase text-gray-500 hover:text-mayormoto-blue">
              {product.brand}
            </span>

            <Link to={`/product/${product?.productId}`}>
              <span
                className="text-sm font-bold truncate hover:text-mayormoto-blue block w-full"
                title={product?.name}
              >
                {product?.name}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-medium text-red-500">
            {formatMoney(product?.price)}
          </span>
          <span className="flex gap-1 items-center text-xs text-gray-700">
            <Rate readOnly={true} value={product?.rating || 0} />
            <span className="font-semibold">
              ({product?.noOfReviews || 0}) Reviews
            </span>
          </span>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={{
            productId: product.productId,
            imageUrl: product.imageUrl,
            name: product.name,
            brand: product.brand,
            price: product.price || 220,
            rating: product.rating,
            noOfReviews: product.noOfReviews,
          }}
        />
      )}
    </>
  );
}
