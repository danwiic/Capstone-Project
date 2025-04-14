interface ButtonProps {
  children?: any;
  className?: string;
  onClick?: any;
  disable?: boolean;
}
export default function Button({ children, className, onClick, disable }: ButtonProps) {
  return (
    <>
      <button
        disabled={disable}
        onClick={() => onClick()}
        className={`w-full bg-mayormoto-blue cursor-pointer text-white 
          py-3 rounded-sm hover:bg-mayormoto-blue-hover font-medium ${className}`}
      >
        {children}
      </button>
    </>
  );
}
