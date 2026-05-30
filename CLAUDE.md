@AGENTS.md

<!-- BEGIN linum-govern -->
## linum-govern — Governed Engineering

This repo is governed by **linum-govern**. The governance source of truth is
`.claude/linum-govern/docs/` (system, architecture, rules, contracts, workflows, plans).

- Plan before implementing: `/plan "<request>"` → review → `/govern approve`.
- Execute under governance: `/build`.
- Validate: `/validate`. Diagnose setup: `/govern-doctor`.

Ask-gates (plan / approval / delivery) describe blocks and route a dev confirmation; they do
not hard-fail. Bypass is explicit and recorded: `/govern bypass <gate> <reason>`.
<!-- END linum-govern -->
