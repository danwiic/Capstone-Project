import { useState } from "react";
import KebabMenu from "../menu/Kebab";
import Status from "../status card/Status";

const paymentAvailability = ["All", "POS", "Online"];
const paymentMethods = [
  {
    method: "Credit Card",
    provider: "Paymongo",
    availableIn: ["online", "pos"],
    status: "active",
  },
  {
    method: "GCash",
    provider: "Paymongo",
    availableIn: ["online"],
    status: "active",
  },
  {
    method: "GrabPay",
    provider: "Paymongo",
    availableIn: ["online"],
    status: "active",
  },
  {
    method: "Maya",
    provider: "Paymongo",
    availableIn: ["online"],
    status: "active",
  },
  {
    method: "BPI",
    provider: "Paymongo",
    availableIn: ["online"],
    status: "active",
  },
  {
    method: "Cash",
    provider: "N/A",
    availableIn: ["pos, online"],
    status: "active",
  },
];

export default function Payments() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredMethods =
    activeFilter === "All"
      ? paymentMethods
      : paymentMethods.filter((method) =>
          method.availableIn.includes(activeFilter.toLowerCase())
        );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">Payment Methods</span>
        <div className="flex gap-2 items-center">
          <button
            className="px-4 text-center py-2 text-sm rounded bg-mayormoto-blue
          text-white font-medium cursor-pointer hover:bg-mayormoto-blue-hover 
          transition-colors"
          >
            Add Provider
          </button>
          <button
            className="px-4 text-center py-2 text-sm rounded bg-mayormoto-blue
          text-white font-medium cursor-pointer hover:bg-mayormoto-blue-hover 
          transition-colors"
          >
            Add Payment Method
          </button>
        </div>
      </div>
      <div className="border border-gray-200 rounded ">
        <div className="border-b border-gray-200">
          {paymentAvailability.map((method) => (
            <button
              onClick={() => setActiveFilter(method)}
              className={`px-6 py-3 text-sm font-semibold text-gray-500 ${
                activeFilter === method &&
                "border-b-2 border-mayormoto-blue text-mayormoto-blue"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        <table className="w-full text-left text-gray-500">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-2 ">Payment Method</th>
              <th className="px-6 py-2 ">Provider</th>
              <th className="px-6 py-2 ">Available In</th>
              <th className="px-6 py-2 ">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMethods.map((method, index) => (
              <tr key={index} className="not-last:border-b border-gray-200">
                <td className="px-6 py-2 ">{method.method}</td>
                <td className="px-6 py-2 ">{method.provider}</td>
                <td className="px-6 py-2 uppercase">
                  {method.availableIn.map((met, index) => (
                    <span key={met}>
                      {met.charAt(0).toUpperCase() + met.slice(1)}
                      {index < method.availableIn.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-2 ">
                  <Status status={method.status} />
                </td>
                <td className="text-center">
                  <KebabMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
