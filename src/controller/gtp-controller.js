import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
console.log("Gemini API Key:", API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});

const handleChat = async (req, res) => {
  try {
    const { chat } = req.body;

    if (!chat) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: chat }] }],
    });

    console.log("API Response:", result);

    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    res.status(200).json({
      success: true,
      message: "Chat processed successfully",
      reply,
    });

    console.log("Generated Reply:", reply);
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the chat",
    });
  }
};

// Corrected export
export default handleChat;
