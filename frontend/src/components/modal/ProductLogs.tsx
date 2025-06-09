import {
  ArrowLeft,
  Box,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  SearchIcon,
  X,
} from "lucide-react";
import { useState } from "react";

const actions = [
  "All Actions",
  "Stock In",
  "Created",
  "Updated",
  "Deleted",
  "Archived",
  "Stock Out",
];

const dateRange = [
  "All Time",
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
];

const productLogs = [
  {
    date: "2025-06-09 10:15 AM",
    action: "Stock In",
    product: "Yamaha Brake Pads",
    sku: "YBP-1001",
    updatedBy: "John Doe",
    details: "Increased stock from 20 to 50 units",
  },
  {
    date: "2025-06-08 02:34 PM",
    action: "Updated",
    product: "KTM Engine Oil",
    sku: "KTM-OIL-450",
    updatedBy: "Jane Smith",
    details: "Changed price from ₱450 to ₱470",
  },
  {
    date: "2025-06-07 09:50 AM",
    action: "Created",
    product: "Suzuki Spark Plug",
    sku: "SSP-220",
    updatedBy: "John Doe",
    details: "New product added with price ₱220 and stock 100",
  },
  {
    date: "2025-06-06 05:10 PM",
    action: "Deleted",
    product: "Old Chain Lube",
    sku: "CL-OLD-998",
    updatedBy: "Mike Cruz",
    details: "Removed due to discontinued brand",
  },
  {
    date: "2025-06-05 11:20 AM",
    action: "Updated",
    product: "Yamaha Oil Filter",
    sku: "YOF-V1",
    updatedBy: "Jane Smith",
    details: "Renamed from 'Oil Filter V1' to 'Yamaha Oil Filter'",
  },
  {
    date: "2025-06-04 03:40 PM",
    action: "Stock Out",
    product: "Kawasaki Air Filter",
    sku: "KAF-890",
    updatedBy: "John Doe",
    details: "Decreased stock from 45 to 20 units due to bulk order",
  },
  {
    date: "2025-06-03 01:10 PM",
    action: "Updated",
    product: "Yamaha Brake Pads",
    sku: "YBP-1001",
    updatedBy: "Jane Smith",
    details: "Added new variant: Size L with stock 30",
  },
  {
    date: "2025-06-02 10:00 AM",
    action: "Created",
    product: "Honda Chain Kit",
    sku: "HCK-300",
    updatedBy: "Mike Cruz",
    details: "Created product with variants for 428H and 520H chain sizes",
  },
  {
    date: "2025-06-01 04:45 PM",
    action: "Updated",
    product: "KTM Engine Oil",
    sku: "KTM-OIL-450",
    updatedBy: "Jane Smith",
    details: "Updated product image and description",
  },
  {
    date: "2025-05-31 08:30 AM",
    action: "Stock In",
    product: "Suzuki Spark Plug",
    sku: "SSP-220",
    updatedBy: "John Doe",
    details: "Restocked 50 units, total now 150",
  },
];

interface ProductLog {
  openLogs: () => void;
}

