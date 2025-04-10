// orderRoutes.ts
import { Router } from "express";
import { insertProduct } from "../controllers/productController";  // Correct path to the order controller

const product = Router();

// Route for creating an order
product.post("/create", insertProduct);

export default product;
