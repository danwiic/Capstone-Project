import { useState } from "react";
import KebabMenu from "../menu/Kebab";
import Status from "../status card/Status";
import AddProvider from "../../modal/AddProvider";
import AddPayment from "../../modal/AddPayment";

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
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const [openAddPaymentMethod, setOpenAddPaymentMethod] = useState(false);

  const filteredMethods =
    activeFilter === "All"
      ? paymentMethods
      : paymentMethods.filter((method) =>
          method.availableIn.includes(activeFilter.toLowerCase())
        );

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Payment Methods</span>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setOpenAddPaymentMethod((prev) => !prev)}
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
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Payment Providers</span>
            <button
              onClick={() => setOpenAddProvider((prev) => !prev)}
              className="px-4 text-center py-2 text-sm rounded bg-mayormoto-blue
          text-white font-medium cursor-pointer hover:bg-mayormoto-blue-hover 
          transition-colors"
            >
              Add Provider
            </button>
          </div>
          <div className="mt-4 border border-gray-200 rounded">
            <table className="w-full text-left text-gray-500">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-2">Provider Name</th>
                  <th className="px-6 py-2">Environment</th>
                  <th className="px-6 py-2">Status</th>
                  <th className="px-6 py-2">Webhook URL</th>
                  <th className="px-6 py-2">API Key </th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with dynamic data from your provider list */}
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-2">Paymongo</td>
                  <td className="px-6 py-2">Production</td>
                  <td className="px-6 py-2">
                    <Status status="active" />
                  </td>
                  <td className="px-6 py-2 text-sm text-blue-600 underline">
                    https://mayormoto.com/webhooks/paymongo
                  </td>
                  <td className="px-6 py-2">*******************</td>
                  <td className="text-center">
                    <KebabMenu
                      items={[
                        { label: "View Details" },
                        { label: "Disable" },
                        { label: "Delete" },
                      ]}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openAddProvider && (
        <AddProvider
          isOpen={openAddProvider}
          onClose={() => setOpenAddProvider((prev) => !prev)}
        />
      )}

      {openAddPaymentMethod && (
        <AddPayment
          isOpen={openAddPaymentMethod}
          onClose={() => setOpenAddPaymentMethod((prev) => !prev)}
        />
      )}
    </>
  );
}
