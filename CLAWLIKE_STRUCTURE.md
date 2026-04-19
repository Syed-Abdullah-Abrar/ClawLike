# ClawLike Construction Blueprint: Muscle Expansion

This document tracks the architectural evolution and construction plan for ClawLike's "Muscles" (tools).

## 1. Project Overview
- **Objective**: Build a diverse, modular set of Muscles for the ClawLike agent.
- **Current Status**: Core modular infrastructure complete. File, Shell, and Memory muscles implemented and sandboxed.
- **Core Principle**: Separation of Reasoning (Brains) and Execution (Muscles).

## 2. Architectural Blueprint
### Current Structure (Plugin-Based)
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

## 3. Construction Steps

| Step | Muscle Group | Objective | Status |
| :--- | :--- | :--- | :--- |
| 1 | **Infrastructure** | Refactor to Plugin-based architecture with `Registrar`. | ✅ Done |
| 2 | **Tool Calling** | Implement structured JSON tool calling (Gemini-ready). | ✅ Done |
| 3 | **Communication**| Implement `comm_ops.ts` (WhatsApp/Discord/MCP). | ⏳ Pending |
| 4 | **Refinement** | Add specialized tools to Terminal plugin (Tail, Env). | ⏳ Pending |

## 4. Decision Log
- **2026-04-02**: Decided on a **Categorized** modular structure for Muscles.
- **2026-04-05**: Implemented **Strict Sandboxing** for Shell and File muscles.
- **2026-04-19**: **Major Refactor**: Transitioned to **Option C (Plugin/Adapter Architecture)**.
    - **Hybrid Plugins**: Plugins now export both code (Muscles) and metadata (System Prompt fragments).
    - **Explicit Registration**: Switched to a `Registrar` pattern for stability and "Single Source of Truth."
    - **JSON Tool Calling**: Deprecated backtick parsing in favor of structured JSON (`{"tool": "...", "args": {...}}`).
    - **Core Memory**: Solidified Memory as a Core service rather than an optional plugin to ensure consistency.

## 5. Non-Functional Requirements
- **Reliability**: Every muscle must have an associated test file in `tests/`. (Currently: `file_ops.test.ts`, `shell_ops.test.ts`).
- **Security**: File and Shell muscles are strictly restricted to the project root.
- **Extensibility**: Muscles follow the `ClawMuscle` abstract definition for easy registration in `ClawHeartbeat`.
