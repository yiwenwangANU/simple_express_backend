import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

// Throw this from controllers to send a specific status, e.g. throw new AppError(400, "Invalid rating.")
class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

const notFound = (req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
};

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = "Internal server error.";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Resource already exists.";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Resource not found.";
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Related resource does not exist.";
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request data.";
  } else if (
    err instanceof SyntaxError &&
    "type" in err &&
    err.type === "entity.parse.failed"
  ) {
    statusCode = 400;
    message = "Invalid JSON body.";
  }

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({ error: message });
};

export { AppError, notFound, errorHandler };
