/**
*
* Defines custom TypeScript types for Express middleware functions
* and request objects with user context for authentication/authorization.
  */

import { Request, Response, NextFunction } from "express";

/**

* MiddlewareFunction type ensures the middleware signature
* matches standard Express middleware
  */
  export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

/**

* AuthenticatedRequest type extends Express Request to include
* optional user info attached after token verification
  */
  export interface AuthenticatedRequest extends Request {
  user?: {
  uid: string;
  role?: string;
  email?: string;
  [key: string]: any;
  };
  }
