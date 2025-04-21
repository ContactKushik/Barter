import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import db from "./config/mongoose.js";
import configurePassport from "./config/passport.js";
import passport from "passport";
import { createServer } from "http";

import initSocket from "./sockets/socketHandler.js"; // ✅ new

const app = express();
const httpServer = createServer(app);

// MongoDB Connection
db();

// Passport Setup
configurePassport(passport);
app.use(passport.initialize());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/home", homeRoutes);
app.use("/auth", authRoutes);

// Socket.IO Setup
initSocket(httpServer); // ✅ Injecting the HTTP server

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
