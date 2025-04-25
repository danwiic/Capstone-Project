import { Router } from "express";
import {
  fetchCategory,
  getAllCategories,
  insertNewCategory,
} from "../controllers/categoryController";

const category = Router();

category.post("/create", insertNewCategory);
category.get("/cat", getAllCategories);
category.get("/", fetchCategory);

export default category;
