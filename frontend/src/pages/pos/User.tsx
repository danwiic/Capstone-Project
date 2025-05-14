import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import { FiEdit, FiFilter, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { BsThreeDotsVertical, BsArchive, BsTrash, BsEye } from "react-icons/bs";
import { MdOutlineVerified, MdOutlineBlock } from "react-icons/md";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import KebabMenu from "../../components/pos/menu/Kebab";
import { formatMoney } from "../../utils/formatMoney";
import { User2Icon } from "lucide-react";

export default function User() {
  const [activeTab, setActiveTab] = useState("all");
  const [showUserModal, setShowUserModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Dan Pirante",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      address: "2231 St. Barangay 200 Cavite City Cavite",
      email: "dan@example.com",
      contact: "09123456789",
      status: "active",
      createdOn: "April 16, 2025",
      lastLogin: "May 10, 2025",
      orderCount: 1,
      totalSpent: "1346.87",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      address: "543 Maple Avenue, Metro Manila",
      email: "sarah.j@example.com",
      contact: "09187654321",
      status: "inactive",
      createdOn: "March 22, 2025",
      lastLogin: "April 28, 2025",
      orderCount: 2,
      totalSpent: "456.30",
    },
    {
      id: 3,
      name: "Miguel Santos",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      address: "78 Rizal Street, Quezon City",
      email: "miguel.s@example.com",
      contact: "09234567890",
      status: "inactive",
      createdOn: "May 5, 2025",
      lastLogin: "-",
      orderCount: 0,
      totalSpent: "0.00",
    },
    {
      id: 4,
      name: "Emily Cruz",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      address: "192 Mabini Road, Makati City",
      email: "emily.c@example.com",
      contact: "09345678901",
      status: "active",
      createdOn: "January 12, 2025",
      lastLogin: "May 11, 2025",
      orderCount: 2,
      totalSpent: "4287.65",
    },
    {
      id: 5,
      name: "John Lee",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      address: "88 Ortigas Avenue, Pasig City",
      email: "john.l@example.com",
      contact: "09456789012",
      status: "blocked",
      createdOn: "February 8, 2025",
      lastLogin: "March 15, 2025",
      orderCount: 2,
      totalSpent: "2123.45",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FiCheckCircle />;
      case "inactive":
        return <FiXCircle />;
      case "pending":
        return <MdOutlineVerified />;
      case "blocked":
        return <MdOutlineBlock />;
      default:
        return null;
    }
  };

  // Function to open user details modal
  const handleViewUser = (user: any) => {
    setUserDetails(user);
    setShowUserModal(true);
  };

  // Filter users based on active tab
  const filteredUsers =
    activeTab === "all"
      ? users
      : users.filter((user) => user.status === activeTab);

  const filters = ["All", "Active", "Inactive", "Blocked"];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-xl">User Management</h1>
            <p className="text-gray-500 text-sm">
              Manage your store customers and staff
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-50"
              onClick={() => { }}
            >
              <BsArchive />
              <span>Archived Users</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded  border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Total Users</div>
            <div className="text-2xl font-semibold">854</div>
            <div className="text-xs text-green-600 mt-2">
              ↑ 12% from last month
            </div>
          </div>
          <div className="bg-white p-4 rounded  border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Active Users</div>
            <div className="text-2xl font-semibold">732</div>
            <div className="text-xs text-green-600 mt-2">
              ↑ 8% from last month
            </div>
          </div>
          <div className="bg-white p-4 rounded  border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">New This Month</div>
            <div className="text-2xl font-semibold">43</div>
            <div className="text-xs text-red-600 mt-2">
              ↓ 5% from last month
            </div>
          </div>
          <div className="bg-white p-4 rounded  border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Repeat Customers</div>
            <div className="text-2xl font-semibold">6</div>
            <div className="text-xs text-green-600 mt-2">
              ↑ 2% from last month
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200  rounded">
          {/* 2abs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 px-6">
              {filters.map((filter) => (
                <button
                  className={`py-4 px-1 text-sm font-medium ${activeTab === filter.toLowerCase()
                    ? "text-mayormoto-blue border-b-2 border-mayormoto-blue"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setActiveTab(filter.toLowerCase())}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Action Bar */}
          <div className="px-6 py-4 flex justify-between items-center gap-4 border-b border-gray-200">
            <div className="bg-white border border-gray-300 rounded flex items-center flex-grow max-w-md">
              <input
                className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                placeholder="Search by name, email, or phone number..."
                type="text"
              />
              <button className="px-4 py-2 text-gray-500">
                <IoSearchSharp />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                className="bg-white border border-gray-300 px-3 py-2 rounded flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter />
                <span>Filter</span>
              </button>
              <button className="bg-white border border-gray-300 px-3 py-2 rounded flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                <TfiExport />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filter Options (Conditional) */}
          {showFilters && (
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 grid grid-cols-4 gap-4">

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Registration Date
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Purchase Amount
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="">Any Amount</option>
                  <option value="0">$0 (No purchases)</option>
                  <option value="1-100">$1 - $100</option>
                  <option value="101-500">$101 - $500</option>
                  <option value="501+">$501+</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="bg-mayormoto-blue text-white px-4 py-2 rounded text-sm hover:bg-mayormoto-blue-hover">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* User Table */}

          {/* Empty state (shown when no users match filter) */}
          {filteredUsers.length < 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-24 w-24 text-gray-300 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No users found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-mayormoto-blue text-white rounded hover:bg-mayormoto-blue-hover"
                onClick={() => setActiveTab("all")}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table.DataTable>
                <Table.TableHead>
                  <Table.TableRow>
                    <Table.Header>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </Table.Header>
                    <Table.Header position="left">User</Table.Header>
                    <Table.Header position="left">Contact Info</Table.Header>
                    <Table.Header position="left">Status</Table.Header>
                    <Table.Header position="left">Orders</Table.Header>
                    <Table.Header position="left">Joined</Table.Header>
                    <Table.Header position="center">Actions</Table.Header>
                  </Table.TableRow>
                </Table.TableHead>
                <Table.TableBody>
                  {filteredUsers.map((user) => (
                    <Table.TableRow key={user.id}>
                      <Table.Data>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </Table.Data>
                      <Table.Data>
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-full
                         bg-gray-200 overflow-hidden flex items-center justify-center"
                          >
                            {/* <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          /> */}

                            <User2Icon size={30} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {user.address}
                            </div>
                          </div>
                        </div>
                      </Table.Data>
                      <Table.Data>
                        <div>
                          <div className="text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">
                            {user.contact}
                          </div>
                        </div>
                      </Table.Data>
                      <Table.Data>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {getStatusIcon(user.status)}
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </Table.Data>

                      <Table.Data>
                        <div>
                          <div className="font-medium">
                            {user.orderCount} orders
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatMoney(user.totalSpent)}
                          </div>
                        </div>
                      </Table.Data>
                      <Table.Data>
                        <div>
                          <div>{user.createdOn}</div>
                          <div className="text-xs text-gray-500">
                            Last active: {user.lastLogin}
                          </div>
                        </div>
                      </Table.Data>
                      <Table.Data>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-gray-500 hover:text-mayormoto-blue p-1"
                            title="View Details"
                          >
                            <BsEye />
                          </button>
                          <button
                            className="text-gray-500 hover:text-mayormoto-blue p-1"
                            title="Edit User"
                          >
                            <FiEdit />
                          </button>
                          <KebabMenu
                            items={[
                              {
                                label:
                                  user.status === "blocked"
                                    ? "Unblock User"
                                    : "Block User",
                                onClick: () => console.log("Block/Unblock"),
                              },
                              {
                                label: "Archive Account",
                                onClick: () => console.log("Archive"),
                              },
                              {
                                label: "Delete Account",
                                onClick: () => console.log("Delete"),
                                className: "text-red-600",
                              },
                            ]}
                          />
                        </div>
                      </Table.Data>
                    </Table.TableRow>
                  ))}
                </Table.TableBody>
              </Table.DataTable>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/45  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {userDetails
                  ? `User Details: ${userDetails.name}`
                  : "Add New User"}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4">
              {userDetails ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - User Info */}
                  <div className="md:col-span-1 flex flex-col items-center">
                    <div className="h-32 w-32 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden mb-4">
                      <User2Icon size={100} />
                    </div>
                    <h4 className="text-lg font-medium">{userDetails.name}</h4>
                    <p className="text-gray-500 mb-4">{userDetails.role}</p>

                    <div
                      className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                        userDetails.status
                      )} mb-6`}
                    >
                      {userDetails.status.charAt(0).toUpperCase() +
                        userDetails.status.slice(1)}
                    </div>

                    <div className="w-full">
                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Contact Information
                        </h5>
                        <div className="text-sm mb-1">
                          <span className="text-gray-500">Email:</span>{" "}
                          {userDetails.email}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Phone:</span>{" "}
                          {userDetails.contact}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Address
                        </h5>
                        <p className="text-sm text-gray-700">
                          {userDetails.address}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Account Details
                        </h5>
                        <div className="text-sm mb-1">
                          <span className="text-gray-500">Joined:</span>{" "}
                          {userDetails.createdOn}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Last Active:</span>{" "}
                          {userDetails.lastLogin}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Tabs */}
                  <div className="md:col-span-2">
                    <div className="flex flex-col gap-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded">
                          <div className="text-sm text-blue-700 mb-1">
                            Total Orders
                          </div>
                          <div className="text-2xl font-semibold">
                            {userDetails.orderCount}
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded">
                          <div className="text-sm text-green-700 mb-1">
                            Total Spent
                          </div>
                          <div className="text-2xl font-semibold">
                            {formatMoney(userDetails.totalSpent)}
                          </div>
                        </div>
                      </div>

                      {/* Recent Orders */}
                      <div className="mb-6">
                        <h5 className="font-medium mb-3">Recent Orders</h5>

                        {userDetails.orderCount > 0 ? (
                          <div className="border border-gray-200 rounded overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Order ID
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Date
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Total
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-4 py-2 text-sm">
                                      #ORD-0001
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      May 8, 2025
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {formatMoney(1346.87)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                        Delivered
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 text-right">
                              <button className="text-sm text-mayormoto-blue hover:underline">
                                View all orders
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-6 rounded text-center">
                            <div className="text-gray-500 mb-2">
                              No orders yet
                            </div>
                            <p className="text-sm text-gray-500">
                              This customer hasn't placed any orders yet.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* User Activity */}
                      <div className="mb-6">
                        <h5 className="font-medium mb-3">Recent Activity</h5>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">
                                Added product to cart:{" "}
                                <span className="font-medium">
                                  RYO RPK-02 Elbow Guard
                                </span>
                              </p>
                              <p className="text-xs text-gray-500">
                                May 10, 2025 at 2:45 PM
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">
                                Completed purchase:{" "}
                                <span className="font-medium">
                                  Order  #ORD-0001
                                </span>
                              </p>
                              <p className="text-xs text-gray-500">
                                May 8, 2025 at 10:22 AM
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 flex-shrink-0">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">
                                Viewed product:{" "}
                                <span className="font-medium">
                                  RYO RPK-01 Knee Guard
                                </span>
                              </p>
                              <p className="text-xs text-gray-500">
                                May 5, 2025 at 6:15 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Add New User Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-medium mb-4">
                        User Information
                      </h4>
                    </div>

                    {/* User Photo */}
                    <div className="md:col-span-2 flex items-center gap-6">
                      <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                        <svg
                          className="h-12 w-12"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50">
                          Upload Photo
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, GIF or PNG. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-medium mb-4 mt-4">
                        Address Information
                      </h4>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter state/province"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent">
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="PH">Philippines</option>
                        <option value="SG">Singapore</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    {/* Account Settings */}
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-medium mb-4 mt-4">
                        Account Settings
                      </h4>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Role
                      </label>
                      <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent">
                        <option value="customer">Customer</option>
                        <option value="vip">VIP Customer</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending Verification</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="flex gap-4">
                        <div className="flex-grow">
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                            placeholder="Enter password"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Leave blank to send user a password reset email.
                          </p>
                        </div>
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 rounded text-sm hover:bg-gray-50">
                          Generate
                        </button>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-medium mb-4 mt-4">
                        Notification Settings
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-notifications"
                              type="checkbox"
                              className="h-4 w-4 text-mayormoto-blue focus:ring-mayormoto-blue border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="email-notifications"
                              className="font-medium text-gray-700"
                            >
                              Email notifications
                            </label>
                            <p className="text-gray-500">
                              Receive order updates and promotional offers via
                              email
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="sms-notifications"
                              type="checkbox"
                              className="h-4 w-4 text-mayormoto-blue focus:ring-mayormoto-blue border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="sms-notifications"
                              className="font-medium text-gray-700"
                            >
                              SMS notifications
                            </label>
                            <p className="text-gray-500">
                              Receive order updates and promotional offers via
                              SMS
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="marketing"
                              type="checkbox"
                              className="h-4 w-4 text-mayormoto-blue focus:ring-mayormoto-blue border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="marketing"
                              className="font-medium text-gray-700"
                            >
                              Marketing communications
                            </label>
                            <p className="text-gray-500">
                              Receive updates about new products and special
                              offers
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Internal Notes
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue focus:border-transparent"
                        rows={4}
                        placeholder="Add any internal notes about this user (not visible to the user)"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowUserModal(false)}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              {userDetails ? (
                <div className="flex gap-3">
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50">
                    {userDetails.status === "blocked"
                      ? "Unblock User"
                      : "Block User"}
                  </button>
                  <button className="bg-mayormoto-blue text-white px-4 py-2 rounded text-sm hover:bg-mayormoto-blue-hover">
                    Save Changes
                  </button>
                </div>
              ) : (
                <button className="bg-mayormoto-blue text-white px-4 py-2 rounded text-sm hover:bg-mayormoto-blue-hover">
                  Create User
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
