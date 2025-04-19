import { SalesComparisonLineChart } from "../components/pos/charts/Charts";

export default function Test() {
  const salesComparisonData = [
    { month: "January", pos: 15560, online: 7353 },
    { month: "February", pos: 11800, online: 12400 },
    { month: "March", pos: 13000, online: 25400 },
  ];
  return (
    <div className="p-16 flex flex-col ">
      <SalesComparisonLineChart data={salesComparisonData} />
    </div>
  );
}
