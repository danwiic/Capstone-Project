import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import KebabMenu from "../../components/pos/menu/Kebab";
import Layout from "../../components/pos/nav/Layout";
import { formatMoney } from "../../utils/formatMoney";
import OrderDetails from "../../components/modal/OrderDetails";
import { Box } from "lucide-react";

interface Order {
  name: string;
  productUrl: string;
  quantity: number;
  color: string;
  variant: string | null;
  price: number;
}

const mockOrders = [
  {
    id: "00001",
    customer: "Dan Pirante",
    paymentMethod: "Gcash",
    products: [
      {
        name: "Sphinx Motorcycle Gloves V-001 (Black)",
        productUrl:
          "https://res.cloudinary.com/dvexdyqea/image/upload/v1745594064/Sphinx_Motorcycle_Gloves_V-001__Black_-999__stock-_M-2_XL-2_xe7dp5.png",
        quantity: 1,
        color: "Black",
        variant: "M",
        price: 999,
      },
    ],
    address: "2231 St. Barangay 200",
    city: "Cavite City",
    province: "Cavite",
    zipCode: "4100",
    contact: "09123456789",
    status: "placed",
    statusHistory: [
      { status: "placed", date: "2:25PM April 15, 2025" },
      { status: "confirmed" },
      { status: "packed" },
      { status: "shipped" },
      { status: "delivered" },
    ],
    trackingNumber: null,
    date: "April 16, 2025",
  },
  {
    id: "00002",
    customer: "Maria Santos",
    paymentMethod: "Maya",
    products: [
      {
        name: "Sphinx Motorcycle Gloves SP-30 (Black Orange)",
        productUrl:
          "https://res.cloudinary.com/dvexdyqea/image/upload/v1745594061/Sphinx_Motorcycle_Gloves_SP-30__Black_Orange_-_900__stock-S-1_M-1_L-1_qkbdaq.png",
        quantity: 1,
        color: "Black Orange",
        variant: "L",
        price: 900,
      },
    ],
    address: "Block 7 Lot 12 Green Heights Subdivision",
    city: "Antipolo",
    province: "Rizal",
    zipCode: "1870",
    contact: "09187654321",
    status: "packed",
    statusHistory: [
      { status: "placed", date: "9:10AM April 16, 2025" },
      { status: "confirmed", date: "11:10AM April 16, 2025" },
      { status: "packed" },
      { status: "shipped" },
      { status: "delivered" },
    ],
    trackingNumber: null,
    date: "April 17, 2025",
  },
  {
    id: "00003",
    customer: "John Reyes",
    paymentMethod: "COD",
    products: [
      {
        name: "Motowolf Motorcycle Protector MDL1010 (Black - Four Piece Suit Long)",
        productUrl:
          "https://res.cloudinary.com/dvexdyqea/image/upload/v1745594043/Motowolf_Motorcycle_Protector_MDL1010__Black_-_Four_Piece_Suit_Long_-1_300__stock-2_aslyfj.png",
        quantity: 1,
        color: "Black",
        variant: "Long",
        price: 1300,
      },
    ],
    address: "123 Main St.",
    city: "Makati",
    province: "Metro Manila",
    zipCode: "1200",
    contact: "09223344556",
    status: "SHIPPED",
    statusHistory: [
      { status: "placed", date: "11:15AM April 14, 2025" },
      { status: "confirmed", date: "1:00PM April 14, 2025" },
      { status: "packed", date: "3:00PM April 14, 2025" },
      { status: "shipped", date: "10:00AM April 15, 2025" },
      { status: "delivered" },
    ],
    trackingNumber: "123456789",
    date: "April 15, 2025",
  },
  {
    id: "00004",
    customer: "Ana Cruz",
    paymentMethod: "Gcash",
    products: [
      {
        name: "Motowolf Leg Bag MDL0706 (Black)",
        productUrl:
          "https://res.cloudinary.com/dvexdyqea/image/upload/v1745594038/Motowolf_Leg_Bag_MDL0706__Black_-_750__stock-4_kwptxl.png",
        quantity: 1,
        color: "Black",
        variant: null,
        price: 750,
      },
    ],
    address: "Unit 303 Sunrise Condo",
    city: "Quezon City",
    province: "Metro Manila",
    zipCode: "1100",
    contact: "09334455667",
    status: "completed",
    statusHistory: [
      { status: "placed", date: "8:00AM April 12, 2025" },
      { status: "confirmed", date: "9:30AM April 12, 2025" },
      { status: "packed", date: "11:00AM April 12, 2025" },
      { status: "shipped", date: "2:00PM April 13, 2025" },
      { status: "delivered", date: "1:00PM April 14, 2025" },
    ],
    trackingNumber: "3456789012",
    date: "April 14, 2025",
  },
  {
    id: "00005",
    customer: "Miguel Lim",
    paymentMethod: "Gcash",
    products: [
      {
        name: "SMOK Seismic X Shock Absorber Click 330MM (Black Red Red)",
        productUrl:
          "https://res.cloudinary.com/dvexdyqea/image/upload/v1745586786/SMOK_Seismic_X_Shock_Absorber_Click_330MM__Blk_Red_Red_-_1_400__stock-2_lnpzzb.png",
        quantity: 1,
        color: "Black Red Red",
        variant: "330MM",
        price: 1400,
      },
    ],
    address: "45 Sunshine Road",
    city: "Pasig City",
    province: "Metro Manila",
    zipCode: "1600",
    contact: "09556677889",
    status: "placed",
    statusHistory: [
      { status: "placed", date: "4:32PM April 25, 2025" },
      { status: "confirmed" },
      { status: "packed" },
      { status: "shipped" },
      { status: "delivered" },
    ],
    trackingNumber: null,
    date: "April 18, 2025",
  },
];

