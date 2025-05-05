import { useState } from "react";
import { Calendar, Package, X } from "lucide-react";

interface UpdateStockProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateStock({ isOpen, onClose }: UpdateStockProps) {
  const [formData, setFormData] = useState({
    batchNumber: "",
    quantity: "",
    action: "in", // Default to 'stock in'
    reason: "",
    receivedDate: "",
    expirationDate: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/45 bg-opacity-30 flex justify-center items-center p-4 z-50">
      <div
        className="bg-white flex flex-col gap-4 text-gray-600 h-fit rounded-lg shadow-xl
       w-full max-w-md p-6 relative"
      >
        <div className="flex items-center justify-between border-b pb-3 mb-4 border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 gap-2 flex items-center">
            <Package className="mr-2 text-mayormoto-pink" size={20} />
            Stock Update
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 
        scrollbar-track-gray-100"
        >
          <div className="mb-4">
            <label
              htmlFor="batchNumber"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Batch Number
            </label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
              placeholder="Enter batch number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Action
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="action"
                  value="in"
                  checked={formData.action === "in"}
                  onChange={handleChange}
                  className="h-4 w-4  text-blue-600 "
                />
                <span className=" text-gray-600">Stock In</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="action"
                  value="out"
                  checked={formData.action === "out"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 "
                />
                <span className="text-gray-600">Stock Out</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md focus:outline-none  "
              placeholder="Enter quantity"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 
              rounded-md focus:outline-none text-sm"
              placeholder="Enter reason for stock update"
            ></textarea>
          </div>

          {/* Dates Row */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="receivedDate"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                <div className="flex items-center gap-1">
                  <Calendar className="mr-1 text-gray-500" size={16} />
                  Received On
                </div>
              </label>
              <input
                type="date"
                id="receivedDate"
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleChange}
                defaultValue={new Date().toDateString()}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
              />
            </div>
            <div>
              <label
                htmlFor="expirationDate"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                <div className="flex items-center gap-1">
                  <Calendar className="mr-1 text-gray-500" size={16} />
                  Expiration Date
                </div>
              </label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 text-sm mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-white hover:bg-gray-50 focus:outline-none  "
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-mayormoto-pink text-white rounded-md shadow-sm
               hover:bg-mayormoto-pink/85 focus:outline-none  "
            >
              Update Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
