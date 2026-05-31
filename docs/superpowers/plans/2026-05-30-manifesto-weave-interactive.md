# Manifesto Weave — Animação Interativa de Cordas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar a section Manifesto com SVG corrigido (viewBox 1200×600, gradientes, dot pulsante), física de vibração de corda ao mouse, ondas visuais sonoras e som via Web Audio API.

**Architecture:** O SVG é extraído para um componente `ManifestoWeave` dedicado que usa `requestAnimationFrame` + arrays de deslocamento por linha para física de onda 1D. Um canvas overlay renderiza arcos expandindo no trigger. Web Audio API sintetiza sons de harpa com pitch variando pela posição X do mouse.

**Tech Stack:** React 18, TypeScript, SVG, Canvas 2D API, Web Audio API, Framer Motion (já instalado), Playwright (testes)

---

## File Map

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/components/sections/ManifestoSection/components/manifesto-weave/index.tsx` | CRIAR | SVG + canvas + física + interação |
| `src/components/sections/ManifestoSection/hooks/useStringSound.ts` | CRIAR | Web Audio API synth, 4 tons |
| `src/components/sections/ManifestoSection/index.tsx` | MODIFICAR | Substituir SVG inline por `<ManifestoWeave>` |
| `app/design.css` (linhas 1108–1138) | MODIFICAR | Pointer events, canvas overlay, reduced motion |
| `src/libs/i18n/messages/pt-BR.json` | MODIFICAR | Corrigir tokens[8] accent + attrib |
| `src/libs/i18n/messages/en.json` | MODIFICAR | Corrigir attrib |
| `src/libs/i18n/messages/es.json` | MODIFICAR | Corrigir attrib |
| `tests/visual/homepage.spec.ts` | MODIFICAR | Adicionar manifesto ao array de sections testadas |

---

## Task 1: Corrigir i18n — tokens e attrib

**Files:**
- Modify: `src/libs/i18n/messages/pt-BR.json`
- Modify: `src/libs/i18n/messages/en.json`
- Modify: `src/libs/i18n/messages/es.json`

- [ ] **Step 1: Corrigir pt-BR.json**

Localizar bloco `"manifesto"` e aplicar as duas correções:

```json
"manifesto": {
  "eyebrow": "Manifesto · I",
  "quote": "Existe uma conexão não percebida. Nós a construímos — não criando sistemas, mas restaurando conexões.",
  "attrib": "Gabriel Gomes · Fundador",
  "tokens": [
    { "t": "Não construímos" },
    { "t": "apenas sistemas," },
    { "t": "mas sim" },
    { "t": "a" },
    { "t": "linha invisível", "c": "accent" },
    { "t": "que existe antes" },
    { "t": "do código" },
    { "t": "e que realiza" },
    { "t": "as verdadeiras" },
    { "t": "conexões.", "c": "accent" }
  ]
},
```

Mudanças: `attrib` (remover `"— "` e `", Linum Core"`), `tokens[8]` (remover `"c": "accent"`).

- [ ] **Step 2: Corrigir en.json**

```json
"attrib": "Gabriel Gomes · Founder",
```

Tokens en.json já estão corretos (`tokens[7]` "the true" sem accent).

- [ ] **Step 3: Corrigir es.json**

```json
"attrib": "Gabriel Gomes · Fundador",
```

Tokens es.json já estão corretos (`tokens[7]` "las verdaderas" sem accent).

- [ ] **Step 4: Commit**

```bash
git add src/libs/i18n/messages/pt-BR.json src/libs/i18n/messages/en.json src/libs/i18n/messages/es.json
git commit -m "fix(i18n): align manifesto tokens and attrib with design reference"
```

---

## Task 2: Criar hook `useStringSound`

**Files:**
- Create: `src/components/sections/ManifestoSection/hooks/useStringSound.ts`

- [ ] **Step 1: Criar o arquivo do hook**

```typescript
// src/components/sections/ManifestoSection/hooks/useStringSound.ts
"use client";

