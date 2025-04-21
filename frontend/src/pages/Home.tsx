import Navbar from "../components/Nav/Navbar";
import bg from "../images/bg.png";
import { useEffect, useState } from "react";
import ProductCard from "../components/Card/ProductCard";
import React from "react";

function Home() {
  const [_, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
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
              <div className=" max-w-[100rem] w-full">
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
                    {Array.from({ length: 5 }, (_, i) => (
                      <ProductCard
                        name={`Zebra Helmet Green j${i + 32}`}
                        brand="zebra"
                        key={i}
                        imageUrl="https://res.cloudinary.com/dvexdyqea/image/upload/v1745207283/EVO_RX-7_Magenta_-_2_800_kajpcz.png"
                        price={15999 + i * 1000}
                        rating={4.5}
                        noOfReviews={24 + Math.floor(Math.random() * 10)}
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
