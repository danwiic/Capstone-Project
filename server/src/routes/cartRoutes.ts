import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  getUserCart,
  updateCartItem,
} from "../controllers/cartController";

const cart = Router();

cart.post("/add", addToCart);
cart.post("/delete", deleteCartItem);
cart.post("/update", updateCartItem);
cart.get("/:id", getUserCart);

export default cart;