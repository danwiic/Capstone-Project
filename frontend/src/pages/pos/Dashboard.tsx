import Card from "../../components/pos/cards/Card";
import Layout from "../../components/pos/nav/Layout";
import { GiMoneyStack } from "react-icons/gi";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiPackageThin } from "react-icons/pi";
import DataTable from "../../components/pos/table/DataTable";
import TableHead from "../../components/pos/table/TableHead";
import Header from "../../components/pos/table/Header";
import TableBody from "../../components/pos/table/TableBody";
import TableRow from "../../components/pos/table/TableRow";
import Data from "../../components/pos/table/Data";
import formatNumber from "../../utils/formatNumber";
import { formatMoney } from "../../utils/formatMoney";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  CategoryDonutChart,
  SalesComparisonLineChart,
} from "../../components/pos/charts/Charts";
import StockCard from "../../components/pos/cards/StockCard";

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <Card
              title="Total Revenue"
              icon={<GiMoneyStack />}
              numberValue={10000}
              moneyFormat
            />
            <Card
              title="Total User"
              icon={<PiUsersThreeLight />}
              numberValue={1033}
            />
            <Card
              title="Total Order"
              icon={<PiPackageThin />}
              numberValue={224}
            />
            <Card
              title="Orders Shipped"
              icon={<CiDeliveryTruck />}
              numberValue={32}
            />

            <StockCard />
          </div>
        </div>

        <div className="grid grid-cols-5 grid-rows-2 gap-4">
          <div
            className="col-span-3 flex flex-col gap-2 bg-white
          shadow-1 p-4 rounded row-span-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Recent Orders</span>
              <span
                className="text-sm text-gray-500 
              hover:text-mayormoto-blue cursor-pointer"
              >
                View more
              </span>
            </div>
            <div className="">
              <DataTable>
                <TableHead>
                  <Header>#</Header>
                  <Header>Name</Header>
                  <Header>Order</Header>
                  <Header>Quantity</Header>
                  <Header>Total</Header>
                  <Header>Status</Header>
                </TableHead>
                <TableBody>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableRow key={i}>
                      <Data>{i + 1}</Data>
                      <Data>Dan Pirante</Data>
                      <Data>Gille Helmete Green</Data>
                      <Data>{formatNumber(2)}</Data>
                      <Data>{formatMoney(2457)}</Data>
                      <Data>PENDING</Data>
                    </TableRow>
                  ))}
                </TableBody>
              </DataTable>
            </div>
          </div>

          <div
            className=" bg-white col-span-2 
          shadow-1 p-4 rounded flex flex-col gap-1"
          >
            <span className="font-medium">Sales Comparison</span>
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
                  <option>This Year</option>
                </select>
              </div>
            </div>
            <div className="px-2">
              <SalesComparisonLineChart data={salesComparisonData} />
            </div>
          </div>
        </div>
        <section>lorem*20</section>
      </div>
    </Layout>
  );
}
const salesComparisonData = [
  { month: "January", pos: 15560, online: 7353 },
  { month: "February", pos: 11800, online: 12400 },
  { month: "March", pos: 13000, online: 25400 },
];

const categoryProductCounts = [
  { name: "Helmet", value: 40 },
  { name: "Riding Jacket", value: 25 },
  { name: "Top Box", value: 15 },
  { name: "Gloves", value: 20 },
  { name: "Arm Sleeve", value: 10 },
  { name: "Gears", value: 30 },
];
