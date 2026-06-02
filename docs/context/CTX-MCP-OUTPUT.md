# MCP Output — Convenção de Pastas

Todo output de ferramentas MCP (Playwright, Lighthouse, Axe, etc.) vai para `.mcp_output/`.

## Estrutura

```
.mcp_output/
  playwright/
    01/
      raw.txt        ← stdout completo da execução
      summary.md     ← análise: status, falhas, root cause, próximos passos
      screenshots/   ← capturas (se aplicável)
    02/
      ...
  lighthouse/
    01/
      raw.json
      summary.md
```

## Criar nova pasta de execução

```bash
RUN_DIR=$(bash .claude/skills/mcp-output/scripts/next-run.sh playwright)
# → .mcp_output/playwright/01 (cria e retorna o path)
```

O script detecta o maior ordinal existente e incrementa. Sempre 2 dígitos (`01`, `02`, ...).

## Rodar Playwright e salvar output

```bash
RUN_DIR=$(bash .claude/skills/mcp-output/scripts/next-run.sh playwright)
npx playwright test 2>&1 | tee "${RUN_DIR}/raw.txt"
```

Com relatório HTML:
```bash
PLAYWRIGHT_HTML_REPORT="${RUN_DIR}/report" npx playwright test --reporter=html 2>&1 | tee "${RUN_DIR}/raw.txt"
```

## summary.md — Template

```markdown
# Playwright Run 01 — 2026-05-31 14:30

## Status
FAIL

## What was tested
tests/visual/homepage.spec.ts

## Results
- Total: 12   Passed: 10   Failed: 2   Skipped: 0

## Failures
### section #manifesto is visible
- **Error:** expect(locator).toBeVisible() — element not found
- **File:** tests/visual/homepage.spec.ts:12
- **Root cause:** ManifestoSection não renderiza em headless (script de reveal bloqueia)
- **Fix:** Adicionar `data-testid` ou aguardar `networkidle` antes de scroll

## Observations
- Testes de overflow horizontal pré-existentes falham (não relacionado a mudanças recentes)

## Next steps
- [ ] Investigar reveal animation em headless
- [ ] Adicionar waitForSelector nos testes de seção
```

## Regras

- Nunca reutilizar ou sobrescrever pasta de run existente
- `summary.md` é a memória entre sessões — ler antes de rodar novamente
- `.mcp_output/` no `.gitignore` (output local, não versionado)

## Skill

Protocolo completo em `.claude/skills/mcp-output/SKILL.md`.
