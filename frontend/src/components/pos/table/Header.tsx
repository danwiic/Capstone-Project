type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <th
      className="p-3 py-4 border-y border-gray-300 font-bold
        text-gray-700 w-auto text-center
      "
    >
      {children}
    </th>
  );
}
