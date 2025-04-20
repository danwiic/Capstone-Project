import logo from "../../images/mayormoto-logo-removebg-preview.png";
import Search from "../ui/Search.tsx";
import Cart from "../Cart/index.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import LoginNav from "./LoginNav.tsx";
import Footer from "../footer/Footer.tsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Navbar({ children }: { children?: React.ReactNode }) {
  const { setUser } = useUserContext();

  useEffect(() => {
    setUser({
      id: "123",
      email: "danbalagbag@gmail.com",
      name: "Dan",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col sticky top-0 z-50 shadow-md">
        <div
          className="bg-white p-1 px-30 border-b border-gray-300 py-2
        flex justify-between items-center 
        "
        >
          <div>
            <Link to="/">
              <img src={logo} alt="" className="w-52 cursor-pointer" />
            </Link>
          </div>
       

          <div className="w-2/4">
            <Search />
          </div>

          <div className="flex gap-6 items-center">
            <LoginNav />
            <Cart.Icon />
          </div>
        </div>
        <div className="bg-light-gray px-30 py-2 ">
          <div className="flex gap-6 items-center text-sm font-semibold text-gray-500">
            <span>PRODUCTS</span>
            <span>ABOUT</span>
            <span>CONTACT</span>
          </div>
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
