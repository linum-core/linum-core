# Implementation Log — linum-core-portifolio

Registro cronológico de tudo implementado. Referência rápida para retomar trabalho ou onboarding.

---

## Header Redesign (2026-05-30)

**Objetivo:** Redesenhar o header com glassmorphism, novos componentes e identidade visual.

### Componentes criados

| Arquivo | Responsabilidade |
|---|---|
| `src/components/layout/header/index.tsx` | Componente principal do header com glassmorphism |
| `src/components/layout/header/styles.css` | Estilos do header (backdrop-filter, gradientes, animações) |
| `src/components/layout/header/components/nav-lang-dropdown/index.tsx` | Seletor de idioma com bandeiras e label |
| `src/components/layout/header/components/nav-lang-dropdown/styles.css` | Estilos do dropdown de idioma |
| `src/components/layout/header/components/nav-social-icons/index.tsx` | Ícones de redes sociais (GitHub, LinkedIn, etc.) |
| `src/components/layout/header/components/nav-social-icons/styles.css` | Estilos dos ícones sociais |
| `src/components/layout/header/components/nav-status/index.tsx` | Badge de status do projeto (disponível/em projeto) |
| `src/components/layout/header/components/nav-status/styles.css` | Estilos do badge com animação de ring e gradiente |
| `src/components/layout/header/components/side-logo/index.tsx` | Logo lateral com tagline |

### Features implementadas
- Glassmorphism: `backdrop-filter: blur(12px)` com fundo semitransparente
- Nav links animados com underline reveal on hover
- Language dropdown com bandeira + label do idioma atual
- Badge `NavStatus` com dois estados: "Disponível" / "Em Projeto" — anel animado pulsando
- Botão de contato com ícone de telefone e animação de swing no hover
- Logo com versão colorida invertida e tamanho aumentado
- Responsividade: items ocultos em mobile, menu hamburguer pendente (TODO)

### i18n adicionado
- `contact_cta`: "Entrar em Contato" / "Get in Touch" / "Ponerse en Contacto"
- `nav.waitlist`: strings de status em PT, EN, ES

---

## Manifesto Section — Weave Interativo (2026-05-30)

**Objetivo:** Redesenhar a section Manifesto com animação SVG de linhas entrelaçadas, física de cordas, ondas visuais e síntese de som (harpa).

### Commits
```
a09d343  test(manifesto): add Playwright tests for weave SVG and interaction elements
944a1ac  fix(manifesto/css): enable pointer events, add canvas overlay, reduced motion
75c07a8  feat(manifesto): replace inline SVG with ManifestoWeave component
c91f50f  feat(manifesto): add ManifestoWeave component with string physics and Web Audio
9501f40  fix(manifesto): fix AudioContext resume promise and cleanup leak in useStringSound
875f02f  feat(manifesto): add useStringSound hook — harp synthesis via Web Audio API
550ccf3  fix(i18n): align manifesto tokens and attrib with design reference
```

### Arquivos criados/modificados

| Arquivo | Ação | Descrição |
|---|---|---|
| `src/components/sections/ManifestoSection/hooks/useStringSound.ts` | CRIADO | Web Audio API — síntese de harpa |
| `src/components/sections/ManifestoSection/components/manifesto-weave/index.tsx` | CRIADO | Animação SVG interativa completa |
| `src/components/sections/ManifestoSection/index.tsx` | MODIFICADO | Substituiu SVG inline pelo `ManifestoWeave` |
| `app/design.css` | MODIFICADO | pointer-events, canvas overlay, reduced-motion |
| `src/libs/i18n/messages/pt-BR.json` | MODIFICADO | attrib + tokens[8] alinhados ao design ref |
| `src/libs/i18n/messages/en.json` | MODIFICADO | attrib corrigido |
| `src/libs/i18n/messages/es.json` | MODIFICADO | attrib corrigido |
| `tests/visual/homepage.spec.ts` | MODIFICADO | Testes Playwright para weave e interação |

### Arquitetura técnica

#### `useStringSound`
- `AudioContext` criado lazy na primeira interação (evita autoplay policy)
- `async resume()` com await (fix Safari)
- Oscilador triangle wave — timbre suave tipo harpa
- Frequências base: 220 Hz (A3), 293 Hz (D4), 440 Hz (A4), 587 Hz (D5)
- Envelope: attack 5ms, decay exponencial para 0.9s
- Pitch varia ±20% pela posição X do mouse (0→1 ao longo da linha)
- Cleanup: `AudioContext.close()` no unmount

