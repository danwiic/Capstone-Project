import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
} from "lucide-react";
import { formatMoney } from "../../utils/formatMoney";
import {
  RevenueGrowthRateChart,
  SalesByCategoryBarChart,
  SalesLast7DaysChart,
  TransactionComparisonLineChart,
} from "../../components/pos/charts/Charts";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000, revenue: 2400, target: 3000 },
  { name: "Feb", sales: 3000, revenue: 1398, target: 3000 },
  { name: "Mar", sales: 2000, revenue: 9800, target: 3000 },
  { name: "Apr", sales: 2780, revenue: 3908, target: 3000 },
  { name: "May", sales: 1890, revenue: 4800, target: 3000 },
  { name: "Jun", sales: 2390, revenue: 3800, target: 3000 },
  { name: "Jul", sales: 3490, revenue: 4300, target: 3000 },
];

// Sample product data
const topProducts = [
  { id: 1, name: "Helmet", sales: 145, revenue: 72500, growth: 12.3 },
  { id: 2, name: "Top Box", sales: 237, revenue: 21330, growth: 8.7 },
  { id: 3, name: "Safety Gear", sales: 58, revenue: 69600, growth: 5.2 },
  {
    id: 4,
    name: "Accessories & Electronics",
    sales: 129,
    revenue: 32250,
    growth: -2.4,
  },
  { id: 5, name: "Lubricant & Oils", sales: 89, revenue: 8010, growth: 15.8 },
];

// Sample recent transactions
const recentTransactions = [
  {
    id: "TRX-01234",
    customer: "John Smith",
    date: "10 May 2025",
    amount: 329.99,
    status: "Completed",
  },
  {
    id: "TRX-01233",
    customer: "Emma Wilson",
    date: "10 May 2025",
    amount: 124.5,
    status: "Completed",
  },
  {
    id: "TRX-01232",
    customer: "Michael Brown",
    date: "09 May 2025",
    amount: 899.95,
    status: "Processing",
  },
  {
    id: "TRX-01231",
    customer: "Sarah Davis",
    date: "09 May 2025",
    amount: 67.25,
    status: "Completed",
  },
  {
    id: "TRX-01230",
    customer: "Robert Johnson",
    date: "08 May 2025",
    amount: 449.99,
    status: "Failed",
  },
];

