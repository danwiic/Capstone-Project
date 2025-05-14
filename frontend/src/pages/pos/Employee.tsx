import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import {
  UserPlus,
  Filter,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  ArrowUpDown,
  Edit,
  UserCog,
  Key,
  Eye,
  UserX,
  Archive,
} from "lucide-react";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import Status from "../../components/pos/status card/Status";
import KebabMenu from "../../components/pos/menu/Kebab";

// Sample employee data
const employees = [
  {
    id: "EMP-001",
    name: "Dan Pirante",
    email: "dan@example.com",
    contact: "09123456789",
    status: "active",
    role: "Store Manager",
    department: "Operations",
    createdOn: "April 16, 2025",
  },
  {
    id: "EMP-002",
    name: "Emma Johnson",
    email: "emma@example.com",
    contact: "09187654321",
    status: "active",
    role: "Sales Associate",
    department: "Sales",
    createdOn: "March 22, 2025",
  },
  {
    id: "EMP-003",
    name: "Michael Chen",
    email: "michael@example.com",
    contact: "09198765432",
    status: "inactive",
    role: "Inventory Specialist",
    department: "Warehouse",
    createdOn: "February 15, 2025",
  },
  {
    id: "EMP-004",
    name: "Sarah Garcia",
    email: "sarah@example.com",
    contact: "09112345678",
    status: "active",
    role: "Customer Service",
    department: "Support",
    createdOn: "April 10, 2025",
  },
  {
    id: "EMP-005",
    name: "James Wilson",
    email: "james@example.com",
    contact: "09111222333",
    status: "on leave",
    role: "Mechanic",
    department: "Service",
    createdOn: "January 5, 2025",
  },
];

// Employee roles data

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Handle selecting all items
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(employees.map((emp) => emp.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle selecting individual item
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle view employee
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const filterEmployees = employees.filter((emp) => {
    const filterResult =
      selectedFilter === "all" || emp.status === selectedFilter;

    const searchResult =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.contact.includes(searchTerm);

    return filterResult && searchResult;
  });

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Employee Management
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage your staff and access privileges
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 
            rounded-lg hover:bg-gray-50 text-sm"
            >
              <Archive size={18} />
              <span>Archived Accounts</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-mayormoto-blue text-white rounded-lg
               hover:bg-mayormoto-blue-hover text-sm"
            >
              <UserPlus size={18} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Status Tabs */}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-wrap border-b border-gray-200 text-sm">
            {["all", "active", "inactive", "on leave"].map((status) => (
              <div
                key={status}
                onClick={() => setSelectedFilter(status)}
                className={`flex items-center px-6 py-4 cursor-pointer ${
                  selectedFilter === status
                    ? "border-b font-medium  border-mayormoto-blue text-mayormoto-blue"
                    : ""
                }`}
              >
                <span className="capitalize">{status}</span>
              </div>
            ))}
          </div>
          <div
            className="p-4 flex flex-col sm:flex-row justify-between 
          text-sm items-center gap-4"
          >
            <div
              className="bg-white border border-gray-300 rounded-lg flex 
            items-center flex-1"
            >
              <input
                className="outline-none px-4 py-2.5 text-sm text-gray-600 w-full rounded-lg"
                placeholder="Search by name, email, or employee ID..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="px-4 py-2 text-gray-500">
                <IoSearchSharp size={20} />
              </button>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-mayormoto-blue text-white rounded-lg
               hover:bg-mayormoto-blue-hover text-sm"
              >
                <TfiExport size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="px-4 pb-4 pt-1 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Join Date:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm">
                      <Calendar size={14} />
                      <span>From</span>
                    </button>
                    <span className="text-gray-400">-</span>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm">
                      <Calendar size={14} />
                      <span>To</span>
                    </button>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <Table.DataTable>
            <Table.TableHead>
              <Table.TableRow>
                <Table.Header position="left">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === employees.length &&
                      employees.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </Table.Header>
                <Table.Header>
                  <div className="flex items-center gap-1">
                    Employee ID
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </Table.Header>
                <Table.Header>Name</Table.Header>
                <Table.Header>Email</Table.Header>
                <Table.Header>Contact #</Table.Header>
                <Table.Header>Status</Table.Header>
                <Table.Header>
                  <div className="flex items-center gap-1">
                    Created On
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </Table.Header>
                <Table.Header></Table.Header>
              </Table.TableRow>
            </Table.TableHead>
            <Table.TableBody>
              {filterEmployees.map((employee) => (
                <Table.TableRow key={employee.id}>
                  <Table.Data>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(employee.id)}
                      onChange={() => handleSelectItem(employee.id)}
                      className="rounded"
                    />
                  </Table.Data>
                  <Table.Data className="font-medium text-blue-600">
                    {employee.id}
                  </Table.Data>
                  <Table.Data>{employee.name}</Table.Data>
                  <Table.Data>{employee.email}</Table.Data>
                  <Table.Data>{employee.contact}</Table.Data>
                  <Table.Data>
                    <Status status={employee.status} />
                  </Table.Data>
                  <Table.Data>{employee.createdOn}</Table.Data>
                  <Table.Data>
                    <KebabMenu
                      items={[
                        {
                          label: "View Profile",
                          onClick: () => handleViewEmployee(employee),
                        },
                        {
                          label: "Edit Employee",
                          onClick: () => console.log("edit", employee.id),
                        },
                        {
                          label: "Change Password",
                          onClick: () =>
                            console.log("change password", employee.id),
                        },
                        {
                          label: "Change Permissions",
                          onClick: () =>
                            console.log("change permissions", employee.id),
                        },
                        {
                          label:
                            employee.status === "active"
                              ? "Deactivate"
                              : "Activate",
                          onClick: () =>
                            console.log("toggle status", employee.id),
                        },
                        {
                          label: "Archive",
                          onClick: () => console.log("Archive", employee.id),
                        },
                      ]}
                    />
                  </Table.Data>
                </Table.TableRow>
              ))}
            </Table.TableBody>
          </Table.DataTable>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Employee
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                  <div key={perm} className="flex items-center">
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

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <div className="fixed text-sm inset-0 bg-black/45 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Employee Profile
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
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
                <p className="text-gray-500">{selectedEmployee.role}</p>
                <div className="mt-3">
                  <Status status={selectedEmployee.status} />
                </div>

                <div className="pt-6 flex flex-col gap-1 text-sm w-full">
                  <button className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-2">
                    <Edit size={16} />
                    <span>Edit Profile</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mb-2">
                    <Key size={16} />
                    <span>Reset Password</span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 gap-4">
                  <div className="border-b pb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-2" />
                        <p className="text-gray-800">
                          {selectedEmployee.email}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-400 mr-2" />
                        <p className="text-gray-800">
                          {selectedEmployee.contact}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
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
                        <div key={perm} className="flex items-center">
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

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <button
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  onClick={() => {
                    console.log("deactivate", selectedEmployee.id);
                    setShowViewModal(false);
                  }}
                >
                  <UserX size={16} />
                  <span>
                    {selectedEmployee.status === "active"
                      ? "Deactivate Account"
                      : "Activate Account"}
                  </span>
                </button>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
