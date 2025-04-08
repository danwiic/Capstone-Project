import { CartModal } from "../components/Cart/Cart";
import CartItems from "../components/Cart/CartItems";

export default function Test() {
  return (
    <div className="p-10">
      <CartModal setter={true} className="after:right-10 bg-white">
        <CartItems />
        <CartItems />
        <CartItems />
        <CartItems />
      </CartModal>
    </div>
  );
}
