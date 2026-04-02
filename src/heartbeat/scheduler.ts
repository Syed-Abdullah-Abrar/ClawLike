import { ClawBrain } from "../brains/engine.js";
import { ShellMuscle } from "../muscles/core/shell_ops.js";
import { ReadFileMuscle, WriteFileMuscle, ListDirectoryMuscle, SearchFileMuscle } from "../muscles/file/file_ops.js";
import { RememberMuscle, RecallMuscle } from "../muscles/memory/memory_ops.js";

/**
 * The Heartbeat orchestrates the autonomous loop.
 */
export class ClawHeartbeat {
  private brain: ClawBrain;
  private muscles: Record<string, any>;

  constructor() {
    this.brain = new ClawBrain();
    this.muscles = {
      shell_execute: new ShellMuscle(),
      read_file: new ReadFileMuscle(),
      write_file: new WriteFileMuscle(),
      list_directory: new ListDirectoryMuscle(),
      search_file: new SearchFileMuscle(),
      remember: new RememberMuscle(),
      recall: new RecallMuscle()
    };
  }

  async emitTask(task: string) {
    console.log(`[Heartbeat] 💓 Task: "${task}"`);
    let context = "";

    for (let step = 1; step <= 10; step++) {
      console.log(`[Heartbeat] 🧠 Step ${step}...`);
      
      const thought = await this.brain.think(task, context);
      console.log(`[Brain Thought]:\n${thought}\n`);

      // Try to match tool calls like: tool_name({ "arg": "val" })
      // Or simple backticks for shell commands
      const commandMatch = thought.match(/`([^`]+)`/);
      
      if (commandMatch) {
        const command = commandMatch[1];
        console.log(`[Heartbeat] 💪 Muscle (Shell): "${command}"`);
        const result = await this.muscles.shell_execute.run({ command });
        context += `\nStep ${step}: Ran "${command}". Result: ${result}`;
      } else {
        // Here we'd add logic for tool-calling via JSON if the LLM supports it natively,
        // but for now we'll stick to basic command extraction.
        console.log(`[Heartbeat] ✅ Done or No tool found.`);
        break;
      }
    }
  }
}
