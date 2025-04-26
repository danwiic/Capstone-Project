import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  getUserCart,
  updateCartItem,
} from "../controllers/cartController";

const cart = Router();

cart.post("/add", addToCart);
cart.delete("/delete/:id", deleteCartItem);
cart.put("/update/:id", updateCartItem);
cart.get("/:id", getUserCart);

export default cart;
