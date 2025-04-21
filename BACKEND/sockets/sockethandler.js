import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import userModel from "../models/users.js";
import Message from "../models/message.js";
import Chat from "../models/chat.js"; // Optional, if needed

export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  // JWT middleware for socket authentication
  io.use(async (socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      const parsedCookies = cookie.parse(cookies || "");
      const token = parsedCookies.onboarding;

      if (!token) return next(new Error("JWT token not found"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.user?.email || socket.user?._id);

    // Join a chat room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.user._id} joined room ${roomId}`);
    });

    // Send message
    socket.on("send_message", async (data) => {
      const { roomId, content } = data;

      const messageData = {
        chat: roomId,
        sender: socket.user._id,
        content,
        timestamp: new Date(),
      };

      try {
        // Save to DB
        const savedMessage = await Message.create(messageData);

        // Emit to room
        io.to(roomId).emit("receive_message", {
          ...messageData,
          _id: savedMessage._id,
          sender: {
            _id: socket.user._id,
            name: socket.user.name,
          },
        });
      } catch (err) {
        console.error("Message sending error:", err.message);
        socket.emit("error_message", "Message could not be sent");
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user?._id);
    });
  });
}
