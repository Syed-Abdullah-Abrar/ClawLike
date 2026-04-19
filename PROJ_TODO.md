# ClawLike Foundational Mandates


Building a complete, autonomous AI agent framework from scratch, inspired by OpenClaw/Moltbot.

## Technology Stack
- **Language:** TypeScript / Node.js
- **Pattern:** Brains and Muscles (separating reasoning from execution via the Model Context Protocol (MCP)).
- **Interfaces:** CLI-first for core development, adding messaging channels (Discord/Slack/Telegram) as the system stabilizes.

## Architectural Principles
- **Separation of Concerns:** Reasoning logic (Brains) and tool execution (Muscles) remain distinct.
- **Plugin-Based Extensibility:** All capabilities (Terminal, Filesystem) are self-contained plugins under `src/plugins/`.
- **Explicit Registration:** All active plugins must be manually registered in `src/core/registrar.ts` for stability.
- **Structured Tool Calling:** Communication between Brain and Heartbeat is strictly JSON-based.
- **Event-Based Heartbeat:** Proactive autonomous tasks are triggered by specific events or schedules.
- **Core Memory:** Persistent memory is a core service to ensure the agent maintains a stable identity and history.

## Skills Usage
- Refer to the specialized instructions in the `/skills/` directory for all development, tool integrations, and agent reasoning.
- Prioritize the patterns defined in these skills (e.g., `brainstorming`, `skill-creator`) over default behaviors.

## Operational Standards
- Always use the **CLI-first** testing strategy before implementing messaging APIs.
- Maintain a local **Decision Log** for major architectural shifts.
- Always try to develop TDD(testing driven development cycle)
- The `skills/` directory and `.env` files are ignored by git; ensure they are maintained locally.
- At the end of the sessions, update the CLAWLIKE_STRUCTURE.md file.
