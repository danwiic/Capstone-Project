import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/formatMoney";
import Rate from "../rating/Rate";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import ProductModal from "../modal/ProductModal";
import { FaHeart  } from "react-icons/fa";

type ProductCardProps = {
  imageUrl?: string;
  name?: string;
  brand?: string;
  price: number;
  cardDesign?: string;
  rating?: number;
  noOfReviews?: number;
};

export default function ProductCard({
  imageUrl,
  name,
  brand,
  price,
  cardDesign,
  rating = 0,
  noOfReviews = 0,
}: ProductCardProps) {
  // Add state for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`rounded-xs flex flex-col w-full group ${cardDesign}
        py-4 px-4 justify-center hover:-translate-y-5 transition-all duration-300
        gap-2 bg-white hover:shadow-1`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full h-32 overflow-hidden relative">
            <img
              src={imageUrl}
              alt="/"
              className="w-auto h-full transition-all duration-200
                  cursor-pointer scale-80 group-hover:scale-90"
            />
            <div
              className="flex flex-col gap-1 absolute top-0 right-0 opacity-0  
            group-hover:opacity-100"
            >
              <button
                className="rounded-full  group-hover:opacity-100
                   transition-all duration-200
                   border p-2 border-gray-300 hover:bg-mayormoto-blue hover:text-white
                   text-lg cursor-pointer"
                title="Add to wishlist"
                onClick={openModal}
              >
                <FaHeart className="text-mayormoto-pink" />
              </button>
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
          <div className="flex flex-col gap-2 cursor-pointer">
            <span
              className="font-medium text-xs uppercase
              text-gray-500 hover:text-mayormoto-blue"
            >
              {brand}
            </span>
            <Link to={`/product/1`}>
              <span
                className="text-sm font-bold break-words
                hover:text-mayormoto-blue"
              >
                {name}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-medium text-red-500">
            {formatMoney(price)}
          </span>
          <span className="flex gap-1 items-center text-xs text-gray-700">
            <Rate readOnly={true} value={rating} />
            <span className="font-semibold">({noOfReviews}) Reviews</span>
          </span>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={{
            imageUrl,
            name,
            brand,
            price,
            rating,
            noOfReviews,
          }}
        />
      )}
    </>
  );
}
