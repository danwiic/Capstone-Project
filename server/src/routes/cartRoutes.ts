import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  getUserCart,
  updateCartItem,
} from "../controllers/cartController";

const cart = Router();

cart.post("/add", addToCart);
cart.get("/:id", getUserCart);
cart.put("/update/:id", updateCartItem);
cart.delete("/delete/:id", deleteCartItem);

export default cart;