export default function ProductLogs({ openLogs }: ProductLog) {
  const [openFilters, setOpenFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState("All Actions");
  const [selectedDateRange, setSelectedDateRange] = useState("All Time");
  const [updatedBy, setUpdatedBy] = useState("All Users");
  const users = [
    "All Users",
    ...new Set(productLogs.map((log) => log.updatedBy)),
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredLogs = productLogs.filter((log) => {
    const matchesQuery =
      log.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.updatedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction =
      selectedAction === "All Actions" || log.action === selectedAction;

    const matchesDateRange = (() => {
      const today = new Date();
      const logDate = new Date(log.date);
      switch (selectedDateRange) {
        case "Today":
          return logDate.toDateString() === today.toDateString();
        case "Last 7 days":
          return today.getTime() - logDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
        case "Last 30 days":
          return (
            today.getTime() - logDate.getTime() <= 30 * 24 * 60 * 60 * 1000
          );
        case "Last 90 days":
          return (
            today.getTime() - logDate.getTime() <= 90 * 24 * 60 * 60 * 1000
          );
        default:
          return true;
      }
    })();

    const matchesUpdatedBy =
      updatedBy === "All Users" || log.updatedBy === updatedBy;

    return (
      matchesQuery && matchesAction && matchesDateRange && matchesUpdatedBy
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={openLogs}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft /> BACK
      </button>
      <div>
        <h1 className="font-semibold text-xl text-gray-800">Product Logs</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track all product-related activities and changes across your inventory
        </p>
      </div>
      <div className="p-4 bg-white rounded-md flex flex-col gap-4 border border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <div
            className="border border-gray-300 w-full flex items-center 
        px-4 py-2 rounded"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full outline-0 text-sm text-gray-500"
              placeholder="Search by product name, SKU, or user..."
            />
            <button className="flex items-center justify-between cursor-pointer">
              <SearchIcon size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setOpenFilters((prev) => !prev)}
              className="text-center px-4 py-2 flex items-center gap-1
          rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              <Filter size={20} className="text-gray-500" />{" "}
              <span> Filters </span>
              {openFilters ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            <button
              className="text-center px-4 py-2 flex items-center gap-1 text-white
          rounded bg-mayormoto-blue hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              <Download size={20} /> <span> Export </span>
            </button>
          </div>
        </div>
        {openFilters && (
          <div
            className="border-t py-4 border-gray-300 flex justify-between 
          gap-4"
          >
            <div className="flex flex-col w-full">
              <span className="text-sm text-gray-700">Action Type</span>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="bg-white text-center border rounded border-gray-300 px-4 py-1.5"
              >
                {actions.map((act, i) => (
                  <option key={i}>{act}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full">
              <span className="text-sm text-gray-700">Updated By</span>
              <select
                value={updatedBy}
                onChange={(e) => setUpdatedBy(e.target.value)}
                className="bg-white text-center border rounded border-gray-300 px-4 py-1.5"
              >
                {users.map((user, i) => (
                  <option key={i}>{user}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full">
              <span className="text-sm text-gray-700">Date Range</span>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="bg-white text-center border rounded border-gray-300 px-4 py-1.5"
              >
                {dateRange.map((date, i) => (
                  <option key={i}>{date}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {filteredLogs.length > 0 ? (
        <div
          className="p-4 bg-white rounded-md flex flex-col gap-4 border
       border-gray-200"
        >
          <table
            className="w-full text-left text-sm text-gray-500
        border border-gray-200 rounded"
          >
            <thead className="border-b border-gray-200 uppercase bg-gray-200">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Updated By</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, i) => (
                <tr
                  key={i}
                  className={`${
                    i !== filteredLogs.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <td className="p-4">{log.date}</td>
                  <td className="p-4">
                    <span className={actionTypeToColor(log.action)}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600 font-semibold">
                        {log.product}
                      </span>
                      <span className="">SKU: {log.sku}</span>
                    </div>
                  </td>
                  <td className="p-4">{log.updatedBy}</td>
                  <td className="p-4">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {productLogs.length} logs
            </span>

            <div className="flex items-center gap-2">
              <button
                className="ml-2 bg-mayormoto-blue text-white
              hover:bg-mayormoto-blue-hover px-4 py-2 rounded
              disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={filteredLogs.length === 10}
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page 1 of {Math.ceil(filteredLogs.length / 10)}
              </span>
              <button
                className="ml-2 bg-mayormoto-blue text-white
              hover:bg-mayormoto-blue-hover px-4 py-2 rounded  
              disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={filteredLogs.length === 10}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white py-10 flex flex-col items-center gap-4">
          <Box size={60} className="text-gray-500" />
          <span className="font-semibold text-xl">No audit logs found</span>
          <p className="text-gray-500 text-sm">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
}

function actionTypeToColor(action: string) {
  switch (action) {
    case "Stock In":
      return "bg-green-100 px-2 py-1 uppercase rounded-full font-bold text-green-800";
    case "Stock Out":
      return "bg-red-100 px-2 py-1 uppercase rounded-full font-bold text-red-800";
    case "Created":
      return "bg-blue-100 px-2 py-1 uppercase rounded-full font-bold text-blue-800";
    case "Updated":
      return "bg-yellow-100 px-2 py-1 uppercase rounded-full font-bold text-yellow-800";
    case "Deleted":
      return "bg-gray-100 px-2 py-1 uppercase rounded-full font-bold text-gray-800";
    default:
      return "bg-gray-100 px-2 py-1 uppercase rounded-full font-bold text-gray-800";
  }
}
