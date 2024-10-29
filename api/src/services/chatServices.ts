import { chatHistory } from "../models/userModel";
import { LatestChat } from "../types/chat";

export const getChatHistory = async (
  userId: string,
): Promise<Array<LatestChat>> => {
  const history = await chatHistory(userId);
  return history;
};
