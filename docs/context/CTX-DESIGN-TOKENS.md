# CTX: Design Tokens — Linum Core Portfolio

> Reference file for all agents. These are the canonical design values for the project.

## Project
- **Name:** Linum Core Portfolio
- **Owner:** Gabriel Gomes (CEO)
- **Tagline:** "Existe uma conexão não percebida… Nós construímos ela"
- **Contact:** ggvgabriel05@gmail.com | github.com/GgvGomes
- **Base path:** `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`

## Colors

```css
/* In globals.css @theme block — Tailwind v4 syntax */
--color-primary:          #1a1a1a;   /* dark background */
--color-primary-dark:     #0f0f0f;   /* deepest bg */
--color-primary-light:    #2a2a2a;   /* card bg */
--color-secondary:        #d4af37;   /* gold — headings, emphasis, luxury */
--color-secondary-dark:   #c9a227;   /* gold dark */
--color-secondary-light:  #e8c547;   /* gold light */
--color-accent:           #00d9ff;   /* cyan — interactive, CTA, links */
--color-accent-dark:      #00b8d4;   /* cyan dark */
--color-accent-light:     #33e5ff;   /* cyan light */
--color-neutral-100:      #ffffff;
--color-neutral-200:      #f5f5f5;
--color-neutral-300:      #e0e0e0;
--color-neutral-500:      #808080;
--color-neutral-700:      #333333;
--color-neutral-900:      #000000;
```

## Typography

| Role | Font | Google Fonts? | Weights |
|------|------|--------------|---------|
| Headlines (h1–h3) | Cinzel | ✅ yes | 400, 600, 700 |
| Subtitles | Jomolhari | ✅ yes | 400 |
| Body text | Inter | ✅ yes | 400, 500, 600 |
| Code | Fira Code | ✅ yes | 400, 500 |

```css
--font-heading:  'Cinzel', serif;
--font-subtitle: 'Jomolhari', serif;
--font-body:     'Inter', sans-serif;
--font-code:     'Fira Code', monospace;
```

## Font Sizes

```
h1:    48px  / lh 1.2
h2:    36px  / lh 1.3
h3:    28px  / lh 1.4
body:  16px  / lh 1.6
small: 14px  / lh 1.5
```

## Breakpoints (Tailwind v4 defaults, override in @theme if needed)

```
sm:   640px   mobile upper
md:   768px   tablet start
lg:   1024px  desktop start
xl:   1280px  wide
2xl:  1536px  ultra
```

## Shadows & Effects

```css
/* Glow animation — for interactive borders */
@keyframes glow-pulse {
  from { box-shadow: 0 0 5px #00d9ff40; }
  to   { box-shadow: 0 0 20px #00d9ff80, 0 0 40px #00d9ff40; }
}

/* Gold glow variant */
@keyframes gold-pulse {
  from { box-shadow: 0 0 5px #d4af3740; }
  to   { box-shadow: 0 0 20px #d4af3780, 0 0 40px #d4af3740; }
}

/* macOS glass */
backdrop-filter: blur(20px);
background: rgba(26, 26, 26, 0.6);
border: 1px solid rgba(212, 175, 55, 0.2);
```

## Logo Assets (already in /public/assets/)

```
/public/assets/linum-core-logo.svg               — full logo
/public/assets/linum-core-logo-escrita.svg        — logo + text (use in Header)
/public/assets/linum-core-logo-preto.svg          — black version
/public/assets/linum-core-logo-sem-escrita.svg    — icon only (use in Footer)
/public/assets/Frame.png                          — CEO photo reference
```
