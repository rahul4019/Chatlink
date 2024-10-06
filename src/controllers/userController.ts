import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/apiResponse";

export const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {

  } catch (error) {
    console.log("Error while updating profile picture: ", error);
    next(error);
  }
};
