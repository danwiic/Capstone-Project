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
// import formatDate from "../utils/formatDate";

type ProductDetailsProps = {
  id: string;
  name?: string;
  description?: string;
  category: { name: string; id: string };
  brand: { name: string };
  ProductImage: { imageUrl: string }[];
  ProductVariant?: { id: string; price: number; variantName: string }[];
  price?: number;
  reviews?: { user: string; comment: string; rating: number }[];
  createdAt?: string;
  noOfReviews: number;
  averageRating: number;
};

type FiveProducts = {
  category: { id: string; name: string };
  products: {
    name?: string;
    description?: string;
    category: { name: string; id: string };
    brand: { name: string };
    ProductImage: { imageUrl: string }[];
    ProductVariant?: { id: string; price: number; variantName: string }[];
  }[];
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const categoryId = product?.category.id;
  const [fiveProducts, setFiveProducts] = useState<FiveProducts | null>(null);
  console.log(product, "product");

  console.log(fiveProducts, "product");

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

  console.log("products ========= ", product);

  useEffect(() => {
    const fetchFiveProducts = async () => {
      if (!product?.category.id) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/category/five/${categoryId}`
        );
        setFiveProducts(response.data.products[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFiveProducts();
  }, [product?.category.id]);

  if (!product) return <Loading />;
  return (
    <>
      <Navbar>
        <main className="px-16 py-10 flex gap-10">
          {/* {formatDate(product?.createdAt ?? "")} */}

          <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-4 w-full">
            <ProductGallery images={product.ProductImage} />
            <ProductInfo
              id={product.id}
              name={product?.name ?? ""}
              price={product?.price ?? 0}
              variants={
                product?.ProductVariant?.map((variant) => ({
                  id: variant.id ?? "",
                  variantName: variant.variantName ?? "",
                  price: Number(variant.price) ?? 0,
                })) ?? []
              }
            />

            <ProductDescription
              name={product?.name ?? ""}
              description={product?.description ?? ""}
            />
            <ProductReviews
              reviews={product?.reviews}
              totalReviews={product.noOfReviews}
              rating={product.averageRating}
            />
          </div>
        </main>

        {/* SUGGESTED PRODUCTS */}
        <div className="px-30 py-10 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-700">You may also like</h2>
          <div className="grid grid-cols-5 gap-1">
            {fiveProducts?.products.map((product: any, i: number) => {
              const variant = product.ProductVariant?.[0];

              return (
                <ProductCart
                  key={i}
                  product={{
                    productId: product.id,
                    imageUrl: product.ProductImage[0]?.imageUrl ?? "",
                    name: product.name,
                    brand: product.brand.name,
                    price:
                      product.price ?? product.ProductVariant?.[0]?.price ?? 0,
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
          </div>
        </div>
      </Navbar>
    </>
  );
}
