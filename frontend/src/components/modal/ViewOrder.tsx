import { Package, X } from "lucide-react";
import { formatMoney } from "../../utils/formatMoney";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import formatDate from "../../utils/formatDate";

interface ViewOrderProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderCardProps;
}

interface OrderCardProps {
  orderId: string;
  orderStatus: string;
  orderDate: string;
  orderItems: Array<{
    productImage: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productVariant?: string;
  }>;
}

export default function ViewOrder({
  isOpen,
  onClose,
  orderDetails,
}: ViewOrderProps) {
  if (!isOpen) return null;

  const [collapse, setCollapse] = useState(true);
  console.log(collapse);

  const totalPrice = orderDetails.orderItems.reduce(
    (total, item) => total + item.productPrice * item.productQuantity,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 overflow-y-auto flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className=" bg-body rounded-lg text-left
         overflow-hidden shadow-xl transform transition-all pb-2
         sm:my-8 sm:align-middle sm:max-w-lg sm:w-full flex flex-col gap-2"
      >
        <div>
          <div className="flex justify-between items-center px-4 py-3 ">
            <span className="font-medium">Order Details</span>
            <X onClick={onClose} size={20} />
          </div>

          <div
            className="bg-gradient-to-r from-mayormoto-pink/30 to-mayormoto-blue/40
        flex justify-between items-center p-4 text-gray-700"
          >
            <div>
              <span className="text-xl font-bold">
                {orderDetails.orderStatus}
              </span>
            </div>
            <Package size={40} />
          </div>
        </div>
        {/* ============= PRODUCT LIST ====================== */}
        <div className="bg-white">
          {orderDetails &&
            orderDetails.orderItems.length > 0 &&
            orderDetails.orderItems.map((prods, i) => (
              <div className="flex  gap-2 p-4" key={i}>
                <div className="min-w-12 flex justify-center">
                  <img src={prods.productImage} className="h-15 w-auto" />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <span>{prods.productName}</span>
                  {prods.productVariant && (
                    <span className="text-sm text-gray-500">
                      Variant: {prods.productVariant}
                    </span>
                  )}
                  <div className="flex justify-between items-center">
                    <span>{formatMoney(prods.productPrice)}</span>
                    <span className="font-bold text-sm">
                      Qty: {prods.productQuantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    {orderDetails.orderStatus !== "Completed" &&
                      orderDetails.orderStatus === "Canceled" && (
                        <button
                          className="text-sm text-gray-500 hover:text-gray-700
                      border border-gray-300 hover:bg-gray-100 px-3 py-2 rounded"
                        >
                          Cancel
                        </button>
                      )}

                    {orderDetails.orderStatus === "Completed" && (
                      <div className="flex gap-1">
                        <button
                          className="text-sm font-semibold text-gray-500 hover:text-gray-700
                        border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded"
                        >
                          Return/Refund
                        </button>

                        <button
                          className="text-sm text-mayormoto-pink font-semibold
                        rounded border border-gray-300 px-3 py-1 hover:bg-gray-100"
                        >
                          Rate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="pt-2 bg-white flex flex-col gap-2 text-sm">
          {!collapse && <span className="font-bold px-4">Order Summary</span>}
          <div className="flex flex-col gap-2">
            {!collapse && (
              <div className="flex flex-col gap-2">
                <div className=" px-4 flex justify-between">
                  <span>
                    Subtotal({orderDetails.orderItems.length}{" "}
                    {orderDetails.orderItems.length > 1 ? " items" : " item"})
                  </span>
                  <span>{formatMoney(totalPrice)}</span>
                </div>
                <div className=" px-4 flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{formatMoney(200)}</span>
                </div>
              </div>
            )}
            <div className=" px-4 flex justify-between">
              <span className="font-semibold">Total</span>
              <span>{formatMoney(totalPrice)}</span>
            </div>

            {!collapse && (
              <div className=" px-4 flex flex-col gap-2 border-y border-gray-200 py-2">
                <span className="font-semibold">Payment Method</span>
                <div className="flex justify-between">
                  <span>Gcash</span>
                  <span>{formatMoney(totalPrice)}</span>
                </div>
              </div>
            )}

            <div className=" px-4 flex justify-between">
              <span className="font-semibold">Order No.</span>
              <span>{orderDetails.orderId}</span>
            </div>
          </div>

          {!collapse && (
            <div>
              <div className=" px-4 flex justify-between">
                <span>Placed On</span>
                <span>{formatDate(orderDetails.orderDate, true)}</span>
              </div>
            </div>
          )}

          <div
            onClick={() => setCollapse((prev) => !prev)}
            className=" px-4 py-2 text-center border-t border-gray-200 
          flex items-center justify-center gap-1 cursor-pointer text-sm"
          >
            View Order Summary
            {collapse ? <BsCaretDownFill /> : <BsCaretUpFill />}
          </div>
        </div>
      </div>
    </div>
  );
}
