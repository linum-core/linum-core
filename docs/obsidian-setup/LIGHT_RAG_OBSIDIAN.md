# SETUP WIZARD: LightRAG + Claude Code + Obsidian + CLI

Você vai me guiar num setup interativo (via `AskUserQuestion`) pra instalar um pipeline LightRAG com:

- **MCP server** integrado ao Claude Code (via `.mcp.json` — project-scoped)
- **CLI `rag`** pra consultar o grafo do terminal (ex: `rag search "termo"`)
- **Export pro Obsidian** com Graph View pré-configurado

Siga as fases. Use `AskUserQuestion` onde indicado. Use `TodoWrite` pra tracking.

---

## FASE 0 — Detecção + auto-instalação de pré-reqs (noob-friendly)

**Objetivo:** o usuário NUNCA precisa instalar nada manualmente. Você detecta o que falta e instala sozinho, narrando o que está fazendo em linguagem simples.

### 0.1 — Sondar o ambiente (silencioso)

Explore em paralelo:

- `git rev-parse --show-toplevel` → raiz do projeto
- Stack via: `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `requirements.txt`
- Estrutura top-level (Glob): `app/`, `src/`, `components/`, `convex/`, `prisma/`, `docs/`
- `.env.local` / `.env` / `.env.example` (só LISTE as chaves, nunca leia valores)
- `.gitignore` — verifica se `.env*` está listado
- **`.mcp.json`** — se existe (merge-safe depois) e quais servers contém
- `.claude/settings.local.json` — só pra contexto, NÃO é onde registra MCP
- `uname -s` → detecta SO (Darwin=macOS, Linux=Linux)
- `command -v uv`, `command -v brew`, `command -v curl`, `command -v python3`
- macOS: `ls /Applications/ | grep -i Obsidian` · Linux: `ls ~/.config/obsidian ~/.var/app/md.obsidian.Obsidian 2>/dev/null`

### 0.2 — Auto-instalar `uv` se faltar

`uv` gerencia tudo — Python, venv, deps. Se estiver faltando:

**macOS:**

```bash
# Preferir brew se estiver disponível:
command -v brew >/dev/null && brew install uv

# Senão, instalador oficial:
command -v brew >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Após instalar, o binário fica em `~/.local/bin/uv` ou `/opt/homebrew/bin/uv`. Se `command -v uv` ainda falhar, adicione o path manualmente para a sessão: `export PATH="$HOME/.local/bin:$PATH"`.

**Narração obrigatória:** ANTES de instalar, diga ao usuário em uma frase: _"Não achei o `uv` (gerenciador de pacotes Python moderno). Vou instalar agora — leva ~10 segundos, sem prompts interativos."_

### 0.3 — Auto-instalar Python 3.11+ se faltar

Se `python3 --version` < 3.11 OU não existir:

```bash
uv python install 3.11
```

`uv` instala uma versão gerenciada isolada (não mexe no Python do sistema). Narração: _"Python 3.11+ não encontrado. Vou instalar uma versão gerenciada pelo `uv` (não mexe no Python do sistema)."_

### 0.4 — LightRAG + deps Python são automáticas

**Não instale LightRAG nem outras libs Python nessa fase.** A FASE 4 roda `uv sync` dentro de `tools/lightrag/` e isso instala tudo automaticamente (LightRAG, Gemini/OpenAI SDK, MCP, networkx, rich, etc.) num `.venv` isolado. Só confirme que os **pré-reqs do sistema** (`uv` + Python) estão prontos.

### 0.5 — Obsidian (opcional, não-bloqueante)

Obsidian é só pra VER o grafo depois. Se não estiver instalado, NÃO instale automaticamente — apenas note isso no resumo e no final mostre o link de download na checklist final.

Se o usuário quiser, ofereça via `AskUserQuestion` no FINAL da FASE 1 (NÃO aqui, pra não poluir a FASE 0):

- macOS com brew: `brew install --cask obsidian`
- Linux: link direto pra obsidian.md/download (AppImage ou Flatpak)

### 0.6 — Gate final

Após 0.2-0.4, rode novamente `uv --version && uv run --python 3.11 python --version` pra confirmar. Se ainda falhar por algum motivo (permissão, rede, SO não suportado), **PARE e peça ajuda ao usuário** mostrando o erro exato — não tente workarounds criativos.

### 0.7 — Reportar

Mande um parágrafo curto (≤4 linhas) resumindo:

