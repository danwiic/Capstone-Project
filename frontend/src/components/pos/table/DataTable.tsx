export default function DataTable({ children }: any) {
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

          {/* <div className="flex gap-1 items-center text-gray-500 text-sm">
            <span>Status</span>
            <select
              className="border rounded border-gray-300 
                      text-sm p-1 text-center text-gray-600"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div> */}
        </div>
      </div>
      <table className="w-full">{children}</table>
      <div className="flex justify-between items-center">
        <span className="text-sm">Showing 5 entries</span>
        <div className="flex justify-between gap-20 text-sm">
          <button disabled>Previous</button>
          <div className="flex gap-1">
            <span
              className="w-6 h-6 text-white flex items-center justify-center 
            bg-mayormoto-blue rounded cursor-pointer"
            >
              1
            </span>
            <span
              className="w-6 h-6  flex items-center justify-center 
            hover:bg-gray-300 rounded cursor-pointer"
            >
              2
            </span>
            <span
              className="w-6 h-6  flex items-center justify-center 
            hover:bg-gray-300 rounded cursor-pointer"
            >
              3
            </span>
          </div>
          <button className="cursor-pointer">Next</button>
        </div>
      </div>
    </div>
  );
}
