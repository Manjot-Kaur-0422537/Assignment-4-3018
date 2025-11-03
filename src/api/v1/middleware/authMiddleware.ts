import { Request, Response, NextFunction } from "express";
import { admin } from "../../../../config/firebaseConfig";
import { AppError } from "../errors/AppError";

export const authenticateUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    
    const token = req.body?.token;

    if (!token) {
      return next(new AppError("No token provided", 401)); // Correct error code
    }

    try {
      const decoded = await admin.auth().verifyIdToken(token);
      (req as any).user = decoded; 
      return next();
    } catch {
      return next(new AppError("Invalid or expired token", 401));
    }
  } catch {
    return next(new AppError("Authentication failed", 500));
  }
};
