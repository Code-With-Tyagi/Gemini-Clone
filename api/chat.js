// api/chat.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    // Read prompt from frontend
    const { prompt } = req.body;

    // Create Gemini client (API key from Vercel env vars)
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,   // SAFE
    });

    // Request to Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const outputText = response.text;

    // Send output back to frontend
    res.status(200).json({ text: outputText });

  } catch (error) {
    console.error("Error in backend /api/chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
