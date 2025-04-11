import logo from "../../images/mayormoto-logo-removebg-preview.png";
import Search from "../ui/Search.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import Cart from "../Cart/index.tsx";
import { CartContext } from "../../context/cartContext.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import LoginNav from "./LoginNav.tsx";
import AccountModal from "../MyAccount/index.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.tsx";
export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [viewCart, setViewCart] = useState(false);
  const [viewSettings, setViewSettings] = useState(false);

  function handleViewCart() {
    if (viewSettings) setViewSettings(false);
    setViewCart((prev) => !prev);
  }

  function handleViewAccountSettings() {
    if (viewCart) setViewCart(false);
    setViewSettings((prev) => !prev);
  }

  const { cart } = useContext(CartContext);
  const { setUser } = useUserContext();

  useEffect(() => {
    setUser({
      id: "123",
      email: "danbalagbag@gmail.com",
      name: "Dan",
    });
  }, []);

  const ref = useRef<HTMLDivElement | null>(null); 
  useClickOutside(ref, () => setViewSettings(false));

  return (
    <>
      <div
        className="bg-body p-1 px-20 shadow-md py-2
        flex justify-between items-center sticky top-0 z-50
        "
      >
        <div>
          <img src={logo} alt="" className="w-52 cursor-pointer" />
        </div>

        <div className="w-2/3">
          <Search />
        </div>

        <div className="flex gap-6 " >
          <button
            onClick={() => handleViewAccountSettings()}
            className="cursor-pointer"
          >
            <LoginNav />
          </button>

          <button onClick={() => handleViewCart()} className="cursor-pointer">
            <Cart.Icon />
          </button>
        </div>
      </div>
      <main>
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
                    price={`₱${ct.price}.00`}
                    quantity={ct.quantity}
                  />
                ))}
            </Cart.Modal>
          </div>
        )}

        {viewSettings && (
          <div className="z-50 sticky top-20">
            <AccountModal.Body
              cartPosition="right-30"
              setter={setViewSettings}
              className="after:right-4.5"
            >
              <AccountModal.Items>My Orders</AccountModal.Items>

              <AccountModal.Items>My Adresses</AccountModal.Items>

              <AccountModal.Items>Logout</AccountModal.Items>
            </AccountModal.Body>
          </div>
        )}
        {children}
      </main>
    </>
  );
}
