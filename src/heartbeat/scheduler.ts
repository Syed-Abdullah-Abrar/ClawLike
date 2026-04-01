import { ClawBrain } from "../brains/engine.js";
import { ShellMuscle } from "../muscles/base.js";

/**
 * The Heartbeat is the orchestrator for the event-based autonomous cycle.
 * It connects the "Brain" (Reasoning) with the "Muscles" (Execution).
 */
export class ClawHeartbeat {
  private brain: ClawBrain;
  private shellMuscle: ShellMuscle;

  constructor() {
    this.brain = new ClawBrain();
    this.shellMuscle = new ShellMuscle();
  }

  /**
   * Emits a task to the agent and starts the autonomous reasoning loop.
   */
  async emitTask(task: string) {
    console.log(`[Heartbeat] 💓 New task received: "${task}"`);
    
    let isTaskComplete = false;
    let context = "";

    // Autonomous loop (limited to 5 steps for safety during testing)
    for (let step = 1; step <= 5 && !isTaskComplete; step++) {
      console.log(`[Heartbeat] 🧠 Reasoning Step ${step}...`);
      
      const thought = await this.brain.think(task, context);
      console.log(`[Brain Thought]:\n${thought}\n`);

      // Robust logic: if the brain mentions a command in backticks, let's try to execute it
      const commandMatch = thought.match(/```(?:\w+)?\s*([\s\S]+?)\s*```|`([\s\S]+?)`/);
      
      let command = "";
      if (commandMatch) {
        // Prioritize triple backticks capture group (commandMatch[1])
        // Fallback to single backticks capture group (commandMatch[2])
        command = (commandMatch[1] || commandMatch[2] || "").trim();
        // Sanitize: remove any backticks that the LLM might have included *inside* the command string
        command = command.replace(/`/g, '');
      }
      
      if (command) { // Only execute if a command was successfully extracted
        console.log(`[Heartbeat] 💪 Muscle executing: "${command}"`);
        
        const result = await this.shellMuscle.run({ command });
        console.log(`[Muscle Result]:\n${result}\n`);
        
        context += `\nStep ${step}: Executed "${command}". Result: ${result}`;
      } else {
        console.log(`[Heartbeat] ✅ Task complete or no further actions needed.`);
        isTaskComplete = true;
      }
    }
  }
}
