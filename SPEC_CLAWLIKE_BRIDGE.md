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
```text
/src
├── core/
│   ├── brain/           (Reasoning & Providers)
│   ├── memory/          (Persistent JSON storage)
│   ├── heartbeat/       (Autonomous loop & Orchestration)
│   └── registrar.ts     (Explicit Plugin Registration)
├── plugins/
│   ├── terminal/        (Shell & CLI Tools)
│   └── filesystem/      (File Read/Write/Search)
├── shared/
│   └── base.ts          (Common Interfaces: ClawMuscle, ClawPlugin)
└── index.ts             (Entry Point)
```

## Architectural Evolution (Decision Log)
- **2026-04-02**: Decided on a **Categorized** modular structure for Muscles.
- **2026-04-19**: **Major Refactor**: Transitioned to **Option C (Plugin/Adapter Architecture)**.
    - **Hybrid Plugins**: Muscles + Metadata.
    - **Explicit Registration**: Centralized in `registrar.ts`.
    - **JSON Tool Calling**: Standardized protocol.
- **2026-04-19**: **Trinity Implementation**: Added Claude as Auditor and Aider as Engineer.

## Code Style & Role Boundaries
... (rest of the file)

## Testing Strategy
- **Unit Tests**: Every new muscle must have a `.test.ts` file in `tests/`.
- **Integration**: The `Heartbeat` loop must be tested using a "Mock Brain" to verify tool-call routing.

## Boundaries
- **Always**: Update `DEVELOPMENT_LOG.md` after completing a task.
- **Ask First**: Before adding any new external npm dependencies.
- **Never**: Commit `.env` files or hardcode API keys. Never bypass the `SecurityBroker` for shell commands.

## Success Criteria (The Trinity Lock)
- **Phase 1: Planning**. Gemini creates `SPEC.md`. Builder cannot start until `SPEC.md` exists.
- **Phase 2: Building**. Aider implements in Loops 1-3. 
- **Phase 3: Auditing**. Claude supervises and directs Aider in Loops 4-7.
- **Phase 4: Finality**. At Loop 8, Claude presents the `REVIEW.md`.
- **Phase 5: Human Approval**. Work is only "Done" when the Human gives a Green Flag. Claude then generates the commit message.

## Code Style & Role Boundaries
- **Gemini**: Specification-only (Markdown).
- **Aider**: Implementation-only (TypeScript).
- **Claude**: Verification-only (Audit Reports).
- **Synchronization**: All agents MUST reference the `AIDER_checkpoint.md` for current session state.
