import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/formatMoney";
import Rate from "../rating/Rate";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import ProductModal from "../modal/ProductModal";
import { FaHeart } from "react-icons/fa";

type ProductCardProps = {
  productId: string;
  imageUrl: string;
  name?: string;
  brand?: string;
  price: number;
  cardDesign?: string;
  rating?: number;
  noOfReviews?: number;
};

type Product = {
  product: ProductCardProps;
};

export default function ProductCard({ product }: Product) {
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
        className={`rounded-xs flex flex-col w-full group ${product.cardDesign}
        py-4 px-4 justify-center hover:-translate-y-5 transition-all duration-300
        gap-2 bg-white hover:shadow-1 border border-gray-200`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full h-32 overflow-hidden relative">
            <img
              src={product.imageUrl || product.imageUrl[0]}
              alt="/"
              loading="lazy"
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
          <div className="flex flex-col gap-2 cursor-pointer w-11/12">
            <span className="font-medium text-xs uppercase text-gray-500 hover:text-mayormoto-blue">
              {product.brand}
            </span>

            <Link to={`/product/${product.productId}`}>
              <span
                className="text-sm font-bold truncate hover:text-mayormoto-blue block w-full"
                title={product.name} 
              >
                {product.name}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-medium text-red-500">
            {formatMoney(product.price)}
          </span>
          <span className="flex gap-1 items-center text-xs text-gray-700">
            <Rate readOnly={true} value={product.rating || 0} />
            <span className="font-semibold">
              ({product.noOfReviews || 0}) Reviews
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
            price: product.price,
            rating: product.rating,
            noOfReviews: product.noOfReviews,
          }}
        />
      )}
    </>
  );
}
