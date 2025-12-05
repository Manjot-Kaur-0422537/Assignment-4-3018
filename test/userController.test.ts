import { setCustomClaim } from "../src/api/v1/controller/userController";
import { Request, Response } from "express";

const setCustomUserClaimsMock = jest.fn();
const getUserMock = jest.fn();

jest.mock("../config/firebaseConfig", () => ({
  admin: {
    auth: jest.fn(() => ({
      setCustomUserClaims: setCustomUserClaimsMock,
      getUser: getUserMock,
    })),
  },
}));

describe("User Controller", () => {
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("sets custom claim successfully", async () => {
    const mockReq = { body: { uid: "user1", role: "officer" } } as unknown as Request;
    setCustomUserClaimsMock.mockResolvedValue(undefined);

    await setCustomClaim(mockReq, mockRes as Response);

    expect(setCustomUserClaimsMock).toHaveBeenCalledWith("user1", { role: "officer" });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: "Role 'officer' assigned to user user1",
    });
  });

  it("returns 400 if uid or role is missing", async () => {
    const mockReq = { body: { uid: "user1" } } as unknown as Request;

    await setCustomClaim(mockReq, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "UID and role are required",
    });
  });
});
