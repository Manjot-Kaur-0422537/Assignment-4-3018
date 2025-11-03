import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

interface AuthorizationOptions {
  roles?: string[];
  allowSameUser?: boolean;
}

export const authorizeUser =
  (options: AuthorizationOptions) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user) {
        return next(new AppError("User not authenticated", 401));
      }

      // Role-based access
      if (options.roles && !options.roles.includes(user.role)) {
        // Check same-user access
        if (options.allowSameUser && user.uid === req.params.id) {
          return next();
        }
        return next(new AppError("Access denied", 403));
      }

      return next();
    } catch {
      return next(new AppError("Authorization failed", 500));
    }
  };
