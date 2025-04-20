import { TbLoader2 } from "react-icons/tb";
import logo from "../images/output-onlinepngtools.png";
export default function Test() {
  return (
    <div className="p-16 flex flex-col ">
      <div className="p-16 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <TbLoader2 className="animate-spin text-6xl text-mayormoto-blue w-full h-full" />
          <img
            src={logo}
            className="absolute top-1/2 left-1/2 w-10 h-10 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}
