// models/Chatbot.ts
import mongoose from "mongoose";

const ChatBotSchema = new mongoose.Schema({
  questions: { type: [String], required: true },
  answer: { type: String, required: true },
});

export default mongoose.models.ChatBot ||
  mongoose.model("ChatBot", ChatBotSchema);
