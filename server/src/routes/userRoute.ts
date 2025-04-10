import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";

const user = Router();

user.post("/create", createUser)
user.post("/login", loginUser)

export default user