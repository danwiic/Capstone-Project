import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Plus,
  FileText,
  ChevronLeft,
  ChevronRight,
  Tag,
  Box,
} from "lucide-react";
import generateSKU from "../../../utils/skuGenerator";
import AddProduct from "../../modal/AddProduct";
import { formatMoney } from "../../../utils/formatMoney";
import { getAllProducts } from "../../../services/products.ts";
import SpinningLoader from "../../loader/SpinningLoader.tsx";

interface ProductListProps {
  onProductSelect: (productId: string) => void;
}

export default function ProductList({ onProductSelect }: ProductListProps) {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProductList(data);
      console.log("Product List:", data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on category change
  };

  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      generateSKU({
        brand: product.brand.name,
        category: product.category.name,
        id: product.id,
      })
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalProducts);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Get unique categories for filter dropdown
  const categories =
    productList.length > 0
      ? ["all", ...new Set(productList.map((product) => product.category.name))]
      : ["all"];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 text-sm w-full">
        <div
          className="bg-white p-4 rounded-lg  flex flex-col gap-2
        border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Product Inventory
          </h2>

          <div className="flex items-center gap-4 mb-4">
            {/* Search input */}
            <div className="relative flex-grow md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md  focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                placeholder="Search by product name or SKU..."
              />
            </div>

            <div className="flex gap-4 w-full justify-end">
              {/* Category filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="block w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-md  focus:ring-mayormoto-blue focus:border-mayormoto-blue appearance-none bg-white"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh button */}
              <button
                onClick={fetchProducts}
                className="flex gap-1 items-center px-4 py-2.5 border
                 border-gray-300  rounded-md bg-white 
                 text-gray-700 hover:bg-gray-50 "
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Refresh</span>
              </button>

              {/* Product logs button */}
              <button className="flex gap-1 items-center px-4 py-2.5 border border-transparent  rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-mayormoto-blue">
                <FileText className="h-4 w-4 mr-2" />
                <span>Product Logs</span>
              </button>

              {/* Add product button */}
              <button
                onClick={() => setOpenAddProduct(true)}
                className="flex gap-1 items-center px-4 py-2.5 border border-transparent  rounded-md bg-mayormoto-blue text-white hover:bg-mayormoto-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mayormoto-blue"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div
          className={`${
            !isLoading && "bg-white rounded-sm border"
          } border-gray-200 
         overflow-hidden`}
        >
          {isLoading ? (
            <div className="relative h-64 flex items-center justify-center">
              <SpinningLoader />
            </div>
          ) : productList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Box className="h-12 w-12 mb-2 text-gray-300" />
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Add a new product to get started</p>
              <button
                onClick={() => setOpenAddProduct(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  text-white bg-mayormoto-blue hover:bg-mayormoto-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mayormoto-blue"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="w-full overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left text-xs font-semibold 
                        text-gray-500 uppercase tracking-wide"
                      >
                        <div className="flex items-center">Product</div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left text-xs
                         font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        <div className="flex items-center">
                          <Box className="h-3.5 w-3.5 mr-1.5" />
                          Category
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left text-xs 
                        font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        <div className="flex items-center">Price</div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left text-xs 
                        font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        <div className="flex items-center">
                          <Tag className="h-3.5 w-3.5 mr-1.5" />
                          SKU
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        <div className="flex items-center">Stock</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((prod) => (
                      <tr
                        key={prod.id}
                        onClick={() => onProductSelect(prod.id)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-10 w-10 flex-shrink-0 bg-gray-100 
                            rounded-md overflow-hidden flex items-center justify-center"
                            >
                              <img
                                className="h-10 w-auto"
                                src={
                                  prod?.ProductImage?.[0]?.imageUrl ||
                                  "/placeholder.png"
                                }
                                alt={prod.name}
                              />
                            </div>
                            <div className="">
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {prod.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {prod?.ProductVariant?.length > 0 ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    {prod.ProductVariant?.length} variant
                                    {prod.ProductVariant?.length > 1 ? "s" : ""}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    No variants
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {prod.category.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatMoney(
                              prod.price || prod.ProductVariant[0]?.price || 0
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-mono">
                            {generateSKU({
                              brand: prod.brand.name,
                              category: prod.category.name,
                              id: prod.id,
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getStockStatusClass(prod.stock)}
                          `}
                          >
                            {getStockCount(prod)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Show</span>
                      <select
                        value={entriesPerPage}
                        onChange={(e) => {
                          setEntriesPerPage(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page when changing entries per page
                        }}
                        className="rounded border-gray-300 text-sm focus:ring-mayormoto-blue focus:border-mayormoto-blue"
                      >
                        {[10, 25, 50, 100].map((value) => (
                          <option key={value} value={value}>
                            {value} entries
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Showing{" "}
                      <span className="font-medium">{startIndex + 1}</span> to{" "}
                      <span className="font-medium">{endIndex}</span> of{" "}
                      <span className="font-medium">{totalProducts}</span>{" "}
                      products
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md  -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {/* Page numbers */}
                      {generatePageNumbers(currentPage, totalPages).map(
                        (page, index) =>
                          page === "..." ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          ) : (
                            <button
                              key={`page-${page}`}
                              onClick={() => setCurrentPage(Number(page))}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === Number(page)
                                  ? "z-10 bg-mayormoto-blue border-mayormoto-blue text-white"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          )
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {openAddProduct && (
        <AddProduct
          isOpen={openAddProduct}
          onClose={() => setOpenAddProduct(false)}
        />
      )}
    </div>
  );
}

function getStockStatusClass(stock: number): string {
  if (stock <= 0) return "bg-red-100 text-red-800";
  if (stock <= 10) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
}

function getStockCount(product: any): string {
  let total = product.stock || 0;
  if (total < 0) total = 0;

  if (product.ProductVariant && product.ProductVariant.length > 0) {
    // If product has variants, sum their stock
    const variantTotal = product.ProductVariant.reduce(
      (sum: number, variant: any) => sum + (variant.stock || 0),
      0
    );
    return `${variantTotal} in stock`;
  }

  return `${total} in stock`;
}

function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (string | number)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
