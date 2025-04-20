import PosProduct from "../../components/pos/cards/PosProduct";
import Categories from "../../components/pos/categories/Categories";
import Layout from "../../components/pos/nav/Layout";
import OrderDetails from "../../components/pos/order_details/OrderDetails";
import { IoSearchSharp } from "react-icons/io5";

export default function PosTerminal() {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-20px)] gap-4 ">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-xl">POS</span>
            <div className="bg-white border border-gray-300 rounded flex items-center">
              <input
                className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                placeholder="Search products..."
                type="text"
              />
              <button className="px-4 py-2">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          <div>
            <Categories />
          </div>

          <div
            className="grid grid-cols-4 gap-2  overflow-y-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl"
          >
            {Array.from({ length: 20 }, (_, index) => (
              <PosProduct key={index} />
            ))}
          </div>
        </div>

        <div
          className="w-96 overflow-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl h-full p-0"
        >
          <OrderDetails />
        </div>
      </div>
    </Layout>
  );
}
