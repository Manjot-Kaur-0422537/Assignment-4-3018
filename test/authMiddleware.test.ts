import { authenticateUser } from "../src/api/v1/middleware/authMiddleware";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../src/api/v1/errors/AppError";

jest.mock("../../config/firebaseConfig", () => ({
  admin: {
    auth: jest.fn(() => ({
      verifyIdToken: jest.fn(),
    })),
  },
}));

import { admin } from "../config/firebaseConfig";

describe("Authentication middleware", () => {
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("processes a valid token and attaches user to req", async () => {
    const decoded = { uid: "user1", role: "officer" };
    const verifyIdTokenMock = (admin.auth() as any).verifyIdToken as jest.Mock;
    verifyIdTokenMock.mockResolvedValue(decoded);

    const req = { body: { token: "valid-token" } } as unknown as Request;
    const res = {} as Response;

    await authenticateUser(req, res, mockNext as unknown as NextFunction);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect((req as any).user).toEqual(decoded);
  });

  it("handles missing token", async () => {
    const req = { body: {} } as unknown as Request;
    const res = {} as Response;

    await authenticateUser(req, res, mockNext as unknown as NextFunction);

    expect(mockNext).toHaveBeenCalledTimes(1);
    const err = (mockNext as any).mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe("No token provided");
  });
});
