import express from "express";
import cors from "cors";
import product from "./routes/productRoute";
import user from "./routes/userRoute";
import category from "./routes/categoryRoute";
import brand from "./routes/brandRoutes";
import wishlist from "./routes/wishlistRoutes";
import cart from "./routes/cartRoutes";
import image from "./routes/imageRoute";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/product", product);
app.use("/user", user);
app.use("/category", category);
app.use("/brand", brand);
app.use("/wishlist", wishlist);
app.use("/cart", cart);
app.use("/image", image);

app.listen(3000, () => console.log("Server is running on port 3000"));
