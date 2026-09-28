import type { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (id: string, res: Response) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  const payload = { id };
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return token;
};

export default generateToken;
