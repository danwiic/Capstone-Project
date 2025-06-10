import ModalBody from "./ModalBody";
import { useState } from "react";

interface AddProviderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProvider({ isOpen, onClose }: AddProviderProps) {
  const [environment, setEnvironment] = useState("sandbox");

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} title="Add Payment Provider">
      <div className="pb-2">
        <form action="" className="flex flex-col gap-4">

          {/* Provider Info */}
          <div className="flex flex-col">
            <label htmlFor="provider_name">Provider Name</label>
            <input
              type="text"
              id="provider_name"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="e.g., Stripe US"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="provider_type">Provider Type</label>
            <select
              id="provider_type"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
            >
              <option value="">Select Provider</option>
              <option value="stripe">Stripe</option>
              <option value="paymongo">Paymongo</option>
              <option value="paypal">PayPal</option>
              {/* Add more as needed */}
            </select>
          </div>

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

          {/* Environment Toggle */}
          <div className="flex flex-col">
            <label>Environment</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="sandbox"
                  checked={environment === "sandbox"}
                  onChange={() => setEnvironment("sandbox")}
                />
                Sandbox
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="production"
                  checked={environment === "production"}
                  onChange={() => setEnvironment("production")}
                />
                Production
              </label>
            </div>
          </div>

          {/* Credentials */}
          <div className="flex flex-col">
            <label htmlFor="sandbox_public">Sandbox Public Key</label>
            <input
              type="text"
              id="sandbox_public"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="Enter sandbox public key"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sandbox_secret">Sandbox Secret Key</label>
            <input
              type="text"
              id="sandbox_secret"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="Enter sandbox secret key"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="production_public">Production Public Key</label>
            <input
              type="text"
              id="production_public"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="Enter production public key"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="production_secret">Production Secret Key</label>
            <input
              type="text"
              id="production_secret"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="Enter production secret key"
            />
          </div>

          {/* Webhook Config */}
          <div className="flex flex-col">
            <label htmlFor="webhook_secret">Webhook Secret (Optional)</label>
            <input
              type="text"
              id="webhook_secret"
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="Enter webhook secret"
            />
          </div>

          <div className="flex flex-col">
            <label>Webhook URL</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-200 bg-gray-100 rounded outline-0"
              placeholder="https://yourdomain.com/webhooks/{provider}"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              rows={3}
              className="px-4 py-2 border border-gray-300 rounded outline-0"
              placeholder="Add internal notes or instructions"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-mayormoto-blue hover:bg-mayormoto-blue-hover text-white rounded"
            >
              Add Provider
            </button>
          </div>
        </form>
      </div>
    </ModalBody>
  );
}
