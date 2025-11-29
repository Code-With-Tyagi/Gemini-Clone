import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyApH_ohmsQGnvwa_vk0JU2MkxocvyGrg4k",
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  // Extract the model output
  const text = response.text;  // <-- REAL REAL FIX

  console.log(text);
  return text;
}

export default main;





