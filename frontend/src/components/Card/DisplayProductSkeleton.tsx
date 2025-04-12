import { BsImage } from "react-icons/bs";

export default function DisplayProductSkeleton() {
  return (
    <>
      <div
        className="rounded shadow-xs flex flex-col w-56 
              px-6 justify-center gap-4 bg-white"
      >
        <div className="flex flex-col gap-5">
          <div
            className="flex justify-center w-full h-30 
          bg-gray-300 animate-pulse rounded items-center"
          >
            <BsImage className="text-2xl text-gray-400" />
          </div>
          <div
            className="text-md font-bold
          hover:text-mayormoto-blue h-4 bg-gray-300 animate-pulse rounded-full w-[70%]"
          />
        </div>

        <div
          className="text-md font-bold
          hover:text-mayormoto-blue h-4 bg-gray-300 animate-pulse rounded-full w-[60%]"
        />
      </div>
    </>
  );
}
