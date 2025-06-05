import { useState } from "react";
import {
  UserPlus,
  Archive,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Layout from "../../components/pos/nav/Layout";
import KebabMenu from "../../components/pos/menu/Kebab";
import AddEmp from "../../components/modal/AddEmp";
import ViewEmpDetails from "../../components/modal/ViewEmpDetails";
import formatDate from "../../utils/formatDate";
import Status from "../../components/pos/status card/Status";

// Sample employee data
const employees = [
  {
    id: "EMP-001",
    name: "Dan Pirante",
    email: "dan@example.com",
    contact: "09123456789",
    status: "Active",
    createdOn: "April 16, 2025",
  },
  {
    id: "EMP-002",
    name: "Emma Johnson",
    email: "emma@example.com",
    contact: "09187654321",
    status: "Active",
    createdOn: "March 22, 2025",
  },
  {
    id: "EMP-003",
    name: "Michael Chen",
    email: "michael@example.com",
    contact: "09198765432",
    status: "Inactive",
    createdOn: "February 15, 2025",
  },
  {
    id: "EMP-004",
    name: "Sarah Garcia",
    email: "sarah@example.com",
    contact: "09112345678",
    status: "Active",
    createdOn: "April 10, 2025",
  },
  {
    id: "EMP-005",
    name: "James Wilson",
    email: "james@example.com",
    contact: "09111222333",
    status: "On Leave",
    createdOn: "January 5, 2025",
  },
];

interface Employees {
  id: string;
  name: string;
  email: string;
  contact: string;
  status: "Active" | "Inactive" | "On Leave";
  createdOn: string;
}

const filterOptions = ["All", "Active", "Inactive", "On Leave"];

// Employee roles data

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employees | null>(
    null
  );

  // Handle selecting all items
  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      setSelectedItems(employees.map((emp) => emp.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle selecting individual item
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const filterEmployees = employees.filter((emp) => {
    const filterResult =
      selectedFilter === "All" || emp.status === selectedFilter;

    const searchResult =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.contact.includes(searchTerm);

    return filterResult && searchResult;
  });

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 w-full mx-auto">
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

          <div className=" w-1/3">
            <div
              className="bg-white px-4 py-1 text-sm rounded border
               w-full border-gray-200 flex items-center justify-between"
            >
              <input
                type="text"
                value={searchTerm}
                className="w-full outline-none "
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or contact"
              />
              <button>
                <Search />
              </button>
            </div>
          </div>

          <div className="bg-white flex flex-col border border-gray-300 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center px-4">
                {filterOptions.map((opt, i) => (
                  <button
                    className={`px-3 py-4.5 text-sm font-medium ${
                      selectedFilter === opt
                        ? "border-b-2 border-mayormoto-blue text-mayormoto-blue"
                        : "border-b-2 border-transparent "
                    } `}
                    onClick={() => setSelectedFilter(opt)}
                    key={i}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {filterEmployees.length > 0 ? (
              <table>
                <thead>
                  <tr className="text-sm border-y border-gray-200 text-left">
                    <th className="px-7 py-3 text-gray-500">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length === employees.length &&
                          employees.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-7 py-3 text-gray-500">Employee ID</th>
                    <th className="px-7 py-3 text-gray-500 ">Name</th>
                    <th className="px-7 py-3 text-gray-500">Email</th>
                    <th className="px-7 py-3 text-gray-500">Contact</th>
                    <th className="px-7 py-3 text-gray-500">Status</th>
                    <th className="px-7 py-3 text-gray-500">Created On</th>
                    <th className="px-7 py-3 text-gray-500">Last Online</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filterEmployees.map((emp, i) => (
                    <tr
                      key={i}
                      className="text-left text-sm border-b 
                    border-gray-200"
                    >
                      <td className="px-7 py-3 text-gray-500 font-medium">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(emp.id)}
                          onChange={() => handleSelectItem(emp.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-7 py-3 text-gray-500 font-medium">
                        {emp.id}
                      </td>
                      <td className="px-7 py-3 text-gray-500 font-semibold">
                        {emp.name}
                      </td>
                      <td className="px-7 py-3 text-gray-500">{emp.email}</td>
                      <td className="px-7 py-3 text-gray-500">{emp.contact}</td>
                      <td className="px-7 py-3 text-gray-500">
                        <Status status={emp.status} />
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        {formatDate(emp.createdOn)}
                      </td>
                      <td className="px-7 py-3 text-gray-500">
                        {formatDate(emp.createdOn)}
                      </td>
                      <td>
                        <KebabMenu
                          items={[
                            {
                              label: "View Profile",
                              onClick: () => {
                                setSelectedEmployee(emp as Employees);
                                setShowViewModal((prev) => !prev);
                              },
                            },
                            {
                              label: "Edit Employee",
                              onClick: () => console.log("edit", emp.id),
                            },
                            {
                              label: "Change Password",
                              onClick: () =>
                                console.log("change password", emp.id),
                            },
                            {
                              label: "Change Permissions",
                              onClick: () =>
                                console.log("change permissions", emp.id),
                            },
                            {
                              label:
                                emp.status === "active"
                                  ? "Deactivate"
                                  : "Activate",
                              onClick: () =>
                                console.log("toggle status", emp.id),
                            },
                            {
                              label: "Archive",
                              onClick: () => console.log("Archive", emp.id),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 flex items-center justify-center">
                <p className="text-sm text-gray-500">
                  No matching employee found.
                </p>
              </div>
            )}
            {filterEmployees.length > 0 && (
              <div className="px-3 py-2 flex items-center justify-between ">
                <div>
                  <span className="text-gray-500 text-sm px-4 py-2">
                    Showing {filterEmployees.length} of {filterEmployees.length}{" "}
                    transactions
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <button>
                    <ChevronLeft size={18} className="text-gray-500" />
                  </button>
                  <span className="px-3 text-gray-500">1</span>
                  <button>
                    <ChevronRight size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Employee Modal */}

        {/* View Employee Modal */}
      </Layout>
      {showAddModal && (
        <AddEmp
          isOpen={showAddModal}
          onClose={() => setShowAddModal((prev) => !prev)}
        />
      )}

      {showViewModal && selectedEmployee && (
        <ViewEmpDetails
          isOpen={showViewModal}
          onClose={() => setShowViewModal((prev) => !prev)}
          selectedEmployee={selectedEmployee}
        />
      )}
    </>
  );
}