- Stack detectada (Next.js + Convex, Python + FastAPI, etc.)
- Pré-reqs: `uv X.Y` · Python 3.11+ ✓
- Obsidian: instalado/não instalado
- Se instalou algo automaticamente, mencione em 1 linha: _"Instalei `uv` automaticamente."_

Só depois disso, prossiga pra FASE 1.

---

## FASE 1 — Bundle de decisões (AskUserQuestion único, 4 perguntas)

**P1 — LLM provider** (header: "LLM provider")

- `Gemini Flash + embedding (Recomendado)` — `gemini-2.5-flash` + `gemini-embedding-001`. Env: `GOOGLE_API_KEY`.
- `OpenAI` — `gpt-4o-mini` + `text-embedding-3-small`. Env: `OPENAI_API_KEY`.
- `Anthropic + Voyage` — `claude-haiku-4-5` + `voyage-3`. Envs: `ANTHROPIC_API_KEY`, `VOYAGE_API_KEY`.
- `Ollama local` — `qwen2.5-coder:7b` + `nomic-embed-text`. Sem API key, lento.

**P2 — Scope** (header: "Scope")

- `Código + docs + config (Recomendado)`
- `Apenas docs + schemas`
- `Tudo + histórico git`

**P3 — Vault path** (header: "Vault path")

- `docs/knowledge-graph/ no repo (Recomendado)`
- `Pasta externa ~/Obsidian/<repo>-kg/`
- `Adicionar a vault Obsidian existente`

**P4 — Git strategy** (header: "Git strategy")

- `Versionar markdown, gitignore storage (Recomendado)`
- `Gitignorar tudo`

Armazene como `PROVIDER`, `SCOPE`, `VAULT_MODE`, `GIT_MODE`.

---

## FASE 2 — Coleta condicional

Pergunte só o que faltar:

- **API key** (se provider ≠ Ollama e env não está em `.env.local`) — opções: `Vou colar agora` | `Já está em .env.local`
- **Vault path absoluto** (se VAULT_MODE ≠ no repo)
- **Autonomy** (header: "Autonomy") — `Me pergunte antes de indexar (Recomendado)` | `Rode tudo sem confirmar`

---

## FASE 3 — Scaffold do pacote Python

### Estrutura

```
tools/lightrag/
├── pyproject.toml
├── .gitignore         # rag_storage/, .venv/, .index_manifest.json, __pycache__/
├── README.md
├── lightrag_kg/
│   ├── __init__.py
│   ├── config.py
│   ├── llm.py         # provider-specific wrapper (gera conforme PROVIDER)
│   ├── rag.py         # singleton LightRAG
│   ├── index.py       # CLI kg-index
│   ├── server.py      # MCP server stdio
│   ├── to_obsidian.py # CLI kg-to-obsidian
│   └── cli.py         # ⬅️ NOVO: CLI unificado `rag` com subcomandos
└── tests/test_smoke.py
```

### Detalhes críticos (lições de produção — NÃO ignorar)

1. **Batch insert obrigatório.** `await rag.ainsert([t1, t2, ...], ids=[...], file_paths=[...])` — nunca loop sequencial por arquivo.
2. **Paralelismo explícito no construtor:**
   ```python
   LightRAG(
       llm_model_max_async=8,
       max_parallel_insert=6,     # default 2 é MUITO lento
       embedding_batch_num=32,
       chunk_token_size=1200,
       chunk_overlap_token_size=100,
   )
   ```
3. **Slugify robusto** (barras ANTES de stripar):
   ```python
   def slugify(text):
       text = text.strip().lower()
       text = re.sub(r"[/\\]", "-", text)
       text = re.sub(r"[^a-z0-9\s_-]", "", text)
       text = re.sub(r"\s+", "-", text)
       text = re.sub(r"-+", "-", text).strip("-_")
       return (text[:180] if text else "unknown")
   ```
4. **Wrap de conteúdo** antes de inserir: `f"FILE: {rel}\nLANG: {lang}\n---\n{content}"`
5. **Doc ID determinístico:** `f"doc-{sha1(rel_path.encode()).hexdigest()[:12]}"`
6. **Manifest incremental** em `.index_manifest.json` com `{path: sha1(bytes)[:16]}`.
7. **Fallbacks de modelo** via tentativa→cache (ex: Gemini 2.5-flash → 1.5-flash; embedding-001 → text-embedding-004).
8. **Retry com tenacity** em `429/500/503/504/UNAVAILABLE`.
9. **Obsidian export:** usa `file_path` (não `source_id`) pra "Appears in". Split `<SEP>`. Communities via `louvain_communities(seed=42)`.
10. **MCP server expõe APENAS 3 tools:** `kg_query`, `kg_insert_text`, `kg_stats`. Nunca exponha reindex/export (seriam caros se Claude chamasse por engano).

