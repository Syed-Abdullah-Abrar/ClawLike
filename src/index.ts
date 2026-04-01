import { ClawHeartbeat } from "./heartbeat/scheduler.js";

async function main() {
  console.log("--- 🦞 ClawLike Initialized (CLI-First) ---");
  
  const heartbeat = new ClawHeartbeat();
  
  // Test task: Autonomous exploration
  const initialTask = "List all files in the current directory and find if there is any 'tsconfig.json' file.";
  
  try {
    await heartbeat.emitTask(initialTask);
  } catch (error) {
    console.error("ClawLike encountered an error:", error);
  }
}

main();
