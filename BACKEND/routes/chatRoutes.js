import express from "express";
import passport from "passport"; // ✅ Make sure this is imported

import {
  createOrFetchChat,
  fetchMessagesForChat,
  sendMessageViaAPI,
} from "../controllers/chatController.js";

const router = express.Router();

// 🔐 Apply authentication middleware to all chat routes
router.use(passport.authenticate("jwt", { session: false }));

// 📩 Start or fetch a chat between buyer and seller
router.post("/start", createOrFetchChat);

// 💬 Get all messages for a particular chat
router.get("/:chatId/messages", fetchMessagesForChat);

// 📝 Send a message in an existing chat
router.post("/:chatId/message", sendMessageViaAPI);

export default router;
