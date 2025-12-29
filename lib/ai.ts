
import { GoogleGenAI } from "@google/genai";

/**
 * INSTITUTIONAL STABILITY LAYER
 * Ensures AI features are dormant during the public preview phase.
 * No requests are initiated unless a valid API_KEY is detected in a safe environment.
 */
export const getSafeAI = () => {
  try {
    // Robust check for environment variables to prevent runtime exceptions
    const apiKey = typeof process !== 'undefined' && process.env ? (process.env as any).API_KEY : null;
    
    if (!apiKey || apiKey === "REPLACE_WITH_YOUR_API_KEY" || apiKey.length < 10) {
      return null;
    }

    return new GoogleGenAI({ apiKey });
  } catch (e) {
    // Silent fail to maintain frontend stability
    return null;
  }
};

/**
 * Experimental AI Service
 * Currently locked for institutional stability. Returns null without execution.
 */
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
