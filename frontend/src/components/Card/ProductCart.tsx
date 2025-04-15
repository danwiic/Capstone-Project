import React from "react";
import { formatMoney } from "../../utils/formatMoney";
import Button from "../ui/button/Button";
import { Link } from "react-router-dom";

type ProductCardProps = {
  imageUrl?: string;
  name?: string;
  brand?: string;
  price: number;
};
function DisplayProductCart({
  imageUrl,
  name,
  brand,
  price,
}: ProductCardProps) {
  return (
    <>
      <div
        className="rounded-xs  flex flex-col w-full
      py-6 px-4 justify-center gap-2 bg-white border border-gray-200
      border-l-0 [&:nth-child(4n)]:border-r-0 border-t-0"
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full  h-32">
            <img
              src={imageUrl}
              alt="/"
              className="w-28 h-full transition-transform duration-200 
                  cursor-pointer scale-120 hover:scale-125"
            />
          </div>

          <div className=" flex flex-col gap-2 cursor-pointer">
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

        <div className="text-xl font-medium text-red-500 ">
          {formatMoney(price)}
        </div>

        <Button className="rounded-xs ">Add to cart</Button>
      </div>
    </>
  );
}

export default React.memo(DisplayProductCart);
