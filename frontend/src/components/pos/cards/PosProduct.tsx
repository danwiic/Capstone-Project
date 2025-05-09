import { formatMoney } from "../../../utils/formatMoney";

interface Props {
  product: {
    productImage: string;
    productName: string;
    productCategory: string;
    productPrice: number;
  };
}

export default function PosProduct({ product }: any) {
  return (
    <div className="py-4 bg-white rounded shadow-1 w-full h-auto flex flex-col gap-2 ">
      <div className="w-full flex items-center justify-center">
        <div className="flex justify-center w-20 h-30">
          <img
            src={product.productImage || "/placeholder"}
            alt="/"
            className="w-auto h-auto scale-80"
          />
        </div>
      </div>
      <div className="text-sm flex flex-col gap-2 px-4">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">
            {product.productCategory || "Category"}
          </span>
          <span className="font-medium">{product.productName || "Name"}</span>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="font-medium text-red-500">
            {formatMoney(product.productPrice || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
