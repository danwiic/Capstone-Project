import { Router } from "express";
import { uploadMultipleImage } from "../controllers/imageController";
import multer from "multer";

const image = Router();
const upload = multer({ dest: "uploads/" });

image.post("/upload", upload.array("images"), uploadMultipleImage);

export default image;
