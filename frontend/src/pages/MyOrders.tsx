import { useState } from "react";
import Navbar from "../components/Nav/Navbar";
import OrderCard from "../components/Orders/OrderCard";
import { ArrowRight, Box, Search } from "lucide-react";

export default function MyOrders() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filters = [
    "All",
    "To Pay",
    "To Ship",
    "To Receive",
    "Completed",
    "Cancelled",
  ];

  const orders = [
    {
      orderId: "5342534",
      orderStatus: "To Receive",
      orderDate: "2023-10-01",
      orderTotal: 100,
      orderItems: [
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 1",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 1",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
      ],
    },
    {
      orderId: "143423",
      orderStatus: "To Ship",
      orderDate: "2023-10-01",
      orderTotal: 100,
      orderItems: [
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 2",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 1",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
      ],
    },
    {
      orderId: "967764",
      orderStatus: "Completed",
      orderDate: "2023-10-01",
      orderTotal: 100,
      orderItems: [
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 3",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 1",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
      ],
    },
    {
      orderId: "2534534",
      orderStatus: "Cancelled",
      orderDate: "2023-10-01",
      orderTotal: 100,
      orderItems: [
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 4",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
        {
          productImage:
            "https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png",
          productName: "Product 1",
          productPrice: 50,
          productQuantity: 2,
          productVariant: "Variant 1",
        },
      ],
    },
  ];

  const filterOrder =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => {
          if (activeFilter === "To Pay") return order.orderStatus === "To Pay";
          if (activeFilter === "To Ship")
            return order.orderStatus === "To Ship";
          if (activeFilter === "To Receive")
            return order.orderStatus === "To Receive";
          if (activeFilter === "Completed")
            return order.orderStatus === "Completed";
          if (activeFilter === "Cancelled")
            return order.orderStatus === "Cancelled";

          return true;
        });

  const filteredOrders = searchQuery
    ? filterOrder.filter((order) => {
        return (
          order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      })
    : filterOrder;

  return (
    <Navbar>
      <div className="px-30 py-4 w-full flex flex-col gap-4">
        <span className="text-xl font-semibold ">My Orders</span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1 mt-4">
            {filters.map((filter, index) => (
              <button
                onClick={() => setActiveFilter(filter)}
                key={index}
                className={` rounded-full text-sm border border-gray-200 
              font-semibold py-2 px-4 outline-none transition duration-200 ease-in-out 
               ${
                 activeFilter === filter
                   ? " bg-mayormoto-pink text-white border-transparent "
                   : " bg-white text-gray-600 hover:bg-gray-100 "
               } `}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="w-full flex flex-col gap-4">
            <span className="bg-white flex w-1/3 border border-gray-200 rounded text-sm ">
              <button className=" flex items-center justify-center text-gray-400 px-2 py-2">
                <Search />
              </button>
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className="outline-0 w-full py-2"
                placeholder="Search by order number or product..."
              />
            </span>

            <div className=" w-full rounded flex flex-col gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord, i) => (
                  <div key={i}>
                    <OrderCard orders={ord} />
                  </div>
                ))
              ) : (
                <div
                  className="w-full bg-white flex flex-col gap-3 items-center justify-center
                py-10 text-gray-500 border border-gray-200"
                >
                  <Box size={60} />
                  <span className="font-semibold text-xl">No orders found</span>
                  <p className="text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    className="bg-mayormoto-pink hover:bg-mayormoto-pink/80
                  text-white rounded-full px-4 py-2 flex gap-2 items-center"
                  >
                    Start Shopping <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
