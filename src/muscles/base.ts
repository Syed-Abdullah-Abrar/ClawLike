import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export interface MuscleDefinition {
  name: string;
  description: string;
  parameters: object;
}

export abstract class ClawMuscle {
  abstract definition: MuscleDefinition;
  abstract run(args: any): Promise<any>;
}

/**
 * The most basic "Muscle": executing shell commands.
 */
export class ShellMuscle extends ClawMuscle {
  definition = {
    name: "shell_execute",
    description: "Executes a shell command on the local system.",
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
      const { stdout, stderr } = await execPromise(command, { shell: '/bin/bash' });
      if (stderr) {
        return `Success with warnings:\n${stdout}\nErrors:\n${stderr}`;
      }
      return stdout || "Command executed successfully with no output.";
    } catch (error: any) {
      return `Execution failed: ${error.message}`;
    }
  }
}
