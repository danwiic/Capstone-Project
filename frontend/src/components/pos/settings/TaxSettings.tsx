import { useState } from "react";
import { Plus, PencilIcon, Trash, CheckCircle } from "lucide-react";
Plus;
// Mock initial tax data
const initialTaxRates = [
  {
    id: "1",
    name: "VAT",
    rate: 12,
    isDefault: true,
    description: "Standard Value Added Tax",
  },
  {
    id: "2",
    name: "Zero-rated",
    rate: 0,
    isDefault: false,
    description: "For essential goods and export sales",
  },
  {
    id: "3",
    name: "EVAT",
    rate: 10,
    isDefault: false,
    description: "For small businesses",
  },
];

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  isDefault: boolean;
  description?: string;
}

export default function TaxSettings() {
  const [taxRates, setTaxRates] = useState<TaxRate[]>(initialTaxRates);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    rate: string;
    isDefault: boolean;
    description: string;
  }>({
    name: "",
    rate: "",
    isDefault: false,
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Tax name is required");
      return false;
    }

    const rate = parseFloat(formData.rate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      alert("Please enter a valid tax rate between 0 and 100");
      return false;
    }

    return true;
  };

  const handleAddTaxRate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTaxRate: TaxRate = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      rate: parseFloat(formData.rate),
      isDefault: formData.isDefault,
      description: formData.description.trim(),
    };

    // If this new tax rate is default, update other tax rates
    let updatedTaxRates = [...taxRates];
    if (newTaxRate.isDefault) {
      updatedTaxRates = updatedTaxRates.map((tax) => ({
        ...tax,
        isDefault: false,
      }));
    }

    setTaxRates([...updatedTaxRates, newTaxRate]);
    resetForm();
  };

  const handleUpdateTaxRate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !editingId) return;

    let updatedTaxRates = [...taxRates];

    // If this edited tax rate is now default, update other tax rates
    if (formData.isDefault) {
      updatedTaxRates = updatedTaxRates.map((tax) => ({
        ...tax,
        isDefault: false,
      }));
    }

    // Update the specific tax rate
    updatedTaxRates = updatedTaxRates.map((tax) =>
      tax.id === editingId
        ? {
            ...tax,
            name: formData.name.trim(),
            rate: parseFloat(formData.rate),
            isDefault: formData.isDefault,
            description: formData.description.trim(),
          }
        : tax
    );

    setTaxRates(updatedTaxRates);
    resetForm();
  };

  const handleDeleteTaxRate = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tax rate?")) {
      return;
    }

    // Check if deleting the default tax rate
    const isRemovingDefault = taxRates.find((tax) => tax.id === id)?.isDefault;

    let updatedTaxRates = taxRates.filter((tax) => tax.id !== id);

    // If removing the default tax rate, set a new default if possible
    if (isRemovingDefault && updatedTaxRates.length > 0) {
      updatedTaxRates[0].isDefault = true;
    }

    setTaxRates(updatedTaxRates);
  };

  const handleSetDefault = (id: string) => {
    setTaxRates(
      taxRates.map((tax) => ({
        ...tax,
        isDefault: tax.id === id,
      }))
    );
  };

  const editTaxRate = (taxRate: TaxRate) => {
    setFormData({
      name: taxRate.name,
      rate: taxRate.rate.toString(),
      isDefault: taxRate.isDefault,
      description: taxRate.description || "",
    });
    setEditingId(taxRate.id);
    setIsAddingNew(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      rate: "",
      isDefault: false,
      description: "",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredTaxRates = taxRates.filter(
    (tax) =>
      tax.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tax.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white flex flex-col gap-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tax Settings</h2>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search tax rates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddingNew(true);
          }}
          className="px-4 py-2 bg-mayormoto-blue text-white rounded-sm
           hover:bg-mayormoto-blue-hover focus:outline-none flex items-center justify-center space-x-2"
        >
          <Plus size={18} />
          <span>Add Tax Rate</span>
        </button>
      </div>

      {/* Add/Edit Tax Rate Form */}
      {isAddingNew && (
        <div className="mb-6 p-5 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-md font-medium mb-4 text-gray-700">
            {editingId ? "Edit Tax Rate" : "Add New Tax Rate"}
          </h3>

          <form
            onSubmit={editingId ? handleUpdateTaxRate : handleAddTaxRate}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="tax-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tax Name *
                </label>
                <input
                  id="tax-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., VAT, GST, Sales Tax"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                />
              </div>

              <div>
                <label
                  htmlFor="tax-rate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rate (%) *
                </label>
                <input
                  id="tax-rate"
                  name="rate"
                  type="number"
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.rate}
                  onChange={handleInputChange}
                  placeholder="e.g., 12.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tax-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="tax-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                placeholder="Brief description of this tax rate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
              />
            </div>

            <div className="flex items-center">
              <input
                id="is-default"
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 text-mayormoto-blue focus:ring-mayormoto-blue border-gray-300 rounded"
              />
              <label
                htmlFor="is-default"
                className="ml-2 block text-sm text-gray-700"
              >
                Set as default tax rate
              </label>
            </div>

            <div className="flex justify-end gap-3 text-sm pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md
                 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-white bg-mayormoto-blue
                 hover:bg-mayormoto-blue-hover focus:outline-none"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tax Rates Table */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tax Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rate
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
                Default
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
            {filteredTaxRates.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {searchQuery
                    ? "No tax rates match your search"
                    : "No tax rates defined. Add your first tax rate!"}
                </td>
              </tr>
            ) : (
              filteredTaxRates.map((tax) => (
                <tr key={tax.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {tax.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{tax.rate}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {tax.description || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tax.isDefault ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(tax.id)}
                        className="text-xs text-gray-600 hover:text-mayormoto-blue"
                      >
                        Set as default
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => editTaxRate(tax)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      {!tax.isDefault && (
                        <button
                          onClick={() => handleDeleteTaxRate(tax.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      )}
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
            <CheckCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              About Tax Settings
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The default tax rate will be automatically applied to all
                  products during checkout
                </li>
                <li>
                  Tax rates can be modified at any time and will affect future
                  orders
                </li>
                <li>
                  Zero-rated taxes (0%) can be used for tax-exempt products
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
