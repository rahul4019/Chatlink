import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse";

const errorHandler = (
  err: Error & { status?: number }, // extend error type to include status
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  const response: ApiResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  res.status(err.status || 500).json(response);
};

export default errorHandler;
