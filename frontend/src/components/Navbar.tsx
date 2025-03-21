import logo from "../images/mayormoto-logo-removebg-preview.png";
import Button from "../ui/Button.tsx";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-white p-2 px-10 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div>
          <img src={logo} alt="" className="w-56" />
        </div>

        <div>
          <NavItems />
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </div>
      {children}
    </>
  );
}

function NavItems() {
  const location = useLocation();
  const items = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <ul className="flex justify-between items-center gap-8 ">
      {items.map((item, i) => {
        const isActive = location.pathname === item.path;
        return (
          <li key={i}>
            <NavLink
              to={item.path}
              className={`text-blue-900 p-4 text-lg relative before:absolute before:left-0 before:bottom-0 before:h-1 before:w-0 before:rounded-lg
                before:bg-mayormoto-blue before:transition-all before:duration-500 hover:before:w-full before:ease-in-out
                ${isActive && "before:w-full text-mayormoto-blue"
              }`}
            >
              {item.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
