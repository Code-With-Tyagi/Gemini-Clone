// api/chat.js (Vercel Serverless Backend)

import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    // Read the prompt sent from the frontend
    const { prompt } = req.body;

    // Use API Key from environment variables
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,  // ✔ SAFE HERE
    });

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // Get the output text
    const text = response.text;

    // Send output back to your React app
    res.status(200).json({ text });

  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
