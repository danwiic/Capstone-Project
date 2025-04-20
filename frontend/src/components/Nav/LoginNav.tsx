import { IoIosArrowDown } from "react-icons/io";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import AccountModal from "../MyAccount/index.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.tsx";

export default function LoginNav() {
  const { user } = useUserContext();
  const [viewSettings, setViewSettings] = useState(false);

  function handleViewAccountSettings() {
    setViewSettings((prev) => !prev);
  }

  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setViewSettings(false));

  return (
    <div ref={ref}>
      {user ? (
        <div className="flex flex-col font-medium text-start">
          <span className="text-sm text-gray-600">
            Hello, {user ? `${user.name}` : "User"}
          </span>
          <button
            onClick={() => handleViewAccountSettings()}
            className="flex items-center gap-1 text-lg 
             text-mayormoto-blue cursor-pointer"
          >
            My Account <IoIosArrowDown />
          </button>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="text-sm font-semibold uppercase hover:text-mayormoto-blue"
        >
          <div>Login / Signup</div>
        </Link>
      )}

      {viewSettings && (
        <div
          className="z-50 sticky -bottom-10 bg-white w-full 
        animate-fade animate-once animate-duration-[300ms] animate-ease"
        >
          <AccountModal.Body
            cartPosition="right-30"
            setter={setViewSettings}
            className="after:right-4.5"
          >
            <AccountModal.Items>My Orders</AccountModal.Items>
            <AccountModal.Items>My Adresses</AccountModal.Items>
            <AccountModal.Items>Logout</AccountModal.Items>
          </AccountModal.Body>
        </div>
      )}
    </div>
  );
}
