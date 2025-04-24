import { Router } from "express";
import {
  getAllCategories,
  insertNewCategory,
} from "../controllers/categoryController";

const category = Router();

category.post("/create", insertNewCategory);
category.get("/", getAllCategories);

export default category;
