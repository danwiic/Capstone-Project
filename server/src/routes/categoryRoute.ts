import { Router } from "express";
import { insertNewCategory } from "../controllers/categoryController";

const category = Router();

category.post("/create", insertNewCategory)

export default category;