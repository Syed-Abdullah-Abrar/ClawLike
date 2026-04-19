# Implementation Plan: ClawLike Dual-Drive Orchestrator

## Overview
Transforming ClawLike from a linear autonomous loop into a state-aware orchestrator that supports **Precision Pair-Programming (Local)** and **Handoff Autonomous Building (Remote/Discord)**. It uses a "Planner-Builder" separation to allow Gemini to plan and Claude to execute via a standardized Bridge protocol.

## Architecture Decisions
- **State Machine Integration**: `ClawHeartbeat` will manage states: `IDLE`, `ASSISTING` (Precision), `BUILDING` (Handoff), and `AWAITING_PERMISSION`.
- **Mode Toggle**: A new "Mode" flag will determine if the loop pauses for human confirmation (Precision) or proceeds autonomously (Handoff).
- **The Bridge Protocol**: `CLAW_CONSTRUCTION_PROTOCOL.md` will be the living document that handsoff tasks between Gemini (Planner) and Claude (Builder).
- **Security Broker**: A central `PermissionManager` core service that interrupts risky tool calls until approved via CLI or Discord.

## Task List

### Phase 1: State Machine & Mode Foundation
- [ ] **Task 1: Core State Definition.** Update `ClawHeartbeat` to support the new state enum and "Precision vs Handoff" mode flags.
- [ ] **Task 2: Precision Mode Loop.** Refactor the heartbeat loop to pause and wait for user input (CLI) after every "Thought" when in Precision mode.
- [ ] **Task 3: Permission Interceptor.** Implement a basic `SecurityBroker` in `src/core/` that can "Hold" a tool call until a `grant()` method is called.

### Phase 2: The Bridge & Planner Logic
- [ ] **Task 4: Planner System Prompt.** Update Gemini's system prompt in `src/core/brain/engine.ts` to explicitly act as an "Architect/Planner" that writes to the Bridge file.
- [ ] **Task 5: Bridge Protocol Implementation.** Create the `src/core/bridge_ops.ts` to manage reading/writing the `CLAW_CONSTRUCTION_PROTOCOL.md` programmatically.

### Phase 3: The Discord Cockpit (Remote Control)
- [ ] **Task 6: Discord Plugin Foundation.** Build `src/plugins/discord/` to handle the bot login and basic message routing.
- [ ] **Task 7: Remote Permission Broker.** Connect the `SecurityBroker` to Discord, allowing approvals via button clicks.
- [ ] **Task 8: Handoff Mode Activation.** Enable the full autonomous loop for Discord-initiated tasks.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Context Drift | High | Ensure Gemini writes extremely detailed implementation specs in the Bridge. |
| File Collision | Med | Implement a simple file lock or state check if both modes are active. |
| Discord Latency | Low | Use asynchronous event emitters for tool call status updates. |

## Open Questions
- Should the "Precision Mode" have a live file-watcher to update the Brain automatically when the user edits a file?