### `pyproject.toml` com DUAS entradas de CLI (kg-\* low-level + rag unified)

```toml
[project]
name = "lightrag-kg"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "lightrag-hku>=1.4.0",
    "python-dotenv>=1.0.0",
    "mcp>=1.2.0",
    "rich>=13.0.0",
    "networkx>=3.0",
    "numpy>=1.26",
    "tenacity>=8.0",
    "nano-vectordb>=0.0.4",
    "aiofiles>=23.0",
    "tiktoken>=0.7",
    "pipmaster>=0.0.20",
    # + UM provider:
    # "google-genai>=1.0.0" | "openai>=1.50.0" |
    # "anthropic>=0.40.0" + "voyageai>=0.3" | "ollama>=0.4"
]

[project.scripts]
# Low-level (usado pelo MCP e pelos hooks)
kg-server      = "lightrag_kg.server:main"
kg-index       = "lightrag_kg.index:main"
kg-to-obsidian = "lightrag_kg.to_obsidian:main"

# High-level CLI unificado pro usuário final
rag            = "lightrag_kg.cli:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["lightrag_kg"]
```

### Implementação do CLI `rag` (`lightrag_kg/cli.py`)

Use `argparse` com subparsers. Subcomandos obrigatórios:

```python
# rag search "<termo>"       — hybrid query com síntese + citações (DEFAULT)
# rag ask "<pergunta>"       — alias pra search
# rag chunks "<termo>"       — naive mode (só vector search, sem síntese)
# rag local "<termo>"        — local mode (vizinhança de entidades)
# rag global "<termo>"       — global mode (comunidades/temas)
# rag stats                  — JSON com entities/relations/docs
# rag top [N=20]             — top-N entidades por degree
# rag find "<entidade>"      — procura entidade no grafo (substring match)
# rag show "<entidade>"      — mostra nota completa da entidade + vizinhos
# rag index [--full|--dry-run|--incremental]  — delega pra kg-index
# rag export [--clean]       — delega pra kg-to-obsidian
# rag insert "<texto>" [--source LABEL]       — ad-hoc insert
# rag shell                  — REPL interativo: linha → query → resposta, loop
# rag mcp-check              — verifica se o MCP está registrado em .mcp.json
```

Comportamento:

- **Default ergonomics:** `rag search "X"` deve ser a experiência principal — escreve resposta em markdown no stdout com citações de arquivo clicáveis (usa `rich.markdown.Markdown`).
- **Pretty output:** `rich.print` pra tudo. `stats`/`top` mostram tabelas `rich.table`.
- **JSON mode:** flag global `--json` em qualquer comando pra output machine-readable.
- **`rag shell`:** aceita comandos `/local X`, `/global X`, `/stats`, `/exit`. Default é hybrid search. Use `prompt_toolkit` se disponível, senão `input()`.
- **`rag mcp-check`:** lê `.mcp.json` na raiz do repo, verifica se tem entry `lightrag` apontando pra `tools/lightrag`, e tenta importar `lightrag_kg.server`. Imprime ✓/✗ por item.

Estrutura mínima:

```python
import argparse, asyncio, json, sys
from rich.console import Console
from rich.markdown import Markdown
from rich.table import Table
from . import rag as rag_mod, config

console = Console()

async def cmd_search(args):
    mode = args.mode
    ans = await rag_mod.query(args.term, mode=mode)
    if args.json:
        print(json.dumps({"mode": mode, "answer": ans}))
    else:
        console.print(Markdown(ans))

async def cmd_stats(args):
    info = await rag_mod.stats()
    if args.json:
        print(json.dumps(info, indent=2))
    else:
        t = Table(title="LightRAG stats")
        for k, v in info.items():
            t.add_row(k, str(v))
        console.print(t)

# ... top, find, show, shell, mcp-check, etc.

def main():
    p = argparse.ArgumentParser(prog="rag")
    p.add_argument("--json", action="store_true", help="machine-readable output")
    sub = p.add_subparsers(dest="cmd", required=True)
    # search/ask/chunks/local/global
    for name, mode in [("search", "hybrid"), ("ask", "hybrid"),
                       ("chunks", "naive"), ("local", "local"), ("global", "global")]:
        sp = sub.add_parser(name)
        sp.add_argument("term", nargs="+")
        sp.set_defaults(func=cmd_search, mode=mode)
    # stats, top, find, show
    sub.add_parser("stats").set_defaults(func=cmd_stats)
    # ... resto
    args = p.parse_args()
    if hasattr(args, "term"): args.term = " ".join(args.term)
    asyncio.run(args.func(args))
```

