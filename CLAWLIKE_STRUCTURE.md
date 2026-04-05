# ClawLike Construction Blueprint: Muscle Expansion

This document tracks the architectural evolution and construction plan for ClawLike's "Muscles" (tools).

## 1. Project Overview
- **Objective**: Build a diverse, modular set of Muscles for the ClawLike agent.
- **Current Status**: Core modular infrastructure complete. File, Shell, and Memory muscles implemented and sandboxed.
- **Core Principle**: Separation of Reasoning (Brains) and Execution (Muscles).

## 2. Architectural Blueprint
### Current Structure (Finalized Step 1-4)
```text
/src
├── brains/
│   └── engine.ts         (Gemini/Ollama integration)
├── heartbeat/
│   └── scheduler.ts      (Autonomous loop orchestration)
└── muscles/
    ├── base.ts           (Abstract ClawMuscle & interfaces)
    ├── core/
    │   └── shell_ops.ts  (ShellMuscle - Sandboxed)
    ├── file/
    │   └── file_ops.ts   (Read, Write, List, Delete, Search - Sandboxed)
    └── memory/
        └── memory_ops.ts (Remember, Recall - JSON based)
```

## 3. Construction Steps

| Step | Muscle Group | Objective | Status |
| :--- | :--- | :--- | :--- |
| 1 | **Infrastructure** | Refactor `base.ts` to export only base classes; move `ShellMuscle` to `core/`. | ✅ Done |
| 2 | **File System** | Implement `ReadFile`, `WriteFile`, `ListDirectory` with TDD. | ✅ Done |
| 3 | **Search** | Implement `SearchFile` (grep-based) muscle. | ✅ Done |
| 4 | **Memory** | Implement `Remember` and `Recall` muscles (JSON persistence). | ✅ Done |
| 5 | **Tool Calling** | Refactor Heartbeat to use structured JSON tool calling instead of backtick parsing. | 🔨 Next Up |
| 6 | **Communication**| Implement `comm_ops.ts` (WhatsApp/Discord/MCP). | ⏳ Pending |

## 4. Decision Log
- **2026-04-02**: Initialized `CLAWLIKE_STRUCTURE.md` to offload documentation from `GEMINI.md`.
- **2026-04-02**: Decided on a **Categorized** modular structure for Muscles.
- **2026-04-05**: Implemented **Strict Sandboxing** for Shell and File muscles using `process.cwd()` and path validation.
- **2026-04-05**: Verified full autonomous loop: Brain successfully creates and verifies files via Heartbeat orchestration.
- **2026-04-05**: (Code Review) Identified backtick parsing as a bottleneck. Decided to transition to structured JSON tool calling to enable multi-tool selection (beyond just shell_execute).

## 5. Non-Functional Requirements
- **Reliability**: Every muscle must have an associated test file in `tests/`. (Currently: `file_ops.test.ts`, `shell_ops.test.ts`).
- **Security**: File and Shell muscles are strictly restricted to the project root.
- **Extensibility**: Muscles follow the `ClawMuscle` abstract definition for easy registration in `ClawHeartbeat`.
