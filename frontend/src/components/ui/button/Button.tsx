interface ButtonProps {
  children?: any;
  className?: string;
  onClick?: any;
}
export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <>
      <button
        onClick={() => onClick()}
        className={`w-full bg-mayormoto-blue cursor-pointer text-white 
          py-3 rounded-sm hover:bg-mayormoto-blue-hover font-medium ${className}`}
      >
        {children}
      </button>
    </>
  );
}