import { useRef, useCallback } from "react";

// Frequências base (harpa): thick-blue, thick-red, thin-blue, thin-red
const BASE_FREQS = [220, 293, 440, 587] as const;

export function useStringSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  /**
   * Toca o som de uma corda.
   * @param lineIndex 0=blue-thick 1=red-thick 2=blue-thin 3=red-thin
   * @param position 0→1 da esquerda para direita da linha (modula pitch ±20%)
   */
  const pluck = useCallback((lineIndex: 0 | 1 | 2 | 3, position: number) => {
    const ctx = getCtx();
    const baseFreq = BASE_FREQS[lineIndex];
    // position 0 = -20%, position 1 = +20%
    const freq = baseFreq * (0.8 + position * 0.4);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Envelope: ataque instantâneo, decay longo como harpa
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.95);
  }, [getCtx]);

  return { pluck };
}
```

- [ ] **Step 2: Verificar TypeScript sem erros**

```bash
cd '/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio' && npx tsc --noEmit 2>&1 | grep -i "useStringSound\|hooks" | head -10
```

Esperado: nenhuma linha com erro.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ManifestoSection/hooks/useStringSound.ts
git commit -m "feat(manifesto): add useStringSound hook — harp synthesis via Web Audio API"
```

---

## Task 3: Criar componente `ManifestoWeave` — SVG base com gradientes

**Files:**
- Create: `src/components/sections/ManifestoSection/components/manifesto-weave/index.tsx`

Esta task cria apenas o SVG estático com gradientes e scroll reveal. A física de corda vem na Task 4.

- [ ] **Step 1: Criar o componente com SVG corrigido**

