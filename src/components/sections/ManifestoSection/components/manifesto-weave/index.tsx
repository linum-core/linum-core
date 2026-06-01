"use client";

import { useRef, useEffect, useCallback } from "react";
import { useStringSound } from "../../hooks/useStringSound";

interface LineConfig {
  id: string;
  d: string;
  gradient: string;
  strokeWidth: number;
  opacity: number;
  soundIndex: 0 | 1 | 2 | 3;
  offsetMult: number;
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
const N_POINTS = 200;

interface ManifestoWeaveProps {
  progress: number;
}

interface PhysicsState {
  disp: Float32Array;
  vel: Float32Array;
  baseX: Float32Array;
  baseY: Float32Array;
  tangentX: Float32Array;
  tangentY: Float32Array;
}

interface Ripple {
  x: number;
  y: number;
  maxR: number;
  alpha: number;
  color: string;
  t: number;
}

export function ManifestoWeave({ progress }: ManifestoWeaveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pluck } = useStringSound();

  const pathRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null]);

  const physicsRef = useRef<PhysicsState[]>(
    LINES.map(() => ({
      disp: new Float32Array(N_POINTS),
      vel: new Float32Array(N_POINTS),
      baseX: new Float32Array(N_POINTS),
      baseY: new Float32Array(N_POINTS),
      tangentX: new Float32Array(N_POINTS),
      tangentY: new Float32Array(N_POINTS),
    }))
  );

  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const lastTriggerRef = useRef<Map<number, number>>(new Map());
  const nearRef = useRef<boolean[]>([false, false, false, false]);
  const nearTouchRef = useRef<boolean[]>([false, false, false, false]);

  const sampleBasePaths = useCallback(() => {
    physicsRef.current.forEach((state, i) => {
      const pathEl = pathRefs.current[i];
      if (!pathEl) return;
      const len = pathEl.getTotalLength();
      for (let j = 0; j < N_POINTS; j++) {
        const s = (j / (N_POINTS - 1)) * len;
        const pt = pathEl.getPointAtLength(s);
        state.baseX[j] = pt.x;
        state.baseY[j] = pt.y;
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

  const triggerString = useCallback(
    (lineIdx: number, t: number, amplitude: number) => {
      const now = performance.now();
      const last = lastTriggerRef.current.get(lineIdx) ?? 0;
      if (now - last < 120) return;
      lastTriggerRef.current.set(lineIdx, now);

      const state = physicsRef.current[lineIdx];
      const center = Math.floor(t * (N_POINTS - 1));
      for (let d = -5; d <= 5; d++) {
        const idx = center + d;
        if (idx < 0 || idx >= N_POINTS) continue;
        state.disp[idx] += amplitude * Math.exp(-(d * d) / 8);
      }

      pluck(LINES[lineIdx].soundIndex, t);

      const svgEl = svgRef.current;
      const canvas = canvasRef.current;
      if (!svgEl || !canvas) return;
      const rect = svgEl.getBoundingClientRect();
      const bx = state.baseX[center];
      const by = state.baseY[center];
      const sx = (bx / 1200) * rect.width;
      const sy = (by / 600) * rect.height;
      const color = lineIdx === 0 || lineIdx === 2 ? "rgba(74,122,184," : "rgba(194,59,59,";
      for (let r = 0; r < 4; r++) {
        ripplesRef.current.push({ x: sx, y: sy, maxR: 80, alpha: 0.55, color, t: performance.now() });
      }
    },
    [pluck]
  );

  const animate = useCallback(() => {
    // tensioned string: faster wave speed, quicker decay, less oscillation
    const C = 0.55;
    const DAMP = 0.994;
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d") ?? null;

    physicsRef.current.forEach((state, lineIdx) => {
      const { disp, vel, baseX, baseY, tangentX, tangentY } = state;
      for (let i = 1; i < N_POINTS - 1; i++) {
        vel[i] += C * C * (disp[i - 1] + disp[i + 1] - 2 * disp[i]);
        vel[i] *= DAMP;
      }
      for (let i = 0; i < N_POINTS; i++) {
        disp[i] += vel[i];
      }
      disp[0] = 0;
      disp[N_POINTS - 1] = 0;

      const pathEl = pathRefs.current[lineIdx];
      if (!pathEl) return;
      let d = `M ${(baseX[0] - disp[0] * tangentY[0]).toFixed(2)} ${(baseY[0] + disp[0] * tangentX[0]).toFixed(2)}`;
      for (let i = 1; i < N_POINTS; i++) {
        const nx = baseX[i] - disp[i] * tangentY[i];
        const ny = baseY[i] + disp[i] * tangentX[i];
        d += ` L ${nx.toFixed(2)} ${ny.toFixed(2)}`;
      }
      pathEl.setAttribute("d", d);
    });

    if (ctx2d && canvas) {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      ripplesRef.current = ripplesRef.current.filter((rp) => {
        const elapsed = (now - rp.t) / 600;
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 1200;
      const my = ((e.clientY - rect.top) / rect.height) * 600;

      physicsRef.current.forEach((state, lineIdx) => {
        const ci = Math.max(0, Math.min(N_POINTS - 1, Math.round((mx / 1200) * (N_POINTS - 1))));
        const lineY = state.baseY[ci];
        const dist = Math.abs(my - lineY);
        const THRESHOLD = 18;

        if (dist < THRESHOLD && !nearRef.current[lineIdx]) {
          nearRef.current[lineIdx] = true;
          const t = ci / (N_POINTS - 1);
          const amp = LINES[lineIdx].strokeWidth > 1 ? 10 : 6;
          triggerString(lineIdx, t, amp);
        } else if (dist >= THRESHOLD) {
          nearRef.current[lineIdx] = false;
        }
      });
    },
    [triggerString]
  );

  const handleMouseLeave = useCallback(() => {
    nearRef.current = [false, false, false, false];
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const touch = e.touches[0];
      const mx = ((touch.clientX - rect.left) / rect.width) * 1200;
      const my = ((touch.clientY - rect.top) / rect.height) * 600;

      physicsRef.current.forEach((state, lineIdx) => {
        const ci = Math.max(0, Math.min(N_POINTS - 1, Math.round((mx / 1200) * (N_POINTS - 1))));
        const lineY = state.baseY[ci];
        const dist = Math.abs(my - lineY);
        const THRESHOLD = 25;

        if (dist < THRESHOLD && !nearTouchRef.current[lineIdx]) {
          nearTouchRef.current[lineIdx] = true;
          const t = ci / (N_POINTS - 1);
          const amp = LINES[lineIdx].strokeWidth > 1 ? 10 : 6;
          triggerString(lineIdx, t, amp);
        }
      });
    },
    [triggerString]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const touch = e.touches[0];
      const mx = ((touch.clientX - rect.left) / rect.width) * 1200;
      const my = ((touch.clientY - rect.top) / rect.height) * 600;

      physicsRef.current.forEach((state, lineIdx) => {
        const ci = Math.max(0, Math.min(N_POINTS - 1, Math.round((mx / 1200) * (N_POINTS - 1))));
        const lineY = state.baseY[ci];
        const dist = Math.abs(my - lineY);
        const THRESHOLD = 25;

        if (dist < THRESHOLD && !nearTouchRef.current[lineIdx]) {
          nearTouchRef.current[lineIdx] = true;
          const t = ci / (N_POINTS - 1);
          const amp = LINES[lineIdx].strokeWidth > 1 ? 10 : 6;
          triggerString(lineIdx, t, amp);
        } else if (dist >= THRESHOLD) {
          nearTouchRef.current[lineIdx] = false;
        }
      });
    },
    [triggerString]
  );

  const handleTouchEnd = useCallback(() => {
    nearTouchRef.current = [false, false, false, false];
  }, []);

  const offset = (1 - progress) * DASHARRAY;

  return (
    <div className="manifesto__weave" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ pointerEvents: "auto" }}
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
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={line.d}
            stroke={line.gradient}
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={DASHARRAY}
            strokeDashoffset={offset * line.offsetMult}
          />
        ))}

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

      <canvas ref={canvasRef} className="manifesto__ripple-canvas" />
    </div>
  );
}
