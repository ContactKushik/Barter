import Chat from "../models/chat.js";
import Message from "../models/message.js";

export const createOrFetchChat = async (req, res) => {
  const { buyerId, sellerId, adId } = req.body;

  let chat = await Chat.findOne({
    participants: { $all: [buyerId, sellerId] },
    ad: adId,
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [buyerId, sellerId],
      ad: adId,
    });
  }

  res.status(200).json(chat);
};

export const fetchMessagesForChat = async (req, res) => {
  const chatId = req.params.chatId;
  const messages = await Message.find({ chat: chatId }).populate(
    "sender",
    "name"
  );
  res.status(200).json(messages);
};

export const sendMessageViaAPI = async (req, res) => {
  const { text, senderId } = req.body;
  const chatId = req.params.chatId;

  const message = await Message.create({
    chat: chatId,
    sender: senderId,
    text,
  });

  res.status(201).json(message);
};
