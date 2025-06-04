import { useState } from "react";
import {
  Plus,
  RefreshCw,
  Search,
  Calendar,
  Hash,
  Users,
  ToggleRight,
  ToggleLeft,
  Copy,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface ShippingCoupon {
  id: number;
  code: string;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  active: boolean;
}

export default function ShippingSettings() {
  const [couponCode, setCouponCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [coupons, setCoupons] = useState<ShippingCoupon[]>([
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

  const handleSubmit = (e: React.FormEvent) => {
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

  const toggleCouponStatus = (id: number) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, active: !coupon.active } : coupon
      )
    );
  };

  const deleteCoupon = (id: number) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="bg-white flex flex-col gap-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Management
        </h2>
      </div>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          onClick={() => {}}
          className="gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Create Coupon Form */}
      <div className="mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <span>Coupon Code</span>
                </div>
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded-l-md py-2 px-3 focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                  placeholder="e.g. FREESHIP123"
                  required
                />
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="bg-gray-200 text-gray-700 py-2 px-3 rounded-r-md hover:bg-gray-300 flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Generate</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Expiry Date</span>
                </div>
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Usage Limit</span>
                </div>
              </label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                placeholder="e.g. 100"
                min="1"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-mayormoto-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Coupon</span>
            </button>
          </div>
        </form>
      </div>

      {/* Coupons Table */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCoupons.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {searchQuery
                    ? "No coupons match your search"
                    : "No coupons defined. Create your first free shipping coupon!"}
                </td>
              </tr>
            ) : (
              filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-2">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        isExpired(coupon.expiryDate)
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    >
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                      {isExpired(coupon.expiryDate) && (
                        <span className="ml-2 inline-flex items-center text-xs font-medium text-red-600">
                          (Expired)
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <span>
                          {coupon.usageCount} / {coupon.usageLimit}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (coupon.usageCount / coupon.usageLimit) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        coupon.active && !isExpired(coupon.expiryDate)
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {coupon.active && !isExpired(coupon.expiryDate)
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => toggleCouponStatus(coupon.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title={coupon.active ? "Deactivate" : "Activate"}
                        disabled={isExpired(coupon.expiryDate)}
                      >
                        {coupon.active ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              About Free Shipping Coupons
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Free shipping coupons allow customers to avoid shipping fees
                  at checkout
                </li>
                <li>
                  Each coupon can be limited by total usage and expiration date
                </li>
                <li>Deactivate coupons temporarily without deleting them</li>
                <li>
                  Share coupon codes with customers via email, social media, or
                  your website
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
