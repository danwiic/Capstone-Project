import Button from "../ui/button/Button";
import { formatMoney } from "../../utils/formatMoney";
import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import LoginModal from "../modal/LoginModal";
import { useCartContext } from "../../context/cartContext";
import { useNavigate } from "react-router";

interface props {
  id: string;
  name: string;
  price: number;
  variants?: {
    id: string;
    variantName: string;
    price: number;
  }[];
}

export default function ProductInfo({ id, name, price, variants = [] }: props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { addToCart } = useCartContext();
  const handleAddToCart = async () => {
    if (!user || !user.id) {
      setShowLoginModal(true);
      return;
    }

    try {
      const res = await addToCart(
        user.id,
        id,
        variants[selectedVariantIndex]?.id || "",
        quantity
      );
      console.log("Added to cart", res);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleCheckout = () => {
    if (!user || !user.id) {
      setShowLoginModal(true);
      return;
    }
    navigate("/checkout", {
      state: {
        product: [
          {
            productId: id,
            productName: name,
            variantId: variants[selectedVariantIndex]?.id || "",
            quantity: quantity,
            price: variants[selectedVariantIndex]?.price || price,
          },
        ],
      },
    });
  };

  return (
    <>
      <div className="md:col-span-1 lg:col-span-2 row-span-3">
        <div className="w-full h-fit lg:sticky lg:top-30 bg-white shadow-1 p-6 rounded flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{name}</h2>
            <hr className="text-gray-300" />
          </div>

          {variants.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="font-medium flex gap-2">
                <span>Variant:</span>
                <span>{variants[selectedVariantIndex].variantName}</span>
              </div>
              <div className="flex gap-2">
                {variants.map((variant, idx) => (
                  <span
                    key={idx}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`p-1 bg-white border-1 ${
                      idx === selectedVariantIndex
                        ? "border-mayormoto-blue"
                        : "border-gray-200"
                    } text-gray-700 cursor-pointer font-medium h-10 w-10 text-center flex items-center justify-center`}
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
              {formatMoney(
                variants.length > 0
                  ? variants[selectedVariantIndex].price
                  : price
              )}
            </span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <span className="font-medium">Quantity: </span>
            <div className="border-1 border-gray-300">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-1 border-r-1 px-3 border-gray-300 text-xl 
              font-medium text-gray-400 hover:text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={quantity === 1}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                className="w-10 text-center text-gray-700 text-sm outline-0"
              />
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-1 border-l-1 px-3 border-gray-300 text-xl font-medium text-gray-400"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="rounded-xs" onClick={handleAddToCart}>
              Add to cart
            </Button>

            <Button
              onClick={handleCheckout}
              className="bg-red-500 hover:bg-red-400 rounded-xs"
            >
              Buy it now
            </Button>
          </div>
        </div>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}
