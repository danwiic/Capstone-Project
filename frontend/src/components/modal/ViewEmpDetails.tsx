import { Edit, Key, Mail, Phone, UserX } from "lucide-react";
import Status from "../pos/status card/Status";

interface ViewedEmpDetails {
  isOpen: boolean;
  onClose: () => void;
  selectedEmployee: {
    id: string;
    name: string;
    email: string;
    contact: string;
    status: "Active" | "Inactive" | "On Leave";
    createdOn: string;
  };
}
export default function ViewEmpDetails({
  isOpen,
  onClose,
  selectedEmployee,
}: ViewedEmpDetails) {
  if (!isOpen) return null;
  return (
    <div className="fixed text-sm inset-0 bg-black/45 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Employee Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl mb-4">
              {selectedEmployee.name.charAt(0)}
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              {selectedEmployee.name}
            </h3>
            <div className="mt-3">
              <Status status={selectedEmployee.status} />
            </div>

            <div className="pt-6 flex flex-col gap-1 text-sm w-full">
              <button
                className="flex items-center justify-center gap-2 w-full px-3 py-2 
              bg-mayormoto-blue text-white rounded-lg hover:bg-mayormoto-blue-hover"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border
               border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mb-2"
              >
                <Key size={16} />
                <span>Reset Password</span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-b border-gray-300 pb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Contact Information
                </h4>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-800">{selectedEmployee.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-800">{selectedEmployee.contact}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Employment Details
                </h4>
                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="text-gray-800 font-medium">
                      {selectedEmployee.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-gray-800">
                      {selectedEmployee.createdOn}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  System Permissions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Inventory Management",
                    "Sales Dashboard",
                    "Employee Management",
                    "Customer Records",
                    "Reports & Analytics",
                    "Settings",
                    "Transaction History",
                  ].map((perm, index) => (
                    <div key={perm} className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index < 5 ? "bg-green-500" : "bg-red-500"
                        } mr-2`}
                      ></div>
                      <span className="text-sm text-gray-700">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-300">
          <div>
            <button
              className="flex items-center gap-1 text-red-600 hover:text-red-800"
              onClick={() => {
                console.log("deactivate", selectedEmployee.id);
                onClose;
              }}
            >
              <UserX size={16} />
              <span>
                {selectedEmployee.status === "Active"
                  ? "Deactivate Account"
                  : "Activate Account"}
              </span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
