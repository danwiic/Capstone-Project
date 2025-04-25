import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

type BrandLayout = {
  children?: React.ReactNode;
  pagination?: React.ReactNode;
};

type Category = {
  id: string;
  name: string;
};

type Brand = {
  id: string;
  name: string;
};

export default function BrandLayout({ children, pagination }: BrandLayout) {
  const [collapseCategories, setCollapseCategories] = useState(true);
  const [collapseBrands, setCollapseBrands] = useState(true);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [brands, setBrands] = useState<Brand[] | null>(null);

  // States for selected categories and brands
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Total pages from the API

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:3000/category/");
      setCategories(response.data.category);
    };

    const fetchBrands = async () => {
      const response = await axios.get("http://localhost:3000/brand/");
      setBrands(response.data.brands);
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  return (
    <div className="flex justify-center px-20">
      <div className="max-w-[100rem] w-full flex flex-row gap-10">
        {/* STICKY CONTAINER */}
        <div>
          <div className="sticky top-45 flex flex-col gap-6">
            {/* CATEGORIES */}
            <div className="bg-white flex flex-col rounded-md shadow-sm max-w-full w-[16rem]">
              <div
                onClick={() => setCollapseCategories((prev) => !prev)}
                className={`flex items-center justify-between py-3 px-6 font-semibold cursor-pointer hover:bg-gray-50 ${
                  !collapseCategories && "border-b border-gray-200"
                }`}
              >
                <span>Categories</span>
                {collapseCategories ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div
                className={`${
                  collapseCategories
                    ? "max-h-0 opacity-0"
                    : "max-h-full flex-1 opacity-100"
                } transition-all duration-200 ease-in overflow-hidden`}
              >
                <div className="flex flex-col py-2">
                  <label
                    htmlFor="all"
                    className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer hover:bg-mayormoto-pink/20 group"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="all"
                        className="peer sr-only"
                      />
                      <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-mayormoto-pink peer-checked:border-mayormoto-pink group-hover:border-mayormoto-pink transition-all"></div>
                      <svg
                        className="absolute w-3 h-3 text-white left-0.5 top-0.5 pointer-events-none hidden peer-checked:block"
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

                  {categories?.map((category) => (
                    <label
                      key={category.id}
                      htmlFor={category.name}
                      className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer hover:bg-mayormoto-pink/20 group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                          className="peer sr-only"
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-mayormoto-pink peer-checked:border-mayormoto-pink group-hover:border-mayormoto-pink transition-all"></div>
                      </div>
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* END CATEGORIES */}

            {/* BRANDS */}
            <div className="bg-white flex flex-col rounded-md shadow-sm max-w-full w-[16rem]">
              <div
                onClick={() => setCollapseBrands((prev) => !prev)}
                className={`flex items-center justify-between py-3 px-6 font-semibold cursor-pointer hover:bg-gray-50 ${
                  !collapseBrands && "border-b border-gray-200"
                }`}
              >
                <span>Brands</span>
                {collapseBrands ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div
                className={`${
                  collapseBrands
                    ? "max-h-0 opacity-0"
                    : "max-h-full flex-1 opacity-100"
                } transition-all duration-200 ease-in overflow-hidden`}
              >
                <div className="flex flex-col py-2">
                  <label
                    htmlFor="all-brands"
                    className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer hover:bg-mayormoto-pink/20 group"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="all-brands"
                        className="peer sr-only"
                      />
                      <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-mayormoto-pink peer-checked:border-mayormoto-pink group-hover:border-mayormoto-pink transition-all"></div>
                    </div>
                    All Brands
                  </label>

                  {brands?.map((brand) => (
                    <label
                      key={brand.id}
                      htmlFor={brand.name}
                      className="px-6 py-2 flex items-center gap-2 text-sm cursor-pointer hover:bg-mayormoto-pink/20 group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id={brand.id}
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => handleBrandChange(brand.id)}
                          className="peer sr-only"
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-mayormoto-pink peer-checked:border-mayormoto-pink group-hover:border-mayormoto-pink transition-all"></div>
                      </div>
                      {brand.name}
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
            {selectedCategories.length > 0 || selectedBrands.length > 0 ? (
              <div className="rounded-full px-4 py-1 flex items-center gap-2 text-mayormoto-pink bg-mayormoto-pink/10">
                <span>Filters Applied</span>
                <RxCross2 onClick={clearFilters} className="cursor-pointer" />
              </div>
            ) : (
              <div className="rounded-full px-4 py-1 flex items-center gap-2 text-mayormoto-pink bg-mayormoto-pink/10">
                <span>All</span>
                <RxCross2 className="cursor-pointer" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-gray-500 text-sm">
            <span>Showing results</span>
            <select className="bg-white border border-gray-200 px-6 py-3 rounded-sm text-gray-700 font-medium">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>New</option>
              <option>Popular</option>
            </select>
          </div>

          <div className="grid grid-cols-4">{children}</div>
          <div className="flex">{pagination}</div>
        </div>
        {/* MAIN CONTENT */}
      </div>
    </div>
  );
}
