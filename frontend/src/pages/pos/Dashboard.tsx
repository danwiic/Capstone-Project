import Card from "../../components/pos/cards/Card";
import Layout from "../../components/pos/nav/Layout";
import { GiMoneyStack } from "react-icons/gi";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiPackageThin } from "react-icons/pi";
import Table from "../../components/pos/table/index";
import formatNumber from "../../utils/formatNumber";
import { formatMoney } from "../../utils/formatMoney";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  CategoryDonutChart,
  RevenueGrowthRateChart,
  SalesByCategoryBarChart,
  SalesByHourChart,
  SalesLast7DaysChart,
  TransactionComparisonLineChart,
} from "../../components/pos/charts/Charts";
import StockCard from "../../components/pos/cards/StockCard";
import Status from "../../components/pos/status card/Status";
import { Link } from "react-router-dom";

const tableData = [
  {
    name: "Gille Helmet Green",
    quantity: 2,
    price: 2457,
    status: "pending",
  },
  {
    name: "SMOK Tomahawk Side Mirror",
    quantity: 1,
    price: 1000,
    status: "pending",
  },
  {
    name: "BOSCH Horn Set",
    quantity: 3,
    price: 8400,
    status: "pending",
  },
  {
    name: "Yamaha Disc Lock",
    quantity: 1,
    price: 750,
    status: "pending",
  },
  {
    name: "Motowolf Gloves Black",
    quantity: 2,
    price: 1900,
    status: "pending",
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <Card
              title="Today's Sale"
              subtitle="vs Yesterday"
              icon={<GiMoneyStack />}
              numberValue={10300}
              moneyFormat
            />
            <Card
              title="New User"
              subtitle="vs Yesterday"
              icon={<PiUsersThreeLight />}
              numberValue={36}
            />
            <Card
              title="New Order"
              subtitle="vs Yesterday"
              icon={<PiPackageThin />}
              numberValue={16}
            />
            <Card
              title="Orders Shipped"
              subtitle="vs Yesterday"
              icon={<CiDeliveryTruck />}
              numberValue={12}
            />

            <StockCard />
          </div>
        </div>

        <div className="grid grid-cols-5 grid-rows-2 gap-4">
          <div
            className="col-span-3 flex flex-col gap-2 bg-white
          border border-gray-200 px-4 py-6 rounded row-span-2"
          >
            <div className="flex justify-between items-center px-4">
              <span className="font-bold text-gray-600 text-sm">
                Recent Orders
              </span>
              <span
                className="text-sm text-gray-500 
              hover:text-mayormoto-blue cursor-pointer"
              >
                <Link to="/pos/orders"> View more</Link>
              </span>
            </div>

            <div className="">
              <Table.DataTable>
                <Table.TableHead>
                  <Table.TableRow>
                    <Table.Header>#</Table.Header>
                    <Table.Header>Item Name</Table.Header>
                    <Table.Header>Quantity</Table.Header>
                    <Table.Header>Total</Table.Header>
                    <Table.Header>Status</Table.Header>
                  </Table.TableRow>
                </Table.TableHead>
                <Table.TableBody>
                  {tableData.map((item, i) => (
                    <Table.TableRow key={i}>
                      <Table.Data>{i + 1}</Table.Data>
                      <Table.Data>{item.name}</Table.Data>
                      <Table.Data>{formatNumber(item.quantity)}</Table.Data>
                      <Table.Data>{formatMoney(item.price)}</Table.Data>
                      <Table.Data>
                        <Status status={item.status} />
                      </Table.Data>
                    </Table.TableRow>
                  ))}
                </Table.TableBody>
              </Table.DataTable>
            </div>
          </div>

          <div
            className=" bg-white col-span-2 
          border border-gray-200 p-4 rounded flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Top 5 Selling Products</span>
              <div className="flex gap-2 items-center">
                <span className="text-gray-500 text-sm">Filter by</span>
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
            <div>
              <CategoryDonutChart data={categoryProductCounts} />
            </div>
          </div>

          <div
            className="col-span-2 bg-white border border-gray-200 p-4 rounded 
          flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Sales Comparison</span>
              <div className="flex gap-3 items-center">
                <span className="text-gray-500 text-sm">Filter by</span>
                <select
                  className="border rounded border-gray-200 
                text-sm p-1 text-center text-gray-600"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This YEar</option>
                </select>
              </div>
            </div>
            <div className="px-2">
              <SalesByHourChart data={data} />
            </div>
          </div>
        </div>
        {/* FOR ADDING NEW SECTION */}
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
      </div>
    </Layout>
  );
}

// Mock data for the charts and tables
// const salesComparisonData = [
//   { month: "January", pos: 15560, online: 7353 },
//   { month: "February", pos: 11800, online: 12400 },
//   { month: "March", pos: 13000, online: 25400 },
// ];

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