### ⚠️ REGISTRO DO MCP — Use `.mcp.json`, NÃO `.claude/settings.local.json`

O Claude Code lê MCP project-scoped de `.mcp.json` na raiz do repo. `.claude/settings.local.json` NÃO funciona pra MCP (é pra permissões/hooks).

**Ação:**

1. Leia `.mcp.json` se existir. Se não existir, crie com estrutura `{"mcpServers": {}}`.
2. Faça **merge-safe**: preserve entries existentes (supabase, railway, convex, etc.).
3. Adicione:
   ```json
   "lightrag": {
     "command": "uv",
     "args": [
       "run",
       "--project",
       "<ABSOLUTE_PATH>/tools/lightrag",
       "kg-server"
     ]
   }
   ```
   Use caminho ABSOLUTO resolvido via `git rev-parse --show-toplevel`, não relativo — o Claude Code pode spawnar o server de outro cwd.
4. Se encontrar `.claude/settings.local.json` com `mcpServers` dentro, **remova essa chave** (deixa o resto do arquivo se tiver outras configs). Avise o usuário se fizer essa limpeza.

### Trust dialog

Avise o usuário: "Ao reiniciar o Claude Code, aparecerá um dialog **'Trust this .mcp.json?'** — aceite."

### Include/exclude adaptados ao stack

- **Node/Next/React:** `app/**/*.{ts,tsx}`, `components/**`, `pages/**`, `lib/**`, `src/**/*.{ts,tsx}`
- **Python:** `src/**/*.py`, `<pkg>/**/*.py`
- **Rust:** `src/**/*.rs`, `Cargo.toml`
- **Go:** `**/*.go`, `go.mod`
- **Convex:** `convex/**/*.ts` (exclui `convex/_generated/**`)
- **Prisma:** `prisma/schema.prisma`
- **Sempre:** `*.md` raiz + `docs/**/*.md` + configs principais
- **Exclua sempre:** `node_modules`, `.next`, `dist`, `build`, `.git`, `target`, `__pycache__`, `.venv`, `tests`, `__tests__`, `*-generated`, `_generated`, binários, `.lock`, `.tsbuildinfo`, `tools/lightrag/**`, `<vault_path>/**`.

---

## FASE 4 — Validação e execução

1. `uv sync --project tools/lightrag` — isso cria o `.venv` local e instala **TODAS** as deps Python automaticamente (LightRAG, SDK do provider escolhido, MCP, rich, networkx, etc.). Narração: _"Instalando LightRAG e dependências num venv isolado (~30s, sem prompts)."_
2. **Probe do provider:** chama wrapper LLM com "reply OK" e embed com `["probe"]`. Reporta modelos resolvidos. Fallback automático em 404.
3. `uv run --project tools/lightrag kg-index --dry-run` — plano.
4. Se AUTONOMY=pergunte: confirma custo. Senão, segue.
5. `kg-index --full` em **background com `run_in_background=true`** + `Monitor` polando `kv_store_doc_status.json` a cada 45s, emitindo `total=N processed=X processing=Y pending=Z failed=W`.
   - ⚠️ `failed` com `error_msg: 'Content already exists'` = duplicata, não é erro real.
   - Throughput com `max_parallel_insert=6`: ~8-15s/doc. 100 arquivos = ~15-25min.
6. Após terminar: `kg-to-obsidian --clean`.
7. Validação:
   - Contar entidades/sources/communities no vault.
   - Rodar `rag stats` e mostrar output.
   - Rodar `rag search "explique o projeto em 2 frases"` e mostrar a resposta.
8. **`rag mcp-check`** — validação final do MCP:
   - `.mcp.json` existe com entry `lightrag` ✓
   - Caminho absoluto aponta pra `tools/lightrag/` ✓
   - `uv run --project <path> kg-server --help` não crasha (ou importa `lightrag_kg.server`) ✓

---

## FASE 5 — Entrega final

Devolva:

**1. Resumo** (≤10 bullets):

- Arquivos criados (paths)
- Provider + modelos resolvidos
- Entities / relations / communities
- Custo real
- Tempo de indexação

**2. Como usar o CLI `rag`** (diga isso textualmente pro usuário no final):

