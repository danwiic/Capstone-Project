export default function DataTable({ children }: any) {
  return (
    <div className="p-4 w-full">
      <table className="w-full">{children}</table>
    </div>
  );
}
