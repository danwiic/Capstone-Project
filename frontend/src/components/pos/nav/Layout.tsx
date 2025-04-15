import { Link } from "react-router-dom";
import logo from "../../../images/mayormoto_logo.png";
import icon from "../../../images/output-onlinepngtools.png";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdHistory,
  MdOutlineBarChart,
  MdOutlineInventory2,
  MdOutlineReceiptLong,
  MdPeopleOutline,
  MdPointOfSale,
  MdSettings,
} from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useState } from "react";
type LayoutProps = {
  children?: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  const [collapse, setCollapse] = useState(false);

  const collapseSidebar = () => {
    setCollapse((prev) => !prev);
  };

  useEffect(() => {
    console.log(collapse);
  }, [collapse]);
  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full">
        <div
          className={`p-4 bg-white shadow-1 w-auto ${
            collapse ? "w-10 " : "w-64 "
          }
        flex flex-col justify-between h-screen top-0 sticky z-10
        bg-white transition-all duration-200 ease-in-out
        `}
        >
          <div className="flex flex-col gap-6 w-full items-center">
            {collapse ? (
              <div
                className="w-10 h-10 flex justify-center 
              items-center flex-col gap-5 py-9 "
              >
                <img
                  src={icon}
                  className="transition-all duration-200 ease-in-out"
                />
              </div>
            ) : (
              <div
                className="w-[12rem] flex flex-col gap-5 p-4 
              justify-center items-center"
              >
                <img src={logo} className="w-auto h-auto" />
              </div>
            )}

            <div className="flex flex-col self-start gap-2">
              <SidebarItems collapse={collapse} />
            </div>
          </div>

          <Link to="/#">
            <div
              className="flex gap-1 items-center 
            px-6 py-2 bg-gray-200 rounded-full
            cursor-pointer text-gray-500 transition-all justify-center
            font-semibold duration-200 ease-in-out hover:text-mayormoto-blue"
            >
              <span className="text-2xl">
                <TbLogout2 />
              </span>
              {!collapse && <span>Logout</span>}
            </div>
          </Link>
        </div>

        <div className="flex-1">
          <div
            className="bg-white w-full p-8 
           z-15 shadow-1 sticky top-0 cursor-pointer"
          >
            <button onClick={() => collapseSidebar()}> click me </button>
          </div>
          <div
            className="px-10 
          py-6"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type SidebarProps = {
  collapse?: boolean;
};

const SidebarItems = ({ collapse }: SidebarProps) => {
  const items = [
    { name: "Dashboard", icon: <LuLayoutDashboard />, path: "/pos/dashboard" },
    { name: "POS Terminal", icon: <MdPointOfSale />, path: "/pos/terminal" },
    { name: "Products", icon: <MdOutlineSell />, path: "/pos/products" },
    {
      name: "Inventory",
      icon: <MdOutlineInventory2 />,
      path: "/pos/inventory",
    },
    { name: "Orders", icon: <MdOutlineReceiptLong />, path: "/pos/orders" },
    { name: "Transaction History", icon: <MdHistory />, path: "/pos/history" },
    { name: "Employees", icon: <MdPeopleOutline />, path: "/pos/employees" },
    { name: "Reports", icon: <MdOutlineBarChart />, path: "/pos/reports" },
    { name: "Settings", icon: <MdSettings />, path: "/pos/settings" },
  ];

  return (
    <>
      {items.map((item, i) => (
        <Link to={item.path} className="w-full" key={i}>
          <div
            className="flex gap-1 items-center 
             px-6 py-2 hover:bg-gray-200 hover:rounded-md
             cursor-pointer text-gray-500 transition-all 
             font-semibold duration-200 ease-in-out hover:text-mayormoto-blue"
          >
            <span className="text-2xl">{item.icon}</span>
            {!collapse && (
              <span
                className="ransition-all 
              duration-200 ease-in-out"
              >
                {item.name}
              </span>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};
