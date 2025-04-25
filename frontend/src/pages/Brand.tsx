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
  brand: {
    name: string;
  };
  ProductImage: {
    imageUrl: string;
  }[];
  ProductVariant?: {
    price: number;
  }[];
  rating?: number;
  noOfReviews?: number;
}

export default function Brand() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/all?page=${currentPage}&limit=16`
        );
        console.log("Response data:", response.data.products);

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <>
      <Navbar>
        <div className="p-10">
          <BrandLayout
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
            ) : (
              <>
                {products?.map((product) => (
                  <ProductCart
                    key={product.id}
                    product={{
                      productId: product.id,
                      imageUrl: product.ProductImage[0]?.imageUrl ?? "",
                      name: product.name,
                      brand: product.brand.name,
                      price: product.price,
                      rating: product.rating,
                      noOfReviews: product.noOfReviews,
                    }}
                  />
                ))}
              </>
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
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        Previous
      </button>
      <span className="flex items-center px-2">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
