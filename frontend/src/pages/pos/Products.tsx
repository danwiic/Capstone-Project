import Layout from "../../components/pos/nav/Layout";
import KebabMenu from "../../components/pos/menu/Kebab";
import { Search } from "lucide-react";
export default function Products() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center  border border-gray-300 w-1/2 rounded
          px-2 py-2"
          >
            <Search className="text-gray-400" />
            <input
              type="text"
              className="outline-0 w-full h-full px-1 text-sm"
              placeholder="Search using name or sku..."
            />
          </div>
          <div className="flex gap-2 w-full max-w-[20rem]">
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-3 text-sm rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Product Logs
            </button>
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-3 text-sm rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className={`flex-1`}>
              <table className="bg-white w-full rounded shadow-1 text-sm text-left">
                <thead
                  className="text-xs tracking-wider text-gray-600 border-b 
                border-gray-200 font-medium uppercase"
                >
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-md">
                  <tr>
                    <td className="p-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 flex items-center justify-center">
                          <img src="https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png" />
                        </span>
                        <div className="flex flex-col items-center">
                          <span className="text-md font-medium">
                            Helmet Zebra 432
                          </span>
                          <span className="text-xs text-gray-500">
                            No variants
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">Helmet</td>
                    <td className="py-4 px-6">2,000</td>
                    <td className="py-4 px-6">GL-HEL-MT-GREEN-M</td>
                    <td className="py-4 px-6">100</td>
                    <td className="py-4 px-6">
                      <KebabMenu
                        items={[
                          {
                            label: "Edit",
                            onClick: () => console.log("Edit clicked"),
                          },
                          {
                            label: "Archive",
                            onClick: () => console.log("archived clicked"),
                          },
                          {
                            label: "Delete",
                            onClick: () => console.log("Delete clicked"),
                            className: "text-red-600 hover:text-red-700",
                          },
                        ]}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
