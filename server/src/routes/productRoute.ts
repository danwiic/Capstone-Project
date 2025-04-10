// orderRoutes.ts
import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/productController";  // Correct path to the order controller

const product = Router();

// Route for creating an order
product.get("/", getAllProducts);
product.post("/create", createProduct);

export default product;
