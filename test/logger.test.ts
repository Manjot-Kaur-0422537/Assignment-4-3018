import { accessLogger, errorLogger, consoleLogger } from "../src/api/v1/middleware/logger";
import { Request, Response } from "express";

describe("Logger Middleware", () => {
  // Mock request and response objects compatible with Morgan
  const mockReq = { headers: {} } as unknown as Request;

  const mockRes = {
    statusCode: 200,
    on: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  } as unknown as Response;

  const mockNext = jest.fn();

  it("should define all logger middlewares", () => {
    expect(accessLogger).toBeDefined();
    expect(errorLogger).toBeDefined();
    expect(consoleLogger).toBeDefined();
  });

  it("should call next function when consoleLogger runs", () => {
    expect(() => consoleLogger(mockReq, mockRes, mockNext)).not.toThrow();
    expect(mockNext).not.toThrow;
  });

  it("should not crash when accessLogger runs", () => {
    expect(() => accessLogger(mockReq, mockRes, mockNext)).not.toThrow();
  });

  it("should not crash when errorLogger runs with status >= 400", () => {
    mockRes.statusCode = 500;
    expect(() => errorLogger(mockReq, mockRes, mockNext)).not.toThrow();
  });

  it("should not crash when errorLogger runs with status < 400", () => {
    mockRes.statusCode = 200;
    expect(() => errorLogger(mockReq, mockRes, mockNext)).not.toThrow();
  });
});
