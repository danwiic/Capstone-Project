export default function Categories() {
  const categories = [
    "All",
    "Helmets",
    "Top Box",
    "Gloves & Sleeves",
    "Riding Jackets",
    "Gears",
  ];
  return (
    <div className="flex gap-2">
      {categories.map((cat, i) => (
        <button
          className="px-4 py-2 bg-white rounded-full hover:bg-mayormoto-blue 
        hover:text-white cursor-pointer text-sm shadow-1 first:bg-mayormoto-blue 
        first:text-white"
          key={i}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
