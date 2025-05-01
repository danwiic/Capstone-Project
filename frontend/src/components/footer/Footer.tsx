import { Link } from "react-router-dom";
import logo from "../../images/mayormoto_logo.png";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";

const categories = [
  "Helmets",
  "Top Box",
  "Safety Gear",
  "Accessories & Electronics",
  "Lubricants & Oils",
  "Sprays & Cleaners",
  "Motorcycle Safety",
  "External Accessories",
];

const brands = [
  "Gille",
  "Zebra",
  "Spyder",
  "LS2",
  "EVO",
  "Smok",
  "Poizon",
  "Origin",
  "Niwra",
  "HNJ",
  "FTR",
  "RYO",
  "Motowolf",
  "Sphinx",
  "RS8",
  "Ariete",
  "Arjhen",
  "AX7",
  "BOSCH",
  "Dicatti",
  "Flamingo",
  "Freed Conn ",
  "KOBY",
  "Mayormoto",
  "MOTUL",
  "RS8",
  "VMAX",
  "SZL",
];
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer className="bg-white py-6 px-20 relative bottom-0 w-full h-fit flex justify-center">
        <div className="max-w-[100rem]">
          <div className="grid grid-cols-3  text-gray-500">
            <div className="text-sm font-medium flex flex-col gap-6 px-6 py-6">
              <Link className="flex justify-start" to={"/"}>
                <img
                  src={logo}
                  alt="/"
                  className="w-auto h-auto scale-70 cursor-pointer"
                />
              </Link>
              <p className="text-sm font-medium">
                MayorMoto is your one-stop shop for all your motorcycle needs.
                We offer a wide range of products and services to help you get
                the most out of your ride.
              </p>
              <div className="flex gap-2 text-sm">
                <span className="flex gap-1 font-semibold items-center text-gray-600">
                  <CiLocationOn className="text-lg text-mayormoto-pink" />{" "}
                  Location
                </span>
                <span>VRCC building unit 1F, Magdiwang Noveleta.</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="flex gap-1 font-semibold items-center text-gray-700">
                  <IoCallOutline className="text-lg text-mayormoto-pink" /> Call
                  Us
                </span>
                <span>(+63) 9951505231</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="flex gap-1 font-semibold items-center text-gray-700">
                  <CiTimer className="text-lg text-mayormoto-pink" /> Hours
                </span>
                <span>10:00 AM to 7:00 PM (Mon - Sun)</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 h-full w-full px-10 py-6">
              <span className="font-semibold text-md text-gray-800">
                CATEGORIES
              </span>
              <div className="flex flex-col gap-2">
                {categories.map((cat, i) => (
                  <Link
                    key={i}
                    to={`/${cat.toLowerCase()}`}
                    className="text-sm font-medium hover:text-mayormoto-blue"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 h-full w-full px-10 py-6">
              <span className="font-semibold text-md text-gray-800">
                ACCOUNT
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/#}`}
                  className="text-sm font-medium hover:text-mayormoto-blue"
                >
                  Wishlist
                </Link>

                <Link
                  to={`/#}`}
                  className="text-sm font-medium hover:text-mayormoto-blue"
                >
                  View Cart
                </Link>
                <Link
                  to={`/#}`}
                  className="text-sm font-medium hover:text-mayormoto-blue"
                >
                  Forgot Password
                </Link>
                <Link
                  to={`/#}`}
                  className="text-sm font-medium hover:text-mayormoto-blue"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <span
        className="flex justify-center items-center border-t bg-white
        border-gray-300 text-sm font-medium text-gray-500 py-4"
      >
        ©{year} Mayormoto Helmet and Accessories.
      </span>
    </>
  );
}
