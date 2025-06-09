import axios from "axios";
import ProductCart from "../../components/Card/ProductCart";
import BrandLayout from "../../components/Layout/BrandLayout";
import Navbar from "../../components/Nav/Navbar";
import { useEffect, useState } from "react";
import SpinningLoader from "../../components/loader/SpinningLoader";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  ProductImage: {
    imageUrl: string;
  }[];
  ProductVariant?: {
    id: string;
    price: number;
    stock: number;
  }[];
  rating?: number;
  noOfReviews?: number;
}

export default function Brand() {
  const [products, setProducts] = useState<Product[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [limit] = useState<number>(16);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Debug log to check data structure
  useEffect(() => {
    if (products && products.length > 0) {
      console.log("First product structure:", products[0]);
    }
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const categoryQuery = selectedCategories
          .map((id) => `categoryId=${id}`)
          .join("&");
        const brandQuery = selectedBrands
          .map((id) => `brandId=${id}`)
          .join("&");

        const queryParams = [
          `page=${currentPage}`,
          `limit=${limit}`,
          ...(categoryQuery ? [categoryQuery] : []),
          ...(brandQuery ? [brandQuery] : []),
          ...(sortOrder ? [`sortPrice=${sortOrder}`] : []),
        ].join("&");

        const url = `http://localhost:3000/product/all?${queryParams}`;

        const response = await axios.get(url);

        // Always rely on backend to return correct paginated and filtered results
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategories, selectedBrands, limit, sortOrder]);

  const handleCategoryFilterChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    setCurrentPage(1);
  };

  const handleBrandFilterChange = (brandIds: string[]) => {
    setSelectedBrands(brandIds);
    setCurrentPage(1);
  };

  const productsToShow = products;
  return (
    <>
      <Navbar>
        <div className="p-10">
          <BrandLayout
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            onCategoryChange={handleCategoryFilterChange}
            onBrandChange={handleBrandFilterChange}
            loading={loading}
            pagination={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            }
          >
            {loading ? (
              <div className="w-full col-span-4 flex justify-center items-center ">
                <SpinningLoader />
              </div>
            ) : productsToShow && productsToShow.length > 0 ? (
              <>
                {productsToShow.map((product) => {
                  const variant = product.ProductVariant?.[0];
                  return (
                    <ProductCart
                      key={product.id}
                      product={{
                        productId: product.id,
                        imageUrl: product.ProductImage[0]?.imageUrl ?? "",
                        name: product.name,
                        brand: product.brand.name,
                        price: product.price ?? variant?.price ?? 0,
                        stock:
                          variant?.stock !== undefined
                            ? variant.stock
                            : product.stock,
                        rating: product.rating ?? 0,
                        noOfReviews: product.noOfReviews ?? 0,
                        variantId: variant?.id,
                      }}
                    />
                  );
                })}
              </>
            ) : (
              <div className="col-span-4 py-12 text-center text-gray-500">
                No products match your selected filters.
              </div>
            )}
          </BrandLayout>
        </div>
      </Navbar>
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 w-full justify-end">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
        className={`px-4 py-2.5 rounded font-semibold text-sm ${
          currentPage === 1 || totalPages === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-mayormoto-pink hover:bg-mayormoto-pink/85 text-white"
        }`}
      >
        Previous
      </button>
      <span className="flex text-sm items-center px-2">{`Page ${currentPage} of ${
        totalPages || 1
      }`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`px-4 py-2.5 rounded text-sm font-semibold ${
          currentPage === totalPages || totalPages === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-mayormoto-pink hover:bg-mayormoto-pink/85 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
