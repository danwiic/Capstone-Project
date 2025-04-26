import { BsCart2 } from "react-icons/bs";
import { useContext, useMemo, useState } from "react";
import Button from "../ui/button/Button";
import { CartContext } from "../../context/cartContext";
import React from "react";
import { formatMoney } from "../../utils/formatMoney";
import Navbar from "../Nav/Navbar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      className={`${cartPosition} absolute top-5 -right-10 z-50 shadow-1  
    animate-fade animate-once animate-duration-[300ms] animate-ease`}
    >
      <div
        className={`rounded shadow-1 h-[18rem]
          max-h-[22rem] w-[30rem] 
          relative
          after:content-[''] after:absolute after:-top-2 ${className} 
          after:w-0 after:h-0 after:z-50 
          after:border-l-[8px] after:border-l-transparent
          after:border-r-[8px] after:border-r-transparent
          after:border-b-[8px] after:border-b-white 
          after:shadow-t-sm
        `}
      >
        {children ? (
          <div className="h-auto relative flex flex-col">
            <div className="max-h-[350px] overflow-auto scrollbar-corner-cyan-900 pb-34 flex flex-col gap-3 p-6">
              {children}
            </div>

            <div
              className="flex flex-col shadow-1 justify-between absolute bottom-0 h-auto w-full gap-5 
             pt-2 z-10 bg-white p-6"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">Total</div>
                <div className="font-medium text-red-500">
                  {formatMoney(calculateTotal)}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <Link to="/cart" className="w-full">
                  <Button className="rounded-xs">View Cart</Button>
                </Link>
                <Button className="bg-mayormoto-pink hover:bg-mayormoto-pink/80 rounded-xs">
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar>
        <div className="px-30 py-10 flex flex-col gap-4">
          <span className="text-2xl font-semibold">My Cart</span>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <table className="w-full text-left shadow-1 bg-white">
                <thead className=" text-sm text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className=" p-5">Item Name</th>
                    <th className=" p-5">Quantity</th>
                    <th className=" p-5">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" p-5 flex items-center gap-4 relative">
                      <span
                        className="w-[5.7rem] h-[5.7rem] inset-0  rounded-md 
                      overflow-hidden abosolute flex items-center justify-center"
                      >
                        <img
                          className="object-contain w-5/6 h-5/6"
                          src="https://res.cloudinary.com/dvexdyqea/image/upload/v1745207283/EVO_RX-7_Magenta_-_2_800_kajpcz.png"
                          alt=""
                        />
                      </span>
                      <div className="flex flex-col gap">
                        <span className="text-sm uppercase text-gray-600">
                          GILLE
                        </span>
                        <span className=" font-semibold">
                          GILLE Helmet Boss
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="border-1 w-fit border-gray-200 flex items-center">
                        <button className="p-1 border-r px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
                          -
                        </button>
                        <input
                          type="text"
                          className="w-10 outline-0 text-center text-gray-700 text-sm"
                          defaultValue={1}
                        />
                        <button className="p-1 border-l px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
                          +
                        </button>
                      </div>
                    </td>
                    <td>{formatMoney(2400)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white h-fit flex flex-col gap-4 shadow-1 row-span-2 p-6">
              <div
                className="flex justify-between items-center 
              font-semibold text-xl text-gray-700"
              >
                <span className="uppercase">total</span>
                <span>{formatMoney(2400)}</span>
              </div>
              <div>
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={`py-3 flex items-center justify-between
    cursor-pointer border-y ${isOpen ? "border-b-0" : ""} border-gray-200`}
                >
                  <span>Order Instructions</span>
                  <span className="transition-all duration-300 ease-in-out">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <textarea
                      placeholder="Add your order instructions here..."
                      className="w-full border outline-0 resize-none
        border-gray-200 h-30 p-2 text-sm"
                      draggable={false}
                    ></textarea>
                    <button
                      className="w-fit px-8 py-3 bg-mayormoto-blue
      hover:bg-mayormoto-blue-hover text-white text-sm rounded-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 text-center">
                  Shipping is already calculated at checkout
                </span>
                <button
                  className="py-4 font-semibold text-sm 
              bg-mayormoto-pink text-white w-full
              cursor-pointer hover:bg-mayormoto-pink/80 rounded-sm"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
            <div>lorem*50</div>
          </div>
        </div>
      </Navbar>
    </>
  );
}
