import { NextFunction, Request, Response } from "express";

export const getUserchats = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error getting user chats: ", error);
    next(error);
  }
};
