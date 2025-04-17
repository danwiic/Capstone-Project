import PosProduct from "../../components/pos/cards/PosProduct";
import Categories from "../../components/pos/categories/Categories";
import Layout from "../../components/pos/nav/Layout";
import OrderDetails from "../../components/pos/order_details/OrderDetails";

export default function PosTerminal() {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-20px)] gap-4 ">
        <div
          className="flex-1 overflow-y-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl flex flex-col gap-2"
        >
          <span className="font-medium text-lg">Categories</span>
          <div>
            <Categories />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <PosProduct />
            <PosProduct />
            <PosProduct />
            <PosProduct />
            <PosProduct />
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
