import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { chatHandler } from "./chatHandler";

let io: Server;

// in memory store to keep the track of online users
const onlineUsers: { [userId: string]: string[] } = {}; // here userId is dynamic key

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  const sendMessage = chatHandler(io);

  io.on("connection", (socket) => {
    // retriving userId from the handshake
    const userId = socket.handshake.auth.userId;

    // onlineUsers[userId] = socket.id

    if (userId) {
      if (onlineUsers[userId]) {
        onlineUsers[userId].push(socket.id);
      } else {
        onlineUsers[userId] = [socket.id];
      }
    }

    console.log(`userId: ${userId} connected with socket ID: ${socket.id}`);

    // console.log("client connected");
    // socket.on("chat:sendMessage", (message) => {
    //   console.log("received message: ", message);
    //   io.emit("chat:receiveMessage", message);
    // });
    //
    socket.on("chat:sendMessage", sendMessage);
  });
};

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
