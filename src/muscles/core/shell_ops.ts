import { exec } from "child_process";
import { promisify } from "util";
import { ClawMuscle, MuscleDefinition } from "../base";

const execPromise = promisify(exec);
const PROJECT_ROOT = process.cwd();

/**
 * Executing shell commands within the project root.
 */
export class ShellMuscle extends ClawMuscle {
  definition = {
    name: "shell_execute",
    description: "Executes a shell command on the local system (restricted to project root).",
    parameters: {
      type: "object",
      properties: {
        command: { type: "string", description: "The exact command to run." }
      },
      required: ["command"]
    }
  };

  async run({ command }: { command: string }): Promise<string> {
    try {
      // We force the execution directory to PROJECT_ROOT for safety
      const { stdout, stderr } = await execPromise(command, { 
        shell: '/bin/bash', 
        cwd: PROJECT_ROOT 
      });
      
      if (stderr) {
        return `Success with warnings:\n${stdout}\nErrors:\n${stderr}`;
      }
      return stdout || "Command executed successfully with no output.";
    } catch (error: any) {
      return `Execution failed: ${error.message}`;
    }
  }
}
