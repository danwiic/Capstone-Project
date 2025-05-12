import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("discount");

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("discount")}
              className={`py-4 px-6 font-medium ${
                activeTab === "discount"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Discount
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`py-4 px-6 font-medium ${
                activeTab === "shipping"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Shipping
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "discount" ? (
              <DiscountSettings />
            ) : (
              <ShippingSettings />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function DiscountSettings() {
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [discountName, setDiscountName] = useState("");
  const [discounts, setDiscounts] = useState([
    { id: 1, name: "Summer Sale", type: "percentage", value: 15, active: true },
    { id: 2, name: "Holiday Special", type: "fixed", value: 70, active: false },
  ]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newDiscount = {
      id: discounts.length + 1,
      name: discountName,
      type: discountType,
      value: parseFloat(discountValue),
      active: false,
    };
    setDiscounts([...discounts, newDiscount]);

    setDiscountName("");
    setDiscountValue("");
  };

  const toggleDiscountStatus = (id: any) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id
          ? { ...discount, active: !discount.active }
          : discount
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Discount Management</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg"
      >
        <h3 className="font-medium mb-3">Add New Discount</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Name
            </label>
            <input
              type="text"
              value={discountName}
              onChange={(e) => setDiscountName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              placeholder="e.g. Summer Sale"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {discountType === "percentage"
                ? "Percentage Value"
                : "Fixed Amount"}
            </label>
            <div className="relative">
              {discountType === "fixed" && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₱
                </span>
              )}
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className={`w-full border border-gray-300 rounded-md py-2 ${
                  discountType === "fixed" ? "pl-7" : "px-3"
                }`}
                placeholder={
                  discountType === "percentage" ? "e.g. 10" : "e.g. 70.00"
                }
                min="0"
                step={discountType === "percentage" ? "1" : "0.01"}
                required
              />
              {discountType === "percentage" && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  %
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Discount
          </button>
        </div>
      </form>

      {/* Discounts list */}
      <div>
        <h3 className="font-medium mb-3">Active Discounts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {discount.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {discount.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {discount.type === "percentage"
                      ? `${discount.value}%`
                      : `₱${discount.value.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        discount.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {discount.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleDiscountStatus(discount.id)}
                      className={`mr-2 py-1 px-3 rounded text-sm ${
                        discount.active
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {discount.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ShippingSettings() {
  const [couponCode, setCouponCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "FREESHIP2025",
      expiryDate: "2025-06-30",
      usageLimit: 100,
      usageCount: 12,
      active: true,
    },
    {
      id: 2,
      code: "WELCOME50",
      expiryDate: "2025-05-15",
      usageLimit: 50,
      usageCount: 23,
      active: true,
    },
  ]);

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponCode("FREE" + result);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add new coupon to the list
    const newCoupon = {
      id: coupons.length + 1,
      code: couponCode,
      expiryDate: expiryDate,
      usageLimit: parseInt(usageLimit),
      usageCount: 0,
      active: true,
    };
    setCoupons([...coupons, newCoupon]);

    // Reset form
    setCouponCode("");
    setExpiryDate("");
    setUsageLimit("");
  };

  const toggleCouponStatus = (id: any) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, active: !coupon.active } : coupon
      )
    );
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4">
        Free Shipping Coupon Generator
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg flex flex-col gap-4">
        <h3 className="font-medium mb-3">Create New Free Shipping Coupon</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code
            </label>
            <div className="flex">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="w-full border border-gray-300 rounded-l-md py-2 px-3"
                placeholder="e.g. FREESHIP123"
                required
              />
              <button
                type="button"
                onClick={generateRandomCode}
                className="bg-gray-200 text-gray-700 py-2 px-3 rounded-r-md hover:bg-gray-300"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usage Limit
            </label>
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              placeholder="e.g. 100"
              min="1"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Create Coupon
          </button>
        </div>
      </form>

      {/* Coupons list */}
      <div>
        <h3 className="font-medium mb-3">Free Shipping Coupons</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {coupon.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {coupon.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {coupon.usageCount} / {coupon.usageLimit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        coupon.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleCouponStatus(coupon.id)}
                      className={`mr-2 py-1 px-3 rounded text-sm ${
                        coupon.active
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {coupon.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
