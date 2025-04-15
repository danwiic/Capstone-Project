import { IoSearch } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";

type BrandLayout = {
  children?: React.ReactNode;
};

export default function BrandLayout({ children }: BrandLayout) {
  return (
    <div className="grid lg:grid-cols-1 xl:grid-cols-4 auto-cols-auto bg-white p-10 rounded-xs shadow-1">
      <div className="md:col-span-1 xl:col-span-4 py-10  ">
        <span className="text-2xl font-bold text-mayormoto-blue">GILLE</span>
      </div>

      <div
        className="bg-white px-10 py-6 
        flex flex-col gap-3 border border-gray-200"
      >
        <span className="font-medium text-xl">Filter by Category</span>
        <div className="flex flex-col gap-2 px-4">
          <span className="hover:text-mayormoto-blue cursor-pointer font-medium text-gray-500">
            All Categories
          </span>
          <span className="hover:text-mayormoto-blue cursor-pointer font-medium text-gray-500">
            Helmet
          </span>
          <span className="hover:text-mayormoto-blue cursor-pointer font-medium text-gray-500">
            Top Box
          </span>
          <span className="hover:text-mayormoto-blue cursor-pointer font-medium text-gray-500">
            Riding Jacket
          </span>
          <span className="hover:text-mayormoto-blue cursor-pointer font-medium text-gray-500">
            Gloves & Arm Sleeve
          </span>
          <span className="hover:text-mayormoto-blue cursor-pointer font-medium text-gray-500">
            Gears
          </span>
        </div>
      </div>

      <div
        className="md:col-span-1 xl:col-span-3
        flex flex-col gap-2 px-4"
      >
        <div className="flex border border-gray-200 bg-white ">
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
