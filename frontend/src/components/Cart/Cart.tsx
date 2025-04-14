import { BsCart2 } from "react-icons/bs";
import { useContext, useMemo } from "react";
import Button from "../ui/button/Button";
import { CartContext } from "../../context/cartContext";
import React from "react";
import { formatMoney } from "../../utils/formatMoney";

interface CartProps {
  children?: React.ReactNode;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  cartPosition?: string;
}
export function CartModal({
  children,
  setter,
  className,
  cartPosition,
}: CartProps) {
  const { cart } = useContext(CartContext);

  console.log(cart);

  const calculateTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item: any) => {
      total += parseFloat(item.price.replace(/₱|,/g, "")) * item.quantity;
    });
    return total.toFixed(2);
  }, [cart]);

  return (
    <div
      className={`${cartPosition} absolute top-5 -right-10 z-50 shadow-2xl 
    animate-fade animate-once animate-duration-[300ms] animate-ease`}
    >
      <div
        className={`rounded shadow-md h-[18rem]
          max-h-[22rem] w-[30rem] 
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
            <div className="max-h-[350px] overflow-auto pb-34 flex flex-col gap-3 p-6">
              {children}
            </div>

            <div
              className="flex flex-col justify-between absolute bottom-0 h-auto w-full gap-5 
            border-t border-gray-300 pt-2 z-10 bg-white p-6"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">Total</div>
                <div className="font-medium">{formatMoney(calculateTotal)}</div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <Button className="rounded-xs">View Cart</Button>
                <Button className="bg-red-500 hover:bg-red-400 rounded-xs">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-between h-full p-6 gap-4">
              <div className="justify-center flex flex-col items-center h-full gap-6">
                <BsCart2 className="text-7xl text-mayormoto-blue" />
                <h2 className="font-medium text-xl text-mayormoto-blue">
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

React.memo(CartModal);

export default function CartComponent() {
  return <></>;
}
