import { NextFunction, Request, Response } from "express";
import { userRegistrationSchema } from "../validators/authValidators";
import { ApiResponse } from "../types/apiResponse";
import { registerUser } from "../services/authServices";
import { emailExist } from "../models/userModel";

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // zod validations
    const result = userRegistrationSchema.safeParse(req.body);

    if (!result.success) {
      const response: ApiResponse = {
        success: false,
        message: "Validation failed",
        data: result.error.errors,
      };

      return res.status(400).json(response);
    }

    const { email, password, username } = result.data;

    const newUser = await registerUser(email, password, username);

    const response: ApiResponse = {
      success: true,
      message: "User register",
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
