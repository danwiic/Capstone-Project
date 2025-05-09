import { Router } from "express";
import {
  fetchCategory,
  getAllCategories,
  getFiveCategories,
  getFiveProducts,
  getTwoProducts,
  insertNewCategory,
} from "../controllers/categoryController";

const category = Router();

category.post("/create", insertNewCategory);
category.get("/cat", getAllCategories);
category.get("/", fetchCategory);
category.get("/twoProducts", getTwoProducts);
category.get("/five/", getFiveCategories);
category.get("/five/:id", getFiveProducts);

export default category;
