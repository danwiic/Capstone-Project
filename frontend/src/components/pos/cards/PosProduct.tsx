import { formatMoney } from "../../../utils/formatMoney";

export default function PosProduct() {
  return (
    <div className="py-4 bg-white rounded shadow-1 w-full h-auto flex flex-col gap-2 ">
      <div className="w-full flex items-center justify-center">
        <div className="flex justify-center w-full  h-32">
          <img
            src="https://res.cloudinary.com/dvexdyqea/image/upload/v1744769418/EVO_RX-7_Magenta_-_2_800_xeiiow.png"
            alt="/"
            className="w-28 h-full  scale-100"
          />
        </div>
      </div>
      <div className="text-sm flex flex-col gap-2 px-4">
        <div className="flex flex-col gap">
          <span className="text-gray-500">Helmet</span>
          <span className="">Helmet Zebra 432</span>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="font-medium">{formatMoney(2199)}</span>
          <span>
            <button
              className="cursor-pointer p-2 py-2 bg-mayormoto-blue 
            text-white rounded-xs text-sm w-full hover:bg-mayormoto-blue-hover transition-colors duration-200"
            >
              ADD
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
