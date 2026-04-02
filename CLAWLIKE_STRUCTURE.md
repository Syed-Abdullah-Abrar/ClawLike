# ClawLike Construction Blueprint: Muscle Expansion

This document tracks the architectural evolution and construction plan for ClawLike's "Muscles" (tools).

## 1. Project Overview
- **Objective**: Build a diverse, modular set of Muscles for the ClawLike agent.
- **Current Status**: MVP Shell Muscle implemented in `src/muscles/base.ts`.
- **Core Principle**: Separation of Reasoning (Brains) and Execution (Muscles).

## 2. Architectural Blueprint
### Current Structure
```text
/src
├── muscles/
│   └── base.ts (Base classes & ShellMuscle)
├── brains/
│   └── engine.ts
└── heartbeat/
    └── scheduler.ts
```

### Planned Target Structure (Categorical Grouping)
```text
/src
├── muscles/
│   ├── base.ts           (Abstract ClawMuscle & interfaces)
│   ├── core/
│   │   └── shell_ops.ts  (ShellExecute, SystemInfo)
│   ├── file/
│   │   └── file_ops.ts   (ReadFile, WriteFile, ListDirectory, etc.)
│   ├── memory/
│   │   └── memory_ops.ts (Remember, Recall, SQLite interface)
│   └── communication/
│       └── comm_ops.ts   (Future: WhatsApp, Discord, MCP)
```

## 3. Construction Steps

| Step | Muscle Group | Objective | Status |
| :--- | :--- | :--- | :--- |
| 1 | **Infrastructure** | Refactor `base.ts` to export only base classes; move `ShellMuscle` to `core/`. | ⏳ Pending |
| 2 | **File System** | Implement `ReadFile`, `WriteFile`, `ListDirectory` with TDD. | ⏳ Pending |
| 3 | **Search** | Implement `GrepSearch` and `Glob` muscles. | ⏳ Pending |
| 4 | **Memory** | Implement `MemoryMuscle` to interface with `src/memory/`. | ⏳ Pending |

## 4. Decision Log
- **2026-04-02**: Initialized `CLAWLIKE_STRUCTURE.md` to offload documentation from `GEMINI.md`.
- **2026-04-02**: Decided on a **Categorized** modular structure for Muscles to support a large, diverse set of tools.

## 5. Non-Functional Requirements
- **Reliability**: Every muscle must have an associated test file in `tests/`.
- **Security**: File muscles must be restricted to the project root (unless otherwise specified).
- **Extensibility**: Muscles must follow the `ClawMuscle` abstract definition.
