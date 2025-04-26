import axios from "axios";
import ProductCart from "../components/Card/ProductCart";
import BrandLayout from "../components/Layout/BrandLayout";
import Navbar from "../components/Nav/Navbar";
import { useEffect, useState } from "react";
import Loading from "../components/loader/Loading";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  brand: {
    id: string;
    name: string;
  };
  categoryId: string; // Make sure this matches your actual API response
  ProductImage: {
    imageUrl: string;
  }[];
  ProductVariant?: {
    price: number;
    stock: number;
  }[];
  rating?: number;
  noOfReviews?: number;
}

export default function Brand() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [originalTotalPages, setOriginalTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Debug log to check data structure
  useEffect(() => {
    if (products && products.length > 0) {
      console.log("First product structure:", products[0]);
    }
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/all?page=${currentPage}&limit=16`
        );
        console.log("Response data:", response.data);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setOriginalTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    if (!products) return;

    if (selectedCategories.length === 0 && selectedBrands.length === 0) {
      setFilteredProducts(products);
      setTotalPages(originalTotalPages);
      return;
    }

    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand?.id)
      );
    }

    setFilteredProducts(filtered);

    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedCategories, selectedBrands, products, originalTotalPages]);

  const handleCategoryFilterChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  };

  const handleBrandFilterChange = (brandIds: string[]) => {
    setSelectedBrands(brandIds);
  };
  return (
    <>
      <Navbar>
        <div className="p-10">
          <BrandLayout
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            onCategoryChange={handleCategoryFilterChange}
            onBrandChange={handleBrandFilterChange}
            pagination={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            }
          >
            {loading ? (
              <Loading />
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <>
                <>
                  {filteredProducts.map((product) => {
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
                        }}
                      />
                    );
                  })}
                </>
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
        className={`px-4 py-2 rounded-md text-sm ${
          currentPage === 1 || totalPages === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-mayormoto-blue hover:bg-mayormoto-blue-hover text-white"
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
        className={`px-4 py-2 rounded-md text-sm ${
          currentPage === totalPages || totalPages === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-mayormoto-blue hover:bg-mayormoto-blue-hover text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
