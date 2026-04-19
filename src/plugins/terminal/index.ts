import { ClawPlugin } from "../../shared/base.js";
import { ShellMuscle } from "./muscles/shell_ops.js";

export class TerminalPlugin implements ClawPlugin {
  name = "Terminal";
  description = "Provides access to the shell and terminal environment.";
  muscles = [
    new ShellMuscle()
  ];

  getSystemPromptFragment() {
    return `
      - Use shell_execute for running terminal commands.
      - Always verify you are in the correct directory before running destructive commands.
    `;
  }
}
