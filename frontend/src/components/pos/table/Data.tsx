type DataProps = {
  children?: React.ReactNode;
};

export default function Data({ children }: DataProps) {
  return (
    <td
      className="px-3 py-4 
    w-auto last-of-type:flex last-of-type:justify-center last-of-type:w-auto"
    >
      {children}
    </td>
  );
}
