type CartItemsProps = {
  image?: any;
  itemName?: string | "Unknown Product";
  price?: string | "₱0.00";
  quantity?: number | 1;
}

export default function CartItems({
  image,
  itemName,
  price,
  quantity,
}: CartItemsProps) {
  return (
    <div className="flex justify-between h-auto gap-4 border-b-gray-300 last:border-0 border-b pb-3">
      <div className="max-w-20 w-20 h-20  flex items-center">
        <img src={image} alt="Product Item" className="w-full h-full " />
      </div>
      <div>
        <div className="text-sm text-gray-500 p-0 m-0">
          {itemName}
        </div>
        <span className="text-sm text-mayormoto-blue font-medium">{price}</span>
      </div>
      <div className="w-auto items-center flex flex-col gap-1">
        <div className="flex justify-around border border-gray-300 rounded items-center w-24">
          <button className="flex justify-center items-center w-6 h-6 text-gray-400 text-2xl font-medium">
            -
          </button>
          <input
            type="text"
            defaultValue={quantity ?? 1}
            className="w-5 outline-0 text-center text-gray-600"
          />
          <button className="flex justify-center items-center w-6 h-6 text-gray-400 text-2xl font-medium">
            +
          </button>
        </div>
        <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer">Remove</p>
      </div>
    </div>
  );
}
