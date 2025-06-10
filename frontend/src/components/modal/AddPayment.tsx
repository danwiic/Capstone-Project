import ModalBody from "./ModalBody";

interface AddPaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPayment({ isOpen, onClose }: AddPaymentProps) {
  return (
    <ModalBody isOpen={isOpen} onClose={onClose} title="Add Payment Method">
      <form className="flex flex-col gap-4">

        {/* Method Name */}
        <div className="flex flex-col">
          <label htmlFor="method_name">Payment Method Name</label>
          <input
            type="text"
            id="method_name"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
            placeholder="e.g., GCash, Visa (Stripe)"
          />
        </div>

        {/* Identifier/Slug (optional) */}
        <div className="flex flex-col">
          <label htmlFor="slug">Identifier (optional)</label>
          <input
            type="text"
            id="slug"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
            placeholder="e.g., gcash"
          />
        </div>

        {/* Linked Provider */}
        <div className="flex flex-col">
          <label htmlFor="provider">Linked Provider</label>
          <select
            id="provider"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
          >
            <option value="">Select Provider</option>
            <option value="paymongo">Paymongo</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Display Order */}
        <div className="flex flex-col">
          <label htmlFor="display_order">Display Order (optional)</label>
          <input
            type="number"
            id="display_order"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
            placeholder="e.g., 1"
          />
        </div>

        {/* Availability */}
        <div className="flex flex-col">
          <label>Available In</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input type="checkbox" value="web" /> Web
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value="pos" /> POS
            </label>
          </div>
        </div>

        {/* Fees */}
        <div className="flex flex-col">
          <label htmlFor="fixed_fee">Fixed Fee (optional)</label>
          <input
            type="number"
            id="fixed_fee"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
            placeholder="e.g., 15"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="percentage_fee">Percentage Fee (optional)</label>
          <input
            type="number"
            id="percentage_fee"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
            placeholder="e.g., 2.5"
          />
        </div>

        {/* Branding */}
        <div className="flex flex-col">
          <label htmlFor="custom_label">Custom Display Label (optional)</label>
          <input
            type="text"
            id="custom_label"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
            placeholder="e.g., Pay via GCash"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="logo">Upload Logo/Icon (optional)</label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            className="px-4 py-2 border border-gray-300 rounded outline-0"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-mayormoto-blue hover:bg-mayormoto-blue-hover text-white rounded"
          >
            Add Payment Method
          </button>
        </div>
      </form>
    </ModalBody>
  );
}
