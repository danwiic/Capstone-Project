import { useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import Button from "../ui/button/Button";

useState;
interface CartProps {
  children?: React.ReactNode; // Optional children prop
  setter?: boolean | false; // Optional setter for visibility state
  className?: string; // Optional prop to move the cart modal after a specific element
  cartPosition?: string;
}
export function CartModal({
  children,
  setter,
  className,
  cartPosition,
}: CartProps) {
  const [visible] = useState(setter);
  return (
    <div className={`${cartPosition} absolute right-10 z-50 shadow-2xl`}>
      <div
        className={`rounded shadow-md h-auto
          max-h-[350px] w-[450px] ${!visible && "hidden"}
          relative
          after:content-[''] after:absolute after:-top-2 ${className} 
          after:w-0 after:h-0 
          after:border-l-[8px] after:border-l-transparent
          after:border-r-[8px] after:border-r-transparent
          after:border-b-[8px] after:border-b-white
          after:shadow-t-sm
        `}
      >
        {children ? (
          <div className="h-auto relative flex flex-col">
            <div className="max-h-[300px] overflow-auto pb-34 flex flex-col gap-3 p-6">
              {children}
            </div>

            <div
              className="flex flex-col justify-between absolute bottom-0 h-auto w-full gap-5 
            border-t border-gray-300 pt-2 z-10 bg-white p-6"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">Total</div>
                <div className="font-medium">₱1,300.00</div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <button className="bg-mayormoto-blue font-medium text-white rounded px-2 py-4 w-full">
                  View Cart
                </button>
                <button className="bg-red-500 font-medium text-white rounded px-2 py-4 w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-between h-full p-6 gap-4">
              <div className="justify-center flex flex-col items-center h-full gap-6">
                <MdShoppingCart className="text-7xl text-mayormoto-blue" />
                <h2 className="font-medium text-2xl text-mayormoto-blue">
                  Your cart is empty
                </h2>
              </div>
              <Button>Shop now</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
