
import { GoogleGenAI } from "@google/genai";

/**
 * SECURITY: This utility ensures AI features do not crash the frontend
 * if the API_KEY is missing or if the service is unavailable.
 */
export const getSafeAI = () => {
  const apiKey = (process.env as any).API_KEY;
  
  if (!apiKey || apiKey === "REPLACE_WITH_YOUR_API_KEY") {
    return null;
  }

  try {
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    // Fail silently to prevent information leakage in console
    return null;
  }
};

export const runAIService = async (prompt: string): Promise<string | null> => {
  const ai = getSafeAI();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || null;
  } catch (e) {
    return null;
  }
};
