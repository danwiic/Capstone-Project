import { IoSearch } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

type BrandLayout = {
  children?: React.ReactNode;
};

const categories = [
  "Helmets",
  "Top Box",
  "Safety Gear",
  "Accessories & Electronics",
  "Lubricants & Oils",
  "Sprays & Cleaners",
  "Motorcycle Safety",
  "External Accessories",
];

const brands = [
  "Gille",
  "Zebra",
  "Spyder",
  "LS2",
  "EVO",
  "Smok",
  "Poizon",
  "Origin",
  "Niwra",
  "HNJ",
  "FTR",
  "RYO",
  "Motowolf",
  "Sphinx",
  "RS8",
  "Ariete",
  "Arjhen",
  "AX7",
  "BOSCH",
  "Dicatti",
  "Flamingo",
  "Freed Conn ",
  "KOBY",
  "Mayormoto",
  "MOTUL",
  "RS8",
  "VMAX",
  "SZL",
];

export default function BrandLayout({ children }: BrandLayout) {
  const [collapseCategories, setCollapseCategories] = useState(true);
  const [collapseBrands, setCollapseBrands] = useState(true);
  return (
    <div className="flex justify-center px-20">
      <div className="max-w-[100rem] w-full flex flex-row gap-10">
        {/* STICKY CONTAINER */}
        <div>
          <div className=" sticky top-45 flex flex-col gap-6">
            {/* CATEGORIES */}
            <div
              className=" bg-white flex flex-col rounded-md 
          shadow-sm max-w-full w-[16rem]"
            >
              <div
                onClick={() => setCollapseCategories((prev) => !prev)}
                className={`flex items-center justify-between py-3 px-6 
            font-semibold cursor-pointer
            hover:bg-gray-50 ${
              !collapseCategories && "border-b border-gray-200 "
            }`}
              >
                <span className="">Categories</span>

                {collapseCategories ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div
                className={` ${
                  collapseCategories
                    ? "max-h-0 opacity-0"
                    : "max-h-full flex-1 opacity-100"
                } 
                transition-all duration-200 ease-in overflow-hidden`}
              >
                <div className="flex flex-col py-2">
                  <label
                    htmlFor="all"
                    className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer 
                    hover:bg-mayormoto-pink/20  group"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="all"
                        className="peer sr-only"
                      />
                      <div
                        className="w-4 h-4 border border-gray-300 rounded 
                       peer-checked:bg-mayormoto-pink  peer-checked:border-mayormoto-pink 
                        group-hover:border-mayormoto-pink  transition-all"
                      ></div>
                      <svg
                        className="absolute w-3 h-3 text-white left-0.5 top-0.5 
                        pointer-events-none hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    All Categories
                  </label>

                  {categories.map((category, i) => (
                    <label
                      key={i}
                      htmlFor={category}
                      className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer 
                    hover:bg-mayormoto-pink/20  group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id={category}
                          className="peer sr-only"
                        />
                        <div
                          className="w-4 h-4 border border-gray-300 rounded 
                           peer-checked:bg-mayormoto-pink  peer-checked:border-mayormoto-pink 
                            group-hover:border-mayormoto-pink  transition-all"
                        ></div>
                        <svg
                          className="absolute w-3 h-3 text-white left-0.5 top-0.5 
                          pointer-events-none hidden peer-checked:block"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      {category}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* END CATEGORIES */}

            {/* BRANDS */}
            <div
              className=" bg-white flex flex-col rounded-md 
          shadow-sm max-w-full w-[16rem]"
            >
              <div
                onClick={() => setCollapseBrands((prev) => !prev)}
                className={`flex items-center justify-between py-3 px-6 
            font-semibold cursor-pointer
            hover:bg-gray-50 ${!collapseBrands && "border-b border-gray-200 "}`}
              >
                <span className="">Brands</span>

                {collapseBrands ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div
                className={` ${
                  collapseBrands
                    ? "max-h-0 opacity-0"
                    : "max-h-full flex-1 opacity-100"
                } 
                transition-all duration-200 ease-in overflow-hidden`}
              >
                <div className="flex flex-col py-2">
                  <label
                    htmlFor="all-brands"
                    className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer 
                    hover:bg-mayormoto-pink/20  group"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="all-brands"
                        className="peer sr-only"
                      />
                      <div
                        className="w-4 h-4 border border-gray-300 rounded 
                       peer-checked:bg-mayormoto-pink  peer-checked:border-mayormoto-pink 
                        group-hover:border-mayormoto-pink  transition-all"
                      ></div>
                      <svg
                        className="absolute w-3 h-3 text-white left-0.5 top-0.5 
                        pointer-events-none hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    All Brands
                  </label>

                  {brands.map((brand, i) => (
                    <label
                      key={i}
                      htmlFor={brand}
                      className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer 
                    hover:bg-mayormoto-pink/20  group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id={brand}
                          className="peer sr-only"
                        />
                        <div
                          className="w-4 h-4 border border-gray-300 rounded 
                           peer-checked:bg-mayormoto-pink  peer-checked:border-mayormoto-pink 
                            group-hover:border-mayormoto-pink  transition-all"
                        ></div>
                        <svg
                          className="absolute w-3 h-3 text-white left-0.5 top-0.5 
                          pointer-events-none hidden peer-checked:block"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* END BRANDS */}
          </div>
        </div>
        {/* END STICKY CONTAINER ========> */}

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="filter-badges w-full h-fit flex gap-4">
            <div
              className="rounded-full px-4 py-1 
            flex items-center gap-2 text-mayormoto-pink bg-mayormoto-pink/10"
            >
              <span>All</span>
              <RxCross2 className="cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-500 text-sm">
            <span className="">Showing results</span>
            <select
              className="bg-white border border-gray-200 px-6 py-3 
            rounded-sm text-gray-700 font-medium"
            >
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>New</option>
              <option>Popular</option>
            </select>
          </div>

          <div className="grid grid-cols-4">{children}</div>
          <div>PAGINATION HERE</div>
        </div>
        {/* MAIN CONTENT */}
      </div>
    </div>
  );
}
