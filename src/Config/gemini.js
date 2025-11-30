// src/gemini.js
// SAFE FRONTEND — no API key, no GoogleGenAI SDK

const main = async (prompt) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.text;
};

export default main;






