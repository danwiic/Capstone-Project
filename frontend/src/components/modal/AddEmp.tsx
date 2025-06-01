interface AddEmpProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddEmp({ isOpen, onClose }: AddEmpProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
      <div
        className="bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full max-w-2xl 
      p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Add New Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number*
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Password*
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Set initial password"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-3">
            System Access Permissions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Inventory Management",
              "Sales Dashboard",
              "Employee Management",
              "Customer Records",
              "Reports & Analytics",
              "Settings",
              "Transaction History",
            ].map((perm) => (
              <div key={perm} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id={`perm-${perm.toLowerCase().replace(/\s/g, "-")}`}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor={`perm-${perm.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-sm text-gray-700"
                >
                  {perm}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 text-sm">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-mayormoto-blue text-white rounded-lg
           hover:bg-mayormoto-blue-hover"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
