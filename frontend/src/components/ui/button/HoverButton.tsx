
type ButtonProps = {
  onClick?: () => void;  // Optional onClick handler
  children?: React.ReactNode; // Optional text or icon
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`p-3 px-8  border-3 rounded-xl font-medium
    bg-transparent border-mayormoto-blue text-mayormoto-blue hover:bg-mayormoto-blue 
    hover:text-white cursor-pointer transition-all duration-300 ease-in-out ${className}`}>
      {children}
    </button>
  );
};

export default Button;
