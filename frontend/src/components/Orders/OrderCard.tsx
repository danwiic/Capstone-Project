import { Box, Boxes, Check, HandCoins, Ship, X } from "lucide-react";
import { formatMoney } from "../../utils/formatMoney";
import formatDate from "../../utils/formatDate";
import { useState } from "react";
import Refund from "../modal/Refund";
import SubmitReview from "../modal/SubmitReview";
import ViewOrder from "../modal/ViewOrder";

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

type OrderItemsCardProps = {
  orders: OrderCardProps;
};
export default function OrderCard({ orders }: OrderItemsCardProps) {
  function countTotalPrice(items: OrderCardProps["orderItems"]) {
    return items.reduce((total, item) => {
      return total + item.productPrice * item.productQuantity;
    }, 0);
  }

  const [opeRefund, setOpenRefund] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  function statusColor(status: string) {
    switch (status) {
      case "To Ship":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      case "To Pay":
        return "text-yellow-500";
      case "Cancelled":
        return "text-red-500";
      case "To Receive":
        return "text-sky-500";
      default:
        return "text-gray-500";
    }
  }

  function statusIcon(status: string) {
    switch (status) {
      case "To Ship":
        return <Ship />;
      case "Completed":
        return <Check />;
      case "To Pay":
        return <HandCoins />;
      case "Cancelled":
        return <X />;
      case "To Receive":
        return <Boxes />;
      default:
        return "text-gray-500";
    }
  }

  return (
    <>
      <div className=" bg-white rounded border border-gray-200">
        <span
          className="py-3 border-b border-gray-200 text-sm font-semibold 
      text-gray-500 flex items-center justify-between px-4"
        >
          <span className="flex items-center gap-2">
            <Box />
            <span>#{orders.orderId}</span>
          </span>
          <span
            className={`${statusColor(
              orders.orderStatus
            )} flex items-center gap-1`}
          >
            {statusIcon(orders.orderStatus)}
            {orders.orderStatus}
          </span>
        </span>
        <div>
          {orders.orderItems.map((item, index) => (
            <div
              key={index}
              className="px-4 py-3 flex items-center justify-between 
          not-last:border-b border-gray-200"
            >
              <div className=" flex items-center gap-4">
                <span className="max-w-14 h-auto flex items-center justify-center">
                  <img src={item.productImage} className="w-auto h-auto" />
                </span>
                <span className="text-sm flex flex-col gap-1">
                  <span>{item.productName}</span>
                  <span>{item.productVariant}</span>
                  <span className="text-mayormoto-pink">
                    {formatMoney(item.productPrice)}
                  </span>
                </span>
              </div>
              <div className="text-sm font-medium text-gray-600">
                Quantity: {item.productQuantity}
              </div>
            </div>
          ))}
          <div>
            <div
              className="px-4 py-3 flex items-center justify-between 
           text-sm font-semibold text-gray-500"
            >
              <div className="flex flex-col gap-1">
                <span>Placed on: {formatDate(orders.orderDate)}</span>
                {orders.orderStatus !== "Completed" &&
                  orders.orderStatus !== "Cancelled" && (
                    <span>
                      Estimated Delivery: {formatDate(orders.orderDate + 2)}
                    </span>
                  )}
                {orders.orderStatus === "Completed" && (
                  <span>Received on: {formatDate(orders.orderDate + 1)}</span>
                )}
              </div>
              <div className="text-right">
                <span className="flex flex-col gap-1">Total Amount</span>
                <span className="text-mayormoto-pink text-xl">
                  {formatMoney(countTotalPrice(orders.orderItems))}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 gap-1 pt-0">
              <button
                onClick={() => setOpenOrderDetails((prev) => !prev)}
                className="py-2 px-4 text-sm font-semibold border border-gray-200 hover:bg-gray-200
            bg-gray-100 transition duration-200 ease-in-out rounded-full text-gray-500"
              >
                Order Details
              </button>
              {orders.orderStatus === "Completed" && (
                <>
                  <button
                    onClick={() => setOpenReview((prev) => !prev)}
                    className="py-2 px-4 text-sm font-semibold border border-gray-200 hover:bg-gray-200
            bg-gray-100 transition duration-200 ease-in-out rounded-full text-gray-500"
                  >
                    Write a Review
                  </button>

                  <button
                    onClick={() => setOpenRefund((prev) => !prev)}
                    className="py-2 px-4 text-sm font-semibold text-white rounded-full
           bg-mayormoto-pink hover:bg-mayormoto-pink/80 transition 
           duration-200 ease-in-out"
                  >
                    Refund / Return
                  </button>
                  <button
                    className="py-2 px-4 text-sm font-semibold text-white rounded-full
           bg-mayormoto-pink hover:bg-mayormoto-pink/80 transition 
           duration-200 ease-in-out"
                  >
                    Buy Again
                  </button>
                </>
              )}
              {orders.orderStatus !== "Completed" &&
                orders.orderStatus !== "Cancelled" && (
                  <button
                    className="py-2 px-4 text-sm font-semibold text-white rounded-full
           bg-mayormoto-pink hover:bg-mayormoto-pink/80 transition 
           duration-200 ease-in-out"
                  >
                    Track Order
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      {opeRefund && (
        <Refund
          isOpen={opeRefund}
          onClose={() => setOpenRefund((prev) => !prev)}
        />
      )}
      {openReview && (
        <SubmitReview
          isOpen={openReview}
          onClose={() => setOpenReview((prev) => !prev)}
        />
      )}

      {openOrderDetails && (
        <ViewOrder
          isOpen={openOrderDetails}
          orderDetails={orders}
          onClose={() => setOpenOrderDetails((prev) => !prev)}
        />
      )}
    </>
  );
}
