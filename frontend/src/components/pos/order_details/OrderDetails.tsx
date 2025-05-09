import { formatMoney } from "../../../utils/formatMoney";
// import { AiOutlineDelete } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdOutlineDiscount } from "react-icons/md";

export default function OrderDetails() {
  return (
    <div
      className="flex flex-col gap-4 sticky top-0 h-auto shadow-1 
      overflow-y-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl"
    >
      <div className="bg-white p-4 w-full rounded-xs">
        <div className="border-b border-dashed border-gray-400 py-2">
          <div className="flex items-center justify-between font-medium">
            <span>Order Details</span>
            <div className="flex gap-2 items-center">
              {/* <AiOutlineDelete
                title="Delete Order"
                className="text-2xl text-red-500  hover:text-red-400 
                  cursor-pointer font-bold"
              /> */}
              <MdOutlineDiscount
                title="Apply Discount"
                className="text-2xl
                  cursor-pointer font-bold"
              />
            </div>
          </div>
        </div>
        <div className="py-2 flex flex-col gap-2">
          <div
            className="flex flex-col justify-center gap-3 
                border-b border-dashed border-gray-400 pb-3"
          >
            <div className="flex justify-between text-sm font-medium items-center">
              <span>Item Name</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>

            <div className="flex flex-col gap-3">
              {Array.from({ length: 1 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm items-center"
                >
                  <span className="text-gray-600 break-w">
                    Helmet Zebra 432
                  </span>
                  <div
                    className="text-center border rounded 
                        border-gray-400 flex items-center gap-1 px-2"
                  >
                    <button className="cursor-pointer text-lg">-</button>
                    <input
                      type="text"
                      className="w-8 text-center px-1 outline-0"
                      defaultValue={1}
                      placeholder="1"
                    />
                    <button className="cursor-pointer text-lg">+</button>
                  </div>
                  <span className="font-medium">{formatMoney(2100)}</span>
                </div>
              ))}
            </div>

            <span
              title="Remove All Items"
              className="text-red-500 text-sm 
                  font-medium cursor-pointer text-right px-2
                   hover:text-red-400"
            >
              Remove All
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium">Order Summary</span>
            <div
              className="px-4 flex flex-col gap-1 
                    border-b border-dashed border-gray-400 pb-3"
            >
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatMoney(4200)}</span>
              </div>

              <div className="flex justify-between text-sm items-center ">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatMoney(0)}</span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">{formatMoney(0)}</span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Cash</span>
                <span className="font-medium">{formatMoney(5000)}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Change</span>
                <span className="font-medium">{formatMoney(800)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium items-center">
                <span>Grand Total</span>
                <span className="font-medium">{formatMoney(4200)}</span>
              </div>
            </div>
            <div className="border-b border-dashed border-gray-400 pb-3">
              <span className="font-medium">Cash</span>
              <input
                type="text"
                placeholder="0"
                className="text-right w-full border border-gray-300 
                      rounded px-4 py-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Payment Method</span>
              <div className="flex gap-2 justify-between items-center">
                <button
                  className="px-4 py-2 bg-mayormoto-blue rounded
                  hover:bg-mayormoto-blue-hover hover:cursor-pointer
                text-white w-full flex items-center justify-center gap-2
                "
                >
                  <BsCash />
                  Cash
                </button>
                <button
                  className="px-4 py-2 bg-mayormoto-blue rounded
                  hover:bg-mayormoto-blue-hover hover:cursor-pointer
                text-white w-full flex items-center justify-center gap-2"
                >
                  <CiCreditCard1 />
                  Home Credit
                </button>
              </div>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <button
                className="px-4 py-3 bg-green-500 rounded
                  hover:bg-green-400 hover:cursor-pointer
                text-white w-full flex items-center justify-center gap-2
                "
              >
                Process Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
