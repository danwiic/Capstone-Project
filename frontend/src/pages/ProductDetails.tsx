import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Navbar from "../components/Nav/Navbar";
import ProductGallery from "../components/Product/ProductGallery";
import ProductInfo from "../components/Product/ProductInfo";
import ProductDescription from "../components/Product/ProductDescription";
import ProductReviews from "../components/Product/ProductReviews";
import ProductCart from "../components/Card/ProductCart";
import Loading from "../components/loader/Loading";

type ProductDetailsProps = {
  name?: string;
  description?: string;
  category: { name: string };
  brand: { name: string };
  ProductImage: { imageUrl: string }[];
  ProductVariant?: { price: number; name: string }[];
  price?: number;
  reviews?: { user: string; comment: string; rating: number }[];
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <Loading />;

  return (
    <>
      <Navbar>
        <main className="px-30 py-10 flex gap-10">
          <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-4 w-full">
            <ProductGallery images={product.ProductImage} />
            <ProductInfo
              name={product.name}
              price={product.price}
              variants={product.ProductVariant}
            />
            <ProductDescription
              name={product.name}
              description={product.description}
            />
            <ProductReviews reviews={product.reviews} />
          </div>
        </main>

        {/* SUGGESTED PRODUCTS */}
        <div className=" w-full px-30 py-10 mb-10 flex flex-col gap-4 h-auto">
          <h2 className="text-xl font-bold text-gray-700">You may also like</h2>
          <div className="flex rounded w-full gap-1 shadow-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCart
                key={i}
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://res.cloudinary.com/dvexdyqea/image/upload/v1745207283/EVO_RX-7_Magenta_-_2_800_kajpcz.png"
              />
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}
