import Layout from "../../components/pos/nav/Layout";
import EditProduct from "../../components/pos/cards/EditProduct";

export default function Products() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-xl">Products</span>
          <div className="flex gap-2 w-full max-w-[20rem]">
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-3 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Product Logs
            </button>
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-3 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              + New Product
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
       
          {/* Main content */}

          <div className=" flex-1 overflow-auto grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <EditProduct key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
