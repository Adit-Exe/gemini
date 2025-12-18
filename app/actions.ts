'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateGeminiContent(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        // Return a more descriptive error message if available
        const errorMessage = error.message || "An error occurred while generating content.";
        return `Error: ${errorMessage}`;
    }
}
