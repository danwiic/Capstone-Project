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
export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <span className="text-xl font-medium">Overview</span>
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
            title="Total Order"
            icon={<PiPackageThin />}
            numberValue={224}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div
            className="col-span-3 flex flex-col gap-2 bg-white
          shadow-1 p-4 rounded"
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
                  {Array.from({ length: 5 }).map((_, i) => (
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
          <div className="col-span-2 bg-white shadow-1 p-4 rounded">
            <span>s</span>
          </div>
        </div>
        <section>lorem*20</section>
      </div>
    </Layout>
  );
}
