import { MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
export default function CartIcon() {
  const { cart } = useContext(CartContext);

  return (
    <div className="relative flex">
      <MdShoppingCart className="text-4xl cursor-pointer text-mayormoto-blue" />
      <span
        className="font-medium bg-mayormoto-pink text-white absolute h-5 w-5 p-1 
              text-center rounded-2xl flex items-center justify-center
            -right-2 -top-0.5 text-sm hover:h-6 hover:w-6 hover:text-lg 
            duration-300 ease-in-out transition-all cursor-pointer "
      >
        {cart.length ?? 0}
      </span>
    </div>
  );
}
