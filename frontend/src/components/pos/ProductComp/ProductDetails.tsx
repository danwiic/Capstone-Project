import { X } from "lucide-react";

type ProductDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductDetails({
  isOpen,
  onClose,
}: ProductDetailsProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/45 z-50 backdrop-blur-sm">
      <div className="flex flex-col bg-white rounded-sm max-w-[60rem] flex-1 text-gray-600">
        <div className="flex justify-between items-center rounded-sm px-6 py-4 pb-4 sticky top-0 bg-white">
          <h2 className="text-xl font-bold">Product Name</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 pb-4">
          <table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
