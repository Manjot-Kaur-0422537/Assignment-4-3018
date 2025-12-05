import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { extractErrorInfo } from "../utils/errorUtils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formatted = extractErrorInfo(err);

  console.error("Error:", err.message);

  res.status((err as AppError).statusCode || 500).json({
    success: false,
    ...formatted,
  });
};
