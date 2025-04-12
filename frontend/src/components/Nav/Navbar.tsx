import logo from "../../images/mayormoto-logo-removebg-preview.png";
import Search from "../ui/Search.tsx";
import { useEffect } from "react";
import Cart from "../Cart/index.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import LoginNav from "./LoginNav.tsx";
import Footer from "../footer/Footer.tsx";
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
      <div
        className="bg-body p-1 px-20 shadow-sm py-2
        flex justify-between items-center sticky top-0 z-50
        "
      >
        <div>
          <img src={logo} alt="" className="w-52 cursor-pointer" />
        </div>

        <div className="w-2/3">
          <Search />
        </div>

        <div className="flex gap-6 items-center"> 
            <LoginNav />
            <Cart.Icon />
        </div>

      </div>
      <main>{children}</main>
      <Footer/>
    </>
  );
}
