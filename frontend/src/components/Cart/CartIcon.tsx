import { BsCart2 } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/cartContext";
import Cart from "./index.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.tsx";
import { formatMoney } from "../../utils/formatMoney.ts";

export default function CartIcon() {
  const { cart, setCart } = useContext(CartContext);
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    setCart([
      {
        name: "Helmet",
        price: formatMoney(2000),
        image:
          "https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png",
        quantity: 1,
      },
    ]);
  }, []);

  function handleViewCart() {
    setViewCart((prev) => !prev);
  }

  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setViewCart(false));
  return (
    <div ref={ref}>
      <button onClick={() => handleViewCart()} className="relative flex">
        <BsCart2 className="text-4xl cursor-pointer text-mayormoto-blue" />
        <span
          className="font-medium bg-mayormoto-blue text-white absolute h-6 w-6 p-1 
        text-center rounded-2xl flex items-center justify-center
        -right-2.5 -top-0.5 text-sm hover:scale-120 
        duration-300 ease-in-out transition-all cursor-pointer  "
        >
          {cart.length ?? 0}
        </span>
      </button>

      {viewCart && (
        <div className="z-50 sticky top-20">
          <Cart.Modal
            setter={setViewCart}
            className="after:right-12 bg-white after:bg-red-2 z-50"
          >
            {cart &&
              cart.length > 0 &&
              cart.map((ct, i) => (
                <Cart.Items
                  key={i}
                  image={ct.image}
                  itemName={ct.name}
                  price={ct.price}
                  quantity={ct.quantity}
                />
              ))}
          </Cart.Modal>
        </div>
      )}
    </div>
  );
}
