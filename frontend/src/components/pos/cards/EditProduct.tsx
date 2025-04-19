import { formatMoney } from "../../../utils/formatMoney";
import Kebab from "../menu/Kebab";

export default function EditProduct() {
  const items = [
    { label: "Edit", onClick: () => console.log("Edit clicked") },
    { label: "Archive", onClick: () => console.log("archived clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
  ];
  return (
    <div className="py-4 bg-white rounded shadow-1 w-full h-auto flex flex-col gap-2 ">
      <span className="text-sm font-medium text-right">
        <Kebab items={items} />
      </span>
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
          <span className="font-medium">Helmet Zebra 432</span>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="font-medium text-red-500">{formatMoney(2199)}</span>
          {/* <span
            className="flex justify-between gap-2 text-xl 
          font-medium"
          >
            <button
              className="px-2 py-2 bg-mayormoto-blue w-full 
            text-white rounded-xs flex items-center justify-center"
            >
              <GoArchive className="cursor-pointer" />
            </button>
            <button
              className="px-2 py-2 bg-mayormoto-blue w-full 
            text-white rounded-xs flex items-center justify-center"
            >
              <MdOutlineModeEdit className="cursor-pointer" />
            </button>
          </span> */}
        </div>
      </div>
    </div>
  );
}
