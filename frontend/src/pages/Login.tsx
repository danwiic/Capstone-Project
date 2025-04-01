import InputBox from "../ui/InputBox";
import logo from "../images/mayormoto-logo-removebg-preview.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-6 h-screen">
      <Link to={"/"}>
        <figcaption>
          <img src={logo} alt="" className="w-70 h-26 object-cover " />
        </figcaption>
      </Link>

      <form action="" className="w-1/4 px-8 py-8 rounded-sm shadow-lg">
        <div className="flex flex-col gap-3 w-full">
          <div className="text-2xl m-0 p-0 font-bold text-center text-gray-800">
            Login to your account
          </div>
          <div className="text-gray-500 text-center mb-2 text-sm">
            Enter your username or email below to login to your account
          </div>

          <label htmlFor="username" className="font-medium text-sm mb-20">
            Username / Email
            <InputBox
              type="text"
              name="username"
              placeholder="Please enter your Username or Email"
              classname="w-full"
              required
            />
          </label>

          <label htmlFor="password" className="font-medium text-sm">
            Password
            <InputBox
              type="password"
              name="password"
              placeholder="Please enter your Password"
              classname="w-full "
              required
            />
          </label>

          <Link to="" className="w-full">
            <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer text-end">
              Forgot Password?
            </div>
          </Link>

          <button
            className="w-full bg-mayormoto-blue cursor-pointer text-white 
          py-3 rounded-lg hover:bg-mayormoto-blue-hover font-medium"
          >
            Login
          </button>

          <div className="text-center  text-gray-500 pt-2">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link to="" className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
