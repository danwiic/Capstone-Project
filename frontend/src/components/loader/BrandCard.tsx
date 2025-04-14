type CategoryProps = {
  image?: string;
  label?: React.ReactNode;
};

export default function BrandCard({ image }: CategoryProps) {
  return (
    <div>
      <div
        className="max-w-[15rem] h-[15rem] rounded-full
        bg-white cursor-pointer shadow:sm 
        flex flex-col gap-4 min-w-45 justify-center 
        items-center p-4"
      >
        {image && (
          <img
            src={`${image}`}
            alt="Category"
            className=" w-auto h-auto rounded-full object-cover 
            scale-110 hover:scale-115 duration-300 ease-in-out"
          />
        )}
      </div>
    </div>
  );
}
