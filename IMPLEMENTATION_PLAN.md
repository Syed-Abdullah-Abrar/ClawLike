# Implementation Plan: ClawLike Trinity Orchestrator

## Overview
Transforming ClawLike into a high-integrity "Agent Agency." We are moving beyond a simple Planner-Builder model to a **Trinity (Gemini, Aider, Claude)** system with an 8-loop refinement cycle, supervised by Claude and governed by the `SOUL.md`.

## Architecture Decisions
- **The Trinity Roles**: 
    - **Planner (Gemini)**: Architects the `SPEC.md`. 
    - **Builder (Aider)**: Executes surgical file edits. 
    - **Auditor (Claude)**: Supervises Aider and gates the quality.
- **8-Loop Cycle**: The `Heartbeat` now manages 8 distinct loops of thinking/building/auditing.
- **The Soul Protocol**: A mandatory `SOUL.md` that prevents role-overlap.
- **Human-in-the-loop Finality**: Agents stop at Loop 8; Human toggles "Review Mode" to Green/Red flag.

## Task List

### Phase 1: The Trinity Infrastructure
- [ ] **Task 1: The SOUL.md Creation.** Define the rigid behavioral boundaries for Gemini, Aider, and Claude.
- [ ] **Task 2: Trinity Bridge Refactor.** Update `SPEC_CLAWLIKE_BRIDGE.md` to define the 8-loop protocol and agent handoffs.
- [ ] **Task 3: Heartbeat State Machine (v2).** Update `scheduler.ts` to manage the transition through 8 specific loops.

### Phase 2: Loop Achievement & Logging
- [ ] **Task 4: Loop Specialist Definitions.** Assign specific achievements to each loop (e.g., Loop 5 = "Security/Refactor Scan").
- [ ] **Task 5: Sequential Loop Logger.** Update `DEVELOPMENT_LOG.md` to track what happens in every one of the 8 loops.

### Phase 3: The Auditor's Gate (Claude)
- [ ] **Task 6: Supervisory Prompting.** Build the logic for Claude to "tell Aider" what to fix if an audit fails during loops 4-7.
- [ ] **Task 7: The Final Commit Muscle.** Implement Claude's specialized tool to write the commit message post-Human Approval.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Loop Exhaustion | Med | Allow Claude to "Early Exit" if the code is 100% perfect by Loop 4. |
| Role Overlap | High | Strict enforcement via `SOUL.md` system prompts. |
