import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import EditProduct from "../../components/pos/cards/EditProduct";

export default function Products() {
  const [collapseCategories, setCollapseCategories] = useState(true);
  const [collapseBrands, setCollapseBrands] = useState(true);

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

  const categories = [
    "Helmet",
    "Gloves",
    "Jacket",
    "Pants",
    "Shoes",
    "Accessories",
    "Tools",
    "Parts",
    "Electronics",
    "Maintenance",
    "Cleaning",
    "Safety",
    "Comfort",
    "Storage",
    "Navigation",
    "Lighting",
    "Security",
    "Performance",
    "Customization",
    "Apparel",
    "Footwear",
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-xl">Products</span>
          <div className="flex gap-2 w-full max-w-[20rem]">
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-3 text-sm rounded-xs hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Product Logs
            </button>
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
               py-3 text-sm rounded-xs hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              + New Product
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
              className={`bg-white p-4 shadow-1 flex flex-col gap-1 
                transition-all 
                duration-300 ease-in-out ${
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
                  {categories.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2">
                      <div
                        className="text-sm flex justify-between items-center 
                      w-full border-b border-gray-200"
                      >
                        <span className="text-gray-600 font-medium">{cat}</span>
                        <div className="flex gap-1">
                          <MdOutlineModeEdit
                            title="Edit Brand"
                            className="cursor-pointer text-xl 
                          text-gray-600 hover:text-green-500 
                          transition-colors duration-200"
                          />
                        </div>
                      </div>
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
                    <div key={i} className="flex items-center gap-2 py-2 pl-1">
                      <div className="text-sm flex justify-between items-center w-full">
                        <span className="text-gray-600 font-medium">
                          {brand}
                        </span>
                        <div className="flex gap-1">
                          <MdOutlineModeEdit
                            title="Edit Brand"
                            className="cursor-pointer text-xl 
                          text-gray-600 hover:text-green-500 
                          transition-colors duration-200"
                          />
                        </div>
                      </div>
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

          <div className=" flex-1 overflow-auto grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <EditProduct key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
