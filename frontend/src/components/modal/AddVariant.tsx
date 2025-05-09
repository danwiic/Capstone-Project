import { X } from "lucide-react";
import { useState } from "react";

interface AddVariantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddVariant({ isOpen, onClose }: AddVariantProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [reOrderLevel, setReOrderLevel] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Variant name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!reOrderLevel.trim()) {
      newErrors.reOrderLevel = "Re-order level is required";
    } else if (isNaN(parseInt(reOrderLevel)) || parseInt(reOrderLevel) < 0) {
      newErrors.reOrderLevel = "Re-order level must be a valid positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (validateForm()) {
    //   onSubmit({
    //     name: name.trim(),
    //     price: parseFloat(price),
    //     reOrderLevel: parseInt(reOrderLevel)
    //   });

    //   // Reset form
    //   setName('');
    //   setPrice('');
    //   setReOrderLevel('');
    //   setErrors({});
    //   onClose();
    // }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 overflow-y-auto flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal panel */}
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden 
      shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="flex flex-col gap-3 text-center sm:mt-0 sm:text-left w-full">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Add New Variant
                </h3>
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 
                  focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Variant Name */}
                <div>
                  <label
                    htmlFor="variant-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Variant Name
                  </label>
                  <input
                    type="text"
                    id="variant-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`block w-full px-3 py-2 border ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-mayormoto-blue 
                     focus:border-mayormoto-blue sm:text-sm`}
                    placeholder="e.g. Color, Size "
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="variant-price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="variant-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    className={`block w-full px-3 py-2 border ${
                      errors.price ? "border-red-300" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-mayormoto-blue 
                     focus:border-mayormoto-blue sm:text-sm`}
                    placeholder="0"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                {/* Re-order Level */}
                <div>
                  <label
                    htmlFor="reorder-level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Re-order Level
                  </label>
                  <input
                    type="number"
                    id="reorder-level"
                    value={reOrderLevel}
                    onChange={(e) => setReOrderLevel(e.target.value)}
                    min="0"
                    step="1"
                    className={`block w-full px-3 py-2 border ${
                      errors.reOrderLevel ? "border-red-300" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-mayormoto-blue 
                     focus:border-mayormoto-blue sm:text-sm`}
                    placeholder="10"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum stock level before reordering is recommended
                  </p>
                  {errors.reOrderLevel && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.reOrderLevel}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3  flex flex-row-reverse items-start gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-fit inline-flex justify-center rounded-md border border-transparent 
            shadow-sm px-4 py-2 bg-mayormoto-blue font-medium text-white 
            hover:bg-mayormoto-blue-hover text-sm"
          >
            Add Variant
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-fit inline-flex justify-center rounded-md border border-gray-300 
            shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 
         text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
