import { Link } from "react-router-dom";
import logo from "../../../images/mayormoto_logo.png";
import icon from "../../../images/output-onlinepngtools.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import {
  MdHistory,
  MdOutlineBarChart,
  MdOutlineInventory2,
  MdOutlineReceiptLong,
  MdPeopleOutline,
  MdPointOfSale,
  MdOnlinePrediction,
} from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

import { MdOutlineSell } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  const [collapse, setCollapse] = useState(false);

  const collapseSidebar = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full">
        <div
          className={`p-4 bg-white shadow-1 flex flex-col justify-between h-screen top-0 sticky z-20
              transition-all duration-300 ease-in-out overflow-hidden
              ${collapse ? "w-20" : "w-66"}`}
        >
          <div className="flex flex-col gap-6 w-full items-center">
            {collapse ? (
              <div className="w-10 h-10 flex justify-center items-center flex-col gap-5 py-9">
                <img
                  src={icon}
                  alt="Icon"
                  loading="lazy"
                  className="w-10 h-10 transition-all duration-300 ease-in-out"
                />
              </div>
            ) : (
              <div className="w-[12rem] flex flex-col gap-5 p-4 justify-center items-center transition-all duration-300 ease-in-out">
                <img
                  src={logo}
                  alt="Logo"
                  loading="lazy"
                  className="w-auto h-auto transition-all duration-300 ease-in-out"
                />
              </div>
            )}

            <div className={`flex flex-col self-start gap-2 w-full`}>
              <SidebarItems collapse={collapse} />
            </div>
          </div>

          <Link to="/#">
            <div
              className={`flex gap-1 items-center 
                px-6 py-3  rounded-full
                cursor-pointer transition-all
                font-semibold duration-200 ease-in-out text-white
                bg-mayormoto-blue hover:bg-mayormoto-blue-hover
                justify-center whitespace-nowrap `}
            >
              <span
                className={`text-2xl 
                ${collapse && "justify-center"}`}
              >
                <TbLogout2 />
              </span>
              <span
                className={`transition-all duration-300 ease-in-out ${
                  collapse ? "opacity-0 w-0" : "opacity-100 ml-2"
                }`}
              >
                Logout
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-1">
          <div
            className={`bg-white w-full p-2
              z-15 shadow-1 sticky top-0 flex 
              justify-between items-center`}
          >
            <button
              onClick={collapseSidebar}
              className={`flex items-center px-4 py-2
               rounded-md text-4xl cursor-pointer
              hover:bg-gray-200 transition-colors duration-200 ${
                collapse && "bg-gray-200 text-mayormoto-blue"
              }`}
            >
              {collapse ? (
                <TbLayoutSidebarRightCollapse />
              ) : (
                <TbLayoutSidebarLeftCollapse className="text-gray-500" />
              )}
            </button>

            <div className="flex gap-4 pr-6 items-center ">
              <span
                className="bg-red-200 w-10 h-10 
              flex justify-center items-center rounded-full"
              >
                img
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Dan Pirante</span>
                <span className="text-xs font-medium text-gray-400">Admin</span>
              </div>
            </div>
          </div>
          <div className="px-10 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

type SidebarProps = {
  collapse?: boolean;
};

const SidebarItems = ({ collapse }: SidebarProps) => {
  const location = useLocation();

  const items = [
    { name: "Dashboard", icon: <LuLayoutDashboard />, path: "/pos/dashboard" },
    { name: "POS Terminal", icon: <MdPointOfSale />, path: "/pos/terminal" },
    {
      name: "Sales Forecasting",
      icon: <MdOnlinePrediction />,
      path: "/pos/forecasting",
    },
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
  ];

  return (
    <>
      {items.map((item, i) => {
        const isActive = location.pathname === item.path;

        return (
          <Link to={item.path} className="w-full" key={i}>
            <div
              title={item.name}
              className={`flex gap-1 items-center px-6 py-2 rounded-md cursor-pointer 
                font-semibold transition-all duration-100 ease-in
                ${collapse && "justify-center"}
                ${
                  isActive
                    ? "bg-mayormoto-blue text-white"
                    : "text-gray-600 hover:bg-gray-200 hover:text-mayormoto-blue"
                }
                `}
            >
              <span className={`text-2xl`}>{item.icon}</span>
              <span
                className={`transition-all duration-300 ease-in-out 
                  whitespace-nowrap overflow-hidden
                  ${collapse ? "opacity-0 w-0" : "opacity-100 ml-2"}`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
};
