import { extractErrorInfo } from "../src/api/v1/utils/errorUtils";
import { AppError } from "../src/api/v1/errors/AppError";

describe("Error Utils", () => {
  it("should extract info from AppError", () => {
    const error = new AppError("Bad Request", 400);
    const info = extractErrorInfo(error);
    expect(info).toEqual({
      message: "Bad Request",
      status: 400,
      timestamp: expect.any(String),
    });
  });

  it("should handle generic Error", () => {
    const error = new Error("Something went wrong");
    const info = extractErrorInfo(error);
    expect(info).toEqual({
      message: "Something went wrong",
      status: 500,
      timestamp: expect.any(String),
    });
  });
});
