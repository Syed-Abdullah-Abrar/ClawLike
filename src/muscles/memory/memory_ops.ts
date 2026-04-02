import fs from "fs/promises";
import path from "path";
import { ClawMuscle } from "../base";

const MEMORY_FILE = path.join(process.cwd(), "config/memory.json");

/**
 * Stores a fact in the local JSON memory.
 */
export class RememberMuscle extends ClawMuscle {
  definition = {
    name: "remember",
    description: "Stores a key-value pair in persistent memory.",
    parameters: {
      type: "object",
      properties: {
        key: { type: "string", description: "The unique identifier for the fact." },
        value: { type: "string", description: "The information to store." }
      },
      required: ["key", "value"]
    }
  };

  async run({ key, value }: { key: string, value: string }): Promise<string> {
    try {
      await fs.mkdir(path.dirname(MEMORY_FILE), { recursive: true });
      let memory: Record<string, string> = {};
      try {
        const data = await fs.readFile(MEMORY_FILE, "utf-8");
        memory = JSON.parse(data);
      } catch (e) {
        // File doesn't exist yet, start fresh
      }
      memory[key] = value;
      await fs.writeFile(MEMORY_FILE, JSON.stringify(memory, null, 2));
      return `Fact remembered: ${key} = ${value}`;
    } catch (error: any) {
      return `Failed to remember: ${error.message}`;
    }
  }
}

/**
 * Retrieves a fact from the local JSON memory.
 */
export class RecallMuscle extends ClawMuscle {
  definition = {
    name: "recall",
    description: "Retrieves a stored fact by its key.",
    parameters: {
      type: "object",
      properties: {
        key: { type: "string", description: "The identifier to look up." }
      },
      required: ["key"]
    }
  };

  async run({ key }: { key: string }): Promise<string> {
    try {
      const data = await fs.readFile(MEMORY_FILE, "utf-8");
      const memory = JSON.parse(data);
      return memory[key] || `No memory found for key: ${key}`;
    } catch (error: any) {
      return `Memory not initialized or empty. Error: ${error.message}`;
    }
  }
}
