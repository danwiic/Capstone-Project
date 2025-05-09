import { IoIosArrowDown } from "react-icons/io";
import { useUserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import AccountModal from "../MyAccount/index.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.tsx";

export default function LoginNav() {
  const { user, setUser } = useUserContext(); // Assuming setUser is available to set user state
  const [viewSettings, setViewSettings] = useState(false);
  const navigate = useNavigate(); // To redirect after logout

  function handleViewAccountSettings() {
    setViewSettings((prev) => !prev);
  }

  function handleLogout() {
    // Clear user session (localStorage, cookies, or context)
    localStorage.removeItem("authToken"); // Example of removing an auth token (if you're using JWT tokens in localStorage)
    setUser(null); // Update user context to null (logging the user out)

    // Redirect to the home page or login page
    navigate("/login");
  }

  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setViewSettings(false));

  return (
    <>
      <div ref={ref}>
        {user ? (
          <div className="flex flex-col font-medium text-start">
            <span className="text-sm text-gray-600">
              Hello, {user?.firstName ?? "User"}
            </span>
            <button
              onClick={handleViewAccountSettings}
              className="flex items-center gap-1 text-lg text-mayormoto-blue cursor-pointer"
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
          <div className="z-50 sticky -bottom-10 bg-white w-full animate-fade animate-once animate-duration-[300ms] animate-ease">
            <AccountModal.Body
              cartPosition="right-30"
              setter={setViewSettings}
              className="after:right-4.5"
            >
              <AccountModal.Items>
                <Link className="w-full" to={"/address"}>
                  My Address
                </Link>
              </AccountModal.Items>
              <AccountModal.Items onClick={handleLogout}>
                Logout
              </AccountModal.Items>
            </AccountModal.Body>
          </div>
        )}
      </div>
    </>
  );
}
