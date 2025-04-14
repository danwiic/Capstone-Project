type CartItemsProps = {
  image?: any;
  itemName?: string | "Unknown Product";
  price?: string | "₱0.00";
  quantity?: number | 1;
};

export default function CartItems({
  image,
  itemName,
  price,
  quantity,
}: CartItemsProps) {
  return (
    <div
      className="flex items-center justify-between h-[8rem] gap-2 pb-3 border-b 
    border-b-gray-300 last:border-0"
    >
      <div className="max-w-23 w-auto h-auto flex justify-center items-center">
        <img
          src={image}
          alt="Product Item"
          className="w-full h-full scale-80"
        />
      </div>

      <div
        className="flex flex-col gap-4 h-full w-full
    justify-center items-start px-10 overflow-hidden"
      >
        <div className="p-0 m-0 text-md text-gray-700 font-medium w-full break-words">
          {itemName}
        </div>
        <span className="text-sm font-medium text-mayormoto-blue">{price}</span>
      </div>

      <div className="flex flex-col items-center w-auto gap-1">
        <div className="border-1 border-gray-200 flex">
          <button className="p-1 border-r-1 px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
            -
          </button>
          <input
            type="text"
            className="w-10 outline-0 text-center text-gray-700 text-sm"
          />
          <button className="p-1 border-l-1 px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 cursor-pointer hover:text-red-500">
          Remove
        </p>
      </div>
    </div>
  );
}
