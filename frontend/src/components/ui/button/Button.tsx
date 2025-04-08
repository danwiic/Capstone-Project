interface ButtonProps {
  children?: string;
  fn?: () => void
}
export default function Button({children, fn}: ButtonProps) {
  return (
    <>
      <button
        onClick={() => fn}
        className="w-full bg-mayormoto-blue cursor-pointer text-white 
          py-3 rounded-sm hover:bg-mayormoto-blue-hover font-medium"
      >
        {children}
      </button>
    </>
  );
}

