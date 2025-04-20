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
  SalesByHourChart,
} from "../../components/pos/charts/Charts";
import StockCard from "../../components/pos/cards/StockCard";
import Status from "../../components/pos/status card/Status";
import { Link } from "react-router-dom";

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
          shadow-1 px-4 py-6 rounded row-span-2"
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Table.TableRow key={i}>
                      <Table.Data>{i + 1}</Table.Data>
                      <Table.Data>Gille Helmete Green</Table.Data>
                      <Table.Data>{formatNumber(2)}</Table.Data>
                      <Table.Data>{formatMoney(2457)}</Table.Data>
                      <Table.Data>
                        <Status status="pending" />
                      </Table.Data>
                    </Table.TableRow>
                  ))}
                </Table.TableBody>
              </Table.DataTable>
            </div>
          </div>

          <div
            className=" bg-white col-span-2 
          shadow-1 p-4 rounded flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Top 5 Selling Products</span>
              <div className="flex gap-2 items-center">
                <span className="text-gray-500 text-sm">Filter by</span>
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
            <div>
              <CategoryDonutChart data={categoryProductCounts} />
            </div>
          </div>

          <div
            className="col-span-2 bg-white shadow-1 p-4 rounded 
          flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Sales Comparison</span>
              <div className="flex gap-3 items-center">
                <span className="text-gray-500 text-sm">Filter by</span>
                <select
                  className="border rounded border-gray-300 
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
