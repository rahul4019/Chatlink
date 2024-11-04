import { Server } from "socket.io";
import { insertMessage } from "../models/messageModel";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  messageText: string;
}

export const chatHandler = (io: Server) => {
  const sendMessage = (payload: MessagePayload) => {
    const { senderId, receiverId, messageText } = payload;

    // db message insertion
    const newMessage = insertMessage(senderId, receiverId, messageText);

    // emit the new message to the receiver
    io.to(receiverId).emit("chat:receiveMessage", newMessage);

    console.log("Message sent: ", newMessage);
  };

  return sendMessage;
};
