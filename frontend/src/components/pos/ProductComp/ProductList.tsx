import { Search } from "lucide-react";
import generateSKU from "../../../utils/skuGenerator";
import KebabMenu from "../menu/Kebab";
import { useState } from "react";
import ProductModal from "../../modal/AddProduct";
import ProductDetails from "./ProductDetails";

export default function ProductList() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [viewProductDetails, setViewProductDetails] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center bg-white border border-gray-300 w-1/2 rounded
      px-2 py-2"
          >
            <Search className="text-gray-400" />
            <input
              type="text"
              className="outline-0 w-full h-full px-1 text-sm"
              placeholder="Search using name or sku..."
            />
          </div>
          <div className="flex gap-2 w-full justify-end items-center">
            <select
              className="bg-white border border-gray-300 rounded 
        px-6 py-3 text-sm font-medium text-gray-600"
            >
              <option value="all">All Categories</option>
              <option value="active">Helmet</option>
              <option value="archived">Top Box</option>
            </select>
            <button
              className="bg-mayormoto-blue text-white px-6 w-fit font-medium
           py-3 text-sm rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Product Logs
            </button>
            <button
              onClick={() => setOpenAddProduct(!openAddProduct)}
              className="bg-mayormoto-blue text-white px-6 w-fit font-medium
           py-3 text-sm rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className={`flex-1 bg-white w-full rounded shadow-1`}>
              <table className="w-full text-sm text-left">
                <thead
                  className="text-xs tracking-wider text-gray-500 border-b 
            border-gray-200 font-medium uppercase bg-gray-100"
                >
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-md text-gray-600 font-medium">
                  <tr
                    onClick={() => setViewProductDetails(!viewProductDetails)}
                    className="border-b border-gray-200 hover:bg-gray-50 
               cursor-pointer"
                  >
                    <td className="p-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 flex items-center justify-center">
                          <img
                            className="w-auto h-auto"
                            src="https://res.cloudinary.com/dvexdyqea/image/upload/v1745225825/Gille_Stripe_M-Grey_-_4_295_bgbdce.png"
                          />
                        </span>
                        <div className="flex flex-col gap-1 items-center">
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
                    <td className="py-4 px-6">
                      {generateSKU({
                        name: "Kerena",
                        brand: "Zebra",
                        variant: null,
                        category: "Helmet",
                        color: "Green",
                      })}
                    </td>
                    <td className="py-4 px-6">100 unit/s</td>
                    <td className="py-4 px-6">04-21-25</td>
                    <td className="py-4 px-6">
                      <KebabMenu
                        items={[
                          {
                            label: "View",
                            onClick: () => console.log("View clicked"),
                          },
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
              {/* PAGINATION & ROW NUMBERS */}
              <div className="text-sm px-6 py-2 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span>Show</span>
                  <select
                    className="border border-gray-300 rounded px-2 py-1
                   font-medium text-gray-600"
                  >
                    <option>10 entries</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span>Previous</span>
                  <span className="text-gray-500">Showing 1 to 10 of 50</span>
                  <span>Next</span>
                </div>
              </div>
              {/* END ================================ END */}
            </div>
          </div>
        </div>
      </div>

      {openAddProduct && (
        <ProductModal
          isOpen={openAddProduct}
          onClose={() => setOpenAddProduct(!openAddProduct)}
        />
      )}
      {viewProductDetails && (
        <ProductDetails
          isOpen={viewProductDetails}
          onClose={() => setViewProductDetails(!viewProductDetails)}
        />
      )}
    </>
  );
}
