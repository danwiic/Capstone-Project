import { BsCart2 } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/cartContext";
import Cart from "./index.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import axios from "axios";
import { formatMoney } from "../../utils/formatMoney.ts";
export default function CartIcon() {
  const { cart, setCart } = useContext(CartContext);
  const [viewCart, setViewCart] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get(`http://localhost:3000/cart/${user?.id}`);
        if (res.status === 200) {
          setCart(res.data);
          console.log("Cart fetched successfully:", res.data);
        } else {
          console.error("Error fetching cart:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [user?.id]);

  function handleViewCart() {
    // check if the current location is cart page
    // if it is, do not open the cart modal
    const curLoc = window.location.pathname;
    if (curLoc === "/cart") return;
    setViewCart((prev) => !prev);
  }

  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setViewCart(false));
  return (
    <div ref={ref}>
      <button onClick={() => handleViewCart()} className="relative flex">
        <BsCart2 className="text-4xl cursor-pointer text-mayormoto-blue" />
        <span
          className="font-medium bg-mayormoto-pink text-white absolute h-6 w-6 p-1 
        text-center rounded-2xl flex items-center justify-center
        -right-2.5 -top-0.5 text-sm hover:scale-120 
        duration-300 ease-in-out transition-all cursor-pointer  "
        >
          {cart?.length ?? 0}
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
                  key={ct.id}
                  image={
                    ct.product?.ProductImage?.[0]?.imageUrl || "/placeholder.png"
                  }
                  itemName={ct.product?.name || "Unknown Product"}
                  price={formatMoney(ct.price)}
                  quantity={ct.quantity}
                />
              ))}
          </Cart.Modal>
        </div>
      )}
    </div>
  );
}
