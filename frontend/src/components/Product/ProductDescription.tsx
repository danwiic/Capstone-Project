interface ProductDescriptionProps {
  name: string;
  description: string;
}

export default function ProductDescription({
  name,
  description,
}: ProductDescriptionProps) {
  return (
    <div className="bg-white md:col-span-1 lg:col-span-2 shadow-1 p-6 rounded">
      <span className="text-md font-medium text-gray-700">
        PRODUCT DESCRIPTION
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold text-gray-700">
          {name || "No name available."}
        </h3>
        <p className="text-gray-500 text-sm leading-loose">
          {description || "No description available."}
        </p>
      </div>
    </div>
  );
}