export default function Orders() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const orderStatuses = [
    "all",
    "placed",
    "packed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const countTotalPrice = (products: Order[]): number => {
    return products.reduce((total: number, product: any) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus =
      selectedFilter.toLowerCase() === "all" ||
      order.status.toLowerCase() === selectedFilter.toLowerCase();

    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery.toLowerCase());

    const productText = Array.isArray(order.products)
      ? order.products.map((p) => p.name).join(", ")
      : order.products;
    const matchesProduct = productText
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && (matchesSearch || matchesProduct);
  });

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6">
          {/* Header section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-xl text-gray-800">Orders</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track all customer orders
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
                <HiOutlineRefresh className="text-lg" />
                <span>Refresh</span>
              </button>
              <button className="bg-mayormoto-blue text-white px-4 py-2 rounded-md text-sm hover:bg-mayormoto-blue-hover transition-colors flex items-center gap-2">
                <TfiExport />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex h-fit border-b border-gray-300">
              {orderStatuses.map((status) => (
                <div
                  onClick={() => setSelectedFilter(status)}
                  className={`p-4 px-6 h-full cursor-pointer text-sm
                      ${
                        selectedFilter === status
                          ? "border-b border-mayormoto-blue text-mayormoto-blue font-medium"
                          : ""
                      }`}
                  key={status}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              {filteredOrders.length > 0 ? (
                <div className=" bg-white p-4 flex flex-col gap-4 ">
                  <table
                    className="w-full text-left text-sm text-gray-500
        border border-gray-200 rounded"
                  >
                    <thead className="border-b border-gray-200 uppercase bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Order-ID</th>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Ordered On</th>
                        <th className="px-4 py-2">Last Update</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((filter, i) => (
                        <tr
                          key={i}
                          className={`${
                            i !== filteredOrders.length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                        >
                          <td className="p-4">{filter.id}</td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold">
                                {filter.customer}
                              </span>
                              <span>Contact: {filter.contact}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            {formatMoney(countTotalPrice(filter.products))}
                          </td>
                          <td className="p-4">{filter.date}</td>
                          <td className="p-4">{filter.date}</td>
                          <td className="p-4">
                            <span className={`${statusColor(filter.status)}`}>
                              {filter.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <KebabMenu />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Showing {filteredOrders.length} of {filteredOrders.length}{" "}
                      logs
                    </span>

                    <div className="flex items-center gap-2 text-sm">
                      <button
                        className="ml-2 bg-mayormoto-blue text-white
              hover:bg-mayormoto-blue-hover px-4 py-2 rounded
              disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={filteredOrders.length === 10}
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-500">
                        Page 1 of {Math.ceil(filteredOrders.length / 10)}
                      </span>
                      <button
                        className="ml-2 bg-mayormoto-blue text-white
              hover:bg-mayormoto-blue-hover px-4 py-2 rounded  
              disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={filteredOrders.length === 10}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white py-10 flex flex-col items-center gap-4">
                  <Box size={60} className="text-gray-500" />
                  <span className="font-semibold text-xl">
                    No audit logs found
                  </span>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
          </div>
        </div>
      </Layout>
      {viewOrderDetails && (
        <OrderDetails
          isOpen={viewOrderDetails}
          orderDetails={mockOrders[selectedIndex]}
          onClose={() => setViewOrderDetails((prev) => !prev)}
        />
      )}
    </>
  );
}

function statusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "placed": {
      return "bg-yellow-100 px-2 py-1 rounded-full uppercase font-semibold text-sm text-yellow-800";
    }
    case "packed": {
      return "bg-blue-100 px-2 py-1 rounded-full uppercase font-semibold text-sm text-blue-800";
    }
    case "shipped": {
      return "bg-green-100 px-2 py-1 rounded-full uppercase font-semibold text-sm text-green-800";
    }
    case "delivered": {
      return "bg-purple-100 px-2 py-1 rounded-full uppercase font-semibold text-sm text-purple-800";
    }
    case "cancelled": {
      return "bg-red-100 px-2 py-1 rounded-full uppercase font-semibold text-sm text-red-800";
    }
    default: {
      return "bg-gray-100 px-2 py-1 rounded-full uppercase font-semibold text-sm text-gray-800";
    }
  }
}
