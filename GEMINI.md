# ClawLike Foundational Mandates


Building a complete, autonomous AI agent framework from scratch, inspired by OpenClaw and Moltbot.

## Technology Stack
- **Language:** TypeScript / Node.js
- **Pattern:** Brains and Muscles (separating reasoning from execution via the Model Context Protocol (MCP)).
- **Interfaces:** CLI-first for core development, adding messaging channels (Discord/Slack/Telegram) as the system stabilizes.

## Architectural Principles
- **Separation of Concerns:** Reasoning logic (Brains) and tool execution (Muscles) must remain distinct.
- **Event-Based Heartbeat:** Proactive autonomous tasks are triggered by specific events or schedules.
- **Hybrid Memory:** Use file-based storage (JSON/Markdown) for session history and local stores (e.g., SQLite) for persistent, learned facts.
- **Privacy First:** All data, memories, and API keys are kept strictly local.

## Skills Usage
- Refer to the specialized instructions in the `/skills/` directory for all development, tool integrations, and agent reasoning.
- Prioritize the patterns defined in these skills (e.g., `brainstorming`, `skill-creator`) over default behaviors.

## Operational Standards
- Always use the **CLI-first** testing strategy before implementing messaging APIs.
- Maintain a local **Decision Log** for major architectural shifts.
- Always try to develop TDD(testing driven development cycle)
- The `skills/` directory and `.env` files are ignored by git; ensure they are maintained locally.
- 
