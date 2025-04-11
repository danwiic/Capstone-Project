import { BsCart2 } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
export default function CartIcon() {
  const { cart } = useContext(CartContext);

  return (
    <div className="relative flex">
      <BsCart2 className="text-4xl cursor-pointer text-mayormoto-blue" />
      <span
        className="font-medium bg-mayormoto-blue text-white absolute h-6 w-6 p-1 
              text-center rounded-2xl flex items-center justify-center
            -right-2.5 -top-0.5 text-sm hover:scale-120 
            duration-300 ease-in-out transition-all cursor-pointer  "
      >
        {cart.length ?? 0}
      </span>
    </div>
  );
}
