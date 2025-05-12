type HeaderProps = {
  children?: React.ReactNode;
  position?: "left" | "right" | "center";
};

export default function Header({ children, position }: HeaderProps) {
  return (
    <th
      className={`p-3 py-4 border-b border-gray-300 font-bold
        text-gray-500 w-auto text-${position ?? "left"} text-sm
      `}
    >
      {children}
    </th>
  );
}
