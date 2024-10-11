import { getMessagesBetweenUsers, insertMessage } from "../models/messageModel";
import { Message } from "../types/message";

export const messageInsertion = async (
  senderId: string,
  receiverId: string,
  messageText: string,
): Promise<Message> => {
  const message = await insertMessage(senderId, receiverId, messageText);
  return message;
};

export const messagesBetweenUsers = async (
  senderId: string,
  receiverId: string,
): Promise<Array<Message>> => {
  const messages = await getMessagesBetweenUsers(senderId, receiverId);
  return messages;
};
