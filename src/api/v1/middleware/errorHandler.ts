import { Request, Response, NextFunction } from "express";
import { formatError } from "../utils/errorUtils";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formatted = formatError(err);

  console.error("Error:", err.message);

  res.status((err as AppError).statusCode || 500).json(formatted);
};