> **Método recomendado — ative o venv do projeto** (zero config, funciona imediato):
>
> ```bash
> source tools/lightrag/.venv/bin/activate
> ```
>
> A partir desse ponto, nesse terminal, o comando `rag` está disponível puro:
>
> ```bash
> rag search "como funciona X"     # hybrid (síntese com citações)
> rag ask    "explique Y"          # alias de search
> rag local  "Z"                   # vizinhança de entidades
> rag global "tema"                # comunidades/temas
> rag chunks "termo"               # só vector search (sem síntese)
>
> rag stats                        # contagem do grafo
> rag top 20                       # top entidades conectadas
> rag find   "Asaas"               # procura entidade por nome
> rag show   "AsaasWebhook"        # detalhes completos + vizinhos
>
> rag shell                        # REPL interativo
>                                  #   /local /global /chunks /stats
>                                  #   /top /find /show /exit
>
> rag insert "decisão: usar Zod" --source chat-YYYY-MM-DD
> rag mcp-check                    # valida .mcp.json + grafo
>
> rag index  --incremental         # re-indexar modificados
> rag index  --full                # rebuild total (usa tokens)
> rag export --clean               # re-sync Obsidian
> ```
>
> Quando terminar, rode `deactivate` — ou simplesmente feche o terminal.
>
> **Importante:** só ative o venv quando estiver trabalhando neste projeto. Se você `cd` pra outro repo e esquecer o venv ativo, o `rag` continua apontando pra este aqui. Sempre cheque com `which rag` em caso de dúvida.
>
> **Atalho:** todo comando aceita `--json` pra output machine-readable (útil em pipelines): `rag stats --json | jq .entities`.
>
> **Alternativa — sem ativar venv** (mais verboso, mas global):
>
> ```bash
> uv run --project tools/lightrag rag search "termo"
> ```
>
> **Alternativa avançada — alias permanente** (só se usar muito em um projeto específico):
>
> ```bash
> # adicionar ao ~/.zshrc ou ~/.bashrc
> alias rag='<ABS_PROJECT_ROOT>/tools/lightrag/.venv/bin/rag'
> ```
>
> ⚠️ Cuidado: alias global aponta pra ESTE projeto mesmo se você estiver em outro repo — pode gerar confusão.

**3. Checklist Obsidian** (markdown `- [ ]`):

- Abrir: `open "obsidian://open?path=<abs-path>"` (se macOS + Obsidian instalado)
- Senão: obsidian.md → "Open folder as vault" → path absoluto
- Trust author
- `Cmd+G` Graph View
- Filter `path:entities/`
- Verificar cores por `entity_type` em Groups
- Top entity do INDEX.md → clicar → seguir wikilinks

**4. Ativar MCP no Claude Code:**

- [ ] Fechar sessão atual e abrir Claude Code **nova** nesta pasta
- [ ] Aceitar dialog "Trust this .mcp.json?"
- [ ] Abrir menu MCP (comando `/mcp` ou equivalente) — confirmar que `lightrag · ✓ connected` aparece em "Project MCPs"
- [ ] Testar: _"Use kg_stats"_ ou _"Use kg_query: como funciona o sistema de X?"_

**5. Comandos de manutenção:**

```bash
rag index                  # incremental (cents)
rag index --full           # rebuild total
rag export --clean         # re-sync Obsidian
```

---

## Regras de ouro

- MCP vai em **`.mcp.json`** (project root), NÃO em `.claude/settings.local.json`.
- Use caminho **absoluto** no `args.--project` (Claude Code pode mudar cwd).
- **NUNCA** committe `.env.local`, `rag_storage/`, `.index_manifest.json`.
- **NUNCA** exponha `kg-index`/`rag index`/`kg-to-obsidian` como tools MCP.
- **SEMPRE** merge-safe: preserve entries MCP existentes no `.mcp.json`.
- Priorize **`source tools/lightrag/.venv/bin/activate`** como instrução default na entrega final. Só mencione alias permanente como opção avançada — alias global pode apontar pro projeto errado quando o user troca de repo.
- **Noob-friendly por default:** assuma que o usuário NUNCA usou Python/uv/MCP antes. Auto-instale pré-reqs (uv, Python) sem pedir. Narre cada instalação em 1 frase humana (_"Vou instalar X — leva 10s"_) ANTES de executar. Nunca mande "você precisa instalar X" como bloqueio — instale se puder.
- Se algo quebrar fora do esperado, **PARE e pergunte** — não chute.
- Use `AskUserQuestion` sempre que surgir ambiguidade fora das fases.

Comece pela FASE 0.
