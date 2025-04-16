import { GoAlert } from "react-icons/go";
type CardProps = {
  title: string;
  icon?: React.ReactNode;
  moneyFormat?: boolean;
  numberValue: any;
};

export default function StockCard({}) {
  return (
    <div className="bg-white rounded shadow-1 p-4 w-full flex flex-col gap-4">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex flex-col">
          <span>Inventory Alert </span>
          <span className="text-xs text-gray-500">less than 5</span>

        </div>
        <div className="text-3xl">
          <GoAlert />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl text-red-400">4 Products</span>
      </div>
    </div>
  );
}
