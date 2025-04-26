import { BsExclamationOctagon } from "react-icons/bs";
import { Link } from "react-router-dom";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({  onClose }: LoginModalProps) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-sm shadow-2xl flex flex-col 
      max-w-sm w-full p-4 relative animate-fade-in"
      >
        <div className="flex flex-col gap-6">
          <div
            className="flex items-center justify-center gap-3 
          text-center text-red-600 bg-red-100 p-3 rounded-sm"
          >
            <BsExclamationOctagon size={28} />
            <span className="text-lg font-semibold">You're not logged in</span>
          </div>

          <p className="text-gray-600 text-center text-sm px-4">
            Please sign in first to add your favorite products to the cart!
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-600 px-5 py-2 
    rounded-sm text-sm hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>

            <Link
              to="/login"
              className="bg-mayormoto-pink hover:bg-pink-500 
      text-white px-5 py-2 rounded-sm text-sm transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
