import { io, Socket } from "socket.io-client";
import { addMessage } from "./features/chat/chatSlice";
import { Message } from "./types/chat";
import { AppDispatch } from "./app/store";

let socket: Socket | null = null;

export const createSocketConnection = (
  url: string,
  userId: string,
  dispatch: AppDispatch,
) => {
  socket = io(url, {
    auth: {
      userId: userId,
    },
  }); // sending userId on connection to maintain online users on backend

  socket.on("chat:receiveMessage", (message: Message) => {
    console.log("receivedMessage: ", message);

    dispatch(addMessage(message));
  });

  return socket;
};

interface sendMessageArgs {
  senderId: string;
  receiverId: string;
  messageText: string;
}

export const sendMessage = (data: sendMessageArgs, dispatch: AppDispatch) => {
  const { senderId, receiverId, messageText } = data;
  if (socket) {
    socket.emit("chat:sendMessage", data);
  }

  const message = {
    sender_id: senderId,
    receiver_id: receiverId,
    message_text: messageText,
    sent_at: new Date().toISOString(),
  };

  console.log("new message: ", message);

  dispatch(addMessage(message));
};
