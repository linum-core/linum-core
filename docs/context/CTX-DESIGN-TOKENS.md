# CTX: Design Tokens — Linum Core Portfolio

> Reference file for all agents. These are the canonical design values for the project.

## Project
- **Name:** Linum Core Portfolio
- **Owner:** Gabriel Gomes (CEO)
- **Tagline:** "Existe uma conexão não percebida… Nós construímos ela"
- **Contact:** ggvgabriel05@gmail.com | github.com/GgvGomes
- **Base path:** `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`

## Colors

> **STALE WARNING RESOLVED:** Previous documentation listed a gold + cyan palette that was never implemented. The live palette is navy + crimson, implemented in `globals.css` since May 2026.

### Semantic Aliases (reference these in component code)

```css
/* Reference design layer — maps to canonical tokens below */
--bg:         var(--bg-1);         /* default background */
--fg:         var(--ink-1);        /* default foreground text */
--fg-mute:    var(--ink-2);        /* secondary text */
--fg-quiet:   var(--ink-3);        /* tertiary text, subtle */
--accent-blue:  var(--blue-3);     /* interactive elements, focus states */
--accent-red:   var(--red-2);      /* destructive actions, warnings */
```

### Canonical Token Scale

| Layer | Token | Hex | Usage |
|-------|-------|-----|-------|
| **Background** | `--bg-0` | `#08090c` | Deepest, least-used bg |
| | `--bg-1` | `#0b0d10` | Default bg, body |
| | `--bg-2` | `#12151a` | Card, elevated containers |
| | `--bg-3` | `#1a1f28` | Hover state, secondary |
| **Text/Ink** | `--ink-0` | `#f4f6fb` | Primary text, headings |
| | `--ink-1` | `#e6eaf0` | Default body text |
| | `--ink-2` | `#aab3c0` | Secondary text, labels |
| | `--ink-3` | `#6b7480` | Tertiary, disabled, quiet |
| **Accent Blue** | `--blue-1` | `#1e2a38` | Dark context, backgrounds |
| | `--blue-2` | `#2f4f6f` | Primary brand accent |
| | `--blue-3` | `#4a7ab8` | Interactive focus, hover |
| | `--blue-4` | `#6fa3d2` | Light accent, secondary |
| **Accent Red** | `--red-1` | `#8a1f1f` | Dark context, backgrounds |
| | `--red-2` | `#c23b3b` | Primary brand accent, destructive |
| | `--red-3` | `#ff6b6b` | Light accent, secondary |
| **Rules/Borders** | `--rule` | `rgba(232,236,244,0.08)` | Subtle dividers |
| | `--rule-2` | `rgba(232,236,244,0.16)` | Stronger dividers |

### Gradients

```css
--brand-grad:      linear-gradient(90deg, var(--blue-2), var(--red-2));
--brand-grad-soft: linear-gradient(135deg, rgba(47,79,111,0.4), rgba(194,59,59,0.35));
```

## Typography

| Role | Font Family | Source | Weights | Usage |
|------|-------------|--------|---------|-------|
| **Display/editorial** | Playfair Display | `@next/font/google` | 400, 500, 600, 700 | h1, h2, large headings, feature text |
| **Mono display** | Cinzel | `@next/font/google` | 400, 700 | Decorative headings, emphasis, special styling |
| **Body text** | Inter | `@next/font/google` | 400, 500, 600 | Paragraphs, labels, interface text |
| **Code** | JetBrains Mono | `@next/font/google` | 400, 600 | `<code>`, `<pre>`, code blocks |

```css
/* In globals.css :root */
--font-display:        var(--font-playfair), "Cormorant Garamond", "EB Garamond", serif;
--font-serif:          var(--font-playfair), serif;
--font-mono-display:   var(--font-cinzel), "Trajan Pro", serif;
--font-sans:           var(--font-inter), -apple-system, sans-serif;
--font-mono:           var(--font-jetbrains), "Fira Code", monospace;

/* In globals.css @theme */
--font-heading:        var(--font-cinzel), serif;
--font-editorial:      var(--font-playfair), "Cormorant Garamond", serif;
--font-body:           var(--font-inter), sans-serif;
--font-code:           var(--font-jetbrains), "Fira Code", monospace;
```

### Font Sizes & Line Heights

| Scale | Size | Line Height | Context |
|-------|------|-------------|---------|
| **Display** | 56–72px | 1.1–1.2 | Hero, h1, statements |
| **h1** | 48px | 1.2 | Section headings, major emphasis |
| **h2** | 36px | 1.3 | Subsection headings |
| **h3** | 28px | 1.4 | Content grouping headings |
| **Body** | 16px | 1.6 | Default paragraph, interface |
| **Small** | 14px | 1.5 | Labels, captions, help text |
| **Tiny** | 12px | 1.4 | Metadata, timestamps, inline notes |

