import { CartModal } from "../components/Cart/Cart";
import CartItems from "../components/Cart/CartItems";
import CardSkeleton from "../components/ui/CardSkeleton";

// this component is for testing or editing a component

export default function Test() {
  return (
    <div className="p-10">
      <CartModal setter={true} className="after:right-10 bg-white">
        <CartItems />
        <CartItems />
        <CartItems />
        <CartItems />
      </CartModal>

      <CardSkeleton/>
    </div>
  );
}
