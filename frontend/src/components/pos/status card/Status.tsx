type StatusType =
  | "placed"
  | "packed"
  | "shipped"
  | "completed"
  | "default"
  | "cancelled"
  | "inactive"
  | "active"
  | "low stock"
  | "out of stock"
  | "in stock"
  | "on leave"
  | "blocked";

const statusClasses: Record<StatusType, string> = {
  placed: "bg-yellow-100 text-yellow-800",
  packed: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  completed: "bg-green-100 text-green-800",
  default: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  inactive: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  "low stock": "bg-yellow-100 text-yellow-800",
  "out of stock": "bg-red-100 text-red-800",
  "in stock": "bg-green-100 text-green-800",
  "on leave": "bg-orange-100 text-orange-800",
  blocked: "bg-red-100 text-red-800",
};

export default function Status({ status }: { status: string }) {
  const normalizedStatus = status.trim().toLowerCase();
  const displayStatus = status.toUpperCase();
  const classes =
    statusClasses[normalizedStatus as StatusType] ??
    "bg-gray-100 text-gray-800";

  return (
    <div
      className={`${classes} text-xs uppercase font-semibold p-1 px-2 rounded-full text-center w-fit`}
    >
      {displayStatus}
    </div>
  );
}
