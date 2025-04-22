type CategoryProps = {
  image?: string;
  label?: React.ReactNode;
};

export default function BrandCard({ image, label }: CategoryProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-60 h-60 overflow-hidden rounded-full">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <img
            src={image}
            alt="Product Image"
            className="object-contain w-5/6 h-5/6"
          />
        </div>
      </div>
      <div className="text-center text-xl font-semibold">{label}</div>
    </div>
  );
}