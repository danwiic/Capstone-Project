import { useEffect, useState } from "react";

type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

export default function Search({
  onChange,
  value = "",
}: Props) {
  const [search, setSearch] = useState(value);
  const [empty, setEmpty] = useState(search.trim() === "");
  const [focused, setFocused] = useState(false); // State to track focus

  useEffect(() => {
    setEmpty(search.trim() === ""); // Update empty state when search changes
  }, [search]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setSearch(newValue);
    setEmpty(newValue.trim() === ""); // Update empty state
    if (onChange) onChange(newValue); // Call external onChange if provided
  }

  return (
    <form className="max-w-80 mx-auto">
      <div className="relative w-80">
        <div
          className={`absolute inset-y-0  flex items-center ps-3 pointer-events-none ${
            !focused && empty ? "start-2" : "start-0"
          } transition-all duration-300 ease-in-out`}
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className={`block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
            bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-mayormoto-blue
            dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
             transition-all duration-500 ease-in-out
             ${focused || !empty ? "w-full" : "w-6"}`}
          placeholder="Search Products"
          onChange={(e) => handleChange(e)}
          onFocus={() => setFocused(true)} // Set focus state to true
          onBlur={() => setFocused(false)} // Set focus state to false
          required
        />
        <button
          type="submit"
          className={`text-white absolute end-2.5 bottom-2.5 bg-blue-700 
            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800 ${!empty ? "block" : "hidden"} duration-700 transition-all ease-in-out`}
        >
          Search
        </button>
      </div>
    </form>
  );
}