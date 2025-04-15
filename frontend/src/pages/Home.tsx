import Navbar from "../components/Nav/Navbar";
import bg from "../images/gille-astral.png";
import BrandCard from "../components/loader/BrandCard";
import gille from "../images/logo/gille_logo.png";
import DisplayProductCard from "../components/Card/ProductCard";
import { useEffect, useState } from "react";
import ProductTray from "../components/Layout/ProductTray";

// import { useUserContext } from "../context/UserContext";
// import { useEffect } from "react";
export default function Home() {
  // const { userID, isLoggedIn, setUser } = useUserContext();

  // useEffect(() => {
  //   // Set user only once on mount
  //   setUser({
  //     userID: "12345",
  //     isLoggedIn: true,
  //   });
  //   console.log(userID, isLoggedIn);

  // }, [setUser])
  const [_, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Navbar>
        <div className="flex flex-col gap-10 justify-center pb-10">
          <div className="relative h-auto w-full">
            <img
              title="Background Image"
              src={bg}
              alt=""
              className="h-full w-full object-cover cursor-pointer"
            />
          </div>

          <div className="px-20 flex flex-col gap-10">
            <div className="flex flex-col gap-4 m-20">
              <span className="text-2xl font-medium">Featured Brands</span>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <BrandCard key={i} image={gille} />
                ))}
              </div>
            </div>

            <ProductTray brand="gille" buttonLink={"/brand/1"}>
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
            </ProductTray>

            <ProductTray brand="gille" buttonLink={"/test"}>
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
              <DisplayProductCard
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
            </ProductTray>
          </div>

          {/*  */}
          {/* <div className="bg-gray-200 w-full p-2 flex flex-row gap-1 rounded-lg shadow-lg">
            {Array.from({length : 6}).map((_, i) => (
              <button className="cursor-pointer py-2 px-4 hover:bg-white rounded-lg text-gray-500 hover:shadow:xl hover:text-gray-800 transition-all duration-300">
              1asdasd{i}
            </button>
            ))}
           
          </div> */}
        </div>
      </Navbar>
    </div>
  );
}
