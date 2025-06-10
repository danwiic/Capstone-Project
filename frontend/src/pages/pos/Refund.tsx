import { ArrowLeft, Box, Download, Filter, Search } from "lucide-react";
import { useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import { MdSort } from "react-icons/md";
import KebabMenu from "../../components/pos/menu/Kebab";
import formatDate from "../../utils/formatDate";

interface RefundProps {
  onClose?: () => void;
}

const status = [
  "All",
  "Under Review",
  "Refunded",
  "Returning",
  "Disputed",
  "Rejected/Cancelled",
];

const requestData = [
  {
    requestId: "REQ-0001",
    orderId: "ORD-1001",
    product: "Front Brake Pads",
    amount: "1200",
    reason: "Damaged Item",
    solution: "Refund",
    status: "Returning",
    quantity: 2,
    sku: "FBP-001",
    requestDate: "2025-03-01",
  },
  {
    requestId: "REQ-0002",
    orderId: "ORD-1002",
    product: "Evo Yellow Paint Kit",
    amount: "2800",
    reason: "Scratched Surface",
    solution: "Refund",
    status: "Under Review",
    quantity: 1,
    sku: "EYP-002",
    requestDate: "2025-03-03",
  },
  {
    requestId: "REQ-0003",
    orderId: "ORD-1003",
    product: "LED Headlight",
    amount: "4500",
    reason: "Not as Described",
    solution: "Replacement",
    status: "Refunded",
    quantity: 1,
    sku: "LEDH-003",
    requestDate: "2025-03-03",
  },
  {
    requestId: "REQ-0004",
    orderId: "ORD-1004",
    product: "Rear Brake Disc",
    amount: "3700",
    reason: "Damaged Item",
    solution: "Refund",
    status: "Disputed",
    quantity: 1,
    sku: "RBD-004",
    requestDate: "2025-03-04",
  },
  {
    requestId: "REQ-0005",
    orderId: "ORD-1005",
    product: "Chain and Sprocket Kit",
    amount: "5200",
    reason: "Wrong Item",
    solution: "Replacement",
    status: "Rejected/Cancelled",
    quantity: 1,
    sku: "CSK-005",
    requestDate: "2025-03-06",
  },
  {
    requestId: "REQ-0006",
    orderId: "ORD-1006",
    product: "Motorcycle Battery",
    amount: "3100",
    reason: "Dead on Arrival",
    solution: "Refund",
    status: "Returning",
    quantity: 1,
    sku: "MB-006",
    requestDate: "2025-03-11",
  },
  {
    requestId: "REQ-0007",
    orderId: "ORD-1007",
    product: "Handlebar Grips",
    amount: "800",
    reason: "Late Delivery",
    solution: "Discount",
    status: "Refunded",
    quantity: 2,
    sku: "HG-007",
    requestDate: "2025-03-12",
  },
  {
    requestId: "REQ-0008",
    orderId: "ORD-1008",
    product: "Clutch Lever",
    amount: "950",
    reason: "Wrong Item",
    solution: "Refund",
    status: "Disputed",
    quantity: 1,
    sku: "CL-008",
    requestDate: "2025-03-17",
  },
  {
    requestId: "REQ-0009",
    orderId: "ORD-1009",
    product: "Exhaust Muffler",
    amount: "6400",
    reason: "Damaged Item",
    solution: "Refund",
    status: "Under Review",
    quantity: 1,
    sku: "EM-009",
    requestDate: "2025-03-19",
  },
  {
    requestId: "REQ-0010",
    orderId: "ORD-1010",
    product: "Fuel Tank Cap",
    amount: "600",
    reason: "Not Compatible",
    solution: "Replacement",
    status: "Rejected/Cancelled",
    quantity: 1,
    sku: "FTC-010",
    requestDate: "2025-03-20",
  },
];

export default function Refund({ onClose }: RefundProps) {
  const [currentStatus, setCurrentStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = requestData.filter((req, index) => {
    const requestId = `REQ-${String(index + 1).padStart(4, "0")}`;

    const matchesStatus =
      currentStatus.toLowerCase() === "all" ||
      req.status.toLowerCase() === currentStatus.toLowerCase();

    const matchesSearch = requestId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && (!searchQuery || matchesSearch);
  });

  const [isSortedByDate, setIsSortedByDate] = useState(false);

  const sortDate = () => {
    setIsSortedByDate((prev) => !prev);
    requestData.sort((a, b) => {
      return isSortedByDate
        ? new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        : new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="flex gap-1 items-center">
            <ArrowLeft /> BACK
          </button>
          <div className="flex justify-end gap-2 text-sm text-gray-500">
            <button
              onClick={() => sortDate()}
              className="px-4 py-2 flex items-center gap-1 bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
            >
              <MdSort size={20} /> <span>Sort by Request Date</span>
            </button>
            <button className="px-4 py-2 flex items-center gap-1 bg-mayormoto-blue text-white hover:bg-mayormoto-blue-hover border border-gray-300 rounded ">
              <Download /> <span>Export</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-xl text-gray-800">
              Return Refund
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Process a return or refund for an order.
            </p>
          </div>

          <div className="bg-white text-gray-500 text-sm flex items-center justify-between border rounded border-gray-300 px-4 py-1.5">
            <input
              type="text"
              className="w-full outline-0"
              placeholder="Search by request id..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>
              <Search size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col border border-gray-300">
        <div className="border-b-2 border-gray-300">
          {status.map((stat, i) => (
            <button
              onClick={() => setCurrentStatus(stat.toLowerCase())}
              key={i}
              className={`px-4 py-4 text-sm font-nedium hover:text-mayormoto-blue ${
                currentStatus.toLowerCase() === stat.toLowerCase()
                  ? "border-b border-mayormoto-blue text-mayormoto-blue"
                  : ""
              } transition-all duration-100 ease-in-out`}
            >
              {stat}
            </button>
          ))}
        </div>

        {filteredData.length > 0 ? (
          <div>
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="uppercase text-gray-500 border-b border-gray-300 text-sm bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Request ID</th>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Request Reason</th>
                  <th className="px-4 py-2">Request Solution</th>
                  <th className="px-4 py-2">Request Status</th>
                  <th className="px-4 py-2" onClick={() => sortDate()}>
                    <button className="uppercase cursor-pointer">
                      Request Date
                    </button>
                  </th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((req, i) => {
                  return (
                    <tr key={i} className="not-last:border-b border-gray-200">
                      <td className="px-4 py-2">{req.requestId}</td>
                      <td className="px-4 py-2">{req.orderId}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">{req.product}</span>
                          <span>Quantity: {req.quantity ?? "-"}</span>
                          <span>SKU: {req.sku ?? "-"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {formatMoney(req.quantity * req.amount)}
                      </td>
                      <td className="px-4 py-2">{req.reason}</td>
                      <td className="px-4 py-2">{req.solution}</td>
                      <td className="px-4 py-2">
                        <span className={`${statusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {formatDate(req.requestDate)}
                      </td>
                      <td className="px-4 py-2">
                        <KebabMenu />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center text-gray-500 p-20">
            <Box size={60} className="" />
            <span className="text-xl font-semibold">
              No refund/return found.
            </span>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case "under review":
      return "text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full uppercase font-semibold";
    case "refunded":
      return "text-green-500 bg-green-100 px-2 py-1 rounded-full uppercase font-semibold";
    case "returning":
      return "text-blue-500 bg-blue-100 px-2 py-1 rounded-full uppercase font-semibold";
    case "disputed":
      return "text-red-500 bg-red-100 px-2 py-1 rounded-full uppercase font-semibold";
    case "rejected/cancelled":
      return "text-gray-500 bg-gray-100 px-2 py-1 rounded-full uppercase font-semibold";
    default:
      return "text-gray-700";
  }
}