#### `ManifestoWeave`
**SVG:**
- `viewBox="0 0 1200 600"` com `preserveAspectRatio="none"`
- 4 linhas: thick blue, thick red, thin blue, thin red
- `strokeWidth`: 1.5 (thick), 0.7 (thin)
- Gradientes `weave-blue` (#6FA3D2) e `weave-red` (#FF6B6B): fade 0→0.9→0.9→0 em 0/25/75/100%
- `strokeDashoffset` controlado por `useSectionProgress` — reveal via scroll
- `offsetMult: 1.1` para thin lines (reveal ligeiramente atrasado)
- Pulsing dot: `<circle cx="600" cy="300" r="3">` com `<animate r="3;5;3" dur="2.4s">`

**Física de cordas (1D wave equation):**
- 200 pontos amostrados via `getTotalLength` / `getPointAtLength`
- Arrays `Float32Array` para performance: `disp`, `vel`, `baseX`, `baseY`, `tangentX`, `tangentY`
- Equação por frame: `vel[i] += C² * (disp[i-1] + disp[i+1] - 2*disp[i]); vel[i] *= 0.997`
- Deslocamento perpendicular à tangente: `x - disp * tangentY`, `y + disp * tangentX`
- Extremos fixos: `disp[0] = disp[N-1] = 0`
- Amplitude: 18px (thick), 10px (thin)
- Throttle: 120ms por linha (evita triggers excessivos)

**Canvas overlay (ondas visuais):**
- `ResizeObserver` mantém canvas sincronizado com dimensões do SVG
- 4 arcos por trigger, `maxR: 80`, duração 600ms
- Cor: `rgba(74,122,184,α)` azul, `rgba(194,59,59,α)` vermelho
- Filtrado por `elapsed >= 1` a cada frame

**Interação:**
- Desktop: `onMouseMove` — proximidade < 12px
- Mobile: `onTouchMove` — proximidade < 20px

**Acessibilidade:**
- `@media (prefers-reduced-motion: reduce)`: canvas oculto, transitions desabilitadas
- `aria-hidden="true"` no container `.manifesto__weave`

#### i18n corrigido
| Campo | Antes | Depois |
|---|---|---|
| `manifesto.attrib` (PT) | "— Gabriel Gomes, Linum Core" | "Gabriel Gomes · Fundador" |
| `manifesto.attrib` (EN) | "— Gabriel Gomes, Linum Core" | "Gabriel Gomes · Founder" |
| `manifesto.attrib` (ES) | "— Gabriel Gomes, Linum Core" | "Gabriel Gomes · Fundador" |
| `manifesto.tokens[8]` (PT) | `{ t: "as verdadeiras", c: "accent" }` | `{ t: "as verdadeiras" }` |

---

## Setup Inicial (2026-05-30 — earlier)

### Design System
- `app/design.css`: sistema de tokens completo com OKLCH, tipografia, espaçamento, gradientes
- `DESIGN.md`: documentação do sistema visual (cores, escala, componentes)
- Preloader com logo animada (40vw)

### Configuração Next.js + Vercel
- `vercel.json`: variáveis de ambiente e configuração de build
- `next.config.ts`: `next-intl` integrado, suporte a PT-BR / EN / ES
- Middleware: matcher incluindo `.*\\..*` para assets estáticos (evita redirect 404)

### Testes Playwright
- `playwright.config.ts`: config com baseURL `localhost:3000`
- `tests/visual/homepage.spec.ts`: testes de seções visíveis + overflow responsivo + manifesto weave

### Governança (linum-govern)
- `.claude/linum-govern/`: sistema de governança para planejar antes de implementar
- Workflow: `/plan` → review → `/govern approve` → `/build`

---

## Pendências (TODOs)

Referência: `docs/TODOs.md`

- [ ] Header: ajustar tamanho logo, padronizar items, glassmorphism, responsividade mobile
- [ ] Manifesto: testar interação no browser (animação de corda funcionando)
- [ ] Hero: animação 3D + fluxo de conexão de fio (SVG mãos)
- [ ] Competências: ícones melhores
- [ ] Sobre CEO: seções Técnicas / Front-end / Backend / Relacionais
- [ ] Contato: redesenho
- [ ] Portfolio: conectar GitHub + desenhos de arquitetura
- [ ] Projetos pessoais do CEO: nlw-ai-mastery, tree-link, bomb-stopwatch, youtube-transcription, roullet-tv
- [ ] Copy: revisão geral
- [ ] CSS: mover estilos para arquivos de componentes (fora do design.css global)
- [ ] Motion: explorar motionsites.ai
- [ ] Impeccable: `/impeccable critique` → `/impeccable audit` → `/impeccable polish`
- [ ] Claude permissions: não pedir permissão para arquivos em `src/` e `app/`