## Font Sizes

```
h1:    48px  / lh 1.2
h2:    36px  / lh 1.3
h3:    28px  / lh 1.4
body:  16px  / lh 1.6
small: 14px  / lh 1.5
```

## Spacing Scale (Phase 1 addition)

```css
/* In globals.css :root and @theme (as --spacing-* for Tailwind) */
--space-1:  4px;     --spacing-1:  4px;
--space-2:  8px;     --spacing-2:  8px;
--space-3:  12px;    --spacing-3:  12px;
--space-4:  16px;    --spacing-4:  16px;
--space-5:  24px;    --spacing-5:  24px;
--space-6:  32px;    --spacing-6:  32px;
--space-7:  48px;    --spacing-7:  48px;
--space-8:  64px;    --spacing-8:  64px;
--space-9:  96px;    --spacing-9:  96px;
--space-10: 128px;   --spacing-10: 128px;
```

Use in CSS: `padding: var(--space-4)`, `margin: var(--space-6)`, etc. Always use these tokens instead of hardcoded pixel values.

## Z-index Scale (Phase 1 addition)

```css
/* In globals.css :root */
--z-below:    -1;    /* elements behind default */
--z-base:      0;    /* default stacking context */
--z-raised:   10;    /* slightly elevated elements */
--z-dropdown: 20;    /* dropdown menus, popovers */
--z-sticky:   30;    /* sticky headers, toolbars */
--z-fixed:    40;    /* fixed positioning overlays */
--z-overlay:  50;    /* modal backdrops, lightboxes */
--z-modal:    60;    /* modal dialogs */
--z-toast:    70;    /* notification toasts */
--z-tooltip:  80;    /* tooltips, context popups */
```

Use in CSS: `z-index: var(--z-modal)`. Never hardcode z-index values.

## Breakpoints (Tailwind v4 defaults, override in @theme if needed)

```
sm:   640px   mobile upper
md:   768px   tablet start
lg:   1024px  desktop start
xl:   1280px  wide
2xl:  1536px  ultra
```

## Shadows & Effects

### Glow Tokens (for interactive elements)

```css
/* In globals.css :root */
--glow-blue:  0 0 30px rgba(74,122,184,0.45), 0 0 60px rgba(74,122,184,0.18);
--glow-red:   0 0 30px rgba(194,59,59,0.4), 0 0 60px rgba(194,59,59,0.15);
```

### Animations (keyframes in globals.css)

| Name | Duration | Curve | Use case |
|------|----------|-------|----------|
| `glow-pulse` | 2s | ease-in-out | Blue interactive glow (infinite alternate) |
| `red-pulse` | 2s | ease-in-out | Red accent glow (infinite alternate) |
| `float` | 4s | ease-in-out | Floating elements (infinite) |
| `cube-rotate` | 15s | linear | 3D rotation effect (infinite) |
| `scroll-bounce` | 1.5s | ease-in-out | Scroll indicator bounce (infinite) |
| `shimmer` | 2.5s | linear | Loading skeleton pulse (infinite) |
| `fade-in-up` | 0.5s | ease-out | Entry animation (forwards) |

### Glassmorphism

```css
backdrop-filter: blur(20px);
background: rgba(11, 13, 16, 0.6);
border: 1px solid rgba(232, 236, 244, 0.08);
```

### Easing & Duration Tokens (new in Phase 1)

```css
/* In globals.css :root and @theme */
--ease-out:       cubic-bezier(0.0, 0, 0.2, 1);    /* exit animations */
--ease-in:        cubic-bezier(0.4, 0, 1, 1);      /* enter animations */
--ease-inout:     cubic-bezier(0.4, 0, 0.2, 1);    /* interactive changes */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* playful motion */

--duration-fast:  150ms;   /* micro-interactions, state changes */
--duration-base:  250ms;   /* default transition speed */
--duration-slow:  400ms;   /* deliberate, attention-drawing */
--duration-xslow: 600ms;   /* background ambient motion */

--transition-base:       all var(--duration-base) var(--ease-out);
--transition-color:      color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out);
--transition-transform:  transform var(--duration-base) var(--ease-out);
```

## Logo Assets (already in /public/assets/)

```
/public/assets/linum-core-logo.svg               — full logo
/public/assets/linum-core-logo-escrita.svg        — logo + text (use in Header)
/public/assets/linum-core-logo-preto.svg          — black version
/public/assets/linum-core-logo-sem-escrita.svg    — icon only (use in Footer)
/public/assets/Frame.png                          — CEO photo reference
```
