import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { ClawMuscle } from "../../../shared/base.js";

const execPromise = promisify(exec);
const PROJECT_ROOT = process.cwd();

/**
 * Validates that a path is within the project root to prevent unauthorized access.
 */
function validatePath(targetPath: string): string {
  const absolutePath = path.resolve(PROJECT_ROOT, targetPath);
  if (!absolutePath.startsWith(PROJECT_ROOT)) {
    throw new Error(`Access denied: Path "${targetPath}" is outside the project sandbox.`);
  }
  return absolutePath;
}

/**
 * Reads the content of a file.
 */
export class ReadFileMuscle extends ClawMuscle {
  definition = {
    name: "read_file",
    description: "Reads the content of a file within the project sandbox.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "Path to the file." }
      },
      required: ["path"]
    }
  };

  async run({ path }: { path: string }): Promise<string> {
    try {
      const target = validatePath(path);
      return await fs.readFile(target, "utf-8");
    } catch (error: any) {
      return `Error reading file: ${error.message}`;
    }
  }
}

/**
 * Writes content to a file, creating directories if needed.
 */
export class WriteFileMuscle extends ClawMuscle {
  definition = {
    name: "write_file",
    description: "Writes content to a file within the project sandbox.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "Path to the file." },
        content: { type: "string", description: "Content to write." }
      },
      required: ["path", "content"]
    }
  };

  async run({ path: targetPath, content }: { path: string, content: string }): Promise<string> {
    try {
      const target = validatePath(targetPath);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, content, "utf-8");
      return `File "${targetPath}" written successfully.`;
    } catch (error: any) {
      return `Error writing file: ${error.message}`;
    }
  }
}

/**
 * Lists the contents of a directory.
 */
export class ListDirectoryMuscle extends ClawMuscle {
  definition = {
    name: "list_directory",
    description: "Lists files and folders in a directory.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "Directory path." }
      },
      required: ["path"]
    }
  };

  async run({ path: targetPath }: { path: string }): Promise<string[] | string> {
    try {
      const target = validatePath(targetPath);
      const entries = await fs.readdir(target);
      return entries;
    } catch (error: any) {
      return `Error listing directory: ${error.message}`;
    }
  }
}

/**
 * Deletes a file.
 */
export class DeleteFileMuscle extends ClawMuscle {
  definition = {
    name: "delete_file",
    description: "Deletes a file within the project sandbox.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "Path to the file." }
      },
      required: ["path"]
    }
  };

  async run({ path: targetPath }: { path: string }): Promise<string> {
    try {
      const target = validatePath(targetPath);
      const stats = await fs.stat(target);
      if (stats.isDirectory()) {
        throw new Error("Cannot delete a directory using delete_file. Use a directory-specific tool.");
      }
      await fs.unlink(target);
      return `File "${targetPath}" successfully deleted.`;
    } catch (error: any) {
      return `Error deleting file: ${error.message}`;
    }
  }
}

/**
 * Searches for a pattern in the codebase using grep.
 */
export class SearchFileMuscle extends ClawMuscle {
  definition = {
    name: "search_file",
    description: "Searches for a text pattern within the project files.",
    parameters: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Regex or string pattern." },
        path: { type: "string", description: "Directory to search in (default root)." }
      },
      required: ["pattern"]
    }
  };

  async run({ pattern, path: searchPath = "." }: { pattern: string, path?: string }): Promise<string> {
    try {
      const target = validatePath(searchPath);
      const { stdout } = await execPromise(`grep -rnE "${pattern}" "${target}" --exclude-dir=node_modules`, { shell: '/bin/bash' });
      return stdout || "No matches found.";
    } catch (error: any) {
      if (error.code === 1) return "No matches found.";
      return `Search failed: ${error.message}`;
    }
  }
}
