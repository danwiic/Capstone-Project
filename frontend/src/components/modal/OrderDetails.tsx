import { Package, X } from "lucide-react";
import { formatMoney } from "../../utils/formatMoney";
import DeliveryStatus from "../DeliveryStatus/DeliveryStatus";

interface OrderDetailsProps {
  onClose: () => void;
  isOpen: boolean;
  orderDetails?: any;
}

export default function OrderDetails({
  isOpen,
  onClose,
  orderDetails,
}: OrderDetailsProps) {
  if (!isOpen) return null;

  function getTotalPrice() {
    return orderDetails.products.reduce(
      (acc: number, product: any) =>
        acc + product.price * (product.quantity || 1),
      0
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div
        className="bg-body rounded-sm shadow-xl flex flex-col 
      min-w-sm w-6xl relative animate-fade-in "
      >
        <div
          className="flex items-center justify-between
        p-3 border-b border-gray-300"
        >
          <span className="flex gap-1 items-centertext-lg font-medium">
            <Package />
            Order Details
          </span>
          <X onClick={onClose} />
        </div>
        <div className="p-3 flex flex-col gap-4 text-sm h-[32rem] w-full overflow-auto">
          <div className="grid grid-cols-4 bg-white border border-gray-300 rounded text-sm ">
            <div className="p-4 flex flex-col border-r border-gray-300">
              <span className="font-medium text-gray-500">Order No.</span>
              <span className="font-medium">{orderDetails.id}</span>
            </div>
            <div className="p-4 flex flex-col border-r border-gray-300">
              <span>Tracking No.</span>
              <span>
                {orderDetails.trackingNumber
                  ? orderDetails.trackingNumber
                  : "N/A"}
              </span>
            </div>
            <div className="p-4 flex flex-col">
              <span>Payment Method</span>
              <span>Gcash</span>
            </div>
            <div className="p-4 flex flex-col border-l border-gray-300">
              <span>Placed On</span>
              <span>
                {
                  orderDetails.statusHistory.find(
                    (sts: { status: string }) => sts.status === "placed"
                  )?.date
                }
              </span>
            </div>
          </div>

          <div
            className="flex flex-col justify-center gap-4 p-5 
          border border-gray-300  bg-white rounded "
          >
            <div className="w-full">
              <DeliveryStatus statuses={orderDetails.statusHistory} />
            </div>

            <span className="font-medium text-lg">Customer Details</span>
            <div className="grid grid-cols-3 gap-4 border border-gray-300 rounded p-4  bg-white ">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Customer Name</span>
                <span>{orderDetails.customer}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Phone Number</span>
                <span>{orderDetails.contact}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Address</span>
                <span>{orderDetails.address}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Province</span>
                <span>{orderDetails.province}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">City</span>
                <span>{orderDetails.city}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Zip Code</span>
                <span>{orderDetails.zipCode}</span>
              </div>
            </div>

            <span className="font-medium text-lg">Product Details</span>
            <div className="w-full">
              <table className="w-full text-sm border border-gray-300 rounded bg-white">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-300 bg-gray-200">
                    <th className="px-3 py-2">Product Name</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2 text-center">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.products.map((product: any) => (
                    <tr className="border-b border-gray-300">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={product.productUrl}
                            alt="Product"
                            className="w-auto h-12 object-cover rounded"
                          />
                          <div>
                            <span className="font-medium">{product.name}</span>

                            <div className="flex flex-col text-xs text-gray-600">
                              {product.color && (
                                <span>Color: {product.color}</span>
                              )}
                              {product.variant && (
                                <span>Size: {product.variant}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {formatMoney(getTotalPrice())}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-end items-center gap-2 w-full text-sm border-t border-gray-300">
          <button
            onClick={onClose}
            className="bg-gray-100 outline outline-gray-300 px-4 py-2 
          rounded hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-mayormoto-pink text-white
          rounded hover:bg-mayormoto-pink/85 "
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
