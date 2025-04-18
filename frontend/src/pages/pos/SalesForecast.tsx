import SalesDashboard from "../../components/pos/charts/Charts";
import Layout from "../../components/pos/nav/Layout";
import { formatMoney } from "../../utils/formatMoney";

export default function SalesForecast() {
  const historicalData = [
    { month: "Jan", actual: 35000, predicted: 30000 },
    { month: "Feb", actual: 32000, predicted: 30000 },
    { month: "Mar", actual: 37000, predicted: 35000 },
    { month: "Apr", actual: 31000, predicted: 36000 },
  ];

  // Future forecast (upcoming months)
  const forecastData = [
    { month: "Sep", predicted: 30000 },
    { month: "Oct", predicted: 40000 },
    { month: "Nov", predicted: 45000 },
    { month: "Dec", predicted: 43000 },
  ];

  // Combine data for the chart
  const combinedData = [...historicalData, ...forecastData];
  const totalActualSales = historicalData.reduce(
    (sum, item) => sum + item.actual,
    0
  );
  const lastMonthSales = historicalData[historicalData.length - 1].actual;
  const previousMonthSales = historicalData[historicalData.length - 2].actual;
  const growthRate =
    ((lastMonthSales - previousMonthSales) / previousMonthSales) * 100;

  // Calculate projected year-end total
  const projectedYearEnd =
    totalActualSales +
    forecastData.reduce((sum, item) => sum + item.predicted, 0);

  let totalAbsoluteError = 0;
  let totalActualValue = 0;

  historicalData.forEach((month) => {
    const absoluteError = Math.abs(month.actual - month.predicted);
    totalAbsoluteError += absoluteError;
    totalActualValue += month.actual;
  });

  // MAPE (Mean Absolute Percentage Error)
  const mape = (totalAbsoluteError / totalActualValue) * 100;

  // Forecast accuracy (as a percentage)
  const forecastAccuracy = 100 - mape;

  // Inventory calculation (example - using 25% of total sales as inventory)
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4">
          <span className="font-medium text-lg">Sales Forecast</span>

          <div className="grid grid-cols-4 gap-4">
            <div
              className="p-4 py-8 text-gray-600 bg-white shadow-1 
            flex flex-col gap-2 items-center"
            >
              <span className="text-lg font-bold">Growth Rate</span>
              <span className="font-medium text-red-600">
                {growthRate.toFixed(2)}%
              </span>
            </div>
            <div
              className="p-4 py-8 text-gray-600 bg-white shadow-1 
            flex flex-col gap-2 items-center"
            >
              <span className="text-lg font-bold">
                Projected Year-End Income
              </span>
              <span className="font-medium">
                {formatMoney(Number(projectedYearEnd))}
              </span>
            </div>
            <div
              className="p-4 py-8 text-gray-600 bg-white shadow-1 
            flex flex-col gap-2 items-center"
            >
              <span className="text-lg font-bold">Actual Income</span>
              <span className="font-medium">
                {formatMoney(Number(totalActualSales))}
              </span>
            </div>
            <div
              className="p-4 py-8 text-gray-600 bg-white shadow-1 
            flex flex-col gap-2 items-center"
            >
              <span className="text-lg font-bold">Forecast Accuracy</span>
              <span className="font-medium text-green-600">
                {forecastAccuracy.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="">
            <SalesDashboard combinedData={combinedData} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <span className="text-sm text-gray-600">Want to improve accuracy?</span>
            <button
              className="bg-mayormoto-blue px-4 
            py-3 rounded text-white text-sm
            cursor-pointer hover:bg-mayormoto-blue-hover"
            >
              Import previous records
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
