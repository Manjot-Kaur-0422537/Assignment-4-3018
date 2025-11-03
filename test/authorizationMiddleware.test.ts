import { Response, NextFunction } from "express";
import { authorizeUser } from "../src/api/v1/middleware/authorizationMiddleware";
import { AppError } from "../src/api/v1/errors/AppError";

describe("Authorization Middleware", () => {
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allows access when user has proper role", async () => {
    const req = { user: { uid: "123", role: "admin" } } as any;
    const res = {} as Response;

    const middleware = authorizeUser({ roles: ["admin", "officer"] });
    middleware(req, res, mockNext as NextFunction);

    expect(mockNext).toHaveBeenCalledWith(); // success path
  });

  it("denies access with insufficient role", async () => {
    const req = { user: { uid: "123", role: "user" } } as any;
    const res = {} as Response;

    const middleware = authorizeUser({ roles: ["admin"] });
    middleware(req, res, mockNext as NextFunction);

    const err = mockNext.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(403);
    expect(err.message).toBe("Access denied");
  });

  it("allows same-user access when enabled", async () => {
    const req = {
      user: { uid: "123", role: "user" },
      params: { id: "123" },
    } as any;
    const res = {} as Response;

    const middleware = authorizeUser({ roles: ["admin"], allowSameUser: true });
    middleware(req, res, mockNext as NextFunction);

    expect(mockNext).toHaveBeenCalledWith(); // success path
  });
});
