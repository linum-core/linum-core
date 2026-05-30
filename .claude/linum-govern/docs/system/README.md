# linum-govern System

This directory contains governance infrastructure for the `linum-core-portfolio` project.

## Overview

**linum-govern** is a guided-workflow governance engine for multi-agent code generation. It ensures:

- ✅ Clear architecture & contracts before coding
- ✅ Type safety & validation at system boundaries
- ✅ Consistent code style across agents
- ✅ Reproducible testing & deployment

## Directory Structure

- `architecture/` — service boundaries, data flow, conventions, stack
- `rules/` — code style, typing, testing, security, i18n
- `contracts/` — API contracts, plan schema, approval gates
- `workflows/` — build, deployment, documentation, planning
- `plans/` — [auto-generated] approved implementation plans
- `system/` — this governance system

## How It Works

1. **Plan**: Define what needs to be built → `/plan "<request>"` → review via UI
2. **Approve**: Review plan + architecture audit → `/govern approve`
3. **Build**: Execute under governance → `/build`
4. **Validate**: Run checks (lint, typecheck, test) → output to `.claude/linum-govern/state/`

## Key Commands

- `/plan "<request>"` — Create a plan
- `/govern approve` — Approve the plan
- `/build` — Execute plan under governance
- `/validate` — Run validation suite
- `/govern-doctor` — Diagnose governance setup

## Stack Enforcement

Governance is tuned to the project's specific stack:

| Aspect | Value |
|--------|-------|
| Framework | Next.js 16.2.6 |
| Language | TypeScript 5 (strict) |
| Testing | Playwright E2E |
| Package manager | bun |
| i18n | next-intl (en, pt-BR) |

See `architecture/stack.md` for full details.
