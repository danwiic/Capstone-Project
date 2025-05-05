import { Router } from "express";
import {
  createProduct,
  getTenProducts,
  getOneProduct,
  getAllProducts,
  getDetailedProduct,
  updateVariant,
} from "../controllers/productController";

const product = Router();

product.get("/", getTenProducts);
product.get("/all", getAllProducts); // This route seems redundant, consider removing it
product.post("/create", createProduct);
product.get("/detailed/:id", getDetailedProduct);
product.get("/:id", getOneProduct);
product.put("/update/variant/", updateVariant);

export default product;
