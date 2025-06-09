import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleRight,
  ToggleLeft,
  Search,
  RefreshCw,
} from "lucide-react";
import Status from "../status card/Status";

interface Discount {
  id: number;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
  description?: string;
}

export default function DiscountSettings() {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      name: "Summer Sale",
      type: "percentage",
      value: 15,
      active: true,
      description: "Discount for summer season",
    },
    {
      id: 2,
      name: "Holiday Special",
      type: "fixed",
      value: 70,
      active: false,
      description: "Special promotion for holidays",
    },
    {
      id: 3,
      name: "Loyalty Discount",
      type: "percentage",
      value: 5,
      active: true,
      description: "For repeat customers",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    type: "percentage" | "fixed";
    value: string;
    description: string;
  }>({
    name: "",
    type: "percentage",
    value: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Discount name is required");
      return false;
    }

    const value = parseFloat(formData.value);
    if (isNaN(value) || value < 0) {
      alert("Please enter a valid positive value");
      return false;
    }

    if (formData.type === "percentage" && value > 100) {
      alert("Percentage discount cannot exceed 100%");
      return false;
    }

    return true;
  };

  const handleAddDiscount = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newDiscount: Discount = {
      id: Math.max(0, ...discounts.map((d) => d.id)) + 1,
      name: formData.name.trim(),
      type: formData.type,
      value: parseFloat(formData.value),
      active: false,
      description: formData.description.trim(),
    };

    setDiscounts([...discounts, newDiscount]);
    resetForm();
  };

  const handleUpdateDiscount = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || editingId === null) return;

    setDiscounts(
      discounts.map((discount) =>
        discount.id === editingId
          ? {
              ...discount,
              name: formData.name.trim(),
              type: formData.type,
              value: parseFloat(formData.value),
              description: formData.description.trim(),
            }
          : discount
      )
    );

    resetForm();
  };

  const handleDeleteDiscount = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this discount?")) {
      return;
    }

    setDiscounts(discounts.filter((discount) => discount.id !== id));
  };

  const toggleDiscountStatus = (id: number) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id
          ? { ...discount, active: !discount.active }
          : discount
      )
    );
  };

  const editDiscount = (discount: Discount) => {
    setFormData({
      name: discount.name,
      type: discount.type,
      value: discount.value.toString(),
      description: discount.description || "",
    });
    setEditingId(discount.id);
    setIsAddingNew(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "percentage",
      value: "",
      description: "",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredDiscounts = discounts.filter(
    (discount) =>
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white flex flex-col gap-4">
      <div className="">
        <h2 className="text-xl font-semibold text-gray-800">
          Discount Management
        </h2>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search discounts..."
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
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>

        <button
          onClick={() => {
            resetForm();
            setIsAddingNew(true);
          }}
          className="px-4 py-2 bg-mayormoto-blue text-white rounded-md hover:bg-blue-600 focus:outline-none flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Discount</span>
        </button>
      </div>

      {/* Add/Edit Discount Form */}
      {isAddingNew && (
        <div className="mb-6 p-5 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-md font-medium mb-4 text-gray-700">
            {editingId ? "Edit Discount" : "Add New Discount"}
          </h3>

          <form
            onSubmit={editingId ? handleUpdateDiscount : handleAddDiscount}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="discount-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Discount Name *
                </label>
                <input
                  id="discount-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Sale, Holiday Special"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                />
              </div>

              <div>
                <label
                  htmlFor="discount-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Discount Type
                </label>
                <select
                  id="discount-type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₱)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="discount-value"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {formData.type === "percentage"
                    ? "Discount Percentage (%)"
                    : "Discount Amount (₱)"}
                </label>
                <div className="relative">
                  {formData.type === "fixed" && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      ₱
                    </span>
                  )}
                  <input
                    id="discount-value"
                    name="value"
                    type="number"
                    required
                    value={formData.value}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.type === "percentage" ? "100" : undefined}
                    step={formData.type === "percentage" ? "1" : "0.01"}
                    className={`w-full border border-gray-300 rounded-md py-2 ${
                      formData.type === "fixed" ? "pl-7 pr-3" : "px-3 pr-7"
                    }`}
                    placeholder={
                      formData.type === "percentage"
                        ? "e.g., 15"
                        : "e.g., 70.00"
                    }
                  />
                  {formData.type === "percentage" && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                      %
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="discount-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="discount-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Brief description of this discount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mayormoto-blue hover:bg-blue-600 focus:outline-none"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Discounts Table */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Discount Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDiscounts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {searchQuery
                    ? "No discounts match your search"
                    : "No discounts defined. Add your first discount!"}
                </td>
              </tr>
            ) : (
              filteredDiscounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {discount.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    <span className="text-sm text-gray-500">
                      {discount.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {discount.type === "percentage"
                        ? `${discount.value}%`
                        : `₱${discount.value.toFixed(2)}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {discount.description || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Status status={discount.active ? "Active" : "Inactive"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => toggleDiscountStatus(discount.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title={discount.active ? "Deactivate" : "Activate"}
                      >
                        {discount.active ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => editDiscount(discount)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDiscount(discount.id)}
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
            <svg
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              About Discounts
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Percentage discounts apply a percentage off the product's
                  price
                </li>
                <li>
                  Fixed amount discounts deduct a specific amount from the
                  product's price
                </li>
                <li>Toggle discounts active/inactive without deleting them</li>
                <li>Only active discounts will be available during checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
