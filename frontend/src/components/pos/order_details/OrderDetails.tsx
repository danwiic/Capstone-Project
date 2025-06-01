import { formatMoney } from "../../../utils/formatMoney";
import { CiCreditCard1 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdOutlineDiscount } from "react-icons/md";
import { useEffect, useState } from "react";

interface OrderDetailsProps {
  removeAllItems: () => void;
  decreaseQuantity: (id: string) => void;
  products: {
    id: string;
    imageUrl: string;
    name: string;
    quantity: number;
    variantName?: string;
    price: number;
    ProductVariant?: {
      price: number;
      variantName: string;
    };
    selectedVariantIndex?: number;
  }[];
}

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  variantName?: string;
  price: number;
  ProductVariant?: {
    id: string;
    price: number;
    variantName: string;
  }[];
}
[];

export default function OrderDetails({
  removeAllItems,
  decreaseQuantity,
  products,
}: OrderDetailsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [cashAmount, setCashAmount] = useState<string>("");

  // Initialize selectedProducts with the products prop
  useEffect(() => {
    setSelectedProducts(products);
  }, [products]);

  // Calculate totals
  const subtotal = selectedProducts.reduce(
    (sum, product) =>
      sum +
      product.quantity *
        (product.price ||
          (product.ProductVariant && product.ProductVariant[0]?.price) ||
          0),
    0
  );

  console.log(selectedProducts, "selectedProducts0000");

  const tax = subtotal * 0.1; // Update as needed
  const discount = 0; // Update as needed

  const cashValue = parseFloat(cashAmount) || 0;
  const grandTotal = tax + subtotal - discount;
  const change = cashValue > grandTotal ? cashValue - grandTotal : 0;

  const changeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) quantity = 1;

    setSelectedProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === id ? { ...prod, quantity } : prod
      )
    );
  };

  const addQuantity = (id: string) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === id ? { ...prod, quantity: prod.quantity + 1 } : prod
      )
    );
  };

  const handleCashInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCashAmount(value);
  };

  return (
    <div
      className="flex flex-col gap-4 sticky top-0 h-auto shadow-1 
      overflow-y-auto scrollbar-thin 
        scrollbar-thumb-rounded-xl"
    >
      <div className="bg-white p-4 w-full rounded-xs">
        <div className="border-b border-dashed border-gray-400 py-2">
          <div className="flex items-center justify-between font-medium">
            <span>Order Details</span>
            <div className="flex gap-2 items-center">
              <MdOutlineDiscount
                title="Apply Discount"
                className="text-2xl
                  cursor-pointer font-bold"
              />
            </div>
          </div>
        </div>
        <div className="py-2 flex flex-col gap-2">
          <div
            className="flex flex-col justify-center gap-3 
                border-b border-dashed border-gray-400 pb-3"
          >
            <table>
              <thead className="text-sm font-medium ">
                <tr>
                  <th className="text-left px-1 w-fit">Item Name</th>
                  <th className="text-left">Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {selectedProducts.map((prod, i) => (
                  <tr key={i} className="text-sm ">
                    <td className="text-gray-600 p-1 w-fit">
                      {prod.name}{" "}
                      {prod.ProductVariant &&
                        prod.ProductVariant?.length > 0 &&
                        `- ${prod.ProductVariant[0].variantName}`}
                    </td>
                    <td className="text-left ">
                      <div
                        className="text-center border rounded w-fit
                        border-gray-400 flex items-center gap-1 px-2"
                      >
                        <button
                          onClick={() => decreaseQuantity(prod.id)}
                          className="cursor-pointer text-lg"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-8 text-center px-1 outline-0"
                          value={prod.quantity}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              setSelectedProducts((prevProducts) =>
                                prevProducts.map((p) =>
                                  p.id === prod.id ? { ...p, quantity: 0 } : p
                                )
                              );
                              return;
                            }

                            if (/^\d+$/.test(e.target.value)) {
                              const newQuantity = parseInt(e.target.value);
                              changeQuantity(prod.id, newQuantity);
                            }
                          }}
                          onBlur={() => {
                            if (prod.quantity === 0) {
                              setSelectedProducts((prevProducts) =>
                                prevProducts.filter((p) => p.id !== prod.id)
                              );
                            } else if (prod.quantity < 1) {
                              changeQuantity(prod.id, 1);
                            }
                          }}
                        />
                        <button
                          onClick={() => addQuantity(prod.id)}
                          className="cursor-pointer text-lg"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-medium text-end px-2 min-w-[100px]">
                      {formatMoney(
                        (prod.price || prod.ProductVariant?.[0]?.price || 0) *
                          prod.quantity
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedProducts.length > 0 && (
              <span
                onClick={removeAllItems}
                title="Remove All Items"
                className="text-red-500 text-sm 
                    font-medium cursor-pointer text-right px-2
                     hover:text-red-400 w-fit self-end"
              >
                Remove All
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium">Order Summary</span>
            <div
              className="px-4 flex flex-col gap-1 
                    border-b border-dashed border-gray-400 pb-3"
            >
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatMoney(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm items-center ">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatMoney(tax)}</span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">{formatMoney(discount)}</span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Cash</span>
                <span className="font-medium">{formatMoney(cashValue)}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Change</span>
                <span className="font-medium">{formatMoney(change)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium items-center">
                <span>Grand Total</span>
                <span className="font-medium">{formatMoney(grandTotal)}</span>
              </div>
            </div>
            <div className="border-b border-dashed border-gray-400 pb-3">
              <span className="font-medium">Cash</span>
              <input
                type="text"
                placeholder="0"
                value={cashAmount}
                onChange={handleCashInputChange}
                className="text-right w-full border border-gray-300 
                      rounded px-4 py-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Payment Method</span>
              <div className="flex gap-2 justify-between items-center">
                <button
                  className="px-4 py-2 bg-mayormoto-blue rounded
                  hover:bg-mayormoto-blue-hover hover:cursor-pointer
                text-white w-full flex items-center justify-center gap-2
                "
                >
                  <BsCash />
                  Cash
                </button>
                <button
                  className="px-4 py-2 bg-mayormoto-blue rounded
                  hover:bg-mayormoto-blue-hover hover:cursor-pointer
                text-white w-full flex items-center justify-center gap-2"
                >
                  <CiCreditCard1 />
                  Home Credit
                </button>
              </div>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <button
                className="px-4 py-3 bg-green-500 rounded
                  hover:bg-green-400 hover:cursor-pointer
                text-white w-full flex items-center justify-center gap-2
                "
                disabled={selectedProducts.length === 0}
              >
                Process Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
