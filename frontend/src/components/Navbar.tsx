import logo from "../images/mayormoto-logo-removebg-preview.png";
import Button from "./ui/button/HoverButton.tsx";
import { Link } from "react-router-dom";
import Search from "./ui/Search.tsx";
import { useContext, useEffect, useState } from "react";
import Cart from "./Cart/index.tsx";
import { CartContext } from "../context/cartContext.tsx";
import logo1 from "../images/logo/Evo.png"
import logo2 from "../images/logo/LS2.png"
import logo3 from "../images/logo/Spyder.png"

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [viewCart, setViewCart] = useState(false);

  function handleViewCart() {
    setViewCart((prev) => !prev);
  }

  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    setCart([
      {
        image: logo1,
        name: "Product 1",
        price: "100",
        quantity: 1,
      },
      {
        image: logo3,
        name: "Product 2",
        price: "200",
        quantity: 2,
      },
      {
        image: logo2,
        name: "Product 3",
        price: "300",
        quantity: 1,
      },
    ]);
    console.log("Rendered");
  }, [setCart]);
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

        <div className="w-1/2">
          <Search />
        </div>

        <div className="flex gap-6 items-center">
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>

          <div onClick={() => handleViewCart()}>
            <Cart.Icon />
          </div>
        </div>
      </div>
      <main>
        {viewCart && (
          <div className="z-50 sticky top-20">
            <Cart.Modal
              setter={viewCart}
              className="after:right-12 bg-white after:bg-red-2 z-50"
            >
              {cart.map((ct, i) => (
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
        {children}
      </main>
    </>
  );
}
