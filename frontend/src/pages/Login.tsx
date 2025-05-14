import Button from "../components/ui/button/Button";
import InputBox from "../components/ui/InputBox";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useReducer, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ResetPassword from "../components/modal/ResetPassword";
// import OTP from "../components/modal/OTP";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsModalOpen] = useState(false); // State for OTP modal
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_ERRORS" });

    const emailInput = e.currentTarget.email as HTMLInputElement;
    const passwordInput = e.currentTarget.password as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    setPassword(password);
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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsModalOpen(true);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          dispatch({
            type: "SET_EMAIL_ERROR",
            payload: data.error || "User not found. Please sign up.",
          });
        } else if (status === 406) {
          const errorMsg = data.error || "Invalid credentials";

          if (errorMsg.toLowerCase().includes("email")) {
            dispatch({ type: "SET_EMAIL_ERROR", payload: errorMsg });
          } else if (
            errorMsg.toLowerCase().includes("password") ||
            errorMsg.toLowerCase().includes("credentials")
          ) {
            dispatch({ type: "SET_PASSWORD_ERROR", payload: errorMsg });
          } else {
            dispatch({ type: "SET_PASSWORD_ERROR", payload: errorMsg });
          }
        }
      } else if (error.request) {
        dispatch({
          type: "SET_PASSWORD_ERROR",
          payload: "Network error. Please try again later.",
        });
      } else {
        dispatch({
          type: "SET_PASSWORD_ERROR",
          payload: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // const closeModal = () => setIsModalOpen(false);

  if (user?.role === "admin") return <Navigate to="/pos/dashboard" />;
  if (user?.role === "employee") return <Navigate to="/pos/terminal" />;
  if (user) return <Navigate to="/" />;

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-full px-8 py-8 rounded-sm bg-white"
      >
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-1">
            <div className="text-xl font-bold text-center text-gray-800">
              Sign in to your account
            </div>
            <div className="text-gray-500 text-center mb-4 text-sm">
              Enter your email below to login to your account
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="font-medium text-sm">
                Password
              </label>
              <Link
                to=""
                onClick={() => setIsModalOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative w-full">
              <InputBox
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Please enter your Password"
                classname="w-full pr-10"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {state.passwordError && (
              <div className="text-red-500 text-xs mt-1">
                {state.passwordError}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button type="submit">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
      {isOpen && (
        <ResetPassword
          isOpen={isOpen}
          onClose={() => setIsModalOpen((prev) => !prev)}
        />
      )}
    </>
  );
}
