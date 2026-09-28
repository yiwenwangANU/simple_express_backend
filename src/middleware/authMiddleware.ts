import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ error: "Unauthorized action." });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "string" || typeof decoded.id !== "string") {
      return res.status(401).json({ error: "Unauthorized action." });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized action." });
  }
};

export default authMiddleware;
