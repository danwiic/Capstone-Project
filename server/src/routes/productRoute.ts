import { Router } from "express";
import {
  createProduct,
  getTenProducts,
  getOneProduct,
  getAllProducts,
} from "../controllers/productController";

const product = Router();

product.get("/", getTenProducts);
product.get("/all", getAllProducts); // This route seems redundant, consider removing it
product.get("/:id", getOneProduct);
product.post("/create", createProduct);

export default product;
