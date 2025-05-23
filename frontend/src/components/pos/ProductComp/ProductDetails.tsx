import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Archive, Trash2 } from "lucide-react";
import { formatMoney } from "../../../utils/formatMoney";
import Kebab from "../menu/Kebab";
import { getDetailedProduct } from "../../../services/products";
import formatDate from "../../../utils/formatDate";
import Status from "../status card/Status";
import UpdateVariant from "../../modal/UpdateVariant";
import UpdateStock from "../../modal/UpdateStock";
import SpinningLoader from "../../loader/SpinningLoader";
import generateSKU from "../../../utils/skuGenerator";
import AddVariant from "../../modal/AddVariant";

interface ProductDetailViewProps {
  productId: string;
  onBack: () => void;
}

interface ProductData {
  id: string;
  name: string;
  category: { name: string };
  brand: { name: string };
  price: number;
  sku?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  ProductImage: { imageUrl: string }[];
  ProductVariant: {
    id: string;
    productId: string;
    variantName: string;
    price: number;
    stock: number;
    reOrderLevel: number;
    sku: string;
    batches: [];
    updatedAt: string;
    createdAt: string;
  }[];
  totalStock: number;
}

export default function ProductDetails({
  productId,
  onBack,
}: ProductDetailViewProps) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"inventory" | "sales">(
    "inventory"
  );
  const [openUpdateVariant, setOpenUpdateVariant] = useState(false);
  const [openUpdateStock, setUpdateStock] = useState(false);
  const [_, setSelectedVariant] = useState<string>("");
  const [openAddVariant, setOpenAddVariant] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getDetailedProduct(productId);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [openUpdateVariant]);

  if (loading) {
    return (
      <div className="relative h-[40rem] flex items-center justify-center w-full ">
        <SpinningLoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-mayormoto-blue"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Product information */}
        <div className="bg-white rounded shadow-1 p-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Product image */}
            <div className="flex justify-center items-center">
              <img
                src={product?.ProductImage[0]?.imageUrl}
                alt={product?.name}
                className="max-h-64 object-contain"
              />
            </div>

            {/* Product details */}
            <div className="col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{product?.name}</h2>
                <p className="text-lg text-gray-600">
                  {formatMoney(
                    (product?.price || product?.ProductVariant[0]?.price) ?? 0
                  )}
                </p>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full w-fit">
                  {(() => {
                    const baseStock = product?.stock ?? 0;
                    const variantStock =
                      product?.ProductVariant?.reduce(
                        (sum, variant) => sum + (variant.stock ?? 0),
                        0
                      ) ?? 0;
                    const totalStock = Math.max(0, baseStock + variantStock);
                    return totalStock;
                  })()}{" "}
                  total stock
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">SKU</span>
                  <span className="font-medium">
                    {product &&
                      generateSKU({
                        brand: product.brand.name,
                        category: product.category.name,
                        id: product.id,
                      })}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium">{product?.category.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">Variants</span>
                  <span className="font-medium">
                    {product?.ProductVariant.length
                      ? product?.ProductVariant.length
                      : "No variants"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">Created On</span>
                  <span className="font-medium">
                    {formatDate(product?.createdAt ?? "")}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">Last Update</span>
                  <span className="font-medium">
                    {formatDate(product?.updatedAt ?? "")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Description</span>
                <p className="text-sm">No description available.</p>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  className="bg-mayormoto-blue text-white px-6 py-3 text-sm 
              rounded-sm hover:bg-mayormoto-blue-hover flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Product
                </button>
                <button
                  className="border border-gray-300 text-gray-600 px-6 py-3 text-sm 
              rounded-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Archive size={16} />
                  Archive Product
                </button>
                <button
                  className="border border-red-500 text-red-500 px-6 py-3 text-sm 
              rounded-sm hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*============================ VARIANT LIST ========================== */}
        {product?.ProductVariant && product?.ProductVariant?.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Product Variant</span>
              <button
                onClick={() => setOpenAddVariant((prev) => !prev)}
                className="px-3 py-2 text-white rounded bg-mayormoto-blue 
              hover:bg-mayormoto-blue-hover text-sm"
              >
                Add Variant
              </button>
            </div>
            <div className="bg-white rounded shadow-1">
              <table className="w-full text-sm text-left">
                <thead className="text-xs tracking-wider text-gray-500 border-b border-gray-200 font-medium uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-4">Variant</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Re-order Level</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Batches</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-md text-gray-600 font-medium">
                  {product?.ProductVariant &&
                    product?.ProductVariant?.length > 0 &&
                    product?.ProductVariant.map((variant) => (
                      <tr
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="p-6 py-4">{variant.variantName}</td>
                        <td className="p-6 py-4">
                          {formatMoney(variant.price)}
                        </td>
                        <td className="p-6 py-4">{variant.stock}</td>
                        <td className="p-6 py-4">{variant.reOrderLevel}</td>
                        <td className="p-6 py-4">
                          {generateSKU({
                            brand: product.brand.name,
                            category: product.category.name,
                            id: product.id,
                            variant: variant.variantName,
                          })}
                        </td>
                        <td className="p-6 py-4">
                          <Status
                            status={
                              variant.stock > variant.reOrderLevel
                                ? "In Stock"
                                : variant.stock === 0
                                ? "OUT OF STOCK"
                                : "LOW STOCK"
                            }
                          />
                        </td>
                        <td className="p-6 py-4">0</td>
                        <td className="p-6 py-4">
                          <Kebab
                            items={[
                              {
                                label: "Edit",
                                onClick: () =>
                                  setOpenUpdateVariant((prev) => !prev),
                              },
                              {
                                label: "Update Stock",
                                onClick: () => setUpdateStock((prev) => !prev),
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center gap-4">
              <span className="text-lg font-medium">
                No variants available.
              </span>
              <button
                onClick={() => setOpenAddVariant((prev) => !prev)}
                className="px-3 py-2 text-white rounded bg-mayormoto-blue 
              hover:bg-mayormoto-blue-hover text-sm"
              >
                Add Variant
              </button>
            </div>
          </>
        )}

        {/* Additional product information tabs */}
        <div className="bg-white rounded shadow-1">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`px-6 py-4 ${
                  activeTab === "inventory"
                    ? "text-mayormoto-blue border-b-2 border-mayormoto-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("inventory")}
              >
                Inventory
              </button>
              <button
                className={`px-6 py-4 ${
                  activeTab === "sales"
                    ? "text-mayormoto-blue border-b-2 border-mayormoto-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("sales")}
              >
                Sales History
              </button>
            </nav>
          </div>

          {activeTab === "inventory" && (
            <div className="p-6">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500 border-b border-gray-200 font-medium uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Batch id</th>
                    <th className="px-6 py-3 text-left">Action</th>
                    <th className="px-6 py-3 text-left">Reason</th>
                    <th className="px-6 py-3 text-left">Quantity</th>
                    <th className="px-6 py-3 text-left">Updated By</th>
                    <th className="px-6 py-3 text-left">received on</th>
                    <th className="px-6 py-3 text-left">expiration</th>
                    <th className="px-6 py-3 text-left">status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4">112124</td>
                    <td className="p-6 py-4">
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit">
                        Stock in
                      </span>
                    </td>
                    <td className="px-6 py-4">Items running low</td>
                    <td className="px-6 py-4">+8</td>
                    <td className="px-6 py-4">Dan</td>
                    <td className="px-6 py-4">{formatDate("04-21-25")}</td>
                    <td className="px-6 py-4">{formatDate("02-21-28")}</td>
                    <td className="p-6 py-4">
                      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full w-fit">
                        Valid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "sales" && (
            <div className="p-6">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500 border-b border-gray-200 font-medium uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Order #</th>
                    <th className="px-6 py-3 text-left">Quantity</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4">05-01-25</td>
                    <td className="px-6 py-4">ORD-12345</td>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">Dan Doe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {openUpdateVariant && (
        <UpdateVariant
          isOpen={openUpdateVariant}
          onclose={() => setOpenUpdateVariant(false)}
        />
      )}

      {openUpdateStock && (
        <UpdateStock
          isOpen={openUpdateStock}
          onClose={() => setUpdateStock(false)}
        />
      )}

      {openAddVariant && (
        <AddVariant
          isOpen={openAddVariant}
          onClose={() => setOpenAddVariant((prev) => !prev)}
        />
      )}
    </>
  );
}
