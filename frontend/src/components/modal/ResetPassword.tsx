import { useState } from "react";
import {
  X,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

interface VerifyResetPassword {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPassword({
  isOpen,
  onClose,
}: VerifyResetPassword) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Please enter a valid email address");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
      bg-gray-800/60 z-60 backdrop-blur-sm"
    >
      <div
        className="bg-white flex flex-col gap-4 text-gray-600 h-fit
        rounded-lg shadow-xl w-full max-w-md p-6 relative
        border border-gray-200 mx-4"
      >
        {/* Header with icon */}
        {status === "idle" && (
          <div className="flex flex-col items-center text-center mb-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} className="text-mayormoto-blue" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xs">
              Enter your email address and we'll send you a code to reset your
              password
            </p>
          </div>
        )}

        {status === "success" ? (
          // Success state
          <div className="flex flex-col gap-1  rounded-lg p-4 text-center">
            <h3 className=" font-medium text-lg">Email Sent!</h3>
            <p className="0 text-sm">
              We've sent a verification code to your email -{" "}
            </p>
            <p className=" font-medium mt-1">{email}</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full flex flex-col justify-center gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="otp"
                    className="block rounded p-2 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="otp"
                    className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                  >
                    Verification Code
                  </label>
                </div>
                <button
                  className="bg-mayormoto-pink hover:bg-mayormoto-pink/85 text-white 
            rounded text-sm py-3 font-semibold transition-colors w-full"
                >
                  SUBMIT
                </button>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="bg-transparent text-green-700 hover:text-green-800
                rounded-lg text-sm py-1 font-medium transition-colors"
              >
                Didn't receive an email? Try again
              </button>
            </div>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block rounded p-2 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                placeholder=" "
                required
                disabled={isSubmitting}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
              >
                Email
              </label>
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="flex items-start gap-2 text-red-600 text-sm -mt-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-mayormoto-pink hover:bg-mayormoto-pink/90"
              } text-white rounded-lg text-sm py-3.5 font-semibold transition-colors
              flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Remember your password?{" "}
            <button
              onClick={onClose}
              className="text-mayormoto-blue hover:underline"
            >
              Back to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
