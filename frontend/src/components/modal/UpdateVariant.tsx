import { useState } from "react";
import { X } from "lucide-react";
import { updateVariant } from "../../services/products";

interface UpdateVariantProps {
  isOpen: boolean;
  onclose: () => void;
  //   variantId: string;
  //   variantDetails?: {
  //     sku: string;
  //     variantName: string;
  //     price: number;
  //     reOrderLevel: number;
  //   };
}

export default function UpdateVariant({ isOpen, onclose }: UpdateVariantProps) {
  const [sku, setSku] = useState("");
  const [variantName, setVariantName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [reOrderLevel, setReOrderLevel] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   await updateVariant(
    //     variantId,
    //     "73f65300-8dcf-4929-af45-dce69467a90f", // Replace with actual user ID
    //     sku,
    //     variantName,
    //     Number(price),
    //     Number(reOrderLevel)
    //   );
    //   onclose();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white h-fit rounded-lg p-4 w-1/4 flex flex-col gap-2">
        <div className="flex justify-between items-center pb-4 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Update Variant</h2>
          <button
            onClick={onclose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-gray-500 gap-2"
        >
          <div className="flex flex-col gap">
            <label className="text-sm font-medium" htmlFor="sku">
              SKU
            </label>
            <input
              className="outline-0 rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Enter new SKU"
              type="text"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap">
            <label className="text-sm font-medium" htmlFor="variant_name">
              Variant Name
            </label>
            <input
              className="outline-0 rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Enter new Variant Name"
              type="text"
              id="variant_name"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap">
            <label className="text-sm font-medium" htmlFor="price">
              Price
            </label>
            <input
              className="outline-0 rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Enter new Price"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber || "")}
            />
          </div>

          <div className="flex flex-col gap">
            <label className="text-sm font-medium" htmlFor="reOrderLevel">
              Re-Order Level
            </label>
            <input
              className="outline-0 rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Enter new Re-Order Level"
              type="number"
              id="reOrderLevel"
              value={reOrderLevel}
              onChange={(e) => setReOrderLevel(e.target.valueAsNumber || "")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onclose}
              className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm bg-mayormoto-pink rounded hover:bg-mayormoto-pink/80 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
