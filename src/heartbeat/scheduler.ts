import { ClawBrain } from "../brains/engine.js";
import { ClawRegistrar } from "../core/registrar.js";
import { RememberMuscle, RecallMuscle } from "../core/memory/memory_ops.js";

/**
 * The Heartbeat orchestrates the autonomous loop using the Plugin Registrar.
 */
export class ClawHeartbeat {
  private brain: ClawBrain;
  private registrar: ClawRegistrar;
  private coreMuscles: Record<string, any>;

  constructor() {
    this.brain = new ClawBrain();
    this.registrar = new ClawRegistrar();
    
    // Core muscles that are always available
    this.coreMuscles = {
      remember: new RememberMuscle(),
      recall: new RecallMuscle()
    };
  }

  async emitTask(task: string) {
    console.log(`[Heartbeat] 💓 Task: "${task}"`);
    let context = "";

    for (let step = 1; step <= 10; step++) {
      console.log(`[Heartbeat] 🧠 Step ${step}...`);
      
      const toolDefs = this.registrar.getToolDefinitions();
      const pluginPrompts = this.registrar.getCombinedSystemPrompt();
      
      const rawThought = await this.brain.think(task, context, toolDefs, pluginPrompts);
      
      try {
        const response = JSON.parse(rawThought);
        console.log(`[Brain Thought]: ${response.thought}`);

        if (response.tool_call) {
          const { tool, args } = response.tool_call;
          console.log(`[Heartbeat] 💪 Muscle (${tool}):`, args);

          // Check Registrar first, then Core Muscles
          const muscle = this.registrar.getMuscle(tool) || this.coreMuscles[tool];
          
          if (muscle) {
            const result = await muscle.run(args);
            context += `\nStep ${step}: Used "${tool}" with ${JSON.stringify(args)}. Result: ${JSON.stringify(result)}`;
          } else {
            const error = `Tool "${tool}" not found.`;
            console.error(`[Heartbeat] ❌ ${error}`);
            context += `\nStep ${step}: Error - ${error}`;
          }
        } else {
          console.log(`[Heartbeat] ✅ Task completed or no further tools needed.`);
          break;
        }
      } catch (e: any) {
        console.error("[Heartbeat] ❌ Failed to parse Brain response as JSON:", rawThought);
        context += `\nStep ${step}: Error parsing tool call.`;
      }
    }
  }
}
