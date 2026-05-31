# Header — Mapa de Implementação

> Documento de referência para implementações e manutenções futuras no header do Linum Core.

---

## Estrutura de Arquivos

```
src/components/layout/header/
├── index.tsx                          ← Orquestrador principal
├── styles.css                         ← Animação hover dos nav links
└── components/
    ├── side-logo/
    │   └── index.tsx                  ← Logo + tagline (i18n)
    ├── nav-status/
    │   ├── index.tsx                  ← Indicador de disponibilidade
    │   └── styles.css                 ← Glassmorphism + gradient border + ring animation
    ├── nav-lang-dropdown/
    │   ├── index.tsx                  ← Seletor de idioma com hover dropdown
    │   └── styles.css                 ← Pill trigger + glassmorphism dropdown
    └── nav-social-icons/
        ├── index.tsx                  ← LinkedIn + Instagram
        └── styles.css                 ← Ícones 34×34px com hover sutil
```

Estilos globais do nav (brand-mark, contact button, animações) vivem em `app/design.css`.

---

## Anatomia do Header

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo + Tagline]   [Home] [Manifesto] [Work] [Founder] [Practice]          │
│                                    [Status] [Lang▾] [in] [ig] [📞 Contact]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Zonas

| Zona | Classe | Conteúdo |
|------|--------|----------|
| Esquerda | `.nav__brand` | `SideLogo` — logo SVG + texto "Linum·Core" + tagline i18n |
| Centro | `.nav__links` | 5 links de âncora com animação split-line |
| Direita | `.nav__right` | `NavStatus` → `NavLangDropdown` → `NavSocialIcons` → botão contato |

---

## Componentes

### `Header` (index.tsx)

**Estado:**
- `scrolled: boolean` — adiciona classe `.is-scrolled` ao `<nav>` quando `window.scrollY > 8`
- `activeSection: Enum_Sections` — seção visível no viewport (via `IntersectionObserver`)

**Seções observadas pelo IntersectionObserver:**
```ts
[HERO, MANIFESTO, PORTFOLIO, CEO, COMPETENCIES]
// threshold: 0.3 | rootMargin: "-20% 0px -50% 0px"
```

**Links de navegação (ordem):**
```ts
[HERO, MANIFESTO, PORTFOLIO, CEO, COMPETENCIES]
// keys em en.json: nav.home, nav.manifesto, nav.portfolio, nav.ceo, nav.competencies
```

**Botão de contato:** scroll para `Enum_Sections.CONTACT` com `scrollIntoView({ behavior: 'smooth' })`.

---

### `SideLogo`

- **Logo:** `/assets/logo-colors-inverted.svg` — 62×62px (versão colorida invertida, desenhada para fundos escuros)
- **Tagline:** `{t("nav.tagline")}` → "Connecting essences" / "Conectando essências" / "Conectando esencias"
- **Estrutura:**
  ```tsx
  <a className="nav__brand" href="#hero">
    <span className="nav__brand-mark"><img ... /></span>
    <span className="nav__brand-word">
      Linum<span className="nav__brand-dot">·</span>Core
      <small>{t("nav.tagline")}</small>
    </span>
  </a>
  ```
- **CSS relevante em design.css:** `.nav__brand-mark` é apenas `display: flex; align-items: center; justify-content: center` — sem border ou background.

---

### `NavStatus`

**Propósito:** indicador de disponibilidade do estúdio para novos projetos.

**Para alternar status:** mudar constante em `nav-status/index.tsx:8`:
```ts
const PROJECT_STATUS: ProjectStatus = 'accepting'; // ou 'waitlist'
```

**Variantes:**

| Variante | Classe | Cor | Texto i18n |
|----------|--------|-----|------------|
| Aceitando projetos | `nav__status--accepting` | `#5eead4` (teal) | `nav.available` |
| Fila de espera | `nav__status--waitlist` | `#fbbf24` (amber) | `nav.waitlist` |

**Técnicas CSS:**
- **Gradient border:** `::before` pseudo-element com `mask-composite: exclude` (não usa `border` real)
- **Glass background:** `rgba(20,28,24,0.72)` para accepting, `rgba(28,24,16,0.72)` para waitlist
- **Dot glow:** `box-shadow: 0 0 6px 1px rgba(74,222,128,0.6)`
- **Ring animation:** `::after` no dot → `@keyframes statusRing` escala de 1→2.4 com opacity 0.7→0 em 2.4s
- **Typography:** `var(--font-mono)`, uppercase, `letter-spacing: 0.06em`, 11.5px
- **Responsive:** label oculto em ≤980px, padding reduzido para 6px 8px

---

### `NavLangDropdown`

**Idiomas suportados:** `pt-BR`, `en`, `es`

**Comportamento:**
- Abre no `onMouseEnter` do container, fecha no `onMouseLeave` ou click fora
- Usa `useLanguage()` hook de `@/src/libs/animation/hooks/useLanguage`

**Trigger (pill):**
```
[🇧🇷 Português]  ← flag emoji (16px) + label (12px font-sans)
```
- Border: `1px solid rgba(255,255,255,0.1)` + background `rgba(255,255,255,0.05)`
- Hover: background sobe para `rgba(255,255,255,0.09)`, border para `0.18`

