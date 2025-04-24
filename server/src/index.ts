import express from "express";
import cors from "cors";
import product from "./routes/productRoute";
import user from "./routes/userRoute";
import category from "./routes/categoryRoute";
import brand from "./routes/brandRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', product)
app.use("/user", user);
app.use("/category", category);
app.use("/brand", brand);

app.listen(3000, () => console.log("Server is running on port 3000"));
