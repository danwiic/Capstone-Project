import logo from "../../images/mayormoto-logo-removebg-preview.png";
import Search from "../ui/Search.tsx";
import Cart from "../Cart/index.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import LoginNav from "./LoginNav.tsx";
import Footer from "../footer/Footer.tsx";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Navbar({ children }: { children?: React.ReactNode }) {
  const { setUser, user } = useUserContext();

  useEffect(() => {
    setUser({
      id: "123",
      email: "danbalagbag@gmail.com",
      name: "Dan",
      role: "admin",
    });
  }, []);

  console.log(user);

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
        <div className="bg-light-gray px-30  flex items-center">
          <div className="flex gap-6 items-center text-sm font-semibold text-gray-500">
            <NavItems />
          </div>
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}

function NavItems() {
  const { user } = useUserContext();

  const navItems = user
    ? [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Wishlist", path: "/wishlist" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ];

  const loc = useLocation();

  const isActive = `text-mayormoto-pink relative after:absolute after:h-0.5 
  after:w-full after:bottom-0 after:left-0 after:transition-all after:duration-200 
    after:ease-in-out hover:text-mayormoto-pink after:bg-mayormoto-pink 
   after:bottom-0 after:left-0 after:rounded-full `;
  const isNotActive = `text-gray-500 hover:text-mayormoto-pink transition-all duration-200 
  after:w-0 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-mayormoto-pink
  after:transition-all after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full`;

  const isActiveLink = (path: string) => {
    return loc.pathname === path ? isActive : isNotActive;
  };
  return (
    <>
      {navItems.map((item, i) => (
        <Link
          to={item.path}
          className={`py-3 text-sm ${isActiveLink(item.path)}`}
          key={i}
        >
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
}
