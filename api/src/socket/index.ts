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
    // get userId from the handshake
    const userId = socket.handshake.auth.userId;

    if (userId) {
      if (onlineUsers[userId]) {
        onlineUsers[userId].push(socket.id); // put the socketId in the userId's sockets array
      } else {
        onlineUsers[userId] = [socket.id]; // for first connection by the user
      }
    }

    console.log(`userId: ${userId} connected with socket ID: ${socket.id}`);

    // disconnection logic
    socket.on("disconnect", () => {
      if (userId) {
        const index = onlineUsers[userId]?.indexOf(socket.id);
        if (index !== -1) {
          onlineUsers[userId].splice(index, 1); // removes the socketId from the array of socketIds for that particular USER ID
        }
      }

      // if there is a userId key without and active connection then remove it from the onlineUsers object
      if (onlineUsers[userId]?.length === 0) {
        delete onlineUsers[userId];
      }

      console.log(`user: ${userId} disconnected`);
    });

    socket.on("chat:sendMessage", sendMessage);
  });
};

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
