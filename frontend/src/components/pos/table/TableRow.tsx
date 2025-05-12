type TableRowProps = {
  children?: React.ReactNode;
};

export default function TableRow({ children }: TableRowProps) {
  return (
    <tr
      className="border-b text-sm 
  last:border-b-0 border-gray-300 
     hover:bg-gray-200 cursor-pointer
  "
    >
      {children}
    </tr>
  );
}
