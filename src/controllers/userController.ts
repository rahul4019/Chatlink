import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/apiResponse";
import CustomError from "../utils/customError";
import { deleteExistingProfilePicture, s3Upload } from "../utils/s3Upload";
import { updateUser, updateUserProfilePicture } from "../services/userServices";
import { getProfilePictureById } from "../models/userModel";
import { userUpdateSchema } from "../validators/userValidators";

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

    // get the url and delete the profile picture from the bucket if user is updating the profile_picture
    const currentProfilePicture: string | null = await getProfilePictureById(
      req.user.id,
    );

    if (currentProfilePicture) {
      await deleteExistingProfilePicture(currentProfilePicture);
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

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error while updating profile picture: ", error);
    next(error);
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  // zod validation
  const result = userUpdateSchema.safeParse(req.body);

  if (!result.success) {
    const response: ApiResponse = {
      success: false,
      message: "Validation failed",
      data: result.error.errors,
    };

    return res.status(400).json(response);
  }

  const { username, statusMessage } = result.data;
  const id = req.user?.id;

  if (!id) {
    const response: ApiResponse = {
      success: false,
      message: "Unautherized request",
    };

    return res.status(400).json(response);
  }
  try {
    await updateUser(id, username, statusMessage);
    const response: ApiResponse = {
      success: true,
      message: "Updated user details",
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error while updating user details: ", error);
    next(error);
  }
};