import { IoIosSearch } from "react-icons/io";

export default function Search() {
  return (
    <>
      <form action="" className="flex w-full border-2 border-gray-300 rounded-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full  px-5 py-3 rounded-l-xs focus:outline-0 text-sm"
        />
        <button
          className=" 
        px-5 py-3 cursor-pointer"
        >
          <IoIosSearch className="text-2xl font-bold text-mayormoto-blue" />
        </button>
      </form>
    </>
  );
}
