import { IoIosSearch } from "react-icons/io";

export default function Search() {
  return (
    <>
      <form action="" className="flex w-full border border-mayormoto-blue rounded-sm">
        <input 
          type="text" 
          placeholder="Search..."
          className="w-full  px-5 py-3 rounded-l-xs focus:outline-0 text-sm" 
          />
        <button className="rounded-r-xs bg-mayormoto-blue 
        px-5 py-3 cursor-pointer hover:bg-mayormoto-blue-hover">
          <IoIosSearch className="text-2xl font-bold text-white" />
        </button>
      </form>
    </>
  );
}
