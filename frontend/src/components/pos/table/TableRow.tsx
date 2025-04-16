type TableRowProps = {
  children?: React.ReactNode;
};

export default function TableRow({ children }: TableRowProps) {
  return (
    <tr
      className="border-b text-sm 
  last:border-b-0 border-gray-300 
    odd:bg-gray-50
  "
    >
      {children}
    </tr>
  );
}
