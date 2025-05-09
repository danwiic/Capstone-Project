import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:3000/category/");
      setCategories(response.data.category);
    };
    fetchCategories();
  }, []);
  if (!categories) return <p>Loading...</p>;
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => {
          setSelectedCategory("All");
        }}
        className={`px-4 py-2 rounded-full 
          hover:bg-mayormoto-blue  hover:text-white cursor-pointer 
          text-sm transition-all duration-200 ease-in-out
          ${
            selectedCategory === "All"
              ? "bg-mayormoto-blue text-white"
              : "text-gray-600 bg-white outline outline-gray-200"
          }`}
      >
        All
      </button>
      {categories.map((cat: any, i: number) => (
        <button
          onClick={() => {
            setSelectedCategory(cat.name);
          }}
          className={`px-4 py-2 rounded-full 
          hover:bg-mayormoto-blue  hover:text-white cursor-pointer 
          text-sm  transition-all duration-200 ease-in-out
          ${
            selectedCategory === cat.name
              ? "bg-mayormoto-blue text-white"
              : "text-gray-600 bg-white outline outline-gray-200"
          }`}
          key={i}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
