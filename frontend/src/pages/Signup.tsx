import Footer from "../components/footer/Footer";
import Button from "../components/ui/button/Button";
import InputBox from "../components/ui/InputBox";
import { Link, Navigate, useNavigate } from "react-router-dom"; // Add useNavigate here
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useReducer, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👈 added icons
import { toast } from "react-toastify";

type State = {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
};

type Action =
  | { type: "SET_EMAIL_ERROR"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" };

const initialState: State = {
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.payload };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "SET_CONFIRM_PASSWORD_ERROR":
      return { ...state, confirmPasswordError: action.payload };
    case "CLEAR_ERRORS":
      return { emailError: "", passwordError: "", confirmPasswordError: "" };
    default:
      return state;
  }
};

export default function Signup() {
  const { user, setUser } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_ERRORS" });

    const emailInput = e.currentTarget.email as HTMLInputElement;
    const passwordInput = e.currentTarget.password as HTMLInputElement;
    const confirmPasswordInput = e.currentTarget.confirmPassword as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (!email) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "Email is required" });
      hasError = true;
    } else if (!emailRegex.test(email)) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "Please enter a valid email address" });
      hasError = true;
    }

    if (!password) {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: "Password is required" });
      hasError = true;
    } else if (password.length < 8) {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: "Password must be at least 8 characters" });
      hasError = true;
    }

    if (!confirmPassword) {
      dispatch({ type: "SET_CONFIRM_PASSWORD_ERROR", payload: "Confirm Password is required" });
      hasError = true;
    } else if (password !== confirmPassword) {
      dispatch({ type: "SET_CONFIRM_PASSWORD_ERROR", payload: "Passwords do not match" });
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:3000/user/create`, {
        email,
        password,
        confirmPassword,
      });

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to login page after successful signup
      toast.success("Account created successfully!");
      navigate("/login"); // Redirect here

    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <>
      <div className="px-10 py-6">
        <Link to="/" className="bg-mayormoto-pink text-white px-6 py-3  text-sm rounded hover:bg-mayormoto-pink/80">BACK</Link>
      </div>
      <div className="flex flex-col items-center gap-6 h-auto py-20">
        <form
          onSubmit={handleSignup}
          className="w-1/4 px-8 py-8 rounded-sm shadow-1 bg-white"
        >
          <div className="flex flex-col gap-3 w-full">
            <div className="text-2xl font-bold text-center text-gray-800">
              Create an account
            </div>
            <div className="text-gray-500 text-center mb-2 text-sm">
              Enter your email below to create your account
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
                <div className="text-red-500 text-xs mt-1">{state.emailError}</div>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col w-full relative">
              <label htmlFor="password" className="font-medium text-sm mb-2">
                Password
              </label>
              <div className="relative w-full">
                <InputBox
                  type={showPassword ? "text" : "password"}
                  name="password"
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
                <div className="text-red-500 text-xs mt-1">{state.passwordError}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col w-full relative">
              <label htmlFor="confirmPassword" className="font-medium text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative w-full">
                <InputBox
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Please confirm your Password"
                  classname="w-full pr-10 border-0"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {state.confirmPasswordError && (
                <div className="text-red-500 text-xs mt-1">{state.confirmPasswordError}</div>
              )}
            </div>

            <Button type="submit">
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>

            <div className="text-center text-gray-500 pt-2">
              <span className="text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Login
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
