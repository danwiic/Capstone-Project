// components/Charts.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { formatMoney } from "../../../utils/formatMoney";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export const CategoryDonutChart = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const COLORS = [
    "#6366f1",
    "#facc15",
    "#34d399",
    "#fb7185",
    "#60a5fa",
    "#a78bfa",
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-2 rounded shadow text-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{payload[0].value} products</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const SalesComparisonLineChart = ({
  data,
}: {
  data: { month: string; pos: number; online: number }[];
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white p-2 shadow rounded
text-sm border border-gray-200"
        >
          <p className="font-semibold">{label}</p>
          <p className="text-blue-500">POS: {formatMoney(payload[0].value)}</p>
          <p className="text-green-500">
            Online: {formatMoney(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="pos"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 4 }}
          name="POS Sales"
        />
        <Line
          type="monotone"
          dataKey="online"
          stroke="#34d399"
          strokeWidth={3}
          dot={{ r: 4 }}
          name="Online Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
