import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  User,
  Package,
  Plus,
  Edit,
  DollarSign,
  Warehouse,
  ArrowUp,
  ArrowDown,
  Eye,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Download,
  Clock,
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  action:
    | "created"
    | "updated"
    | "deleted"
    | "stock_in"
    | "stock_out"
    | "price_change"
    | "metadata_update"
    | "viewed"
    | "bulk_update";
  productId: string;
  productName: string;
  productSku: string;
  category: string;
  user: string;
  userRole: string;
  details: {
    field?: string;
    oldValue?: string;
    newValue?: string;
    quantity?: number;
    reason?: string;
    changes?: Array<{
      field: string;
      oldValue: string;
      newValue: string;
    }>;
  };
  severity: "low" | "medium" | "high";
  ipAddress?: string;
  userAgent?: string;
}

const Test: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("7d");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Mock audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: "log_001",
      timestamp: "2024-06-09 10:32:15",
      action: "stock_in",
      productId: "MP-2024-001",
      productName: "Premium Brake Disc Set - Front",
      productSku: "YAM-BD-320-STD",
      category: "Brake Components",
      user: "Mike Chen",
      userRole: "Inventory Manager",
      details: {
        quantity: 50,
        reason: "New shipment received from supplier",
      },
      severity: "low",
      ipAddress: "192.168.1.100",
    },
    {
      id: "log_002",
      timestamp: "2024-06-09 09:45:22",
      action: "price_change",
      productId: "MP-2024-002",
      productName: "Carbon Fiber Exhaust System",
      productSku: "HON-EX-CF-001",
      category: "Exhaust Systems",
      user: "Sarah Johnson",
      userRole: "Product Manager",
      details: {
        field: "price",
        oldValue: "$899.99",
        newValue: "$849.99",
        reason: "Promotional pricing",
      },
      severity: "medium",
      ipAddress: "192.168.1.105",
    },
    {
      id: "log_003",
      timestamp: "2024-06-09 08:15:33",
      action: "created",
      productId: "MP-2024-012",
      productName: "LED Headlight Assembly",
      productSku: "UNI-LED-H4-001",
      category: "Lighting",
      user: "Alex Rodriguez",
      userRole: "Product Manager",
      details: {
        reason: "New product added to catalog",
      },
      severity: "low",
      ipAddress: "192.168.1.102",
    },
    {
      id: "log_004",
      timestamp: "2024-06-08 16:20:11",
      action: "stock_out",
      productId: "MP-2024-003",
      productName: "Performance Air Filter",
      productSku: "KAW-AF-K001",
      category: "Air Intake",
      user: "System",
      userRole: "Automated",
      details: {
        quantity: 5,
        reason: "Customer order fulfillment",
      },
      severity: "low",
      ipAddress: "127.0.0.1",
    },
    {
      id: "log_005",
      timestamp: "2024-06-08 14:55:44",
      action: "metadata_update",
      productId: "MP-2024-001",
      productName: "Premium Brake Disc Set - Front",
      productSku: "YAM-BD-320-STD",
      category: "Brake Components",
      user: "Sarah Johnson",
      userRole: "Product Manager",
      details: {
        changes: [
          {
            field: "description",
            oldValue: "High-performance brake disc",
            newValue:
              "High-performance front brake disc set designed for optimal stopping power",
          },
          { field: "weight", oldValue: "2.5 kg", newValue: "2.3 kg" },
        ],
      },
      severity: "low",
      ipAddress: "192.168.1.105",
    },
    {
      id: "log_006",
      timestamp: "2024-06-08 13:30:15",
      action: "deleted",
      productId: "MP-2024-008",
      productName: "Discontinued Spark Plug Set",
      productSku: "OLD-SP-001",
      category: "Engine Components",
      user: "Mike Chen",
      userRole: "Inventory Manager",
      details: {
        reason: "Product discontinued by manufacturer",
      },
      severity: "high",
      ipAddress: "192.168.1.100",
    },
    {
      id: "log_007",
      timestamp: "2024-06-08 11:45:30",
      action: "bulk_update",
      productId: "BULK_OP_001",
      productName: "Multiple Products (15 items)",
      productSku: "BULK",
      category: "Various",
      user: "Alex Rodriguez",
      userRole: "Product Manager",
      details: {
        reason: "Bulk price update for summer sale",
        changes: [{ field: "discount", oldValue: "0%", newValue: "15%" }],
      },
      severity: "medium",
      ipAddress: "192.168.1.102",
    },
    {
      id: "log_008",
      timestamp: "2024-06-07 15:22:18",
      action: "updated",
      productId: "MP-2024-005",
      productName: "Titanium Chain Set",
      productSku: "SUZ-CH-TI-001",
      category: "Drive Train",
      user: "Emma Wilson",
      userRole: "Junior Manager",
      details: {
        changes: [
          {
            field: "compatible_models",
            oldValue: "GSX-R1000",
            newValue: "GSX-R1000, GSX-R750",
          },
        ],
      },
      severity: "low",
      ipAddress: "192.168.1.108",
    },
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return <Plus className="w-4 h-4 text-green-600" />;
      case "updated":
        return <Edit className="w-4 h-4 text-blue-600" />;
      case "deleted":
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case "stock_in":
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case "stock_out":
        return <ArrowDown className="w-4 h-4 text-orange-600" />;
      case "price_change":
        return <DollarSign className="w-4 h-4 text-purple-600" />;
      case "metadata_update":
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case "viewed":
        return <Eye className="w-4 h-4 text-gray-600" />;
      case "bulk_update":
        return <Package className="w-4 h-4 text-indigo-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-green-100 text-green-800";
      case "updated":
        return "bg-blue-100 text-blue-800";
      case "deleted":
        return "bg-red-100 text-red-800";
      case "stock_in":
        return "bg-green-100 text-green-800";
      case "stock_out":
        return "bg-orange-100 text-orange-800";
      case "price_change":
        return "bg-purple-100 text-purple-800";
      case "metadata_update":
        return "bg-blue-100 text-blue-800";
      case "viewed":
        return "bg-gray-100 text-gray-800";
      case "bulk_update":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        searchTerm === "" ||
        log.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.productSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction =
        selectedAction === "all" || log.action === selectedAction;
      const matchesUser = selectedUser === "all" || log.user === selectedUser;
      const matchesSeverity =
        selectedSeverity === "all" || log.severity === selectedSeverity;

      return matchesSearch && matchesAction && matchesUser && matchesSeverity;
    });
  }, [auditLogs, searchTerm, selectedAction, selectedUser, selectedSeverity]);

  const uniqueUsers = [...new Set(auditLogs.map((log) => log.user))];
  const uniqueActions = [...new Set(auditLogs.map((log) => log.action))];

  const formatActionText = (action: string) => {
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderLogDetails = (log: AuditLog) => {
    switch (log.action) {
      case "stock_in":
      case "stock_out":
        return (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Quantity:</span>{" "}
            {log.details.quantity} units
            {log.details.reason && (
              <div>
                <span className="font-medium">Reason:</span>{" "}
                {log.details.reason}
              </div>
            )}
          </div>
        );
      case "price_change":
        return (
          <div className="text-sm text-gray-600">
            <span className="line-through text-red-600">
              {log.details.oldValue}
            </span>
            <span className="mx-2">→</span>
            <span className="text-green-600 font-medium">
              {log.details.newValue}
            </span>
            {log.details.reason && (
              <div>
                <span className="font-medium">Reason:</span>{" "}
                {log.details.reason}
              </div>
            )}
          </div>
        );
      case "metadata_update":
      case "updated":
        return (
          <div className="text-sm text-gray-600">
            {log.details.changes?.map((change, index) => (
              <div key={index} className="mb-1">
                <span className="font-medium">{change.field}:</span>
                <span className="ml-2 line-through text-red-600">
                  {change.oldValue}
                </span>
                <span className="mx-2">→</span>
                <span className="text-green-600 font-medium">
                  {change.newValue}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          log.details.reason && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Reason:</span> {log.details.reason}
            </div>
          )
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Audit Logs
          </h1>
          <p className="text-gray-600">
            Track all product-related activities and changes across your
            inventory
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name, SKU, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action Type
                </label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Actions</option>
                  {uniqueActions.map((action) => (
                    <option key={action} value={action}>
                      {formatActionText(action)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Users</option>
                  {uniqueUsers.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Severities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1d">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredLogs.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  High Severity
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredLogs.filter((log) => log.severity === "high").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Stock Changes
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    filteredLogs.filter(
                      (log) =>
                        log.action === "stock_in" || log.action === "stock_out"
                    ).length
                  }
                </p>
              </div>
              <Warehouse className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(filteredLogs.map((log) => log.user)).size}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Timestamp
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Action
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    User
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Details
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900 font-medium">
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(
                            log.action
                          )}`}
                        >
                          {formatActionText(log.action)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">
                          {log.productName}
                        </div>
                        <div className="text-sm text-gray-600">
                          SKU: {log.productSku} • {log.category}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">
                          {log.user}
                        </div>
                        <div className="text-sm text-gray-600">
                          {log.userRole}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{renderLogDetails(log)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <span className="text-sm capitalize">
                          {log.severity}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No audit logs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredLogs.length} of {auditLogs.length} audit logs
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
