import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import generateToken from "../utils/generateToken";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const emailExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExist) {
    return res.status(400).json({ error: "Email already exist." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id, res);

  return res.status(201).json({
    status: "Success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(401).json({ error: "Email or password invalid." });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Email or password invalid." });
  }
  const token = generateToken(user.id, res);

  return res.status(200).json({
    status: "Success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    status: "Success",
    data: {
      message: "Logout successfully.",
    },
  });
};

export { register, login, logout };
