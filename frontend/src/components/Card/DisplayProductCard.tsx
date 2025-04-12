import { formatMoney } from "../../utils/formatMoney";

type ProductCardProps = {
  imageUrl: string;
  name: string;
  stock: number;
  price: number;
};
export default function ProductCard({
  imageUrl,
  name,
  stock,
  price,
}: ProductCardProps) {
  return (
    <>
      <div
        className="rounded shadow-xs flex flex-col w-56 
      p-6 justify-center gap-2 bg-white hover:shadow-md"
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full  h-32">
            <img
              src={imageUrl}
              alt="/"
              className="w-28 h-full transition-transform duration-200 
                  cursor-pointer scale-130 hover:scale-140"
            />
          </div>
          <div className="text-md font-bold cursor-pointer hover:text-mayormoto-blue">
            {name}
          </div>
        </div>

        <div className="text-lg font-medium text-red-500 ">
          {formatMoney(price)}
        </div>
      </div>
    </>
  );
}
