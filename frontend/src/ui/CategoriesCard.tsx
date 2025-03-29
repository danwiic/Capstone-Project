type CategoryProps = {
  image?: string;
  label?: React.ReactNode;
};

export default function CategoriesCard({ image, label }: CategoryProps) {
  return (
    <div className="p-4 w-51 rounded-xs bg-white cursor-pointer shadow:sm hover:shadow-md flex flex-col gap-4 max-w-51">
      {image && (
        <img
          src={image}
          alt="Category"
          className="w-full h-32 object-cover rounded-md"
        />
      )}
      {label && <span className="mt-2 text-center text-lg">{label}</span>}
    </div>
  );
}
