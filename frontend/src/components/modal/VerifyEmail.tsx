import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Mail, AlertCircle, RefreshCw } from "lucide-react";

interface VerifyEmailProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export default function VerifyEmail({
  isOpen,
  onClose,
  email,
}: VerifyEmailProps) {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); 

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split("").slice(0, 6);
    const newCode = [...verificationCode];

    digits.forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });

    setVerificationCode(newCode);

    // Focus last filled input or the next empty one
    const lastFilledIndex = Math.min(digits.length - 1, 5);
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationCode.join("");
    if (code.length !== 6) {
      setErrorMessage("Please enter all 6 digits of the verification code");
      setVerificationStatus("error");
      return;
    }

    setIsVerifying(true);

    // Simulate verification
    setTimeout(() => {
      if (code === "123456") {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
        setErrorMessage("Invalid verification code. Please try again.");
      }
      setIsVerifying(false);
    }, 1500);
  };

  const resendCode = () => {
    // Reset the timer
    setTimeLeft(300);

    setVerificationStatus("idle");
    setErrorMessage("");
    setVerificationCode(["", "", "", "", "", ""]);

    const successElement = document.getElementById("resend-success");
    if (successElement) {
      successElement.classList.remove("opacity-0");
      setTimeout(() => {
        successElement.classList.add("opacity-0");
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/60 z-60 backdrop-blur-sm">
      <div className="bg-white flex flex-col gap-4 text-gray-600 rounded-lg shadow-xl w-full max-w-md p-6 relative border border-gray-200 mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 p-1.5 rounded-full"
        >
          <X size={20} />
        </button>

        {verificationStatus === "success" ? (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified.
            </p>
            <button
              onClick={onClose}
              className="bg-mayormoto-pink hover:bg-mayormoto-pink/85
              text-white rounded text-sm py-3 px-6 font-semibold transition-colors w-full"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center pt-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail size={24} className="text-mayormoto-blue" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Verify Your Email
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xs">
                We've sent a verification code to your email{email ? ":" : ""}
                {email && (
                  <span className="font-medium block text-mayormoto-blue">
                    {email}
                  </span>
                )}
              </p>
            </div>

            <div
              id="resend-success"
              className="text-sm text-center text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg transition-opacity duration-300 opacity-0"
            >
              A new verification code has been sent to your email
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              {verificationStatus === "error" && (
                <div className="flex items-start gap-2 text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex justify-center items-center gap-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center text-xl font-bold border border-gray-300 
                    rounded outline-none transition-all"
                    disabled={isVerifying}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-500">
                  {timeLeft > 0 ? (
                    <span>
                      Code expires in{" "}
                      <span className="font-medium text-mayormoto-blue">
                        {formatTime(timeLeft)}
                      </span>
                    </span>
                  ) : (
                    <span className="text-red-500">Code expired</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={resendCode}
                  disabled={timeLeft > 240}
                  className={`flex items-center gap-1 ${
                    timeLeft > 240
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-mayormoto-blue hover:text-mayormoto-blue-hover"
                  }`}
                >
                  <RefreshCw size={14} />
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                disabled={isVerifying || timeLeft === 0}
                className={`${
                  isVerifying || timeLeft === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-mayormoto-pink hover:bg-mayormoto-pink/90"
                } text-white rounded-lg text-sm py-3.5 font-semibold transition-colors mt-2`}
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>

            <div className="text-xs text-center text-gray-500 mt-2">
              Didn't receive the code? Check your spam folder or{" "}
              <button
                onClick={resendCode}
                className="text-mayormoto-blue hover:underline"
                disabled={timeLeft > 240}
              >
                request a new one
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
