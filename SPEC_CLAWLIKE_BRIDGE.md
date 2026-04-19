# Spec: ClawLike Dual-Drive Orchestrator Bridge

## Objective
To provide a structured, non-ambiguous communication layer between the **Planner LLM** (Architect) and the **Builder LLM** (Construction). This spec ensures the Builder implements features exactly as planned while maintaining the "Unbloated" philosophy of ClawLike.

## Tech Stack
- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js (Latest LTS)
- **Frameworks**: Discord.js (for Remote Cockpit), Google Generative AI (for Brain).
- **Core Design**: Plugin/Adapter Architecture (Option C).

## Commands
- **Build**: `npm run build` (or `tsc`)
- **Test**: `npm test`
- **Start Local (Precision)**: `npm start -- --mode=precision`
- **Start Remote (Handoff)**: `npm start -- --mode=handoff`

## Project Structure
- `src/core/`: The engine (Brain, Heartbeat, Registrar, Memory, SecurityBroker).
- `src/plugins/`: Self-contained capabilities (terminal, filesystem, discord).
- `src/shared/`: Base interfaces (`base.ts`).
- `CLAW_CONSTRUCTION_PROTOCOL.md`: The active task handoff file.
- `IMPLEMENTATION_PLAN.md`: The long-term roadmap.
- `DEVELOPMENT_LOG.md`: The history of changes.

## Code Style
- **Standard**: Clean, modular TypeScript.
- **Rules**:
    - Every Muscle must extend `ClawMuscle`.
    - Every Plugin must have an `index.ts` manifest.
    - No direct shell calls outside of `ShellMuscle`.
    - Use `console.log` with prefixes: `[Heartbeat]`, `[Brain]`, `[Registrar]`.

## Testing Strategy
- **Unit Tests**: Every new muscle must have a `.test.ts` file in `tests/`.
- **Integration**: The `Heartbeat` loop must be tested using a "Mock Brain" to verify tool-call routing.

## Boundaries
- **Always**: Update `DEVELOPMENT_LOG.md` after completing a task.
- **Ask First**: Before adding any new external npm dependencies.
- **Never**: Commit `.env` files or hardcode API keys. Never bypass the `SecurityBroker` for shell commands.

## Success Criteria (The Bridge Lock)
- Gemini (Planner) identifies a task and writes the requirements to the "Active Sprint" section of `CLAW_CONSTRUCTION_PROTOCOL.md`.
- Claude (Builder) reads the spec, implements the code, verifies with tests, and moves the task to "Completed" in `DEVELOPMENT_LOG.md`.
- A task is only "Done" when the `SecurityBroker` successfully intercepts and grants permission for the new functionality.
