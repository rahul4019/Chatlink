import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { chatHandler } from "./chatHandler";

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  const sendMessage = chatHandler(io);

  io.on("connection", (socket) => {
    // console.log(socket.id);
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
