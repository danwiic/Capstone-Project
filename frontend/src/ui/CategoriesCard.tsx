type CategoryProps = {
  image?: string;
  label?: React.ReactNode;
};

export default function CategoriesCard({ image, label }: CategoryProps) {
  return (
    <div>
      <div className="w-full rounded-xs 
        bg-white cursor-pointer shadow:sm hover:shadow-md flex flex-col gap-4 min-w-45 h-46 justify-center items-center p-4">
      {image && (
        <img
          src={image} 
          alt="Category"
          className=" max-w-30 max-h-30 object-cover rounded-md hover:scale-110 duration-300 ease-in-out"
        />
      )}
      {label && <span className="mt-2 text-center text-lg">{label}</span>}
    </div>
    </div>
  );
}