```typescript
// src/components/sections/ManifestoSection/components/manifesto-weave/index.tsx
"use client";

import { useRef, useEffect, useCallback } from "react";
import { useStringSound } from "../../hooks/useStringSound";

// Definição de cada linha: path SVG, cor, grossura, índice de som
interface LineConfig {
  id: string;
  d: string;                // path base
  gradient: string;
  strokeWidth: number;
  opacity: number;
  soundIndex: 0 | 1 | 2 | 3;
  offsetMult: number;       // multiplicador do dashoffset (finas = 1.1)
}

const LINES: LineConfig[] = [
  {
    id: "blue-thick",
    d: "M 0 300 C 200 200, 400 400, 600 300 S 1000 200, 1200 300",
    gradient: "url(#weave-blue)",
    strokeWidth: 1.5,
    opacity: 1,
    soundIndex: 0,
    offsetMult: 1,
  },
  {
    id: "red-thick",
    d: "M 0 300 C 200 400, 400 200, 600 300 S 1000 400, 1200 300",
    gradient: "url(#weave-red)",
    strokeWidth: 1.5,
    opacity: 1,
    soundIndex: 1,
    offsetMult: 1,
  },
  {
    id: "blue-thin",
    d: "M 0 280 C 200 180, 400 380, 600 280 S 1000 180, 1200 280",
    gradient: "url(#weave-blue)",
    strokeWidth: 0.7,
    opacity: 0.5,
    soundIndex: 2,
    offsetMult: 1.1,
  },
  {
    id: "red-thin",
    d: "M 0 320 C 200 420, 400 220, 600 320 S 1000 420, 1200 320",
    gradient: "url(#weave-red)",
    strokeWidth: 0.7,
    opacity: 0.5,
    soundIndex: 3,
    offsetMult: 1.1,
  },
];

const DASHARRAY = 3000;
const N_POINTS = 200; // pontos de amostragem por linha para física

interface ManifestoWeaveProps {
  progress: number; // 0→1 do useSectionProgress
}

export function ManifestoWeave({ progress }: ManifestoWeaveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pluck } = useStringSound();

  // Refs para paths SVG (atualizados no RAF sem re-render)
  const pathRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null]);

  // Estado de física: displacement e velocity arrays por linha
  const physicsRef = useRef(
    LINES.map(() => ({
      disp: new Float32Array(N_POINTS),
      vel: new Float32Array(N_POINTS),
      // Pontos base amostrados do path (preenchidos no mount)
      baseX: new Float32Array(N_POINTS),
      baseY: new Float32Array(N_POINTS),
      tangentX: new Float32Array(N_POINTS),
      tangentY: new Float32Array(N_POINTS),
    }))
  );

  // Ripple effects para canvas
  const ripplesRef = useRef<
    Array<{ x: number; y: number; r: number; maxR: number; alpha: number; color: string; t: number }>
  >([]);

  const rafRef = useRef<number>(0);
  const lastMousePos = useRef<{ lineIdx: number; t: number } | null>(null);

  // Amostrar pontos base dos paths SVG
  const sampleBasePaths = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    physicsRef.current.forEach((state, i) => {
      const pathEl = pathRefs.current[i];
      if (!pathEl) return;
      const len = pathEl.getTotalLength();
      for (let j = 0; j < N_POINTS; j++) {
        const s = (j / (N_POINTS - 1)) * len;
        const pt = pathEl.getPointAtLength(s);
        state.baseX[j] = pt.x;
        state.baseY[j] = pt.y;
        // Tangente via diferença central
        const s1 = Math.max(0, s - 1);
        const s2 = Math.min(len, s + 1);
        const p1 = pathEl.getPointAtLength(s1);
        const p2 = pathEl.getPointAtLength(s2);
        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const tLen = Math.hypot(tx, ty) || 1;
        state.tangentX[j] = tx / tLen;
        state.tangentY[j] = ty / tLen;
      }
    });
  }, []);

  // Aplica impulso de corda em posição normalizada t (0→1)
  const triggerString = useCallback(
    (lineIdx: number, t: number, amplitude: number) => {
      const state = physicsRef.current[lineIdx];
      const center = Math.floor(t * (N_POINTS - 1));
      // Gaussiana de largura 4 pontos
      for (let d = -5; d <= 5; d++) {
        const idx = center + d;
        if (idx < 0 || idx >= N_POINTS) continue;
        state.disp[idx] += amplitude * Math.exp(-(d * d) / 8);
      }
      // Som
      pluck(LINES[lineIdx].soundIndex, t);

      // Adicionar ripples visuais
      const baseX = state.baseX[center];
      const baseY = state.baseY[center];
      const svgEl = svgRef.current;
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const sx = (baseX / 1200) * rect.width;
      const sy = (baseY / 600) * rect.height;
      const color = lineIdx === 0 || lineIdx === 2 ? "rgba(74,122,184," : "rgba(194,59,59,";
      for (let dir = 0; dir < 4; dir++) {
        ripplesRef.current.push({ x: sx, y: sy, r: 0, maxR: 80, alpha: 0.55, color, t: performance.now() });
      }
    },
    [pluck]
  );

  // Loop RAF — física + reconstrução de path + canvas
  const animate = useCallback(() => {
    const C = 0.45;   // velocidade de onda
    const DAMP = 0.997; // amortecimento por frame
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d") ?? null;

    physicsRef.current.forEach((state, lineIdx) => {
      const { disp, vel, baseX, baseY, tangentX, tangentY } = state;
      // Equação de onda 1D
      const newVel = vel.slice();
      for (let i = 1; i < N_POINTS - 1; i++) {
        newVel[i] += C * C * (disp[i - 1] + disp[i + 1] - 2 * disp[i]);
        newVel[i] *= DAMP;
      }
      for (let i = 0; i < N_POINTS; i++) {
        disp[i] += newVel[i];
        vel[i] = newVel[i];
      }
      // Extremidades fixas
      disp[0] = 0;
      disp[N_POINTS - 1] = 0;

      // Reconstruir SVG path
      const pathEl = pathRefs.current[lineIdx];
      if (!pathEl) return;
      let d = `M ${baseX[0] - disp[0] * tangentY[0]} ${baseY[0] + disp[0] * tangentX[0]}`;
      for (let i = 1; i < N_POINTS; i++) {
        const nx = baseX[i] - disp[i] * tangentY[i];
        const ny = baseY[i] + disp[i] * tangentX[i];
        d += ` L ${nx.toFixed(2)} ${ny.toFixed(2)}`;
      }
      pathEl.setAttribute("d", d);
    });

    // Canvas ripples
    if (ctx2d && canvas) {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      ripplesRef.current = ripplesRef.current.filter((rp) => {
        const elapsed = (now - rp.t) / 600; // 0→1 em 600ms
        if (elapsed >= 1) return false;
        const r = rp.maxR * elapsed;
        const alpha = rp.alpha * (1 - elapsed);
        ctx2d.beginPath();
        ctx2d.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx2d.strokeStyle = `${rp.color}${alpha.toFixed(2)})`;
        ctx2d.lineWidth = 1;
        ctx2d.stroke();
        return true;
      });
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    sampleBasePaths();
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sampleBasePaths, animate]);

  // Resize canvas ao tamanho do container
  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;
    const ro = new ResizeObserver(() => {
      const { width, height } = svg.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    });
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  // Detecção de mouse próximo a um path
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      // Converter para coordenadas SVG (1200×600)
      const mx = ((e.clientX - rect.left) / rect.width) * 1200;
      const my = ((e.clientY - rect.top) / rect.height) * 600;

      physicsRef.current.forEach((state, lineIdx) => {
        const { baseX, baseY } = state;
        // Amostra a cada 5 pontos para eficiência
        for (let i = 0; i < N_POINTS; i += 5) {
          const dx = mx - baseX[i];
          const dy = my - baseY[i];
          const dist = Math.hypot(dx, dy);
          if (dist < 12) {
            const t = i / (N_POINTS - 1);
            const prevKey = `${lineIdx}-${Math.floor(i / 10)}`;
            if (lastMousePos.current?.lineIdx !== lineIdx || Math.abs((lastMousePos.current?.t ?? -1) - t) > 0.05) {
              const amp = LINES[lineIdx].strokeWidth > 1 ? 18 : 10;
              triggerString(lineIdx, t, amp);
              lastMousePos.current = { lineIdx, t };
            }
            break;
          }
        }
      });
    },
    [triggerString]
  );

  // Touch (mobile: touchmove sobre a linha)
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const touch = e.touches[0];
      const mx = ((touch.clientX - rect.left) / rect.width) * 1200;
      const my = ((touch.clientY - rect.top) / rect.height) * 600;

      physicsRef.current.forEach((state, lineIdx) => {
        const { baseX, baseY } = state;
        for (let i = 0; i < N_POINTS; i += 5) {
          const dx = mx - baseX[i];
          const dy = my - baseY[i];
          if (Math.hypot(dx, dy) < 20) {
            const t = i / (N_POINTS - 1);
            const amp = LINES[lineIdx].strokeWidth > 1 ? 18 : 10;
            triggerString(lineIdx, t, amp);
            break;
          }
        }
      });
    },
    [triggerString]
  );

  const offset = (1 - progress) * DASHARRAY;

  return (
    <div className="manifesto__weave" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <defs>
          <linearGradient id="weave-blue" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0" stopColor="#6FA3D2" stopOpacity="0" />
            <stop offset="0.25" stopColor="#6FA3D2" stopOpacity="0.9" />
            <stop offset="0.75" stopColor="#6FA3D2" stopOpacity="0.9" />
            <stop offset="1" stopColor="#6FA3D2" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="weave-red" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0" stopColor="#FF6B6B" stopOpacity="0" />
            <stop offset="0.25" stopColor="#FF6B6B" stopOpacity="0.9" />
            <stop offset="0.75" stopColor="#FF6B6B" stopOpacity="0.9" />
            <stop offset="1" stopColor="#FF6B6B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {LINES.map((line, i) => (
          <path
            key={line.id}
            ref={(el) => { pathRefs.current[i] = el; }}
            d={line.d}
            stroke={line.gradient}
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={DASHARRAY}
            strokeDashoffset={offset * line.offsetMult}
            className={`manifesto-path manifesto-path--${line.id}`}
          />
        ))}

        {/* Pulsing dot na interseção — visível quando progress > 0.5 */}
        <circle
          cx="600"
          cy="300"
          r="3"
          fill="#FF6B6B"
          opacity={Math.min(Math.max(progress * 1.6 - 0.5, 0), 1)}
        >
          <animate attributeName="r" values="3;5;3" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Canvas para ripple effects */}
      <canvas ref={canvasRef} className="manifesto__ripple-canvas" />
    </div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript sem erros**

```bash
cd '/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio' && npx tsc --noEmit 2>&1 | grep "manifesto-weave\|ManifestoWeave\|useStringSound" | head -20
```

Esperado: nenhuma linha.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ManifestoSection/components/manifesto-weave/ src/components/sections/ManifestoSection/hooks/
git commit -m "feat(manifesto): add ManifestoWeave component with string physics and Web Audio"
```

