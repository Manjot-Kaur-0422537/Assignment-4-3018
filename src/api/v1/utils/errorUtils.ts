import { AppError } from "../errors/AppError";

// Utility to format errors for response
export const extractErrorInfo = (err: any) => {
  if (err instanceof AppError) {
    return {
      message: err.message,
      status: err.statusCode,
      timestamp: err.timestamp,
    };
  }

  return {
    message: err.message || "Internal Server Error",
    status: 500,
    timestamp: new Date().toISOString(),
  };
};