**Dropdown:**
- `position: fixed` (escapa overflow do parent)
- Classe `.glass` aplicada (glassmorphism global do design system)
- `z-index: 200`
- Opção selecionada: `aria-selected="true"` + background `rgba(255,255,255,0.07)`

---

### `NavSocialIcons`

**Links:**
- LinkedIn: `https://linkedin.com/in/gabriel-gomes`
- Instagram: `https://instagram.com/linumcore`

**Visual:** ícones SVG 18×18px em containers 34×34px com `border-radius: 8px`. Hover mostra fundo sutil + border.

**Para adicionar nova rede:** criar novo ícone SVG como componente local, adicionar `<a>` no retorno de `NavSocialIcons`.

---

### Botão de Contato

Definido diretamente em `header/index.tsx` (não extraído em componente separado).

**Ícone:** SVG inline do telefone, 14×14px via `.nav__contact-icon`

**Animação shake no hover:**
```css
/* em app/design.css */
@keyframes phoneShake {
  0%  { transform: rotate(0deg); }
  15% { transform: rotate(-18deg); }
  30% { transform: rotate(18deg); }
  45% { transform: rotate(-14deg); }
  60% { transform: rotate(14deg); }
  75% { transform: rotate(-8deg); }
  90% { transform: rotate(8deg); }
  100%{ transform: rotate(0deg); }
}
.nav__contact-btn:hover .nav__contact-icon {
  animation: phoneShake 0.5s ease-in-out;
}
```

**Background:** `var(--brand-grad)` (gradiente da identidade visual do projeto)

---

## Nav Links — Animação Split-Line

Definida em `header/styles.css`. Dois pseudo-elementos `::before` e `::after` com `height: 1px` e gradiente `var(--blue-3) → var(--red-2)`.

No hover, `::before` sobe para `top: 2px` e `::after` desce para `top: calc(100% - 2px)`, criando o efeito "dividir ao meio".

Link ativo recebe classe `.is-active` (controlada pelo IntersectionObserver).

---

## Comportamento Responsivo

| Breakpoint | Mudança |
|-----------|---------|
| `≤980px` | `.nav__links` ocultos, `.nav__contact-btn` oculto |
| `≤980px` | `.nav__status-label` oculto (só o dot permanece) |
| `≤980px` | `.nav__status` padding reduzido para `6px 8px` |

---

## i18n — Chaves Relevantes

```json
"nav": {
  "home":        "Home",
  "manifesto":   "Manifesto",
  "portfolio":   "Work",
  "ceo":         "Founder",
  "competencies":"Practice",
  "available":   "Accepting projects",
  "waitlist":    "Projects in queue",
  "contact_cta": "Get in Touch",
  "tagline":     "Connecting essences"
}
```

Arquivos: `src/libs/i18n/messages/en.json`, `pt-BR.json`, `es.json`

---

## IDs das Seções (Enum_Sections)

```ts
// src/constants/enums.ts
HERO          = "hero"
MANIFESTO     = "manifesto"
PORTFOLIO     = "portfolio"
CEO           = "ceo"
COMPETENCIES  = "competencies"   // ← ID exato no DOM, não "comp"
CONTACT       = "contact"
```

> **Atenção:** O ID da seção Competências no DOM deve ser `id="competencies"`, não `id="comp"`. Mismatch quebra a navegação por scroll.

---

## Variáveis CSS Usadas

| Variável | Papel |
|----------|-------|
| `--font-mono` | Typography do NavStatus |
| `--font-sans` | Typography do lang dropdown |
| `--brand-grad` | Background do botão de contato |
| `--blue-3` | Gradiente dos nav links + focus rings |
| `--red-2` | Gradiente dos nav links |
| `--ink-0` | Texto em estado hover/ativo |
| `--ink-1` | Texto secundário (lang label) |
| `--ink-2` | Ícones sociais em repouso |
| `--radius` | Border radius padrão (dropdown) |

---

## Extensões Futuras

### Adicionar novo idioma
1. Criar arquivo em `src/libs/i18n/messages/<locale>.json`
2. Adicionar entrada em `FLAGS` e `LABELS` em `nav-lang-dropdown/index.tsx`
3. Adicionar na lista `LOCALES`
4. Registrar em `src/libs/i18n/routing.ts`

### Adicionar nova rede social
1. Criar SVG component em `nav-social-icons/index.tsx`
2. Adicionar `<a>` com `href`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label`

### Mudar status do estúdio
Editar linha 8 de `nav-status/index.tsx`:
```ts
const PROJECT_STATUS: ProjectStatus = 'waitlist'; // ou 'accepting'
```

### Adicionar nova seção ao nav
1. Adicionar valor em `Enum_Sections`
2. Adicionar ID correspondente na seção JSX da página
3. Adicionar ao array `sections` no IntersectionObserver (header/index.tsx:27)
4. Adicionar ao array `links` (header/index.tsx:49)
5. Adicionar chave i18n nos 3 arquivos de mensagens