---

## Task 4: Atualizar `ManifestoSection/index.tsx` — usar ManifestoWeave

**Files:**
- Modify: `src/components/sections/ManifestoSection/index.tsx`

- [ ] **Step 1: Substituir SVG inline pelo componente**

Substituir o arquivo inteiro por:

```typescript
"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { useSectionProgress } from "@/src/libs/animation/hooks/useSectionProgress";
import { ManifestoQuote } from "./components/manifesto-quote";
import { ManifestoWeave } from "./components/manifesto-weave";

export function ManifestoSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useReveal();
  const progress = useSectionProgress(sectionRef);

  const [wordProgress, setWordProgress] = useState(0);
  const quoteScrollRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = quoteScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const raw = (start - r.top) / (start - end);
      setWordProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rawTokens = t.raw("manifesto.tokens");
  const tokens: Array<{ t: string; c?: string }> = Array.isArray(rawTokens)
    ? rawTokens
    : [];

  return (
    <section className="manifesto" id="manifesto" ref={sectionRef}>
      <ManifestoWeave progress={progress} />

      <div className="container-narrow manifesto__inner">
        <div className="eyebrow manifesto__eyebrow reveal">{t("manifesto.eyebrow")}</div>

        <div ref={quoteRef as React.RefObject<HTMLDivElement>}>
          <div ref={quoteScrollRef}>
            <ManifestoQuote tokens={tokens} wordProgress={wordProgress} />
          </div>
        </div>

        <div className="manifesto__attrib reveal">{t("manifesto.attrib")}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar TypeScript sem erros**

```bash
cd '/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio' && npx tsc --noEmit 2>&1 | grep "ManifestoSection" | head -10
```

Esperado: nenhuma linha.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ManifestoSection/index.tsx
git commit -m "feat(manifesto): replace inline SVG with ManifestoWeave component"
```

