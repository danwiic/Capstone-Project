interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disable?: boolean;
  type?: "button" | "submit" | "reset";
  disabledText?: string;
}

export default function Button({
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
      className={`w-full bg-mayormoto-blue cursor-pointer text-white 
        py-3 rounded-sm hover:bg-mayormoto-blue-hover font-medium
        disabled:bg-gray-300 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${className}`}
    >
      {disable && disabledText ? disabledText : children}
    </button>
  );
}
