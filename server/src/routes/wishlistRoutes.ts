import { Router } from "express";
import {
  addToWishlist,
  getWishListByUserId,
  removeFromWishlist,
} from "../controllers/wishlistController";

const wishlist = Router();

wishlist.get("/:Id", getWishListByUserId);
wishlist.post("/add", addToWishlist);
wishlist.post("/delete", removeFromWishlist);

export default wishlist;
