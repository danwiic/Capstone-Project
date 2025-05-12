import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import generateSKU from "../../../utils/skuGenerator";
import AddProduct from "../../modal/AddProduct";
import { formatMoney } from "../../../utils/formatMoney";
import { getAllProducts } from "../../../services/products.ts";
import formatDate from "../../../utils/formatDate.ts";
import SpinningLoader from "../../loader/SpinningLoader.tsx";
interface ProductListProps {
  onProductSelect: (productId: string) => void;
}

export default function ProductList({ onProductSelect }: ProductListProps) {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductList(data);
        console.log("Product List:", data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex relative justify-between items-center">
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
              {productList.length > 0 && productList ? (
                <>
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
                        <th className="px-6 py-4">Created by</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-md text-gray-600 font-medium">
                      {productList &&
                        productList.map((prod: any) => (
                          <tr
                            onClick={() => onProductSelect(prod.id)} // Pass the product ID when row is clicked
                            className="border-b border-gray-200 hover:bg-gray-50 
                 cursor-pointer"
                          >
                            <td className="p-6 py-4 max-w-[25rem]">
                              <div className="flex items-center gap-4 w-full">
                                <span className="w-10 h-10 flex items-center justify-center">
                                  <img
                                    className="w-auto h-auto"
                                    src={
                                      prod?.ProductImage?.[0]?.imageUrl ||
                                      "/placeholder.png"
                                    }
                                    alt={prod.name}
                                  />
                                </span>
                                <div className="flex flex-col gap-1 items-start w-[15rem]">
                                  <span className="text-md font-medium truncate w-full block">
                                    {prod.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {prod?.ProductVariant?.length > 0 ? (
                                      <span>
                                        Variant: {prod.ProductVariant?.length}
                                      </span>
                                    ) : (
                                      <span className="text-gray-500 text-xs">
                                        No variants available
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">{prod.category.name}</td>
                            <td className="py-4 px-6">
                              {formatMoney(
                                prod.price || prod.ProductVariant[0].price
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {generateSKU({
                                brand: prod.brand.name,
                                category: prod.category.name,
                                id: prod.id,
                              })}
                            </td>
                            <td className="py-4 px-6">
                              {prod?.stock < 0
                                ? 0
                                : prod?.stock |
                                  prod?.ProductVariant.map((variant: any) => {
                                    variant.stock + variant.stock;
                                  })}
                            </td>
                            <td className="py-4 px-6">
                              {formatDate(prod.createdAt)}
                            </td>
                            <td className="py-4 px-6">Dan</td>
                          </tr>
                        ))}
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
                      <span className="text-gray-500">
                        Showing 1 to 10 of 50
                      </span>
                      <span>Next</span>
                    </div>
                  </div>
                  {/* END ================================ END */}
                </>
              ) : (
                <SpinningLoader />
              )}
            </div>
          </div>
        </div>
      </div>

      {openAddProduct && (
        <AddProduct
          isOpen={openAddProduct}
          onClose={() => setOpenAddProduct(!openAddProduct)}
        />
      )}
    </>
  );
}