---

## Task 5: Atualizar CSS — pointer events e canvas overlay

**Files:**
- Modify: `app/design.css` (linhas 1108–1140)

- [ ] **Step 1: Localizar e atualizar bloco `.manifesto__weave`**

Substituir de `.manifesto__weave {` até `.manifesto__weave .w-thin {` (linhas 1108–1138):

```css
.manifesto__weave {
  position: absolute;
  inset: 0;
  pointer-events: auto;   /* habilita interação com as linhas */
  z-index: 0;
}
.manifesto__weave svg {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  cursor: crosshair;
}
.manifesto__weave path {
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 3000;
  stroke-dashoffset: var(--off, 3000);
  transition: stroke-dashoffset 0.1s linear;
}
.manifesto__ripple-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .manifesto__ripple-canvas {
    display: none;
  }
  .manifesto__weave svg {
    /* Scroll reveal ainda funciona; vibração e ripples desativados */
    transition: none;
  }
}
```

Remover as classes `.w-blue`, `.w-red`, `.w-thin` — as cores agora vêm via `stroke="url(#weave-blue/red)"` no SVG diretamente.

- [ ] **Step 2: Verificar no dev server que o manifesto renderiza**

```bash
cd '/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio' && npm run dev &
sleep 5
curl -s http://localhost:3000/pt-BR | grep -c "manifesto"
```

