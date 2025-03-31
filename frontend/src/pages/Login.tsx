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
      
      <form action="" className="w-98 px-8 shadow-2xl py-6 rounded-sm">
        <div className="flex flex-col gap-3 w-full">
          <div className="text-3xl mb-4 pb-6 font-semibold">Login</div>

          <label htmlFor="username" className="font-semibold">
            Username / Email
            <InputBox
              type="text"
              name="username"
              placeholder="Please enter your Username or Email"
              classname="w-full"
              required
            />
          </label>

          <label htmlFor="password" className="font-semibold">
            Password
            <InputBox
              type="password"
              name="password"
              placeholder="Please enter your Password"
              classname="w-full "
              required
            />
          </label>

          <Link to="">
            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer text-end">
              Forgot Password?
            </span>
          </Link>

          <button className="w-full bg-mayormoto-blue cursor-pointer text-white 
          py-3 rounded-lg hover:bg-mayormoto-blue-hover">
            LOGIN
          </button>

          <div className="text-center text-sm text-gray-500 pt-2">
            <span>
              Already have an account? <Link to="" className="text-blue-600 hover:underline">Sign up</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
