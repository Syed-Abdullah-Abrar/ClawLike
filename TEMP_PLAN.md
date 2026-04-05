# ClawLike Temporary Plan & Suggestions

## 🛠️ Refactoring & Architectural Suggestions

1.  **Structured JSON Tool Calling (High Priority):**
    *   **Current State:** `src/heartbeat/scheduler.ts` uses regex `/\`([^\`]+)\`/` to extract commands and hardcodes `shell_execute`.
    *   **Suggestion:** Transition to JSON-based tool calling. The LLM should output `{ "tool": "write_file", "args": { "path": "test.txt", "content": "..." } }`. This allows the agent to use all registered muscles, not just the shell.
2.  **Dynamic Muscle Dispatcher:**
    *   **Current State:** The heartbeat only knows how to call `this.muscles.shell_execute`.
    *   **Suggestion:** Implement a dynamic lookup: `const result = await this.muscles[toolName].run(args)`.
3.  **Brain Provider Strategy:**
    *   **Current State:** `src/brains/engine.ts` has separate (one commented out) implementations for Ollama and Gemini.
    *   **Suggestion:** Implement a `BrainStrategy` interface and a `BrainFactory`. This allows switching providers via an environment variable (`LLM_PROVIDER=gemini`) without modifying code.
4.  **Standardized Muscle Responses:**
    *   **Current State:** Muscles return plain strings for both success and failure.
    *   **Suggestion:** Return a structured `MuscleResult` object: `{ success: boolean, data: any, error?: string }`. This allows the Heartbeat to handle errors more intelligently (e.g., retrying or reporting specific failure types to the Brain).
5.  **Type Safety in Orchestration:**
    *   **Current State:** `scheduler.ts` defines muscles as `Record<string, any>`.
    *   **Suggestion:** Use the abstract base class: `Record<string, ClawMuscle>`.

## 🔒 Security & Robustness Enhancements

1.  **Shell Command Sanitization:**
    *   **Current State:** `ShellMuscle` restricts `cwd` to project root but doesn't prevent absolute path commands (e.g., `cat /etc/passwd`) or `../` traversal within the command string itself.
    *   **Suggestion:** Implement a basic command sanitizer or allow-list for shell operations, or further restrict the shell environment.
2.  **Memory Concurrency Control:**
    *   **Current State:** `memory_ops.ts` reads/writes a single JSON file.
    *   **Suggestion:** If ClawLike becomes multi-threaded or handles concurrent events, add file locking (e.g., using `proper-lockfile`) to prevent data corruption.
3.  **Step Timeout & Cost Guards:**
    *   **Current State:** Loop is capped at 10 steps.
    *   **Suggestion:** Add a total execution time limit and a token/cost counter to prevent runaway costs on paid APIs like Gemini.

## 🚀 Feature Ideas

1.  **System Prompt Completion:**
    *   **Note:** The Ollama implementation in `engine.ts` currently has a stubbed system prompt (`...`). This needs to be populated with instructions on how to use the "Muscles".
2.  **Semantic Memory Upgrade:**
    *   **Idea:** Transition `memory_ops.ts` from a simple key-value store to a local vector store (like `hnswlib-node` or `sqlite-vss`) to allow the agent to perform similarity searches on past "memories".
3.  **Communication Muscles:**
    *   **Idea:** Implement `src/muscles/comm/comm_ops.ts` for integration with Discord, Slack, or WhatsApp, allowing the agent to interact with human users or other agents.
4.  **Event-Driven Heartbeat:**
    *   **Idea:** Instead of a linear `emitTask` loop, implement an internal event bus. The agent could then "listen" for file changes or incoming messages and react autonomously.
