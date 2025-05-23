type DataProps = {
  children?: React.ReactNode;
  position?: "left" | "right" | "center";
  text?: string;
};

export default function Data({ children, position, text }: DataProps) {
  return (
    <td
      className={`px-3 py-4 text-${position ?? "left"} 
    w-auto ${text}`}
    >
      {children}
    </td>
  );
}
