import { useEffect, useState } from "react";
import PosProduct from "../../components/pos/cards/PosProduct";
import Categories from "../../components/pos/categories/Categories";
import Layout from "../../components/pos/nav/Layout";
import OrderDetails from "../../components/pos/order_details/OrderDetails";
import { IoSearchSharp } from "react-icons/io5";
import { getTwo } from "../../services/products";
import { ChevronLeft } from "lucide-react";
import SelectProduct from "../../components/modal/SelectProduct";

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  ProductVariant: {
    id: string;
    variantName: string;
    price: number;
  };
  price: number;
}

interface ProductPassedProps {
  ProductVariant: {
    id: string;
    price: number;
    variantName: string;
  }[];
  ProductImage: {
    imageUrl: string;
  }[];
  id: string;
  name: string;
  price: number;
}

export default function PosTerminal() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [hideSummary, setHideSummary] = useState(false);
  const [showSelectProduct, setShowSelectProduct] = useState(false);
  const [clickedProduct, setClickedProduct] = useState<ProductPassedProps>();

  const handleProductSelect = (product: any, quantity: number) => {
    setSelectedProduct((prevProducts) => {
      const existingIndex = prevProducts.findIndex((p) => {
        if (product.ProductVariant.length > 0) {
          return (
            p.id === product.id &&
            p.ProductVariant[0]?.id === product.ProductVariant[0]?.id
          );
        } else {
          return p.id === product.id;
        }
      });

      if (existingIndex !== -1) {
        const updatedProducts = [...prevProducts];
        const currentQty = updatedProducts[existingIndex].quantity || 0;
        updatedProducts[existingIndex] = {
          ...updatedProducts[existingIndex],
          quantity: currentQty + quantity,
        };
        return updatedProducts;
      } else {
        return [...prevProducts, { ...product, quantity }];
      }
    });

    setShowSelectProduct(false);
  };

  console.log("selectedProduct", selectedProduct);

  const decreaseQuantity = (id: string) => {
    setSelectedProduct((prevProducts) =>
      prevProducts
        .map((prod) => {
          if (prod.id === id) {
            console.log("prod", prod);
            return { ...prod, quantity: prod.quantity - 1 };
          }
          return prod;
        })
        .filter((prod) => prod.quantity > 0)
    );
  };

  console.log("selectedProduct", selectedProduct);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = await getTwo();
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

  const removeAllItems = () => {
    setSelectedProduct([]);
  };
  console.log("clicked ngaAa", clickedProduct);

  return (
    <>
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
              <Categories selectCategory={setSelectedCategory} />
            </div>

            <div
              className={`${
                selectedProduct.length > 0 && !hideSummary
                  ? "grid grid-cols-4"
                  : "grid grid-cols-6"
              } gap-2  overflow-y-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl p-1`}
            >
              {filteredProducts.map((pr: any) => (
                <PosProduct
                  addProduct={() => {
                    setShowSelectProduct((prev) => !prev);
                    setClickedProduct(pr);
                  }}
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

          {selectedProduct.length > 0 && (
            <div className="relative">
              <span
                title={`${hideSummary ? "Show Summary" : "Hide Summary"}`}
                className="absolute top-[45%] -left-4 z-10 
              bg-mayormoto-pink text-white cursor-pointer 
               rounded-full p-1 outline flex hover:bg-mayormoto-pink/80 
               transition-all duration-300 ease-in-out"
              >
                <ChevronLeft
                  onClick={() => setHideSummary((prev) => !prev)}
                  size={30}
                />
              </span>
              <div
                className={`${
                  hideSummary ? "w-0 opacity-0" : "w-96 opacity-100"
                } overflow-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl h-full p-0 transition-all duration-300 ease-in-out`}
              >
                <OrderDetails
                  removeAllItems={() => removeAllItems()}
                  decreaseQuantity={decreaseQuantity}
                  products={selectedProduct}
                />
              </div>
            </div>
          )}
        </div>
      </Layout>

      {showSelectProduct && (
        <SelectProduct
          isOpen={showSelectProduct}
          onClose={() => setShowSelectProduct((prev) => !prev)}
          product={clickedProduct && clickedProduct}
          addProduct={handleProductSelect}
        />
      )}
    </>
  );
}
