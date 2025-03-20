
type ButtonProps = {
  onClick?: () => void;  // Optional onClick handler
  children?: React.ReactNode; // Optional text or icon
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="p-3 px-8 text-mayormoto-blue border-2 rounded-xl bg-mayormoto-blue text-white">
      {children}
    </button>
  );
};

export default Button;
