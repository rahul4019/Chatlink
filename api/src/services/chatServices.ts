import { chatHistory } from "../models/userModel";

export const getChatHistory = async (userId: string): Promise<any> => {
  const history = await chatHistory(userId);
  return history;
};
