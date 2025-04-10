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
    <div className="flex items-center justify-between h-auto gap-4 pb-3 border-b border-b-gray-300 last:border-0">
      <div className="max-w-23 w-23 h-23">
        <img src={image} alt="Product Item" className="w-full h-full " />
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-0 m-0 text-sm text-gray-500">{itemName}</div>
        <span className="text-sm font-medium text-mayormoto-blue">{price}</span>
      </div>

      <div className="flex flex-col items-center w-auto gap-1">
        <div className="flex items-center justify-around w-24 border border-gray-300 rounded">
          <button className="flex items-center justify-center w-6 h-8 text-2xl font-medium text-gray-400">
            -
          </button>
          <input
            type="text"
            defaultValue={quantity ?? 1}
            className="w-5 text-center text-gray-600 outline-0"
          />
          <button className="flex items-center justify-center w-6 h-8 text-2xl font-medium text-gray-400">
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
