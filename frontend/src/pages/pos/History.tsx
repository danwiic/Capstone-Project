import { FileText, SearchIcon, ChevronRight, ChevronLeft } from "lucide-react";
import Layout from "../../components/pos/nav/Layout";
import { formatMoney } from "../../utils/formatMoney";
import { SimpleSalesChart } from "../../components/pos/charts/Charts";
import KebabMenu from "../../components/pos/menu/Kebab";
import { useState } from "react";
import Status from "../../components/pos/status card/Status";

const transactions = [
  {
    id: "TRX-1001",
    name: "John Doe",
    products: "Zebra Helmet 2x, Riding Gloves 1x",
    totalPrice: 4600,
    paymentMethod: "CASH",
    status: "completed",
    source: "ONLINE SHOP",
    date: "May 12, 2025",
    processedBy: "Dan Pirante",
  },
  {
    id: "TRX-1002",
    name: "Jane Smith",
    products: "Motorcycle Oil 3x, Air Filter 1x",
    totalPrice: 2850,
    paymentMethod: "CREDIT CARD",
    status: "completed",
    source: "POS",
    date: "May 10, 2025",
    processedBy: "Emma Johnson",
  },
  {
    id: "TRX-1003",
    name: "Alice Brown",
    products: "Racing Jacket 1x",
    totalPrice: 12000,
    paymentMethod: "ONLINE TRANSFER",
    status: "placed",
    source: "ONLINE SHOP",
    date: "May 10, 2025",
    processedBy: "System",
  },
  {
    id: "TRX-1004",
    name: "Bob White",
    products: "Brake Pads 2x, Clutch Cable 1x",
    totalPrice: 3200,
    paymentMethod: "DEBIT CARD",
    status: "completed",
    source: "POS",
    date: "May 8, 2025",
    processedBy: "Dan Pirante",
  },
  {
    id: "TRX-1005",
    name: "Charlie Green",
    products: "Motocross Helmet 1x, Goggles 1x",
    totalPrice: 8500,
    paymentMethod: "CASH",
    status: "cancelled",
    source: "ONLINE SHOP",
    date: "May 7, 2025",
    processedBy: "System",
  },
];

export default function History() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const totalStatus = () => {
    const sumStatus: { [key: string]: { count: number; totalPrice: number } } =
      {};

    for (const transaction of transactions) {
      const status = transaction.status;
      if (!sumStatus[status]) {
        sumStatus[status] = { count: 0, totalPrice: 0 };
      }
      sumStatus[status].count += 1;
      sumStatus[status].totalPrice += transaction.totalPrice;
    }

    const result = Object.entries(sumStatus).map(([status, data]) => ({
      status,
      count: data.count,
      totalPrice: data.totalPrice,
    }));

    return result;
  };

  const countTotalStat = totalStatus().reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );

  const countTotalPrice = transactions.reduce(
    (acc: number, transaction: { totalPrice: number }) =>
      acc + transaction.totalPrice,
    0
  );

  const filterTransactions = transactions.filter(
    (transaction) =>
      (selectedFilter === "all" || transaction.status === selectedFilter) &&
      (searchTerm === "" ||
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.products.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Transaction History
            </h1>
            <p className="text-gray-500 text-sm">
              View and manage your transaction records
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-mayormoto-blue text-white rounded-lg
               hover:bg-mayormoto-blue-hover text-sm"
            >
              <FileText size={18} />
              <span>Archived Records</span>
            </button>
          </div>
        </div>
        {/* Transaction List */}
        <div className="flex flex-col gap-4">
          {/* Search box */}

          <div
            className="grid grid-cols-5 gap-4 bg-white p-6 py-8 rounded border
           border-gray-300 text-gray-600"
          >
            <div className="col-span-3 border-r border-gray-200 pr-4 flex flex-col gap-2">
              <SimpleSalesChart />
            </div>
            <div className="col-span-2 flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Amount Breakdown</h2>
                <p className="text-xs text-gray-500">Last 90 days</p>
              </div>
              <div className="flex gap-6 ">
                <div className="flex flex-col gap-2 px-4 border-r border-gray-200">
                  <span className="font-semibold">All </span>
                  <span className="font-semibold text-2xl">
                    {countTotalStat}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatMoney(countTotalPrice)}
                  </span>
                </div>
                {totalStatus().map(
                  (
                    item: {
                      status: string;
                      count: number;
                      totalPrice: number;
                    },
                    i: number
                  ) => (
                    <div className="flex flex-col gap-2 px-2" key={i}>
                      <span className="font-semibold">
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                      <span className="font-semibold text-2xl">
                        {item.count}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatMoney(item.totalPrice)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white flex flex-col border border-gray-300 rounded">
            <div
              className="flex items-center justify-between border-b 
            border-gray-200 pr-4"
            >
              <div className="px-4 border-gray-200 font-medium">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3 py-3.5 text-sm ${
                    selectedFilter === "all" &&
                    "border-b-2 border-mayormoto-blue text-mayormoto-blue"
                  } transition-all ease-in duration-100`}
                >
                  All Transaction
                </button>
                {totalStatus().map((stat) => (
                  <button
                    className={`px-3 py-3.5 text-sm ${
                      selectedFilter === stat.status &&
                      "border-b-2 border-mayormoto-blue text-mayormoto-blue"
                    } transition-all ease-in duration-100`}
                    onClick={() => setSelectedFilter(stat.status)}
                  >
                    {stat.status.charAt(0).toLocaleUpperCase() +
                      stat.status.slice(1)}
                  </button>
                ))}
              </div>
              <div
                className="bg-white border border-gray-300 rounded px-3 py-1.5 w-fit 
          flex items-center "
              >
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  type="text"
                  className="outline-0 text-sm"
                  placeholder="Search..."
                />
                <button className="px-1 flex items-center justify-center text-gray-500">
                  <SearchIcon size={20} />
                </button>
              </div>
            </div>

            {filterTransactions.length > 0 ? (
              <table>
                <thead>
                  <tr className="text-sm border-b border-gray-200 text-left">
                    <th className="px-7 py-3 text-gray-500">Customer</th>
                    <th className="px-7 py-3 text-gray-500">Payment Method</th>
                    <th className="px-7 py-3 text-gray-500">Amount</th>
                    <th className="px-7 py-3 text-gray-500">Source</th>
                    <th className="px-7 py-3 text-gray-500">Date</th>
                    <th className="px-7 py-3 text-gray-500">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filterTransactions.map((transaction, i) => (
                    <tr
                      key={i}
                      className="text-left text-sm border-b 
                    border-gray-200"
                    >
                      <td className="px-7 py-3 text-gray-500 font-medium">
                        {transaction.name}
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        {transaction.paymentMethod}
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        {formatMoney(transaction.totalPrice)}
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        {transaction.source}
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        <Status
                          status={
                            transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)
                          }
                        />
                      </td>
                      <td>
                        <KebabMenu />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 flex items-center justify-center">
                <p className="text-sm text-gray-500">
                  No matching transactions found.
                </p>
              </div>
            )}
            {filterTransactions.length > 0 && (
              <div className="px-3 py-2 flex items-center justify-between ">
                <div>
                  <span className="text-gray-500 text-sm px-4 py-2">
                    Showing {transactions.length} of {transactions.length}{" "}
                    transactions
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <button>
                    <ChevronLeft size={18} className="text-gray-500" />
                  </button>
                  <span className="px-3 text-gray-500">1</span>
                  <button>
                    <ChevronRight size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
