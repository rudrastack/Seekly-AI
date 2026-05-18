import { Server } from "socket.io";
import cors from "cors";

let io;

export const initSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("Socket.io initialized");

  io.on("connection", (socket) => {
      console.log("A user connected:"+ socket.id);
  })
};

export function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}