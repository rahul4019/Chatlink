import { Server } from "socket.io";
import { insertMessage } from "../models/messageModel";
import { onlineUsers } from ".";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  messageText: string;
}

export const chatHandler = (io: Server) => {
  const sendMessage = async (payload: MessagePayload) => {
    const { senderId, receiverId, messageText } = payload;
    console.log("CHAT HANDLER: ");
    console.log("senderId: ", senderId);
    console.log("receiverId: ", receiverId);
    console.log("messageText: ", messageText);

    // db message insertion
    const newMessage = await insertMessage(senderId, receiverId, messageText);

    // check if the receiver is online or not
    if (onlineUsers?.[receiverId]) {
      onlineUsers[receiverId].forEach((socketId) => {
        io.to(socketId).emit("chat:receiveMessage", newMessage);
      });
    }

    // emit the new message to the intended user's active socket connections

    // io.to(receiverId).emit("chat:receiveMessage", newMessage);

    console.log("Message sent: ", newMessage);
  };

  return sendMessage;
};
