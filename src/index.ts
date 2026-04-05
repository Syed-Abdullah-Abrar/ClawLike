import { ClawHeartbeat } from "./heartbeat/scheduler";

async function main() {
  console.log("--- 🦞 ClawLike Initialized (CLI-First) ---");
  
  const heartbeat = new ClawHeartbeat();
  
  // Test task: File creation and verification
  const initialTask = "Create a file named 'hello_claw_01.txt' with the content 'Agent was here - 01', then list the directory to confirm it exists.";
  
  try {
    await heartbeat.emitTask(initialTask);
  } catch (error) {
    console.error("ClawLike encountered an error:", error);
  }
}

main();
