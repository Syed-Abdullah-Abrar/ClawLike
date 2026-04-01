import axios from "axios"; // Using axios for HTTP requests to Ollama
import * as dotenv from "dotenv";

dotenv.config();

/**
 * The Brain of ClawLike, using a local Ollama model (Phi-3-mini).
 */
export class ClawBrain {
  private ollamaApiUrl: string;
  private modelName: string;

  constructor(modelName: string = "phi3") {
    this.ollamaApiUrl = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate";
    this.modelName = modelName;
    console.log(`[ClawBrain] Initialized with Ollama model: ${this.modelName} at ${this.ollamaApiUrl}`);
  }

  /**
   * Generates a "thought" based on the current context using the local Ollama model.
   */
  async think(prompt: string, context: string = ""): Promise<string> {
    const systemPrompt = `
      You are the "Brain" of ClawLike, an autonomous AI agent framework.
      Your goal is to reason through tasks and decide which "Muscles" (tools) to use.
      If you need to run a command, do not provide it inside single backticks like this: \`ls -la\`. Never use backticks for commands
      
      Current Context:
      ${context}
    `;

    try {
      const response = await axios.post(this.ollamaApiUrl, {
        model: this.modelName,
        prompt: `${systemPrompt}

Task: ${prompt}`,
        stream: false, // We want the full response at once
        options: {
            temperature: 0.7, // Adjust as needed for creativity vs. focus
        }
      });

      const text = response.data.response;
      if (!text) {
        throw new Error("Empty response from Ollama.");
      }
      return text;
    } catch (error: any) {
      console.error("Ollama reasoning failed:", error.message);
      if (error.code === 'ECONNREFUSED') {
        throw new Error(`[Ollama Error] Connection refused. Is Ollama running at ${this.ollamaApiUrl}?`);
      }
      throw error;
    }
  }
}
