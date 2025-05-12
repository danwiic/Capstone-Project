import { useEffect, useState } from "react";
import PosProduct from "../../components/pos/cards/PosProduct";
import Categories from "../../components/pos/categories/Categories";
import Layout from "../../components/pos/nav/Layout";
import OrderDetails from "../../components/pos/order_details/OrderDetails";
import { IoSearchSharp } from "react-icons/io5";
import { getTwo } from "../../services/products";

export default function PosTerminal() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = await getTwo();

        // Flatten and filter out empty product arrays
        const flattened = categories
          .filter((cat: any) => cat.products.length > 0)
          .flatMap((cat: any) => cat.products);

        setProducts(flattened);
        console.log("flattened data:", flattened);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product: any) => {
    const productName = product.name.toLowerCase();
    const searchTerms = searchTerm.toLowerCase();
    const productCategory = product.category?.name.toLowerCase();
  
    const matchesSearch = productName.includes(searchTerms);
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      productCategory === selectedCategory.toLowerCase();
  
    return matchesSearch && matchesCategory;
  });
  

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-20px)] gap-4 ">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-xl">POS</span>
            <div className="bg-white border border-gray-300 rounded flex items-center">
              <input
                className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                placeholder="Search products..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="px-4 py-2">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          <div>
            <Categories  selectCategory={setSelectedCategory}/>
          </div>

          <div
            className="grid grid-cols-4 gap-2  overflow-y-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl"
          >
            {filteredProducts.map((pr: any) => (
              <PosProduct
                key={pr.id}
                product={{
                  productName: pr.name || "",
                  productCategory: pr.category?.name || "",
                  productImage: pr.ProductImage?.[0]?.imageUrl || "",
                  productPrice:
                    pr.price != null
                      ? Number(pr.price)
                      : pr.ProductVariant?.[0]?.price || 0,
                }}
              />
            ))}
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
