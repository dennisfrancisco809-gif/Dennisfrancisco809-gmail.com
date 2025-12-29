
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartReply = async (messages: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a short, friendly reply for this chat history: ${messages.join(' | ')}`,
      config: {
        maxOutputTokens: 20,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Cool!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nice!";
  }
};

export const generateMockPost = async (): Promise<any> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Generate a realistic social media post content (text and a short description of an image topic). Return as JSON.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        text: { type: Type.STRING },
                        imageTopic: { type: Type.STRING }
                    },
                    required: ["text", "imageTopic"]
                }
            }
        });
        return JSON.parse(response.text);
    } catch (e) {
        return { text: "Enjoying the sun!", imageTopic: "Beach sunset" };
    }
}
