import { IoCloseSharp } from "react-icons/io5";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef } from "react";
useClickOutside;

type Props = {
  setter: boolean | false;
  setTrigger: any;
};

export default function Calculator({ setter, setTrigger }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setTrigger(false));
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black/50
        h-full z-100 flex justify-center items-center ${!setter && "hidden"}`}
    >
      <div
        ref={ref}
        className="bg-white fixed h-auto p-4 w-1/4 rounded-xs 
      flex flex-col gap-4"
      >
        <div className=" flex justify-between h-auto  ">
          <span>Calculator</span>
          <IoCloseSharp
            onClick={() => setTrigger(false)}
            className="hover:bg-gray-200 cursor-pointer 
             text-gray-700 rounded-full text-lg p-1 w-7 h-7 
             transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="px-4 flex flex-col gap-4">
          <div>
            <input
              type="text"
              className="border border-gray-400 rounded
             w-full px-4 py-2 text-sm outline-0"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded">
              1
            </button>
            <button className="px-4 py-2 w-full border border-gray-400 rounded col-span-2">
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
