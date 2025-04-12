export default function MyAccountItems({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      className="hover:bg-mayormoto-blue-hover text-sm text-gray-600
     hover:text-white font-medium cursor-pointer transition-all ease"
    >
      <div className="px-6 py-2 text-start ">{children}</div>
    </div>
  );
}
