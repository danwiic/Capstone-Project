import { Router } from "express";
import {
  fetchCategory,
  getAllCategories,
  getFiveProducts,
  insertNewCategory,
} from "../controllers/categoryController";

const category = Router();

category.post("/create", insertNewCategory);
category.get("/cat", getAllCategories);
category.get("/", fetchCategory);
category.get("/five/:id", getFiveProducts);

export default category;
