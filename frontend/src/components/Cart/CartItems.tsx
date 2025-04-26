import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext"; // Import the hook correctly
type CartItemsProps = {
  productId: string;
  image: string;
  itemName: string;
  price: string;
  quantity: number;
  cartItemId: string; // Pass cart item ID
};

export default function CartItems({
  productId,
  image,
  itemName,
  price,
  quantity,
  cartItemId,
}: CartItemsProps) {
  const { removeFromCart, updateCartQuantity } = useCartContext();

  const handleRemoveItem = () => {
    removeFromCart(cartItemId); // Remove item from cart
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent setting quantity less than 1
    updateCartQuantity(cartItemId, newQuantity);
  };

  return (
    <div className="flex items-center justify-between h-[8rem] gap-2 pb-3 border-b border-b-gray-300 last:border-0">
      <div className="max-w-23 w-auto h-auto flex justify-center items-center">
        <img
          src={image}
          alt="Product Item"
          className="w-full h-full scale-80"
        />
      </div>

      <div className="flex flex-col gap-4 h-full w-11/12 justify-center items-start px-10 overflow-hidden">
        <Link
          to={`/product/${productId}`}
          className="text-sm text-gray-700 font-medium"
        >
          {itemName}
        </Link>
        <span className="text-md font-medium text-red-500">{price}</span>
      </div>

      <div className="flex flex-col items-center w-auto gap-1">
        <div className="border-1 border-gray-200 flex">
          <button
            className="p-1 border-r-1 px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer"
            onClick={() => handleQuantityChange(quantity - 1)} // Decrement quantity
          >
            -
          </button>
          <input
            type="text"
            className="w-10 outline-0 text-center text-gray-700 text-sm"
            value={quantity}
            readOnly
          />
          <button
            className="p-1 border-l-1 px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer"
            onClick={() => handleQuantityChange(quantity + 1)} // Increment quantity
          >
            +
          </button>
        </div>
        <p
          className="text-sm text-gray-500 cursor-pointer hover:text-red-500"
          onClick={handleRemoveItem} // Remove item when clicked
        >
          Remove
        </p>
      </div>
    </div>
  );
}
