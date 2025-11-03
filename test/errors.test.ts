import { AppError } from "../src/api/v1/errors/AppError";

describe("AppError Class", () => {
  it("should create an error with message and status code", () => {
    const error = new AppError("Not Found", 404);
    expect(error.message).toBe("Not Found");
    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
    expect(error.timestamp).toBeDefined();
  });

  it("should have a stack trace", () => {
    const error = new AppError("Test", 500);
    expect(error.stack).toBeDefined();
  });
});
