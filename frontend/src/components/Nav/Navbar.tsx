import logo from "../../images/mayormoto-logo-removebg-preview.png";
// import Search from "../ui/Search.tsx";
import Cart from "../Cart/index.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import LoginNav from "./LoginNav.tsx";
import Footer from "../footer/Footer.tsx";
import { Link, useLocation } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const { user } = useUserContext();

  return (
    <div className="relative flex flex-col justify-center">
      <div className="flex justify-center sticky top-0 z-50">
        <div className="flex-1 flex flex-col shadow-sm">
          <div
            className="bg-body p-1 px-30 border-b border-gray-300 py-2
        flex justify-center
        "
          >
            <div className="flex justify-between flex-1 max-w-[100rem] items-center ">
              <div>
                <Link to="/">
                  <img src={logo} alt="" className="w-52 cursor-pointer" />
                </Link>
              </div>

              <div className="w-fit">
                <div className=" w-full flex-1 flex gap-6 items-center">
                  <NavItems />
                </div>
              </div>

              <div className="flex gap-6 items-center">
                <LoginNav />
                <Cart.Icon />
              </div>
            </div>
          </div>
          {/* <div className="bg-light-gray px-30  flex justify-center">
            <div className="max-w-[100rem] w-full flex-1 flex gap-6 items-center">
              <NavItems />
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex justify-center w-full ">
        <main className="max-w-[100rem] w-full relative">{children}</main>
      </div>

      <Footer />
      {user && (
        <div className="sticky bottom-10 left-full z-50 w-fit">
          <div
            className="w-fit flex items-center justify-center
         bg-mayormoto-pink rounded-full shadow-lg"
          >
            <FaMessage size={50} className=" text-white p-3" />
          </div>
        </div>
      )}
    </div>
  );
}

function NavItems() {
  const { user } = useUserContext();

  const navItems = user
    ? user.role === "admin"
      ? [
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "My Orders", path: "/orders" },
          { name: "Track my Order", path: "/track" },
          { name: "Wishlist", path: "/wishlist" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "My Order", path: "/orders" },
          { name: "Track my Order", path: "/track" },
          { name: "Wishlist", path: "/wishlist" },
        ]
    : [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Track my Order", path: "/track" },
      ];

  const loc = useLocation();

  const isActive = `text-mayormoto-pink relative after:absolute after:h-1 
  after:w-full after:bottom-0 after:left-0 after:transition-all after:duration-200 
    after:ease-in-out hover:text-mayormoto-pink after:bg-mayormoto-pink 
   after:bottom-0 after:left-0 after:rounded-full `;
  const isNotActive = `text-gray-500 hover:text-mayormoto-pink transition-all duration-200 
  after:w-0 relative after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-mayormoto-pink
  after:transition-all after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full`;

  const isActiveLink = (path: string) => {
    return loc.pathname === path ? isActive : isNotActive;
  };
  return (
    <>
      {navItems.map((item, i) => (
        <Link
          to={item.path}
          className={`py-3 text-sm font-bold uppercase ${isActiveLink(
            item.path
          )}`}
          key={i}
        >
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
}
