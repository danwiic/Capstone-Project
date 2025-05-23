type StatusValue =
  | "placed"
  | "PLACED"
  | "active"
  | "ACTIVE"
  | "inactive"
  | "INACTIVE"
  | "processing"
  | "PROCESSING"
  | "shipped"
  | "SHIPPED"
  | "completed"
  | "COMPLETED"
  | "cancelled"
  | "CANCELLED"
  | "Low Stock"
  | "LOW STOCK"
  | "Out of Stock"
  | "OUT OF STOCK"
  | "In Stock"
  | "IN STOCK"
  | "On Hold"
  | "ON HOLD";

type Props = {
  status: StatusValue | string; // Allow any string value
};

export default function Status({ status }: Props) {
  // Normalize status to lowercase for comparison
  const normalizedStatus = status.toLowerCase();
  // Convert to uppercase for display
  const displayStatus = status.toUpperCase();

  return (
    <div
      className={`${
        normalizedStatus === "placed"
          ? "bg-yellow-100 text-yellow-800"
          : normalizedStatus === "processing"
          ? "bg-blue-100 text-blue-800"
          : normalizedStatus === "shipped"
          ? "bg-green-100 text-green-800"
          : normalizedStatus === "completed"
          ? "bg-green-100 text-green-800"
          : normalizedStatus === "cancelled"
          ? "bg-red-100 text-red-800"
          : normalizedStatus === "inactive"
          ? "bg-gray-100 text-gray-800"
          : normalizedStatus === "active"
          ? "bg-green-100 text-green-800"
          : normalizedStatus === "low stock"
          ? "bg-yellow-100 text-yellow-800"
          : normalizedStatus === "out of stock"
          ? "bg-red-100 text-red-800"
          : normalizedStatus === "in stock"
          ? "bg-green-100 text-green-800"
          : ""
      } py-1 px-2 rounded-md text-sm font-medium w-fit`}
    >
      {displayStatus}
    </div>
  );
}
