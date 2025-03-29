type CategoryProps = {
  image?: string;
  label?: React.ReactNode;
};

export default function CategoriesCard({ image, label }: CategoryProps) {
  return (
    <div className=" lg:w-42 xl:w-51 1400:w-55 rounded-xs 
        bg-white cursor-pointer shadow:sm hover:shadow-md flex flex-col gap-4 min-w-45 h-46 justify-center items-center p-4">
      {image && (
        <img
          src={image}
          alt="Category"
          className=" max-w-30 max-h-30 object-cover rounded-md"
        />
      )}
      {label && <span className="mt-2 text-center text-lg">{label}</span>}
    </div>
  );
}
