import Footer from "../components/footer/Footer";
import Button from "../components/ui/button/Button";
import InputBox from "../components/ui/InputBox";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useReducer, useState } from "react";

type State = {
  emailError: string;
  passwordError: string;
};

type Action =
  | { type: "SET_EMAIL_ERROR"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" };

const initialState: State = {
  emailError: "",
  passwordError: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.payload };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "CLEAR_ERRORS":
      return { emailError: "", passwordError: "" };
    default:
      return state;
  }
};

export default function Login() {
  const { user, setUser } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "CLEAR_ERRORS" });

    const emailInput = e.currentTarget.email as HTMLInputElement;
    const passwordInput = e.currentTarget.password as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let hasError = false;

    if (!email) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "Email is required" });
      hasError = true;
    } else if (!emailRegex.test(email)) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: "Please enter a valid email address",
      });
      hasError = true;
    }

    if (!password) {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: "Password is required" });
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:3000/user/login`, {
        email,
        password,
      });

      setUser(response.data.user);
      console.log("Login successful:", response.data.user);
      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <>
      <div className="flex flex-col items-center gap-6 h-auto py-20">
        <form
          onSubmit={handleLogin}
          className="w-1/4 px-8 py-8 rounded-sm shadow-1 bg-white"
        >
          <div className="flex flex-col gap-3 w-full">
            <div className="text-2xl m-0 p-0 font-bold text-center text-gray-800">
              Sign in to your account
            </div>
            <div className="text-gray-500 text-center mb-2 text-sm">
              Enter your email below to login to your account
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="email" className="font-medium text-sm mb-2">
                Email
              </label>
              <InputBox
                type="email"
                name="email"
                placeholder="Please enter your Email"
                classname="w-full"
              />
              {state.emailError && (
                <div className="text-red-500 text-xs mt-1">
                  {state.emailError}
                </div>
              )}
            </div>

            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="font-medium text-sm">
                  Password
                </label>
                <Link
                  to=""
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
              <InputBox
                type="password"
                name="password"
                placeholder="Please enter your Password"
                classname="w-full"
              />
              {state.passwordError && (
                <div className="text-red-500 text-xs mt-1">
                  {state.passwordError}
                </div>
              )}
            </div>

            <Button type="submit">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-gray-500 pt-2">
              <span className="text-sm">
                Don't have an account?{" "}
                <Link
                  to=""
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
