import { IoSearch } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";

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
  "Lubricants",
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
  return (
    <div
      className="grid bg-white lg:grid-cols-1 xl:grid-cols-4 auto-cols-auto  
    p-10 rounded-sm "
    >
      <div
        className="bg-white px-10 py-6 
        flex flex-col gap-6 border border-gray-200"
      >
        <div className="flex flex-col gap-2">
          <span className="text-md uppercase font-semibold text-gray-700">
            Categories
          </span>
          <div className="flex flex-col gap-2">
            {categories.map((category, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="checkbox" />
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-md uppercase font-semibold text-gray-700">
            Categories
          </span>
          <div className="flex flex-col gap-2">
            {brands.map((brand, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="checkbox" />
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="md:col-span-1 xl:col-span-3
        flex flex-col gap-2 px-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex border border-gray-200 bg-white flex-1 ">
            <button className="p-4 text-center text-xl text-gray-600">
              <IoSearch />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className=" py-2 text-sm
            w-full outline-0"
            />
          </div>

          <div className="flex items-center justify-between w-auto gap-2">
            <span className="text-sm text-gray-700">Sort by</span>
            <select
              className="border rounded border-gray-300 bg-white
                text-sm py-2 px-4 text-center text-gray-600 "
            >
              <option selected>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low </option>
              <option>Best Selling </option>
              <option>Top Rated </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div
            className="grid grid-cols-4 border 
          border-gray-200 border-b-0"
          >
            {children}
          </div>

          <div className="w-full flex justify-between gap-4">
            <button
              className=" text-gray-800 font-medium px-4 py-2 rounded-md 
            hover:text-mayormoto-blue/90 flex gap-3 items-center justify-center
            text-sm cursor-pointer"
            >
              <FaLessThan />
              Previous
            </button>
            <div className="flex gap-1 items-center justify-center">
              <span
                className="text-sm bg-mayormoto-blue w-10 h-10 
              flex items-center justify-center rounded 
              text-white text-center cursor-pointer"
              >
                1
              </span>
              <span
                className="text-sm bg-white w-10 h-10 
              flex items-center justify-center rounded 
              text-mayormoto-blue text-center cursor-pointer
              hover:bg-mayormoto-blue hover:text-white"
              >
                2
              </span>
              <span
                className="text-sm bg-white w-10 h-10 
              flex items-center justify-center rounded 
              text-mayormoto-blue text-center cursor-pointer 
              hover:bg-mayormoto-blue hover:text-white"
              >
                3
              </span>
            </div>
            <button
              className=" text-gray-800 font-medium px-4 py-2 rounded-md 
            hover:text-mayormoto-blue/90 flex gap-3 items-center justify-center
            text-sm cursor-pointer"
            >
              Next
              <FaGreaterThan className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// <span
// className=" flex items-center justify-center rounded
// hover:bg-mayormoto-blue w-10 h-10
// hover:text-white cursor-pointer"
// >
// 2
// </span>
// <span
// className=" flex items-center justify-center rounded
// hover:bg-mayormoto-blue w-10 h-10
// hover:text-white cursor-pointer"
// >
// 3
// </span>
