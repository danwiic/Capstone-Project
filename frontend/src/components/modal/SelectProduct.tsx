import { useState } from "react";
import { formatMoney } from "../../utils/formatMoney";

interface ProductPassedProps {
  id: string;
  ProductVariant: {
    id: string;
    price: number;
    variantName: string;
  }[];
  ProductImage: {
    imageUrl: string;
  }[];
  name: string;
  price: number;
}

interface SelectProductProps {
  isOpen: boolean;
  onClose: () => void;
  addProduct: (product: ProductPassedProps, quantity: number) => void;
  product: ProductPassedProps;
}

export default function SelectProduct({
  isOpen,
  onClose,
  addProduct,
  product,
}: SelectProductProps) {
  if (!isOpen) return null;
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const hasVariants = product.ProductVariant.length > 0;

  const updatedProduct = {
    ...product,
    price: hasVariants
      ? product.ProductVariant[selectedVariantIndex].price
      : product.price,
    ProductVariant: hasVariants
      ? [
          {
            id: product.ProductVariant[selectedVariantIndex].id,
            variantName:
              product.ProductVariant[selectedVariantIndex].variantName,
            price: product.ProductVariant[selectedVariantIndex].price,
          },
        ]
      : [],
    selectedVariantIndex,
  };

  console.log(product, "product");

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
      <div className="bg-white rounded-md flex flex-col p-4 w-md max-h-[350px] ">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold">{product?.name}</h2>
        </div>
        {product && (
          <div className="grid grid-cols-3 gap-3">
            <div
              className="flex flex-col gap-2 overflow-hidden items-center 
            justify-center h-full"
            >
              <img
                src={product.ProductImage[0].imageUrl || "/placeholder"}
                alt="image"
                className="w-25 h-auto scale-80"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              {product.ProductVariant.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Variants:</span>
                  <div className="flex gap-2">
                    {product.ProductVariant.map((pv, i) => (
                      <span
                        key={pv.variantName}
                        onClick={() => setSelectedVariantIndex(i)}
                        className={`p-1 bg-white border-1 ${
                          i === selectedVariantIndex
                            ? "border-mayormoto-blue"
                            : "border-gray-200"
                        } text-gray-700 text-sm cursor-pointer font-medium h-10 w-10
                          text-center flex items-center justify-center`}
                      >
                        {pv.variantName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-1 items-center font-medium">
                <span className="font-medium text-sm">Price:</span>
                <span className="text-red-500">
                  {formatMoney(
                    product.ProductVariant.length > 0
                      ? product.ProductVariant[selectedVariantIndex].price
                      : product.price
                  )}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Quantity: </span>
                <div className="border-1 border-gray-300">
                  <button
                    onClick={() =>
                      setQuantity((prev) => {
                        if (prev === 1) {
                          return prev;
                        }
                        return prev - 1;
                      })
                    }
                    className="p-1 border-r-1 px-3 border-gray-300 text-xl w-fit
              font-medium text-gray-400 hover:text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-10 text-center text-gray-700 text-sm outline-0"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value > 0) {
                        setQuantity(value);
                      } else if (e.target.value === "") {
                        setQuantity(0);
                      }
                    }}
                  />

                  <button
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                    disabled={!product}
                    className="p-1 border-l-1 px-3 border-gray-300 text-xl font-medium text-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              console.log("Selected quantity", quantity);
              console.log("Product being added", updatedProduct);
              product && addProduct(updatedProduct, quantity);
            }}
            disabled={!product}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
