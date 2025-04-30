interface ButtonProps {
  bg?: string,
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disable?: boolean;
  type?: "button" | "submit" | "reset";
  disabledText?: string;
}

export default function Button({
  bg,
  children,
  className = "",
  onClick,
  disable = false,
  type = "button",
  disabledText,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={onClick}
      className={`w-full  bg-mayormoto-pink cursor-pointer text-white 
        py-3 rounded-sm hover:bg-mayormoto-pink/80 font-medium
        disabled:bg-gray-300 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out ${bg}
        ${className}`}
    >
      {disable && disabledText ? disabledText : children}
    </button>
  );
}
