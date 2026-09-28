import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

  const authorized = jwt.verify(token, process.env.JWT_SECRET);
  if (!authorized) {
    return res.status(401).json({ error: "Unauthorized action." });
  }
  next();
};

export default authMiddleware;
