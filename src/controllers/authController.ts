import { NextFunction, Request, Response } from "express";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../validators/authValidators";
import { ApiResponse } from "../types/apiResponse";
import { loginUser, registerUser } from "../services/authServices";

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  // zod validation
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

  try {
    const newUser = await registerUser(email, password, username);

    const response: ApiResponse = {
      success: true,
      message: "User registered",
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error("Error during user registration: ", error);
    next(error);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  const ipAddress: string = req.clientIp ?? "unknown_ip";
  const userAgent: string = req.headers["user-agent"] ?? "unknown_user_agent";

  // zod validation
  const result = userLoginSchema.safeParse(req.body);

  if (!result.success) {
    const response: ApiResponse = {
      success: false,
      message: "Validation failed",
      data: result.error.errors,
    };

    return res.status(400).json(response);
  }

  const { email, password } = result.data;
  try {
    const userSession = await loginUser(email, password, ipAddress, userAgent);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as "strict",
    };

    const accessTokenExpiry = 15 * 60 * 1000; // 15 minutes
    const refreshTokenexpiry = 7 * 24 * 60 * 60 * 1000; // 7 days

    //  set cookies
    res.cookie("accessToken", userSession.access_token, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    });

    res.cookie("refreshToken", userSession.refresh_token, {
      ...cookieOptions,
      maxAge: refreshTokenexpiry,
    });

    const response: ApiResponse = {
      success: true,
      message: "User logged In",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error during user login: ", error);
    next(error);
  }
};
