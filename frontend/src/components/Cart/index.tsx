import { CartModal } from "./Cart";
import CartComponent from "./Cart";
import CartItems from "./CartItems";
import CartIcon from "./CartIcon";

type CartType = typeof CartComponent & {
  Items: typeof CartItems;
  Icon: typeof CartIcon;
  Modal: typeof CartModal;
};

const Cart = CartComponent as CartType;

Cart.Items = CartItems;
Cart.Icon = CartIcon;
Cart.Modal = CartModal;

export default Cart;
