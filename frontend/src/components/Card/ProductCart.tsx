import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import Button from "../ui/button/Button";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import Rate from "../rating/Rate";
import { FaHeart, FaRegEye } from "react-icons/fa";
import ProductModal from "../modal/ProductModal";
import { X } from "lucide-react";

type ProductCartProps = {
  productId: string;
  imageUrl: string;
  name?: string;
  brand?: string;
  price: number;
  rating?: number;
  noOfReviews?: number;
  variant?: number;
  stock: number;
};

type Product = {
  product: ProductCartProps;
};
function DisplayProductCart({ product }: Product) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkStock = product?.stock !== undefined && product?.stock > 0;

  return (
    <>
      <div
        className="rounded-xs  flex flex-col w-full
      p-4 justify-center gap-2 bg-white border border-gray-200
      border-l-0 [&:nth-child(4n)]:border-r-0 border-t-0 group
      hover:shadow-1-hover shadow-1 transition-all duration-200"
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full h-32 relative overflow-hidden">
            <img
              src={product?.imageUrl || product?.imageUrl[0]}
              loading="lazy"
              alt="/"
              className="w-auto h-full transition-transform duration-200 
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
              {product?.brand}
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
            {formatMoney(product?.price || 0)}
          </span>
          <span className="flex gap-1 items-center text-xs text-gray-700">
            <Rate readOnly={true} value={product?.rating || 0} />
            <span className="font-semibold">({product?.noOfReviews || 0})</span>
          </span>
          {checkStock && (
            <>
              {product?.stock > 0 ? (
                product.stock < 3 ? (
                  <span className="flex gap-1 items-center text-sm text-yellow-500">
                    Low stock
                  </span>
                ) : (
                  <span className="flex gap-1 items-center text-sm text-green-600">
                    In stock
                  </span>
                )
              ) : (
                <span className="flex gap-1 items-center text-sm text-red-600">
                  Out of stock
                  <X className="text-red-600" size={16} />
                </span>
              )}
            </>
          )}
        </div>

        <Button
          disable={!checkStock}
          disabledText="Out of stock"
          className="rounded-xs text-sm"
        >
          Add to cart
        </Button>
      </div>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={{
            productId: product.productId || "0",
            imageUrl:
              product.imageUrl || product.imageUrl[0] || "/placeholder.jpg",
            name: product.name || "Product Name",
            brand: product.brand || "Brand Name",
            price: product.price || 0,
            rating: product.rating || 0,
            noOfReviews: product.noOfReviews || 0,
          }}
        />
      )}
    </>
  );
}

export default React.memo(DisplayProductCart);
