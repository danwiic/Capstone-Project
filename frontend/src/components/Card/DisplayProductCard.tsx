
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
      <div className="rounded shadow-md flex flex-col w-[300px] p-4 justify-center gap-5 bg-white hover:shadow-lg">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="/"
            className="w-40 transition-transform duration-200 
                  cursor-pointer h-45 hover:scale-120"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-2xl font-medium">{name}</div>
          <div className="text-sm font-medium text-gray-700">
            Stocks: {stock}
          </div>
        </div>

        <div className="text-lg font-medium text-red-500 ">₱{price}</div>
      </div>
    </>
  );
}
