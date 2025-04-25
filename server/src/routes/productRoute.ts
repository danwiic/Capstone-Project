import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
} from "../controllers/productController";

const product = Router();

product.get("/", getAllProducts);
product.get("/:id", getOneProduct);
product.post("/create", createProduct);

export default product;
