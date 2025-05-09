import { Router } from "express";
import {
  createProduct,
  getTenProducts,
  getOneProduct,
  getAllProducts,
  getDetailedProduct,
  updateVariant,
  deleteProduct,
} from "../controllers/productController";

const product = Router();

product.get("/", getTenProducts);
product.get("/all", getAllProducts);
product.post("/create", createProduct);
product.delete("/delete/:id", deleteProduct);
product.get("/detailed/:id", getDetailedProduct);
product.get("/:id", getOneProduct);
product.put("/update/variant/", updateVariant);

export default product;
