import { Link } from "react-router-dom";
import logo from "../../images/mayormoto_logo.png";

const categories = [
  "Helmets",
  "Top Box",
  "Safety Gear",
  "Accessories & Electronics",
  "Lubricants & Oils",
  "Sprays & Cleaners",
  "Motorcycle Safety",
  "External Accessories",
  "Lubricants",
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
          <div className="flex flex-col gap-2 w-full p-10">
            <span className="font-medium text-md text-gray-800">BRANDS</span>
            <div className="grid grid-cols-2 pl-4 gap-x-4 gap-y-2">
              {brands.map((br, i) => (
                <Link
                  key={i}
                  to={`/${br.toLowerCase()}`}
                  className="text-sm font-medium hover:text-mayormoto-blue"
                >
                  {br}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
