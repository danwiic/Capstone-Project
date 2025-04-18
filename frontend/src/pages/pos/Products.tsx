import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import PosProduct from "../../components/pos/cards/PosProduct";

export default function Products() {
  const [collapseCategories, setCollapseCategories] = useState(false);
  const [collapseBrands, setCollapseBrands] = useState(false);

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

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-xl">Products</span>
          <div>
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-2 text-sm rounded-xs hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              + New Category
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
          <div
            className="flex flex-col gap-4 h-[calc(100vh-9rem)] w-[12rem] 
          overflow-hidden sticky top-20"
          >
            {/* Categories */}
            <div
              className={`bg-white p-4 shadow-1 flex flex-col gap-1 transition-all duration-300 ease-in-out ${
                collapseCategories
                  ? "h-14 overflow-hidden"
                  : "flex-1 overflow-hidden"
              }`}
            >
              <div className="font-medium flex justify-between items-center mb-2">
                <span>Categories</span>
                <span
                  className="cursor-pointer"
                  onClick={() => setCollapseCategories((prev) => !prev)}
                >
                  {collapseCategories ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className="flex flex-col h-full overflow-hidden">
                <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl flex-1">
                  {brands.map((brand, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="text-sm">
                        {brand} {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 mt-auto">
                  <button
                    className="bg-mayormoto-blue text-white px-2 w-full
             py-2 text-sm rounded-xs hover:bg-mayormoto-blue-hover cursor-pointer"
                  >
                    + New Category
                  </button>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div
              className={`bg-white p-4 shadow-1 flex flex-col gap-1 transition-all duration-300 ease-in-out ${
                collapseBrands
                  ? "h-14 overflow-hidden"
                  : "flex-1 overflow-hidden"
              }`}
            >
              <div className="font-medium flex justify-between items-center mb-2">
                <span>Brands</span>
                <span
                  className="cursor-pointer"
                  onClick={() => setCollapseBrands((prev) => !prev)}
                >
                  {collapseBrands ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className="flex flex-col h-full overflow-hidden">
                <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl flex-1">
                  {brands.map((brand, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="text-sm">
                        {brand} {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 mt-auto">
                  <button
                    className="bg-mayormoto-blue text-white px-2 w-full
             py-2 text-sm rounded-xs hover:bg-mayormoto-blue-hover cursor-pointer"
                  >
                    + New Category
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Main content */}

          <div className=" shadow-1 flex-1 overflow-auto grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <PosProduct key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
