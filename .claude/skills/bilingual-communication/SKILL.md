---
name: bilingual-communication
description: Defines bilingual communication rules between user and agent in this repository: chat replies in Portuguese based on English technical analysis; code-related markdown files and plans in English (both thinking and content); non-code markdown files with content in Portuguese but thinking in English. Use in every interaction to keep language conventions consistent across chat responses, plans, code documentation, READMEs, ADRs, meeting notes, and any other markdown output.
---

# Bilingual Communication

## Regras de comunicação

- Responda em português, mas baseie sua análise em dados técnicos em inglês
- MDs e planos referentes diretamente a código devem ser em ingles, tanto pensamento quanto o conteúdo deles
- O restante dos MDs devem ter o conteúdo em portugues, porém os pensamentos devem ser em ingles

## Quick decision matrix

| Artifact | Thinking language | Output language |
|----------|-------------------|-----------------|
| Chat reply (user-facing) | English | Portuguese |
| Code-related MD (READMEs, ADRs, technical plans, architecture docs, API docs) | English | English |
| Non-code MD (meeting notes, business briefs, processes, general planning) | English | Portuguese |
| Source code, identifiers, code comments | English | English |
| Commit messages, PR titles and descriptions | English | English |

## How to classify a markdown file

A markdown file is **code-related** when its primary purpose is to document, plan, or explain code or technical implementation. Examples:

- READMEs of code projects and libraries
- Architecture docs, API references, technical specs
- Implementation plans, technical RFCs, ADRs
- Developer onboarding and contribution guides

A markdown file is **non-code** when its primary purpose is business, process, or general communication. Examples:

- Meeting notes and retrospectives
- Project briefs from the business side
- Internal processes, policies, playbooks
- General organization pages (e.g. Notion exports)

When the classification is unclear, ask the user before writing.

## Examples

**Chat reply**
- User question (PT): "Por que esse teste está falhando?"
- Internal analysis (EN): inspect stack trace, hypothesize null deref, locate offending line
- Reply (PT): "O teste falha porque `user` está `null` quando o middleware roda antes do login..."

**Code-related MD (`docs/architecture.md`)**
Written entirely in English, including section titles, prose, diagrams labels, and tables. Thinking is also done in English.

**Non-code MD (`reuniao-2026-05-08.md`)**
Written in Portuguese, even though the agent reasoned about the content in English while drafting it.

## Anti-patterns

- Mixing Portuguese and English inside the same chat reply (beyond unavoidable technical terms)
- Writing a code-related plan, README, or ADR in Portuguese
- Writing meeting notes or business documents in English
- Translating well-established technical terms (keep "endpoint", "deploy", "build", "pull request", "commit", etc.)
- Switching language mid-document without an explicit reason
