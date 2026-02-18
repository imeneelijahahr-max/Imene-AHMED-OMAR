
import { GoogleGenAI } from "@google/genai";

export async function refineText(text: string, context: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional CV editor. Please refine the following ${context} for a personal portfolio to make it more professional, concise, and impactful: "${text}". Return only the refined text without any quotes or additional commentary.`,
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini refinement error:", error);
    return text;
  }
}
