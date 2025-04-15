import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/formatMoney";

type ProductCardProps = {
  imageUrl?: string;
  name?: string;
  brand?: string;
  price: number;
  cardDesign?: string;
};
export default function ProductCard({
  imageUrl,
  name,
  brand,
  price,
  cardDesign,
}: ProductCardProps) {
  return (
    <>
      <div
        className={`rounded-xs flex flex-col w-full ${cardDesign}
      py-6 px-4 justify-center gap-2 bg-white hover:shadow-1-hover`}
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
      </div>
    </>
  );
}
