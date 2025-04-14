import { formatMoney } from "../../utils/formatMoney";

type ProductCardProps = {
  imageUrl?: string;
  name?: string;
  brand?: string;
  price: number;
};
export default function ProductCard({
  imageUrl,
  name,
  brand,
  price,
}: ProductCardProps) {
  console.log(formatMoney(price));

  return (
    <>
      <div
        className="rounded-xs shadow-1 flex flex-col w-56 
      p-6 justify-center gap-2 bg-white hover:shadow-1-hover"
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
            <span className="font-medium text-sm uppercase text-gray-500 hover:text-mayormoto-blue">{brand}</span>
            <span className="text-sn font-medium break-words hover:text-mayormoto-blue">{name}</span>
          </div>
        </div>

        <div className="text-xl font-medium text-red-500 ">
          {formatMoney(price)}
        </div>
      </div>
    </>
  );
}
