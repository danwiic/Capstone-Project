type DataProps = {
  children?: React.ReactNode;
  position?: "left" | "right" | "center";
};

export default function Data({ children, position }: DataProps) {
  return (
    <td
      className={`px-3 py-4 text-${position ?? "left"} 
    w-auto last-of-type:flex last-of-type:justify-center 
    last-of-type:w-auto`}
    >
      {children}
    </td>
  );
}
