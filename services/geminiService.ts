import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSearchInsights = async (query: string): Promise<string> => {
  if (!query) return "";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User is searching for VFX tutorials regarding: "${query}".
      Provide a very short, enthusiastic, single-paragraph summary (max 60 words) describing what this technique usually involves and which software is typically used (e.g., After Effects, Blender).
      Target audience: Young creative artists.`,
    });
    return response.text || "Explore our library to find amazing tutorials on this topic.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Explore our library to find amazing tutorials on this topic.";
  }
};

export const getCreativeFeedback = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `The user wants feedback on this VFX concept: "${description}".
      Provide 3 short bullet points of constructive, creative advice to make it look "pro" or "cinematic".
      Keep it encouraging.`,
    });
    return response.text || "Focus on lighting match and realistic motion blur for better integration.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Great concept! Focus on lighting and composition to really sell the effect.";
  }
};