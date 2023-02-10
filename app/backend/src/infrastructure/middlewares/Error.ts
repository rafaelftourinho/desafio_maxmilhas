import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../utils/HTTPError";

class ErrorHandler {
  public static execute = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HTTPError) {
        return res.status(error.status).json({ type: error.type, message: error.message })
    }
    res.status(500).json({ message: error.message });
    next();
  }
}

export { ErrorHandler };
