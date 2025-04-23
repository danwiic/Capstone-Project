import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/userController";

const user = Router();

user.post("/create", createUser);
user.post("/login", loginUser);
user.get("/:id", getUser);

export default user;
