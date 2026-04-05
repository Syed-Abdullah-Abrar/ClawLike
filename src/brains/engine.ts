import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import axios from "axios"; // Keeping axios for when we switch back to Ollama
import * as dotenv from "dotenv";

dotenv.config();

 // --- OLLAMA SETUP (Commented out for now)
/*
 export class ClawBrain {
   private ollamaApiUrl: string;
   private modelName: string;

   constructor(modelName: string = "gemma4:e2b") {
     this.ollamaApiUrl = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate";
     this.modelName = modelName;
     console.log(`[ClawBrain] Initialized with Ollama model: ${this.modelName} at ${this.ollamaApiUrl}`);
   }

   async think(prompt: string, context: string = ""): Promise<string> {
     const systemPrompt = `...`;
     try {
       const response = await axios.post(this.ollamaApiUrl, {
         model: this.modelName,
         prompt: `${systemPrompt}\n\nTask: ${prompt}`,
         stream: false,
       });
       return response.data.response;
     } catch (error: any) {
       console.error("Ollama reasoning failed:", error.message);
       throw error;
     }
   }
 }
*//



 //The Brain of ClawLike, using the Google Gemini API.

export class ClawBrain {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(modelName: string = "gemini-2.5-flash") {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables.");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
    console.log(`[ClawBrain] Initialized with Gemini model: ${modelName}`);
  }

  /**
   * Generates a "thought" based on the current context using the Gemini API.
   */
  async think(prompt: string, context: string = ""): Promise<string> {
    const systemPrompt = `
      You are the "Brain" of ClawLike, an autonomous AI agent framework.
      Your goal is to reason through tasks and decide which "Muscles" (tools) to use.
      If you need to run a command, provide it inside single backticks like this: \`ls -la\`.

      Current Context:
      ${context}
    `;

    try {
      const result = await this.model.generateContent([systemPrompt, prompt]);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("Empty response from Gemini API.");
      }
      return text;
    } catch (error: any) {
      console.error("Gemini reasoning failed:", error.message);
      throw error;
    }
  }
}
