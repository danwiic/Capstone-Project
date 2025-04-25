import Navbar from "../components/Nav/Navbar";
import bg from "../images/bg.png";
import ProductCard from "../components/Card/ProductCard";
import React from "react";
import BrandCard from "../components/Card/BrandCard";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const productCategories = [
    {
      image:
        "https://res.cloudinary.com/dvexdyqea/image/upload/v1745226378/LS2_Airy_Evo_Man_Jacket__Black_Grey_Yellow__Large_-_3_990_bgsb4l.png",
      label: "Riding Jacket",
    },

    {
      image:
        "https://res.cloudinary.com/dvexdyqea/image/upload/v1745207280/EVO_RX-7__Yellow_-_2_800_qyezku.png",
      label: "Helmet",
    },

    {
      image:
        "https://res.cloudinary.com/dvexdyqea/image/upload/v1745290550/SMOK_Zeus_36L__Alloy_Side_View-removebg-preview_agoevh.png",
      label: "Top Box",
    },

    {
      image:
        "https://res.cloudinary.com/dvexdyqea/image/upload/v1745226378/LS2_Airy_Evo_Man_Jacket__Black_Grey_Yellow__Large_-_3_990_bgsb4l.png",
      label: "Riding Jacket",
    },

    {
      image:
        "https://res.cloudinary.com/dvexdyqea/image/upload/v1745226378/LS2_Airy_Evo_Man_Jacket__Black_Grey_Yellow__Large_-_3_990_bgsb4l.png",
      label: "Riding Jacket",
    },
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product/");
        setProducts(response.data);
        console.log(response.data[0], "data here");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <Navbar>
          <div className="flex flex-col gap-10 justify-center pb-10">
            <div className="relative h-auto w-full ">
              <img
                title="Background Image"
                src={bg}
                className="h-full w-full object-cover cursor-pointer "
              />
              <span className="absolute top-[70%] left-8">
                <button
                  className="bg-mayormoto-pink text-white text-sm
                  px-4 py-2 rounded cursor-pointer hover:bg-mayormoto-blue"
                >
                  SHOP NOW
                </button>
              </span>
            </div>
            <div className="px-30 flex flex-col items-center ">
              <div className=" max-w-[100rem] w-full flex flex-col gap-20">
                <section className="flex flex-col gap-10 ">
                  <span
                    className="text-2xl font-semibold after:h-1 after:rounded-full after:w-[5rem] relative
                    after:bg-mayormoto-pink after:absolute after:bottom-0 after:left-0 pb-1"
                  >
                    What We Offer
                  </span>

                  <div className="flex gap-4">
                    {productCategories.map((cat, i) => (
                      <BrandCard key={i} label={cat.label} image={cat.image} />
                    ))}
                  </div>
                </section>

                <section className="flex flex-col gap-10 ">
                  <span
                    className="text-2xl font-semibold after:h-1 after:rounded-full after:w-[5rem] relative
                    after:bg-mayormoto-pink after:absolute after:bottom-0 after:left-0 pb-1"
                  >
                    Featured Products
                  </span>
                  <div className="flex gap-5 items-center border-b border-gray-300 pb-4 text-md font-semibold">
                    <span
                      className="after:h-1 after:rounded-full after:w-full text-mayormoto-pink relative
                      after:bg-mayormoto-pink after:absolute after:bottom-0 after:left-0 pb-1"
                    >
                      New
                    </span>
                    <span
                      className="relative pb-1 cursor-pointer after:absolute after:block after:content-['']
                      after:bg-mayormoto-pink after:h-1 after:w-0 after:left-0 after:bottom-0 hover:text-mayormoto-pink
                      after:rounded-full after:transition-[width] after:duration-300 after:ease-in-out
                      hover:after:w-full"
                    >
                      Popular
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {products.map((prod: any) => (
                      <ProductCard
                        key={prod.id}
                        product={{
                          productId: prod.id,
                          name: prod.name,
                          brand: prod.brand.name,
                          imageUrl:
                            prod.ProductImage[0]?.imageUrl ||
                            "/placeholder.jpg",
                          price: prod.ProductVariant[0]?.price || prod.price,
                          rating: prod.averageRating,
                          noOfReviews: prod.noOfReviews,
                        }}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
}

export default React.memo(Home);
