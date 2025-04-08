import logo from "../images/mayormoto-logo-removebg-preview.png";
import Button from "./ui/button/HoverButton.tsx";
import { Link } from "react-router-dom";
import Search from "./ui/Search.tsx";
import CartIcon from "./Cart/CartIcon.tsx";
import { useState } from "react";
import { CartModal } from "./Cart/Cart.tsx";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [viewCart, setViewCart] = useState(true);

  function handleViewCart() {
    setViewCart((prev) => !prev);
  }
  return (
    <>
      <div
        className="bg-body p-1 px-20 shadow-md py-2
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

          <div onClick={() => handleViewCart()}>
            <CartIcon />
          </div>
        </div>
      </div>
      <main>
        {viewCart && (
          <div className="z-50 sticky top-20">
            <CartModal setter={viewCart} className="after:right-12 bg-white after:bg-red-2 z-50" />
          </div>
        )}
        {children}
      </main>
    </>
  );
}
