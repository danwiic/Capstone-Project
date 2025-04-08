type Props = {
  className?: string;
};
import { BsImage } from "react-icons/bs";

const CardSkeleton = ({ className }: Props) => {
  return (
    <div className={`rounded shadow-lg p-4 max-w-[400px] 
    w-[350px] flex gap-2 flex-col  border-gray-400 ${className}`}>
      <div className="relative h-60 mb-4 bg-gray-300 animate-pulse rounded flex justify-center items-center">
        <BsImage className="text-7xl text-gray-600"/>
      </div>

      <div className="mb-3 rounded-full bg-gray-300 h-4 w-[50%] animate-pulse"></div>
      <div className="mb-3 rounded-full bg-gray-300 h-4 animate-pulse"></div>
      <div className="mb-3 rounded-full bg-gray-300 h-4 animate-pulse"></div>
      <div className="mb-3 rounded-full bg-gray-300 h-4 animate-pulse"></div>
      <div className="mb-3 rounded-full bg-gray-300 h-4 animate-pulse"></div>
      <div className="mb-3 rounded-full bg-gray-300 h-4 animate-pulse"></div>
    </div>
  );
};

export default CardSkeleton;
