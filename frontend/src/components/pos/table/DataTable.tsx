import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DataTable({
  children,
  status,
  date,
  category,
  brand,
}: any) {
  return (
    <div className="p-4 w-full flex flex-col gap-4 justify-between">
      <div
        className="flex justify-between 
                  items-center py-3 border-y border-gray-300
                  
                  "
      >
        <div className="flex gap-1 items-center text-gray-500 text-sm">
          <span>Show</span>
          <select
            className="border rounded border-gray-300 
                      text-sm p-1 text-center text-gray-600"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex gap-6 items-center">
          {status && (
            <div className="flex gap-1 items-center text-gray-500 text-sm">
              <span>Status</span>
              <select
                className="border rounded border-gray-300 
                      text-sm p-1 text-center text-gray-600"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Canceled</option>
              </select>
            </div>
          )}

          {date && (
            <div className="flex gap-1 items-center text-gray-500 text-sm">
              <span>Date</span>
              <select
                className="border rounded border-gray-300 
                  text-sm p-1 text-center text-gray-600"
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom Date</option>
              </select>
            </div>
          )}

          {category && (
            <div className="flex gap-2 items-center">
              <span className="text-gray-600">Category</span>
              <select
                className="border rounded border-gray-300 
                text-sm p-1 text-center text-gray-600"
              >
                <option>All Category</option>
                <option>1</option>
                <option>1</option>
              </select>
            </div>
          )}

          {brand && (
            <div className="flex gap-2 items-center">
              <span className="text-gray-600">Brand</span>
              <select
                className="border rounded border-gray-300 
               text-sm p-1 text-center text-gray-600"
              >
                <option>All Brand</option>
                <option>1</option>
                <option>1</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <table className="w-full">{children}</table>
      <div
        className="flex items-center justify-between border-t 
      border-gray-200 bg-gray-50 px-4 py-3 sm:px-6"
      >
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            className="relative inline-flex items-center 
          rounded-md border border-gray-300 bg-white px-4 py-2 text-sm 
          font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-md border 
          border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                <span className="sr-only">Previous</span>
                <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="relative inline-flex items-center border 
              border-gray-300 bg-mayormoto-blue px-4 py-2 text-sm font-medium 
              text-white focus:z-20"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center border 
              border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500
               hover:bg-gray-50 focus:z-20"
              >
                2
              </button>
              <button
                className="relative inline-flex items-center border 
              border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500
               hover:bg-gray-50 focus:z-20"
              >
                3
              </button>
              <button
                className="relative inline-flex items-center rounded-r-md border
               border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500
                hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <FiChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
