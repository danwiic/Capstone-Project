import Button from "../ui/button/Button";
import { formatMoney } from "../../utils/formatMoney";

interface props {
  name: string | null;
  price: number;
  variants?: {
    variantName: string;
    price: number;
  }[];
}

export default function ProductInfo({ name, price, variants = [] }: props) {
  return (
    <div className="md:col-span-1 lg:col-span-2 row-span-3">
      <div className="w-full h-fit lg:sticky lg:top-40 bg-white shadow-1 p-6 rounded flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{name}</h2>
          <hr className="text-gray-300" />
        </div>

        {variants.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="font-medium flex gap-2">
              <span>Variant:</span>
              <span>{variants[0].variantName}</span>
            </div>
            <div className="flex gap-2">
              {variants.map((variant, idx) => (
                <span
                  key={idx}
                  className="p-1 bg-white first:border-1 border-mayormoto-blue text-gray-700 cursor-pointer font-medium h-10 w-10 text-center flex items-center justify-center"
                >
                  {variant.variantName}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <span className="font-medium">Price:</span>
          <span className="text-2xl text-red-500 font-medium">
            {formatMoney(variants.length > 0 ? variants[0].price : price)}
          </span>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <span className="font-medium">Quantity: </span>
          <div className="border-1 border-gray-200">
            <button className="p-1 border-r-1 px-3 border-gray-200 text-xl font-medium text-gray-400">
              -
            </button>
            <input
              type="text"
              defaultValue={1}
              className="w-10 text-center text-gray-700 text-sm"
            />
            <button className="p-1 border-l-1 px-3 border-gray-200 text-xl font-medium text-gray-400">
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="rounded-xs">Add to cart</Button>
          <Button className="bg-red-500 hover:bg-red-400 rounded-xs">
            Buy it now
          </Button>
        </div>
      </div>
    </div>
  );
}
