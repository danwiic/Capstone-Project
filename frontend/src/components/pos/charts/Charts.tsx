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
  ReferenceLine,
  ComposedChart,
} from "recharts";
import { formatMoney } from "../../../utils/formatMoney";

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
          <p>{payload[0].value} sold</p>
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
        <div className="bg-white p-2 shadow rounded text-sm border border-gray-200">
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
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }} // Add these margins
      >
        <CartesianGrid
          strokeDasharray="10 0"
          stroke="#e5e7eb"
          vertical={false}
        />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="pos"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="POS Sales"
        />
        <Line
          type="monotone"
          dataKey="online"
          stroke="#34d399"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="Online Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function SalesDashboard({ combinedData }: any) {
  return (
    <div className="flex flex-col w-full gap-8 p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-8 flex items-center justify-between">
        <span className=" font-bold text-gray-700">Annual Sales Forecast</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Year</span>
          <select className="border border-gray-300 rounded-xs p-2 text-sm">
            <option>2025</option>
          </select>
        </div>
      </div>

      <div className="w-full h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedData}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="10 0" vertical={false} />
            <XAxis dataKey="month" />
            <Tooltip
              formatter={(value) => `₱${value}`}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <ReferenceLine
              x="Aug"
              stroke="#888"
              strokeDasharray="3 3"
              label={{ value: "Current", position: "top" }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Sales"
              stroke="#1e3a8a"
              strokeWidth={3}
              dot={{ r: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              name="Predicted Sales"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrendingProductsChart({ data }: any) {
  return (
    <div className="p-6 h-[400px]">
      <ResponsiveContainer width="100%" height={"100%"}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: -15,
          }}
        >
          <CartesianGrid strokeDasharray="10 0" vertical={false} />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            formatter={(value, name, props) => [value, "sold"]}
            labelFormatter={(label) =>
              `${label}: ${
                data.find((item: any) => item.month === label)?.product
              }`
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sold"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 6 }}
            name="Trending Category"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const SalesByHourChart = ({
  data,
}: {
  data: { time: string; pos: number; online: number }[];
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded text-sm border border-gray-200">
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
    <ResponsiveContainer width="100%" height={220}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 0"
          stroke="#e5e7eb"
          vertical={false}
        />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="pos"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="POS Sales"
        />
        <Line
          type="monotone"
          dataKey="online"
          stroke="#34d399"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="Online Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const SalesLast7DaysChart = ({
  data,
}: {
  data: { time: string; sales: number }[];
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded text-sm border border-gray-200">
          <p className="font-semibold">{label}</p>
          <p className="text-indigo-500">
            Sales: {formatMoney(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: -5 }}
      >
        <CartesianGrid
          strokeDasharray="3 0"
          stroke="#e5e7eb"
          vertical={false}
        />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="Total Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const SalesByCategoryBarChart = ({
  data,
}: {
  data: { category: string; sales: number }[];
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded text-sm border border-gray-200">
          <p className="font-semibold">{label}</p>
          <p className="text-indigo-600">
            Sales: {formatMoney(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 30, right: 50, left: 10, bottom: -5 }}
      >
        <CartesianGrid
          strokeDasharray="3 0"
          stroke="#e5e7eb"
          vertical={false}
        />
        <XAxis type="number" tickFormatter={(value) => formatMoney(value)} />
        <YAxis
          dataKey="category"
          type="category"
          tick={{ fontSize: 12 }}
          width={120}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="sales" fill="#6366f1" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const formatNumber = (n: number) => n.toLocaleString();

export const TransactionComparisonLineChart = ({
  data,
}: {
  data: { date: string; pos: number; online: number }[];
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded text-sm border border-gray-200">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-500">POS: {formatNumber(payload[0].value)}</p>
          <p className="text-green-500">
            Online: {formatNumber(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 0" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="pos"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="POS Transactions"
        />
        <Line
          type="monotone"
          dataKey="online"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ r: 0 }}
          name="Online Transactions"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const RevenueGrowthRateChart = ({
  data,
}: {
  data: { month: string; growthRate: number }[];
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
          <p className="font-semibold">{label}</p>
          <p
            className={`${
              payload[0].value >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            Growth: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 0" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
    
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="growthRate"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 3 }}
          name="Revenue Growth %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};