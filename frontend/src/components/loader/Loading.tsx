export default function Loading() {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex 
    items-center justify-center bg-white z-50"
    >
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-bounce h-10 w-10 text-mayormoto-pink"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
          />
        </svg>
        <p className="text-gray-500">Loading<span className="animate-bounce">...</span></p>
      </div>
    </div>
  );
}
