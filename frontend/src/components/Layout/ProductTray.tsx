import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  brand?: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function ProductTray({
  children,
  brand,
  buttonText = "SHOP NOW",
  buttonLink,
}: Props) {
  return (
    <div className="flex gap-4 p-2 bg-white">
      <div className="w-60 flex flex-col gap-2 justify-center items-center ">
        <span className="text-start uppercase font-medium text-xl">
          {brand}
        </span>
        <Link to={`${buttonLink}`}>
          <button
            className="px-6 py-3 bg-mayormoto-blue 
              text-white rounded-xs font-medium uppercase
              cursor-pointer hover:bg-mayormoto-blue-hover"
          >
            {buttonText}
          </button>
        </Link>
      </div>

      <div className="flex ">{children}</div>
    </div>
  );
}
