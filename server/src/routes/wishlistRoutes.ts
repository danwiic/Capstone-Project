import { Router } from "express";
import {
  addToWishlist,
  getWishListByUserId,
  removeFromWishlist,
} from "../controllers/wishlistController";

const wishlist = Router();

wishlist.get("/:id", getWishListByUserId);
wishlist.post("/add", addToWishlist);
wishlist.delete("/delete", removeFromWishlist);

export default wishlist;
