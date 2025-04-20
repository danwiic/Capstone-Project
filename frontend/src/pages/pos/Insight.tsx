import { GiMoneyStack } from "react-icons/gi";
import Card from "../../components/pos/cards/Card";
import {
  RevenueGrowthRateChart,
  SalesByCategoryBarChart,
  SalesLast7DaysChart,
  TransactionComparisonLineChart,
} from "../../components/pos/charts/Charts";
import Layout from "../../components/pos/nav/Layout";
import { LuPhilippinePeso } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { RiAlignItemBottomFill } from "react-icons/ri";

export default function Insight() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <span className="font-menium text-xl">Insight</span>
        <div className="flex gap-4">
          <Card
            title="Overall Sales"
            subtitle=""
            icon={<LuPhilippinePeso />}
            numberValue={103000}
            moneyFormat
          />
          <Card
            title="Average Order Value"
            subtitle=""
            icon={<GiMoneyStack />}
            numberValue={10000}
            moneyFormat
          />
          <Card
            title="Overall Transactions"
            subtitle=""
            icon={<GrTransaction />}
            numberValue={10000}
            moneyFormat
          />
          <Card
            title="Total Products Sold"
            subtitle=""
            icon={<RiAlignItemBottomFill />}
            numberValue={10000}
            moneyFormat
          />
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white col-span-3 px-4 py-6 rounded shadow-1 flex flex-col gap-2">
            <div className="flex justify-between items-center px-4 pt-">
              <span className="font-medium">Sales Analytics</span>
              <div className="flex gap-3 items-center">
                <select
                  className="border rounded border-gray-300 
                text-sm p-1 text-center text-gray-600"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            <SalesLast7DaysChart data={data} />
          </div>
          <div className="col-span-3 bg-white shadow-1 px-4 py-6">
            <div className="flex justify-between items-center px-4">
              <span className="font-medium">Sales per Category</span>
              <div className="flex gap-3 items-center">
                <select
                  className="border rounded border-gray-300 
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

          <div className="col-span-3 bg-white shadow-1 rounded px-4 py-6">
            <div className="flex justify-between items-center px-4">
              <span>Transaction Comparison</span>
              <div className="flex gap-3 items-center">
                <select
                  className="border rounded border-gray-300 
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

          <div className="col-span-3 bg-white shadow-1 rounded px-4 py-6">
            <div className="flex justify-between items-center px-4">
              <span>Sales Growth</span>
              <div className="flex gap-3 items-center">
                <select
                  className="border rounded border-gray-300 
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
    </Layout>
  );
}

//Mock data for the chart
const data = [
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
