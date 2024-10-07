import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/apiResponse";
import CustomError from "../utils/customError";
import { s3Upload } from "../utils/s3Upload";
import { updateUserProfilePicture } from "../services/userServices";

export const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    if (!req.file) {
      throw new CustomError("No file found in request", 400);
    }

    if (!req.user) {
      const response: ApiResponse = {
        success: false,
        message: "Unautherized request",
      };
      return res.status(400).json(response);
    }

    const fileURL = await s3Upload(req.file);
    await updateUserProfilePicture(req.user.id, fileURL);

    const response: ApiResponse = {
      success: true,
      message: "Profile picture uploaded successfully",
      data: {
        fileURL,
      },
    };

    return res.status(400).json(response);
  } catch (error) {
    console.log("Error while updating profile picture: ", error);
    next(error);
  }
};
