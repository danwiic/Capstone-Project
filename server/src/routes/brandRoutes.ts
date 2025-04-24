import { createNewBrand, getAllBrands } from "../controllers/brandController";
import { Router } from "express";

const brand = Router();

brand.post("/create", createNewBrand);
brand.get("/", getAllBrands);

export default brand;
