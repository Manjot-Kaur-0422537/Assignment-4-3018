import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../src/api/v1/middleware/errorHandler";
import { AppError } from "../src/api/v1/errors/AppError";

describe("Error Handler Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should format AppError correctly", () => {
    const error = new AppError("Test error", 400);

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Test error",
        status: 400,
        timestamp: expect.any(String),
      })
    );
  });

  it("should handle generic errors", () => {
    const error = new Error("Generic error");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Generic error",
        status: 500,
        timestamp: expect.any(String),
      })
    );
  });
});
