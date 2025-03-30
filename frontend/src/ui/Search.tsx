import { useEffect, useState } from "react";

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
};

export default function Search({ onChange, value = "", placeholder }: Props) {
  const [search, setSearch] = useState(value);
  const [empty, setEmpty] = useState(search.trim() === "");

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
    <input
      placeholder={placeholder}
      name="search"
      id="search"
      type="search"
      value={search}
      onChange={handleChange}
      className={`outline ${
        empty ? "w-40" : "w-80"
      } focus:w-80 transition-all duration-300 ease-in-out h-10 rounded-md px-4`}
    />
  );
}