export default function Sales() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <Layout>
      <div className=" w-full flex flex-col gap-4">
        {/* Header */}
        <div className="text-sm flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Sales Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Monitor your sales performance and trends
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-mayormoto-blue 
              rounded hover:bg-mayormoto-blue-hover text-white"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Time Range Tabs */}
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-gray-500">Time Range:</p>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {["24h", "7d", "30d", "90d", "YTD", "All"].map((range) => (
              <button
                key={range}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === range
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-white w-full rounded-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formatMoney(128742.5)}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-green-500 text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-1" /> 12.5%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    vs. last period
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <DollarSign size={24} className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white w-full rounded-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold text-gray-800">1,483</h3>
                <div className="flex items-center mt-2">
                  <span className="text-green-500 text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-1" /> 8.2%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    vs. last period
                  </span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <ShoppingCart size={24} className="text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white w-full rounded-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Avg. Order Value
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formatMoney(86.82)}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-red-500 text-sm font-medium flex items-center">
                    <TrendingUp
                      size={14}
                      className="mr-1 transform rotate-180"
                    />{" "}
                    3.1%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    vs. last period
                  </span>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-full">
                <ShoppingCart size={24} className="text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white w-full rounded-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Customers
                </p>
                <h3 className="text-2xl font-bold text-gray-800">941</h3>
                <div className="flex items-center mt-2">
                  <span className="text-green-500 text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-1" /> 5.3%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    vs. last period
                  </span>
                </div>
              </div>
              <div className="bg-amber-50 p-3 rounded-full">
                <Users size={24} className="text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-800">
                Revenue Overview
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-500">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-xs text-gray-500">Sales</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-xs text-gray-500">Target</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#d1d5db"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-800">
                Sales by Category
              </h3>
              <button className="text-sm text-blue-500 hover:text-blue-600">
                See details
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Helmet", value: 42 },
                    { name: "Top Box", value: 28 },
                    { name: "Safety Gear", value: 15 },
                    { name: "Accessories", value: 8 },
                    { name: "Lubricant & Oils", value: 7 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={14} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products */}

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="bg-white col-span-3 px-4 py-6 rounded border border-gray-200 flex flex-col gap-2">
              <div className="flex justify-between items-center px-4 pt-">
                <span className="font-medium">Sales Analytics</span>
                <div className="flex gap-3 items-center">
                  <select
                    className="border rounded border-gray-200 
                text-sm p-1 text-center text-gray-600"
                  >
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>
              <SalesLast7DaysChart data={datad} />
            </div>
            <div className="col-span-3 bg-white border border-gray-200 px-4 py-6">
              <div className="flex justify-between items-center px-4">
                <span className="font-medium">Sales per Category</span>
                <div className="flex gap-3 items-center">
                  <select
                    className="border rounded border-gray-200 
                text-sm p-1 text-center text-gray-600"
                  >
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>
              <SalesByCategoryBarChart data={categorySalesData} />
            </div>

            <div className="col-span-3 bg-white border border-gray-200 rounded px-4 py-6">
              <div className="flex justify-between items-center px-4">
                <span>Transaction Comparison</span>
                <div className="flex gap-3 items-center">
                  <select
                    className="border rounded border-gray-200 
                text-sm p-1 text-center text-gray-600"
                  >
                    <option>Today</option>
                    <option selected>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>
              <TransactionComparisonLineChart data={transacData} />
            </div>

            <div className="col-span-3 bg-white border border-gray-200 rounded px-4 py-6">
              <div className="flex justify-between items-center px-4">
                <span>Sales Growth</span>
                <div className="flex gap-3 items-center">
                  <select
                    className="border rounded border-gray-200 
                text-sm p-1 text-center text-gray-600"
                    defaultValue={"This Year"}
                  >
                    <option>This Week</option>
                    <option>Today</option>
                    <option>This Month</option>
                    <option selected>This Year</option>
                  </select>
                </div>
              </div>
              <RevenueGrowthRateChart data={revenueGrowthData} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-200 ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-800">
              Top Selling Products
            </h3>
            <button className="text-sm text-blue-500 hover:text-blue-600">
              View all products
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="pb-3 text-sm font-medium text-gray-500 text-left">
                    Product
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500 text-right">
                    Units Sold
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500 text-right">
                    Revenue
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500 text-right">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 border-gray-300"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                          {product.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-700 text-right">
                      {product.sales.toLocaleString()}
                    </td>
                    <td className="py-4 text-sm text-gray-700 text-right">
                      {formatMoney(product.revenue)}
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`text-sm font-medium ${
                          product.growth >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {product.growth >= 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const categoryProductCounts = [
  { name: "SMOK Top Box", value: 40 },
  { name: "FLAMINGO Tire Sealant", value: 25 },
  { name: "Gille Astral Honda Gray", value: 15 },
  { name: "Zebra 879", value: 20 },
  { name: "Zebra Ritzi White", value: 10 },
];

const data = [
  { time: "12 AM", pos: 1200, online: 800 },
  { time: "4 AM", pos: 1200, online: 2100 },
  { time: "8 AM", pos: 1400, online: 0 },
  { time: "12 PM", pos: 2200, online: 1800 },
  { time: "4 PM", pos: 2800, online: 2300 },
  { time: "8 PM", pos: 3100, online: 2700 },
  { time: "12 AM", pos: 1500, online: 3600 },
];

const datad = [
  { time: "12 AM", sales: 1200 },
  { time: "4 AM", sales: 600 },
  { time: "8 AM", sales: 1400 },
  { time: "12 PM", sales: 2200 },
  { time: "4 PM", sales: 2800 },
  { time: "8 PM", sales: 3100 },
  { time: "12 AM", sales: 1500 },
];

const categorySalesData = [
  { category: "Helmets", sales: 5200 },
  { category: "Top Box", sales: 7500 },
  { category: "Safety Gear", sales: 3100 },
  { category: "Accessories & Electronics", sales: 2800 },
  { category: "Lubricants & Oils", sales: 2800 },
  { category: "Sprays & Cleaners", sales: 2800 },
  { category: "Motorcycle Safety", sales: 2800 },
  { category: "External Accessories", sales: 2800 },
  { category: "Lubricants", sales: 2800 },
];

const transacData = [
  { date: "Apr 11", pos: 34, online: 21 },
  { date: "Apr 12", pos: 45, online: 28 },
  { date: "Apr 13", pos: 31, online: 34 },
  { date: "Apr 14", pos: 50, online: 40 },
  { date: "Apr 15", pos: 38, online: 33 },
  { date: "Apr 16", pos: 44, online: 37 },
  { date: "Apr 17", pos: 60, online: 48 },
];

export const revenueGrowthData = [
  { month: "Jan", growthRate: 4.2 },
  { month: "Feb", growthRate: 5.5 },
  { month: "Mar", growthRate: -1.3 },
  { month: "Apr", growthRate: 3.8 },
  { month: "May", growthRate: 6.1 },
  { month: "Jun", growthRate: 2.4 },
  { month: "Jul", growthRate: -0.9 },
  { month: "Aug", growthRate: 4.9 },
  { month: "Sep", growthRate: 3.1 },
  { month: "Oct", growthRate: 7.2 },
  { month: "Nov", growthRate: 5.0 },
  { month: "Dec", growthRate: 6.8 },
];
