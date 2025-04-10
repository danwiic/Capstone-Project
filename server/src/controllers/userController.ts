import { comparePassword, hashPassword } from "../auth/user";
import prisma from "../config/db";

export const createUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(406).json({ error: "Email is required" });
    if (!password)
      return res.status(406).json({ error: "Password is required" });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      return res.status(406).json({ error: "User already exists" });

    const user = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password), 
        role: "admin"
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    if (!email) return res.status(406).json({ error: "Email is required" });
    if (!password)
      return res.status(406).json({ error: "Password is required" });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(406).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { email: user.email, id: user.id },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
