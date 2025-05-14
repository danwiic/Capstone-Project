import { X } from "lucide-react";
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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
    bg-gray-800/45 z-60"
    >
      <div
        className="bg-white flex flex-col gap-4 text-gray-600 h-fit
       rounded-lg shadow-xl w-1/4 max-w-md p-6 relative"
      >
        <div className="flex items-center justify-between pb-3 ">
          <h2 className="text-xl font-semibold text-gray-700 gap-2 flex items-center">
            OTP Verification
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p
          className="text-sm text-center text-green-700 bg-green-200 p-3 rounded
        "
        >
          We've sent a verification code to your email -{" "}
          <span className="font-medium">{email}</span>
        </p>
        <div className="flex flex-col gap-4">
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
            rounded text-sm py-3 font-semibold transition-colors"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
