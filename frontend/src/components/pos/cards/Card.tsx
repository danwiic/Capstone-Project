import { formatMoney } from "../../../utils/formatMoney";
import { FaArrowTrendUp } from "react-icons/fa6";
import formatNumber from "../../../utils/formatNumber";

type CardProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  moneyFormat?: boolean;
  numberValue: any;
};

export default function Card({
  title,
  subtitle = "Last 30 days",
  icon,
  moneyFormat,
  numberValue = 0,
}: CardProps) {
  return (
    <div className="bg-white rounded shadow-1 p-4 w-full flex flex-col gap-4">
      <div className="flex justify-between gap-6 items-center">
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-xs text-gray-500">{subtitle}</span>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">
          {moneyFormat ? formatMoney(numberValue) : formatNumber(numberValue)}
        </span>
        <div className="flex gap-1 items-center text-xs text-green-500">
          <FaArrowTrendUp />
          <span>%4</span>
        </div>
      </div>
    </div>
  );
}
