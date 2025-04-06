import logo from "../images/mayormoto-logo-removebg-preview.png";
import Button from "./ui/Button.tsx";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import Search from "./ui/Search.tsx";
// import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div
        className="bg-white p-1 px-20 shadow-md py-2
        flex justify-between items-center sticky top-0 z-50
        "
      >
        <div>
          {/* <RxHamburgerMenu className="text-2xl font-medium cursor-pointer" /> */}

          <img src={logo} alt="" className="w-52 cursor-pointer" />
        </div>

        <div className="w-1/2">
          <Search />
        </div>

        <div className="flex gap-6 items-center">
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <div className="flex relative">
            <MdShoppingCart className="text-4xl cursor-pointer text-mayormoto-blue" />
            <span
              className="bg-mayormoto-pink text-white absolute h-5 w-5 p-1 
              text-center rounded-2xl flex items-center justify-center
            -right-2 -top-0.5 text-sm hover:h-6 hover:w-6 hover:text-lg 
            duration-300 ease-in-out transition-all cursor-pointer font-medium"
            >
              0
            </span>
          </div>
        </div>
      </div>
      <main>{children}</main>
      
    </>
  );
}
