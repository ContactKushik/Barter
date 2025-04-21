import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import userModel from "../models/users.js";

export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  // JWT authentication middleware for sockets
  io.use(async (socket, next) => {
    // console.log(socket);
    try {
      const cookies = socket.handshake.headers.cookie;
      const parsedCookies = cookie.parse(cookies || "");
      const token = parsedCookies.onboarding;

      if (!token) return next(new Error("JWT token not found"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) return next(new Error("User not found"));

      socket.user = user; // Attach user to socket
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user?.email || socket.user?._id);

    

    socket.on("send_message", (data) => {
      const messageData = {
        ...data,
        sender: socket.user._id,
        timestamp: new Date(),
      };
      io.to(data.roomId).emit("receive_message", messageData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user?._id);
    });
  });
}
