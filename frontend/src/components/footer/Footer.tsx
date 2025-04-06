import { Link } from "react-router-dom";
import logo from "../../images/mayormoto-logo-removebg-preview.png";

export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <footer className="bg-white py-6 px-20 relative bottom-0 w-full h-1/4">
        <div className="grid grid-cols-3  items-center text-gray-500">
          <div className="text-sm font-medium flex flex-col justify-center gap-6 p-8">
            <div>
              <img src={logo} alt="/" className="w-70 h-30" />
            </div>
            <p className="text-sm font-medium">
              MayorMoto is your one-stop shop for all your motorcycle needs. We
              offer a wide range of products and services to help you get the
              most out of your ride.
            </p>
            <span>© 2023 MayorMoto</span>
          </div>

          <div className="flex flex-col gap-4 h-full w-full p-12">
            <span className="font-medium text-gray-800">Categories</span>
            <Link
              to={"/about"}
              className="text-sm font-medium hover:text-mayormoto-blue"
            >
              About Us
            </Link>
            <Link
              to={"/contact"}
              className="text-sm font-medium hover:text-mayormoto-blue"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex flex-col gap-4 h-full w-full p-12">
            <span className="font-medium text-gray-800">Categories</span>
            <Link
              to={"/about"}
              className="text-sm font-medium hover:text-mayormoto-blue"
            >
              About Us
            </Link>
            <Link
              to={"/contact"}
              className="text-sm font-medium hover:text-mayormoto-blue"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
