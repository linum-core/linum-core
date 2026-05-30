<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Multi-Agent Plan Execution

Plans marked `[Multi-Agent Orchestrated]` must be executed using the `multiagent-orchestrated-plan` skill.

- Invoke the skill at the start of every such plan
- Use AskUserQuestion approval gates between every phase
- Spawn parallel subagents for independent tasks within the same phase
- Every subagent prompt must be self-contained with full project context

## Code style

- Functions: 4-20 lines. Split if longer.
- Files: under 500 lines. Split by responsibility.
- One thing per function, one responsibility per module (SRP).
- Names: specific and unique. Avoid `data`, `handler`, `Manager`.
  Prefer names that return <5 grep hits in the codebase.
- Types: explicit. No `any`, no `Dict`, no untyped functions.
- No code duplication. Extract shared logic into a function/module.
- Early returns over nested ifs. Max 2 levels of indentation.
- Exception messages must include the offending value and expected shape.

## Comments

- Keep your own comments. Don't strip them on refactor — they carry
  intent and provenance.
- Write WHY, not WHAT. Skip `// increment counter` above `i++`.
- Docstrings on public functions: intent + one usage example.
- Reference issue numbers / commit SHAs when a line exists because
  of a specific bug or upstream constraint.

## Tests

- Tests run with a single command: `<project-specific>`.
- Every new function gets a test. Bug fixes get a regression test.
- Mock external I/O (API, DB, filesystem) with named fake classes,
  not inline stubs.
- Tests must be F.I.R.S.T: fast, independent, repeatable,
  self-validating, timely.

## Dependencies

- Inject dependencies through constructor/parameter, not global/import.
- Wrap third-party libs behind a thin interface owned by this project.

## Structure

- Follow the framework's convention (Rails, Django, Next.js, etc.).
- Prefer small focused modules over god files.
- Predictable paths: controller/model/view, src/lib/test, etc.

## Formatting

- Use the language default formatter (`cargo fmt`, `gofmt`, `prettier`,
  `black`, `rubocop -A`). Don't discuss style beyond that.

## Logging

- Structured JSON when logging for debugging / observability.
- Plain text only for user-facing CLI output.

<!-- END:nextjs-agent-rules -->

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
