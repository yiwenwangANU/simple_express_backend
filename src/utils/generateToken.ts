import type { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (id: string, res: Response) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  const token = jwt.sign(id, secret);
  res.cookie("jwt", token);
  return token;
};

export default generateToken;
