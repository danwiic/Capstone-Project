import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController";

const product = Router();

product.get("/", getAllProducts);
product.post("/create", createProduct);

export default product;