Esperado: número > 0 (manifesto presente no HTML).

- [ ] **Step 3: Commit**

```bash
git add app/design.css
git commit -m "fix(manifesto/css): enable pointer events, add canvas overlay styles, reduced motion"
```

---

## Task 6: Teste Playwright — manifesto section

**Files:**
- Modify: `tests/visual/homepage.spec.ts`

- [ ] **Step 1: Adicionar manifesto ao array de sections**

```typescript
const sections = ['hero', 'manifesto', 'portfolio', 'about', 'competencies', 'feedbacks', 'contact']
```

- [ ] **Step 2: Adicionar teste de interação com linha**

Adicionar ao final de `homepage.spec.ts`:

```typescript
test.describe('Manifesto — weave interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt-BR')
    await page.waitForLoadState('networkidle')
  })

  test('manifesto section has SVG weave', async ({ page }) => {
    const svg = page.locator('#manifesto svg')
    await expect(svg).toBeAttached()
  })

  test('weave SVG has 4 paths', async ({ page }) => {
    const paths = page.locator('#manifesto svg path')
    await expect(paths).toHaveCount(4)
  })

  test('canvas ripple element is present', async ({ page }) => {
    const canvas = page.locator('#manifesto canvas.manifesto__ripple-canvas')
    await expect(canvas).toBeAttached()
  })

  test('attrib shows correct text', async ({ page }) => {
    await page.locator('#manifesto').scrollIntoViewIfNeeded()
    const attrib = page.locator('.manifesto__attrib')
    await expect(attrib).toContainText('Gabriel Gomes')
  })
})
```

- [ ] **Step 3: Rodar testes**

```bash
cd '/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio' && npx playwright test tests/visual/homepage.spec.ts --reporter=line 2>&1 | tail -20
```

Esperado: todos passando.

- [ ] **Step 4: Commit**

```bash
git add tests/visual/homepage.spec.ts
git commit -m "test(manifesto): add Playwright tests for weave SVG and interaction elements"
```

---

## Task 7: Verificação final no browser

- [ ] **Step 1: Iniciar dev server e abrir manifesto**

```bash
cd '/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio' && npm run dev
```

Navegar para `http://localhost:3000/pt-BR` e scrollar até o manifesto.

- [ ] **Step 2: Checklist visual**

Verificar:
- [ ] Linhas aparecem progressivamente com o scroll (2 grossas + 2 finas)
- [ ] Cores: azul para `weave-blue`, vermelho para `weave-red` com fade nas extremidades
- [ ] Pulsing dot aparece quando seção está 50%+ visível
- [ ] Passar mouse sobre linha → vibração de corda visível
- [ ] Ondas circulares expandindo ao vibrar
- [ ] Som toca ao vibrar (requer clique primeiro para desbloquer AudioContext)
- [ ] Linhas 0 e 2 (azuis): tons mais graves / mais agudos conforme posição X
- [ ] `attrib` mostra "Gabriel Gomes · Fundador" (não mais "— Gabriel Gomes, Linum Core")
- [ ] "as verdadeiras" não está em itálico/gradiente
- [ ] Mobile (touch): arrastar sobre linha → vibração + som

- [ ] **Step 3: Verificar `prefers-reduced-motion`**

No DevTools → Rendering → Emulate CSS media → `prefers-reduced-motion: reduce`. Confirmar que canvas ripples somem mas o texto ainda revela.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat(manifesto): complete interactive weave — string physics, sound, ripple effects"
```
