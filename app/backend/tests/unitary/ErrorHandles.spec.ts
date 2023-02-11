import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../../src/infrastructure/utils/HTTPError";
import { ErrorHandler } from "../../src/infrastructure/middlewares/Error";

describe("ErrorHandler", () => {
  let error: Error;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    error = new Error("Test Error");
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  it("should handle HTTPError", () => {
    error = new HTTPError(400, "Bad Request", "Test HTTPError");
    ErrorHandler.execute(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ type: "Bad Request", message: "Test HTTPError" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle other errors", () => {
    ErrorHandler.execute(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Test Error" });
    expect(next).toHaveBeenCalled();
  });
});
