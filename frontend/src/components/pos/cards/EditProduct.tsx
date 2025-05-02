import { formatMoney } from "../../../utils/formatMoney";
import Kebab from "../menu/Kebab";

interface EditProductProps {
  view?: "grid" | "list";
  productId?: string;
  productName?: string;
  productImage?: string;
  productPrice?: number;
  productBrand?: string;
  productCategory?: string;
}

export default function EditProduct({
  view = "grid",
  productId = "1",
  productName = "Helmet Zebra 432",
  productImage = "https://res.cloudinary.com/dvexdyqea/image/upload/v1745594064/Sphinx_Motorcycle_Gloves_V-001__Black_-999__stock-_M-2_XL-2_xe7dp5.png",
  productPrice = 2199,
  productCategory = "Helmet",
  productBrand = "Zebra",
}: EditProductProps) {
  const items = [
    { label: "Edit", onClick: () => console.log("Edit clicked") },
    { label: "Archive", onClick: () => console.log("archived clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
  ];
  return view === "grid" ? (
    <div className="py-4 bg-white rounded shadow-1 w-full h-auto flex flex-col gap-2 ">
      <span className="text-sm font-medium text-right">
        <Kebab items={items} />
      </span>
      <div className="w-full flex items-center justify-center">
        <div className="flex justify-center w-full  h-32">
          <img src={productImage} className="w-28 h-full  scale-100" />
        </div>
      </div>
      <div className="text-sm flex flex-col gap-2 px-4">
        <div className="flex flex-col gap">
          <span className="text-gray-500">{productBrand}</span>
          <span className="font-medium">{productName}</span>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="font-medium text-red-500">
            {formatMoney(productPrice)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-between bg-white rounded shadow-1 w-full p-4 gap-2">
      <span className="w-15 h-15 flex items-center justify-center">
        <img src={productImage} className="w-auto inset-0" />
      </span>
    </div>
  );
}
