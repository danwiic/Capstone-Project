import { Link } from "react-router-dom";
import logo from "../../images/mayormoto_logo.png";

export default function Footer({ children }: { children?: React.ReactNode }) {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      {children}
      <footer className="bg-white py-6 px-20 relative bottom-0 w-full h-1/4">
        <div className="grid grid-cols-3  text-gray-500">
          <div className="text-sm font-medium flex flex-col gap-6 p-10">
            <Link className="flex justify-start" to={"/"}>
              <img
                src={logo}
                alt="/"
                className="w-auto h-auto scale-70 cursor-pointer"
              />
            </Link>
            <p className="text-sm font-medium">
              MayorMoto is your one-stop shop for all your motorcycle needs. We
              offer a wide range of products and services to help you get the
              most out of your ride.
            </p>
            <span>©{year} MayorMoto</span>
          </div>

          <div className="flex flex-col gap-2 h-full w-full p-10">
            <span className="font-medium text-md text-gray-800">
              CATEGORIES
            </span>
            <div className="flex flex-col pl-4 gap-2">
              <Link
                to={"/about"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Helmet
              </Link>
              <Link
                to={"/contact"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Top Box
              </Link>
              <Link
                to={"/contact"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Riding Jacket
              </Link>
              <Link
                to={"/contact"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Gloves & Arm Sleeve
              </Link>
              <Link
                to={"/contact"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Gears
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 h-full w-full p-10">
            <span className="font-medium text-md text-gray-800">BRANDS</span>
            <div className="flex flex-col pl-4 gap-2">
              <Link
                to={"/about"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Gille
              </Link>
              <Link
                to={"/contact"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Zebra
              </Link>

              <Link
                to={"/contact"}
                className="text-sm font-medium hover:text-mayormoto-blue"
              >
                Spyder
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
