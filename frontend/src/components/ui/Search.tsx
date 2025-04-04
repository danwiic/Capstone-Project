import { IoIosSearch } from "react-icons/io";

export default function Search() {
  return (
    <>
      <form action="" className="flex w-full border border-mayormoto-blue rounded-md">
        <input 
          type="text" 
          placeholder="Search..."
          className="w-full  px-5 py-3 rounded-l-sm focus:outline-0 text-sm" 
          />
        <button className="rounded-r-sm bg-mayormoto-blue 
        px-5 py-3 cursor-pointer hover:bg-mayormoto-blue-hover">
          <IoIosSearch className="text-2xl font-bold text-white" />
        </button>
      </form>
    </>
  );
}
