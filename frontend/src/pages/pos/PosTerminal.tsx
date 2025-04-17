import Layout from "../../components/pos/nav/Layout";

export default function PosTerminal() {
  return (
    <Layout>
      <div className="flex gap-4">
        <div className="w-full p-4 bg-yellow-50"></div>
        <div className="w-auto flex flex-col gap-4 bg-red-200 p-4">
          <div className="bg-white p-2 w-full rounded-xs">
            <div>
              <span>Order Details</span>
            </div>
            <div>
              <span>Ordered Items</span>
            </div>
          </div>

          <div className="bg-white p-2 w-full rounded-xs">
            <span>Order Details</span>
            <span>Order Details</span>
            <span>Order Details</span>
            <span>Order Details</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
