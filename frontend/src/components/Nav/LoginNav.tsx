import { IoIosArrowDown } from "react-icons/io";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginNav() {
  const { user } = useUserContext();


  return (
    <>
      {user ? (
        <div className="flex flex-col font-medium text-start">
          <span className="text-sm text-gray-600">
            Hello, {user ? `${user.name}` : "User"}
          </span>
          <div
            className="flex items-center gap-1 text-lg 
             text-mayormoto-blue cursor-pointer"
          >
            My Account <IoIosArrowDown />
          </div>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="font-medium text-sm hover:text-mayormoto-blue"
        >
          <div>Login / Signup</div>
        </Link>
      )}
    </>
  );
}
