import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../ui/button/Button";

export default function ProductCard() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const data: any = await axios.get("http://localhost:3000/product/");
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [setProducts]);
  return (
    <>
      {products.map((product: any, i: number) => (
        <div
          key={i}
          className="rounded shadow-md flex flex-col w-[300px] p-4 justify-center gap-5 bg-white"
        >
          <div className="flex justify-center">
            <img src={product.imageUrl} alt="/" 
                className="w-40 transition-transform duration-200 
                cursor-pointer h-45 hover:scale-120" 
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-2xl font-medium">{product.name}</div>
            <div className="text-sm font-medium text-gray-700">Stocks: {product.stock}</div>
          </div>

          <div className="text-lg font-medium text-red-500 ">
            ₱{product.price}
          </div>
          <div className="flex items-center justify-between gap-2">
            <Button className="bg-red-500 hover:bg-red-400">Add to Cart</Button>
            <Button>Buy</Button>
          </div>
        </div>
      ))}
    </>
  );
}
