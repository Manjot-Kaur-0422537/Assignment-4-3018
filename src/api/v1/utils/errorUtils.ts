import { AppError } from "../../errors/Error.ts";

export const formatError = (err: any) => {
  if (err instanceof AppError) {
    return {
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      timestamp: err.timestamp,
    };
  }

  return {
    success: false,
    message: "Internal server error",
    statusCode: 500,
    timestamp: new Date().toISOString(),
  };
};
