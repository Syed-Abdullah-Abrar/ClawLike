## 🔄 Synchronization Protocol (Agent-to-Agent Loop)
To maintain the "Dual-Drive" vision and prevent context drift, all agents must follow this loop:

1. **ARCHITECT (Gemini)**:
    - Defines the structural goal in `IMPLEMENTATION_PLAN.md`.
    - Writes the granular implementation spec in the `Active Sprint` section below.
2. **BUILDER (Claude)**:
    - **Acknowledge**: Read `SPEC_CLAWLIKE_BRIDGE.md` and this protocol.
    - **Build**: Implement the task using TDD (Test Driven Development).
    - **Document**: Update `DEVELOPMENT_LOG.md` with a summary of changes, any technical hurdles, and a "Next Action" suggestion.
    - **Handoff**: Clear the `Active Sprint` section or mark it as `[COMPLETED]`.
3. **VERIFICATION**:
    - The Human Engineer returns the updated log and code to the Architect.
    - The Architect verifies the work against the `SPEC_CLAWLIKE_BRIDGE.md` and sets the next sprint.

## ⚠️ Safety Hand-off
Any tool that interacts with the user's root system (outside project root) MUST be routed through the `SecurityBroker` (Phase 1, Task 3). Builder must not attempt to bypass this.
Transitioning ClawLike into a modular, plugin-based autonomous agent framework inspired by OpenClaw. The goal is to move from a shell-only tool to a multi-capability platform.

## 🏛️ Architectural Mandates (Non-Negotiable)
1. **Plugin-First**: All new tools MUST live in `src/plugins/<domain>/`.
2. **Explicit Registration**: All plugins MUST be registered in `src/core/registrar.ts`.
3. **JSON Tool Calling**: Use only structured JSON for tool calls. **No backtick/regex parsing.**
4. **Shared Interfaces**: All Muscles must extend `ClawMuscle` from `src/shared/base.ts`.
5. **Memory is Core**: Memory logic lives in `src/core/memory/` and is a mandatory core service.

## 📜 Official Specification
Refer to `SPEC_CLAWLIKE_BRIDGE.md` for full architectural mandates and code standards.

## 🛠️ Active Sprint: "Phase 1 - Trinity Infrastructure"
The Builder (Aider/Claude) should now focus on:
1. **Implementation of the Trinity Heartbeat**: Update `src/heartbeat/scheduler.ts` to support the 8-loop cycle and the state transitions defined in `SOUL.md`.
2. **Loop Logger**: Create the mechanism to log achievements for each of the 8 loops in `DEVELOPMENT_LOG.md`.

## 📢 Handoff State (April 19, 2026)
- **Status**: Trinity Design Lock Complete.
- **Next Action**: Builder to implement the 8-loop logic in the Core Heartbeat.
- **Critical Path**: Ensure Claude (Auditor) can correctly "pause" the loop at Step 8 for Human approval.

