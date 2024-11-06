import { Server } from "socket.io";
import { insertMessage } from "../models/messageModel";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  messageText: string;
}

export const chatHandler = (io: Server) => {
  const sendMessage = async (payload: MessagePayload) => {
    const { senderId, receiverId, messageText } = payload;
    console.log('CHAT HANDLER: ')
    console.log('senderId: ', senderId)
    console.log('receiverId: ', receiverId)
    console.log('messageText: ', messageText)



    // db message insertion
    const newMessage = await insertMessage(senderId, receiverId, messageText);

    // emit the new message to the receiver
    // io.to(receiverId).emit("chat:receiveMessage", newMessage);

    console.log("Message sent: ", newMessage);
  };

  return sendMessage;
};
