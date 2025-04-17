import { IoCloseSharp } from "react-icons/io5";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef, useState } from "react";

type Props = {
  setter: boolean;
  setTrigger: any;
};

const buttons = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "C",
  "+",
  "=",
];

export default function Calculator({ setter, setTrigger }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setTrigger(false));

  const [calcValue, setCalcValue] = useState<string>("0");
  const handleClick = (val: string) => {
    if (val === "C") {
      setCalcValue("0");
    } else if (val === "=") {
      try {
        const result = eval(calcValue);
        setCalcValue(result.toString());
      } catch (err) {
        setCalcValue("Error");
      }
    } else {
      setCalcValue((prev) =>
        prev === "0" || prev === "Error" ? val : prev + val
      );
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black/50
        h-full z-100 flex justify-center items-center ${!setter && "hidden"}`}
    >
      <div
        ref={ref}
        className="bg-white fixed h-auto p-4 w-1/5 rounded-xs 
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

        <div className="px-4 flex flex-col gap-4 pb-4">
          <div>
            <input
              type="text"
              placeholder="0"
              value={calcValue}
              readOnly
              className="border border-gray-400 rounded
             w-full px-4 py-2 text-lg outline-0 text-right"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {buttons.map((btn, i) => (
              <button
                key={i}
                onClick={() => handleClick(btn)}
                className={`px-4 py-2 w-full border
               border-gray-400 rounded cursor-pointer
               ${btn === "=" ? "col-span-4 bg-mayormoto-blue hover:bg-mayormoto-blue-hover text-white font-medium" : ""}`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
