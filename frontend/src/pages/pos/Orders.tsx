import { useState } from "react";
import { IoSearchSharp, IoFilter, IoCalendarOutline } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import KebabMenu from "../../components/pos/menu/Kebab";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import { formatMoney } from "../../utils/formatMoney";
import Status from "../../components/pos/status card/Status";

export default function Orders() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const orderStatuses = [
    "all",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const mockOrders = [
    {
      id: 1,
      customer: "Dan Pirante",
      products: "Zebra Helmet 2x, Snok Top Box 1x",
      price: 6100,
      address: "2231 St. Barangay 200 Cavite City Cavite",
      contact: "09123456789",
      status: "PENDING",
      date: "April 16, 2025",
    },
    {
      id: 2,
      customer: "Maria Santos",
      products: "Motorcycle Mirror Set 1x, Handlebar Grips 2x",
      price: 3200,
      address: "Block 7 Lot 12 Green Heights Subdivision, Rizal",
      contact: "09187654321",
      status: "PROCESSING",
      date: "April 17, 2025",
    },
    {
      id: 3,
      customer: "John Reyes",
      products: "Engine Oil 3x, Oil Filter 1x",
      price: 1850,
      address: "123 Main St. Makati City Manila",
      contact: "09223344556",
      status: "SHIPPED",
      date: "April 15, 2025",
    },
    {
      id: 4,
      customer: "Ana Cruz",
      products: "Motorcycle Cover 1x",
      price: 1200,
      address: "Unit 303 Sunrise Condo, Quezon City",
      contact: "09334455667",
      status: "completed",
      date: "April 14, 2025",
    },
    {
      id: 5,
      customer: "Miguel Lim",
      products: "Brake Pads 2x, Chain Lube 1x",
      price: 2400,
      address: "45 Sunshine Road, Pasig City",
      contact: "09556677889",
      status: "PENDING",
      date: "April 18, 2025",
    },
  ];

  const filterStatus = orderStatuses.filter((status) => {
    const filterResult =
      status.toLowerCase() === "all" ||
      status.toLowerCase().includes(selectedFilter.toLowerCase());

    const searchResult = mockOrders.filter(
      (order) =>
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery.toLowerCase())
    );

    return filterResult && searchResult.length > 0;
  });

  return (
    <div>
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
                <span>Export Orders</span>
              </button>
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex h-fit border-b border-gray-200">
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
            <div
              className="flex items-center justify-between gap-4  
            p-4 py-2 border-b border-gray-200 w-full"
            >
              <div className="flex gap-3 items-center w-full">
                <div className="relative flex-grow w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoSearchSharp className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-1/3 border border-gray-300 
                    rounded-sm text-sm outline-0"
                    placeholder="Search orders by customer, products or ID..."
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-white border border-gray-300 px-3 py-2 rounded flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                  <FiFilter />
                  <span>Filter</span>
                </button>
                <button className="bg-white border border-gray-300 px-3 py-2 rounded flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                  <TfiExport />
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table.DataTable>
                <Table.TableHead>
                  <Table.TableRow>
                    <Table.Header>Order ID</Table.Header>
                    <Table.Header>Customer</Table.Header>
                    <Table.Header>Products</Table.Header>
                    <Table.Header>Total</Table.Header>
                    <Table.Header>Address</Table.Header>
                    <Table.Header>Contact</Table.Header>
                    <Table.Header>Status</Table.Header>
                    <Table.Header>Date</Table.Header>
                    <Table.Header>Actions</Table.Header>
                  </Table.TableRow>
                </Table.TableHead>
                <Table.TableBody>
                  {mockOrders
                    .filter((order) => {
                      const matchesStatus =
                        selectedFilter.toLowerCase() === "all" ||
                        order.status.toLowerCase() ===
                          selectedFilter.toLowerCase();

                      const matchesSearch =
                        order.customer
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        order.products
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        order.id.toString().includes(searchQuery.toLowerCase());

                      return matchesStatus && matchesSearch;
                    })
                    .map((order) => (
                      <Table.TableRow key={order.id}>
                        <Table.Data>
                          #{order.id.toString().padStart(5, "0")}
                        </Table.Data>
                        <Table.Data>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {order.customer}
                            </span>
                          </div>
                        </Table.Data>
                        <Table.Data>
                          <div
                            className="max-w-xs truncate"
                            title={order.products}
                          >
                            {order.products}
                          </div>
                        </Table.Data>
                        <Table.Data>{formatMoney(order.price)}</Table.Data>
                        <Table.Data>
                          <div
                            className="max-w-xs truncate"
                            title={order.address}
                          >
                            {order.address}
                          </div>
                        </Table.Data>
                        <Table.Data>{order.contact}</Table.Data>
                        <Table.Data>
                          <Status status={order.status} />
                        </Table.Data>
                        <Table.Data>{order.date}</Table.Data>
                        <Table.Data>
                          <KebabMenu
                            items={[
                              {
                                label: "View Order Details",
                                onClick: () =>
                                  console.log(`View order ${order.id}`),
                              },
                              {
                                label: "Update Status",
                                onClick: () =>
                                  console.log(`Update status ${order.id}`),
                              },
                              {
                                label: "Print Invoice",
                                onClick: () =>
                                  console.log(`Print invoice ${order.id}`),
                              },
                              {
                                label: "Archive Order",
                                onClick: () =>
                                  console.log(`Archive order ${order.id}`),
                              },
                            ]}
                          />
                        </Table.Data>
                      </Table.TableRow>
                    ))}
                </Table.TableBody>
              </Table.DataTable>
            </div>

            {/* Pagination */}
          </div>
        </div>
      </Layout>
    </div>
  );
}
