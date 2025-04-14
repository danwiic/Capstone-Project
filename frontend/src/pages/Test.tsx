import { useEffect, useState } from "react";
import DisplayProductCart from "../components/Card/ProductCart";
import DisplayProductCard from "../components/Card/ProductCard";
import DisplayProductSkeleton from "../components/loader/ProductCardSkeleton";
import ProductCartSkeleton from "../components/loader/ProductCartSkeleton";

export default function Test() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-20 flex flex-col gap-2">
      <div className="flex gap-2 p-2 bg-red-200">
        <div className="bg-red-200 flex justify-center items-center w-full p-2 relative">
          <div className="absolute top-12 flex flex-col gap-2 items-center">
            <span>GILLE</span>
            <button className="px-4 py-2 bg-red-500 text-white rounded-xs">
              SHOP NOW
            </button>
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) =>
          isLoading ? (
            <DisplayProductSkeleton key={i} />
          ) : (
            <div className="w-screen flex flex-col gap-2" key={i}>
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
