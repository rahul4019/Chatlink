import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/apiResponse";
import { getChatHistory } from "../services/chatServices";

export const getUserchats = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        message: "Unautherized request",
      };

      return res.status(400).json(response);
    }

    const history = await getChatHistory(userId);

    const response: ApiResponse = {
      success: true,
      data: {
        chatHistory: history,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error getting user chats: ", error);
    next(error);
  }
};
