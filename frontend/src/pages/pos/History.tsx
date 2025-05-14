import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import {
  Calendar,
  Filter,
  FileText,
  ArrowUpDown,
  FileSearch,
} from "lucide-react";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import KebabMenu from "../../components/pos/menu/Kebab";
import { formatMoney } from "../../utils/formatMoney";
import Status from "../../components/pos/status card/Status";

// Sample data for transactions
const transactions = [
  {
    id: "TRX-1001",
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
    products: "Motorcycle Oil 3x, Air Filter 1x",
    totalPrice: 2850,
    paymentMethod: "CREDIT CARD",
    status: "completed",
    source: "STORE",
    date: "May 10, 2025",
    processedBy: "Emma Johnson",
  },
  {
    id: "TRX-1003",
    products: "Racing Jacket 1x",
    totalPrice: 12000,
    paymentMethod: "ONLINE TRANSFER",
    status: "pending",
    source: "ONLINE SHOP",
    date: "May 10, 2025",
    processedBy: "System",
  },
  {
    id: "TRX-1004",
    products: "Brake Pads 2x, Clutch Cable 1x",
    totalPrice: 3200,
    paymentMethod: "DEBIT CARD",
    status: "completed",
    source: "STORE",
    date: "May 8, 2025",
    processedBy: "Dan Pirante",
  },
  {
    id: "TRX-1005",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Handle selecting all items
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(transactions.map((t) => t.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle selecting individual item
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

 

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.products.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.processedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedFilter === "all" || transaction.status === selectedFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full">
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
              className="flex items-center gap-2 px-4 py-2 
            bg-white border border-gray-200 rounded-lg hover:bg-gray-500"
            >
              <FileSearch size={18} />
              <span>View Reports</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-mayormoto-blue text-white rounded-lg
               hover:bg-mayormoto-blue-hover text-sm"
            >
              <FileText size={18} />
              <span>Archived Records</span>
            </button>
          </div>
        </div>

        {/* Status Tabs */}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-3 text-sm border-b border-gray-200">
            {["all", "completed", "pending", "cancelled"].map(
              (status: string) => (
                <div
                  key={status}
                  onClick={() => setSelectedFilter(status)}
                  className={`flex items-center px-6 py-4 cursor-pointer ${
                    selectedFilter === status
                      ? "border-b font-medium  border-mayormoto-blue text-mayormoto-blue"
                      : ""
                  }`}
                >
                  <span className="capitalize">{status}</span>
                </div>
              )
            )}
          </div>
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="bg-white border border-gray-300 rounded-lg flex items-center flex-1">
              <input
                className="outline-none px-4 py-2.5 text-sm text-gray-600 w-full rounded-lg"
                placeholder="Search by transaction #, product, or customer..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="px-4 py-2 text-gray-500">
                <IoSearchSharp size={20} />
              </button>
            </div>
            <div className="flex gap-2 w-full sm:w-auto text-sm">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-mayormoto-blue text-white rounded-lg
               hover:bg-mayormoto-blue-hover text-sm"
              >
                <TfiExport size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="px-4 pb-4 pt-1 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Date Range:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm">
                      <Calendar size={14} />
                      <span>May 1, 2025</span>
                    </button>
                    <span className="text-gray-400">-</span>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm">
                      <Calendar size={14} />
                      <span>May 12, 2025</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
                    <option value="">All Methods</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="transfer">Online Transfer</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Source:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
                    <option value="">All Sources</option>
                    <option value="store">Store</option>
                    <option value="online">Online Shop</option>
                  </select>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <Table.DataTable status date>
            <Table.TableHead>
              <Table.TableRow>
                <Table.Header>
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === transactions.length &&
                      transactions.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </Table.Header>
                <Table.Header position="left">
                  <div className="flex items-center gap-1">
                    Transaction #
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </Table.Header>
                <Table.Header position="left">Products</Table.Header>
                <Table.Header>Total Price</Table.Header>
                <Table.Header>Payment Method</Table.Header>
                <Table.Header>Status</Table.Header>
                <Table.Header>Source</Table.Header>
                <Table.Header>
                  <div className="flex items-center gap-1">
                    Processed on
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </Table.Header>
                <Table.Header>Processed By</Table.Header>
                <Table.Header></Table.Header>
              </Table.TableRow>
            </Table.TableHead>
            <Table.TableBody>
              {filteredTransactions.map((transaction, i) => (
                <Table.TableRow key={transaction.id}>
                  <Table.Data>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(transaction.id)}
                      onChange={() => handleSelectItem(transaction.id)}
                      className="rounded"
                    />
                  </Table.Data>
                  <Table.Data>{transaction.id}</Table.Data>
                  <Table.Data>{transaction.products}</Table.Data>
                  <Table.Data>{formatMoney(transaction.totalPrice)}</Table.Data>
                  <Table.Data>{transaction.paymentMethod}</Table.Data>
                  <Table.Data>
                    <Status status={transaction.status} />
                  </Table.Data>
                  <Table.Data>{transaction.source}</Table.Data>
                  <Table.Data>{transaction.date}</Table.Data>
                  <Table.Data>{transaction.processedBy}</Table.Data>
                  <Table.Data>
                    <KebabMenu
                      items={[
                        {
                          label: "View Details",
                          onClick: () =>
                            console.log("view details", transaction.id),
                        },
                        {
                          label: "Print Receipt",
                          onClick: () =>
                            console.log("print receipt", transaction.id),
                        },
                        {
                          label: "Void Transaction",
                          onClick: () => console.log("void", transaction.id),
                        },
                        {
                          label: "Archive",
                          onClick: () => console.log("Archive", transaction.id),
                        },
                      ]}
                    />
                  </Table.Data>
                </Table.TableRow>
              ))}
            </Table.TableBody>
          </Table.DataTable>
        </div>
      </div>
    </Layout>
  );
}
