/* =========================================================
   LINUM CORE — Visual atoms v3
   Hand-drawn craft icons, ambient backgrounds, Hero3D wrapper
   ========================================================= */

/* ---------- Nav monogram (uses real logo svg shape) ---------- */
function MonogramMark({ size = 40 }) {
  return (
    <svg viewBox="0 0 100 56" width={size} height={size * 0.56} aria-hidden="true">
      <defs>
        <linearGradient id="mono-grad" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0" stopColor="#6FA3D2" />
          <stop offset="0.5" stopColor="#6FA3D2" />
          <stop offset="0.5" stopColor="#FF6B6B" />
          <stop offset="1" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      <path
        d="M 12 28 C 12 12, 32 12, 50 28 C 68 44, 88 44, 88 28 C 88 12, 68 12, 50 28 C 32 44, 12 44, 12 28 Z"
        fill="none" stroke="url(#mono-grad)" strokeWidth="1.5" />
      
      <path
        d="M 12 28 C 12 14, 32 14, 50 28 C 68 42, 88 42, 88 28 C 88 14, 68 14, 50 28 C 32 42, 12 42, 12 28 Z"
        fill="none" stroke="url(#mono-grad)" strokeWidth="0.5" opacity="0.5" />
      
    </svg>);

}

/* ---------- Hero hands+infinity artwork (matches brand-guide layout) ---------- */
function HeroArtwork() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, cx = 0, cy = 0, tx = 0, ty = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <div className="hero-art" ref={ref}>
      <div className="hero-art__halo" aria-hidden="true"></div>
      <img
        src="assets/hands-transparent.png"
        alt="Linum Core — duas mãos conectadas por fios em forma de infinito"
        className="hero-art__img"
      />
      {/* Animated thread overlay — pulses of light traversing the connection */}
      <svg className="hero-art__overlay" viewBox="0 0 800 400" aria-hidden="true">
        <defs>
          <linearGradient id="art-pulse-blue" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#6FA3D2" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#6FA3D2" stopOpacity="1"/>
            <stop offset="1" stopColor="#6FA3D2" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="art-pulse-red" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FF6B6B" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#FF6B6B" stopOpacity="1"/>
            <stop offset="1" stopColor="#FF6B6B" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path className="art-travel art-travel-blue"
              d="M 120 200 C 120 80, 280 80, 400 200 C 520 320, 680 320, 680 200 C 680 80, 520 80, 400 200 C 280 320, 120 320, 120 200"
              stroke="url(#art-pulse-blue)"/>
        <path className="art-travel art-travel-red"
              d="M 120 200 C 120 80, 280 80, 400 200 C 520 320, 680 320, 680 200 C 680 80, 520 80, 400 200 C 280 320, 120 320, 120 200"
              stroke="url(#art-pulse-red)"/>
        {/* Center meeting pulse */}
        <g transform="translate(400 200)" className="art-meet">
          <circle r="3" fill="#FF6B6B"/>
          <circle r="3" fill="none" stroke="#FF6B6B" strokeWidth="0.8" className="art-meet__ring"/>
          <circle r="3" fill="none" stroke="#6FA3D2" strokeWidth="0.8" className="art-meet__ring art-meet__ring--b"/>
        </g>
      </svg>
    </div>
  );
}

/* ---------- Hero 3D wrapper (Three.js via hero3d.js) — kept for fallback ---------- */
function Hero3D() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    let dispose;
    let cancelled = false;
    function tryMount() {
      if (cancelled) return;
      if (window.THREE && window.LinumHero3D) {
        dispose = window.LinumHero3D.mount(ref.current);
      } else {
        setTimeout(tryMount, 80);
      }
    }
    tryMount();
    return () => {
      cancelled = true;
      if (typeof dispose === "function") dispose();
    };
  }, []);
  return (
    <div className="hero__3d-wrap">
      <div className="hero__3d-canvas" ref={ref}>
        <div className="hero__3d-hint" aria-hidden="true">
          <span>Arraste para girar</span>
        </div>
      </div>
    </div>);

}

/* ---------- Brand seal — small, focused, just the mark + tagline ---------- */
function BrandSeal() {
  return (
    <div className="brand-seal">
      <img
        src="assets/linum-core-logo.png"
        alt="Linum Core"
        className="brand-seal__logo"
      />
    </div>
  );
}

/* ---------- Hero ambient bg (atmospheric noise + radial) ---------- */
function HeroAmbient() {
  return (
    <svg className="hero__bg-noise" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.9 0 0 0 0 0.94 0 0 0 0 1 0 0 0 0.45 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>);

}

/* ---------- Craft icon set — hand-drawn ink aesthetic ---------- */
/* All icons share a slight pencil-roughness via SVG filter (paper texture
   on the strokes) defined once in CraftIconDefs. */
function CraftIconDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {/* Subtle hand-drawn wobble — applied to icon strokes */}
        <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="0.9" />
        </filter>
        {/* Watercolor-like soft tint behind icons */}
        <radialGradient id="icon-tint-blue" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#6FA3D2" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6FA3D2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="icon-tint-red" cx="0.7" cy="0.7" r="0.7">
          <stop offset="0" stopColor="#FF6B6B" stopOpacity="0.30" />
          <stop offset="1" stopColor="#FF6B6B" stopOpacity="0" />
        </radialGradient>
        {/* Subtle paper grain pattern */}
        <pattern id="paper-grain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="rgba(255,255,255,0.012)" />
        </pattern>
      </defs>
    </svg>);

}

function CraftIcon({ kind }) {
  const base = {
    width: 88, height: 88, viewBox: "0 0 88 88",
    fill: "none", stroke: "currentColor",
    strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round"
  };
  const tint =
  <>
      <circle cx="44" cy="44" r="36" fill="url(#icon-tint-blue)" />
      <circle cx="44" cy="44" r="36" fill="url(#icon-tint-red)" />
    </>;

  switch (kind) {
    case "compass": // Engineering — drafting compass
      return (
        <svg {...base}>
          {tint}
          <g filter="url(#ink-rough)">
            {/* hinge knob */}
            <circle cx="44" cy="14" r="2.2" fill="currentColor" />
            <circle cx="44" cy="14" r="3.6" />
            {/* legs */}
            <path d="M 44 17 L 24 70" />
            <path d="M 44 17 L 64 70" />
            {/* pencil tip + needle */}
            <path d="M 22 73 L 26 67" strokeWidth="0.9" />
            <path d="M 24 70 L 26 73" strokeWidth="0.9" />
            <path d="M 62 73 L 66 67" strokeWidth="0.9" />
            <path d="M 64 70 L 66 73" strokeWidth="0.9" />
            {/* arc drawn by compass */}
            <path d="M 16 64 C 28 78, 60 78, 72 64" strokeWidth="0.8" strokeDasharray="1.5 2.5" opacity="0.7" />
            {/* tiny ruler tick marks */}
            <path d="M 18 80 L 22 80 M 30 80 L 34 80 M 42 80 L 46 80 M 54 80 L 58 80 M 66 80 L 70 80" strokeWidth="0.7" opacity="0.55" />
          </g>
        </svg>);

    case "lens": // Consulting → Triangulation (precise, professional)
      return (
        <svg {...base}>
          {tint}
          <g>
            {/* Triangle of measurement nodes — diagnosis, evaluation */}
            <path d="M 24 64 L 64 64 L 44 22 Z" strokeWidth="1.1" />
            {/* Inner refined triangle (echo) */}
            <path d="M 32 58 L 56 58 L 44 32 Z" strokeWidth="0.5" opacity="0.5" />
            {/* Nodes at each vertex — solid dots */}
            <circle cx="24" cy="64" r="3" fill="currentColor" />
            <circle cx="64" cy="64" r="3" fill="currentColor" />
            <circle cx="44" cy="22" r="3" fill="currentColor" />
            {/* Center crosshair (the diagnosis target) */}
            <circle cx="44" cy="50" r="1.4" fill="currentColor" opacity="0.85" />
            <path d="M 44 44 L 44 56 M 38 50 L 50 50" strokeWidth="0.6" opacity="0.7" />
          </g>
        </svg>);

    case "anchor": // Maintenance → Spirit level / equilibrium
      return (
        <svg {...base}>
          {tint}
          <g>
            {/* Horizontal level body */}
            <rect x="10" y="36" width="68" height="16" rx="2" strokeWidth="1.1" />
            {/* Bubble vial */}
            <rect x="32" y="38" width="24" height="12" rx="1.2" strokeWidth="0.8" opacity="0.7" />
            {/* The centered bubble — steady, in balance */}
            <circle cx="44" cy="44" r="3.5" strokeWidth="1.1" />
            <circle cx="44" cy="44" r="1.2" fill="currentColor" />
            {/* Tick marks on the body */}
            <path d="M 18 36 L 18 34 M 26 36 L 26 34 M 62 36 L 62 34 M 70 36 L 70 34" strokeWidth="0.7" opacity="0.65" />
            <path d="M 18 52 L 18 54 M 26 52 L 26 54 M 62 52 L 62 54 M 70 52 L 70 54" strokeWidth="0.7" opacity="0.65" />
            {/* Reference baseline */}
            <path d="M 6 64 L 82 64" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 3" />
          </g>
        </svg>);

    case "knot": // Integrations → Intersecting circles (set theory / union)
      return (
        <svg {...base}>
          {tint}
          <g>
            {/* Two clean interlocking circles — the formal symbol of union/connection */}
            <circle cx="32" cy="44" r="20" strokeWidth="1.2" />
            <circle cx="56" cy="44" r="20" strokeWidth="1.2" />
            {/* Echo rings */}
            <circle cx="32" cy="44" r="16" strokeWidth="0.5" opacity="0.4" />
            <circle cx="56" cy="44" r="16" strokeWidth="0.5" opacity="0.4" />
            {/* Center intersection point */}
            <circle cx="44" cy="44" r="2" fill="currentColor" />
            {/* Connecting axis line through both centers */}
            <path d="M 18 44 L 70 44" strokeWidth="0.5" opacity="0.35" strokeDasharray="2 3" />
          </g>
        </svg>);

    case "quill": // Product/UX → Architectural composition (square + circle + cross)
      return (
        <svg {...base}>
          {tint}
          <g>
            {/* Outer frame — the artboard */}
            <rect x="14" y="14" width="60" height="60" strokeWidth="1.1" />
            {/* Inscribed circle — golden form */}
            <circle cx="44" cy="44" r="22" strokeWidth="0.9" opacity="0.7" />
            {/* Composition grid — thirds */}
            <path d="M 14 34 L 74 34 M 14 54 L 74 54 M 34 14 L 34 74 M 54 14 L 54 74"
                  strokeWidth="0.4" opacity="0.35" />
            {/* Focal point at upper-third intersection */}
            <circle cx="54" cy="34" r="2.4" fill="currentColor" />
            <circle cx="54" cy="34" r="5" strokeWidth="0.6" opacity="0.6" />
            {/* Corner registration mark */}
            <path d="M 14 22 L 14 14 L 22 14" strokeWidth="0.8" />
          </g>
        </svg>);

    case "key": // Cloud/DevOps/Security — ornate key
      return (
        <svg {...base}>
          {tint}
          <g filter="url(#ink-rough)">
            {/* bow (ornate loop) */}
            <circle cx="22" cy="44" r="14" strokeWidth="1.2" />
            <circle cx="22" cy="44" r="10" opacity="0.5" />
            <circle cx="22" cy="44" r="3" fill="currentColor" />
            {/* shaft */}
            <path d="M 36 44 L 76 44" strokeWidth="1.3" />
            {/* teeth */}
            <path d="M 60 44 L 60 52 L 64 52 L 64 44" />
            <path d="M 70 44 L 70 50 L 74 50 L 74 44" />
            {/* filigree on bow */}
            <path d="M 14 38 C 18 36, 24 36, 30 38 M 14 50 C 18 52, 24 52, 30 50" strokeWidth="0.7" opacity="0.6" />
            <path d="M 22 32 L 22 36 M 22 52 L 22 56" strokeWidth="0.7" opacity="0.6" />
          </g>
        </svg>);

    default:
      return <svg {...base}><circle cx="44" cy="44" r="20" /></svg>;
  }
}

/* Map old kinds → new craft icons (same order as before) */
const COMP_ICONS = ["compass", "lens", "anchor", "knot", "quill", "key"];
const COMP_SIZES = ["lg", "sm", "sm", "md", "md", "lg"];

/* ---------- Card background — refined, low-noise, atmospheric ---------- */
function CompCardBg({ index }) {
  // Each card gets a soft, restrained ornament — not a tech pattern.
  // Pencil-like arcs / dots / minimal flourishes.
  const variants = [
  /* engineering — compass arcs */
  <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" key="0">
      <g transform="translate(40 60)" fill="none" stroke="#6FA3D2" strokeWidth="0.5" opacity="0.18">
        <path d="M 0 200 A 100 100 0 0 1 200 200" strokeDasharray="1 4" />
        <path d="M -20 200 A 130 130 0 0 1 220 200" strokeDasharray="1 6" opacity="0.7" />
        <path d="M -40 200 A 160 160 0 0 1 240 200" strokeDasharray="1 8" opacity="0.5" />
        <path d="M -60 200 A 190 190 0 0 1 260 200" strokeDasharray="1 10" opacity="0.35" />
        <circle cx="100" cy="200" r="1.5" fill="#FF6B6B" opacity="0.9" />
      </g>
    </svg>,
  /* consulting — radial whisper */
  <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" key="1">
      <g transform="translate(160 160)" fill="none" stroke="#6FA3D2" strokeWidth="0.4" opacity="0.18">
        {[40, 60, 90, 130, 180].map((r, i) => <circle key={i} r={r} strokeDasharray="1 5" />)}
        <circle r="3" fill="#FF6B6B" stroke="none" opacity="0.6" />
      </g>
    </svg>,
  /* maintenance — vertical pencil hatching */
  <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" key="2">
      <g stroke="#6FA3D2" strokeWidth="0.4" opacity="0.16">
        {Array.from({ length: 16 }).map((_, i) =>
      <line key={i} x1={20 + i * 20} y1="60" x2={20 + i * 20} y2="260" strokeDasharray={`${1 + i % 3} ${4 + i % 4}`} />
      )}
      </g>
    </svg>,
  /* integrations — single woven curve */
  <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" key="3">
      <g fill="none" opacity="0.25">
        <path d="M -20 160 C 60 100, 120 220, 200 160 S 360 100, 380 160" stroke="#6FA3D2" strokeWidth="0.6" />
        <path d="M -20 160 C 60 220, 120 100, 200 160 S 360 220, 380 160" stroke="#FF6B6B" strokeWidth="0.6" />
      </g>
    </svg>,
  /* product — drafting grid (very faint) */
  <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" key="4">
      <defs>
        <pattern id="draftgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#6FA3D2" strokeWidth="0.35" opacity="0.55" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#draftgrid)" opacity="0.3" />
    </svg>,
  /* devops — flowing strands */
  <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" key="5">
      <g fill="none" opacity="0.2">
        <path d="M -20 100 Q 80 80, 160 110 T 360 80" stroke="#6FA3D2" strokeWidth="0.5" />
        <path d="M -20 160 Q 80 200, 160 170 T 360 200" stroke="#6FA3D2" strokeWidth="0.5" />
        <path d="M -20 220 Q 80 240, 160 230 T 360 250" stroke="#FF6B6B" strokeWidth="0.5" />
      </g>
    </svg>];

  return <div className="comp-card__bg">{variants[index % variants.length]}</div>;
}

/* ---------- Manifesto weaving — refined, slower, more elegant ---------- */
function ManifestoWeave({ progress }) {
  const offset = (1 - progress) * 3000;
  return (
    <div className="manifesto__weave">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
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
        <path className="w-blue" style={{ "--off": offset }}
        d="M 0 300 C 200 200, 400 400, 600 300 S 1000 200, 1200 300"
        stroke="url(#weave-blue)" />
        <path className="w-red" style={{ "--off": offset }}
        d="M 0 300 C 200 400, 400 200, 600 300 S 1000 400, 1200 300"
        stroke="url(#weave-red)" />
        <path className="w-blue w-thin" style={{ "--off": offset * 1.1 }}
        d="M 0 280 C 200 180, 400 380, 600 280 S 1000 180, 1200 280" />
        <path className="w-red w-thin" style={{ "--off": offset * 1.1 }}
        d="M 0 320 C 200 420, 400 220, 600 320 S 1000 420, 1200 320" />
        <circle cx="600" cy="300" r="3" fill="#FF6B6B" opacity={Math.min(progress * 1.6, 1)}>
          <animate attributeName="r" values="3;5;3" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>);

}

/* ---------- Browser-frame project mockup (refined) ---------- */
function ProjectMockup({ kind, title }) {
  const variantClass = `mock-art-${kind === "navy" ? 1 : kind === "wine" ? 3 : 2}`;
  const innerByKind = {
    navy:
    <div style={{ position: "absolute", inset: "12% 10%", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ height: 14, width: "40%", background: "rgba(244,246,251,0.18)", borderRadius: 3 }} />
        <div style={{ height: 8, width: "70%", background: "rgba(244,246,251,0.1)", borderRadius: 3 }} />
        <div style={{ height: 8, width: "55%", background: "rgba(244,246,251,0.1)", borderRadius: 3 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
          {[1, 2, 3].map((i) => <div key={i} style={{ aspectRatio: "1", background: "rgba(74,122,184,0.18)", border: "1px solid rgba(74,122,184,0.35)", borderRadius: 4 }} />)}
        </div>
        <div style={{ marginTop: 16, height: 28, width: "30%", background: "linear-gradient(135deg, #2F4F6F, #8A1F1F)", borderRadius: 99 }} />
      </div>,

    wine:
    <div style={{ position: "absolute", inset: "15% 10%", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ height: 10, width: "30%", background: "rgba(244,246,251,0.15)", borderRadius: 2 }} />
          <div style={{ height: 10, width: 24, background: "rgba(194,59,59,0.5)", borderRadius: 99 }} />
        </div>
        {[0, 1, 2, 3].map((i) =>
      <div key={i} style={{ display: "flex", gap: 6, padding: "6px 0", borderBottom: "1px solid rgba(244,246,251,0.06)" }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: i === 1 ? "#FF6B6B" : "rgba(74,122,184,0.5)", marginTop: 1 }} />
            <div style={{ flex: 1, height: 6, background: "rgba(244,246,251,0.1)", borderRadius: 2 }} />
            <div style={{ width: 30, height: 6, background: "rgba(244,246,251,0.06)", borderRadius: 2 }} />
          </div>
      )}
      </div>,

    neutral:
    <div style={{ position: "absolute", inset: "12% 10%", display: "flex", gap: 10 }}>
        <div style={{ width: "25%", display: "flex", flexDirection: "column", gap: 6 }}>
          {[1, 2, 3, 4].map((i) => <div key={i} style={{ height: 7, background: i === 2 ? "rgba(74,122,184,0.4)" : "rgba(244,246,251,0.08)", borderRadius: 2 }} />)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ height: 14, width: "60%", background: "rgba(244,246,251,0.16)", borderRadius: 3 }} />
          <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(47,79,111,0.18), rgba(194,59,59,0.12))", borderRadius: 4, border: "1px solid rgba(74,122,184,0.25)", display: "flex", alignItems: "flex-end", padding: 8, gap: 3 }}>
            {[40, 65, 30, 80, 55, 70, 45, 60, 85].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: i % 3 === 0 ? "rgba(255,107,107,0.45)" : "rgba(74,122,184,0.45)", borderRadius: 1 }} />)}
          </div>
        </div>
      </div>

  };
  return (
    <div className="mock">
      <div className="mock__chrome">
        <span className="mock__dot"></span>
        <span className="mock__dot"></span>
        <span className="mock__dot"></span>
        <span className="mock__url">linumcore.com / {title.toLowerCase().replace(/\s+/g, "-")}</span>
      </div>
      <div className={`mock__body ${variantClass}`}>
        {innerByKind[kind] || innerByKind.neutral}
      </div>
    </div>);

}

/* ---------- Skills radar — pure SVG (unchanged) ---------- */
function SkillRadar({ data }) {
  const size = 480;
  const cx = size / 2,cy = size / 2;
  const radius = size * 0.36;
  const n = data.length;
  const angle = (i) => Math.PI * 2 * i / n - Math.PI / 2;
  const ringRadii = [0.25, 0.5, 0.75, 1];
  const points = data.map((d, i) => {
    const r = d.value * radius;
    return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];
  });
  const labelPoints = data.map((d, i) => {
    const r = radius + 32;
    return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];
  });
  const polyStr = points.map((p) => p.join(",")).join(" ");
  return (
    <svg viewBox={`-80 -30 ${size + 160} ${size + 60}`} className="skills__radar" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A7AB8" stopOpacity="0.32" />
          <stop offset="1" stopColor="#C23B3B" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="radar-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6FA3D2" />
          <stop offset="1" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      {ringRadii.map((f, i) =>
      <circle key={i} cx={cx} cy={cy} r={radius * f}
      fill="none" stroke="rgba(232,236,244,0.1)" strokeWidth="0.8"
      strokeDasharray={i === 3 ? "0" : "2 4"} />
      )}
      {data.map((d, i) =>
      <line key={i} x1={cx} y1={cy}
      x2={cx + Math.cos(angle(i)) * radius}
      y2={cy + Math.sin(angle(i)) * radius}
      stroke="rgba(232,236,244,0.08)" strokeWidth="0.6" />
      )}
      <polygon points={polyStr}
      fill="url(#radar-fill)"
      stroke="url(#radar-stroke)" strokeWidth="1.6" />
      {points.map((p, i) =>
      <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="4" fill="#0b0d10" stroke="#FF6B6B" strokeWidth="1.4" />
          <circle cx={p[0]} cy={p[1]} r="1.6" fill="#FF6B6B" />
        </g>
      )}
      {data.map((d, i) => {
        const [x, y] = labelPoints[i];
        const a = angle(i);
        let anchor = "middle";
        if (Math.cos(a) > 0.3) anchor = "start";else
        if (Math.cos(a) < -0.3) anchor = "end";
        return (
          <g key={`l-${i}`}>
            <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
            fill="#f4f6fb" fontFamily="var(--font-mono)" fontSize="11"
            letterSpacing="2" fontWeight="500">
              {d.label.toUpperCase()}
            </text>
            <text x={x} y={y + 14} textAnchor={anchor} dominantBaseline="middle"
            fill="#6b7480" fontFamily="var(--font-mono)" fontSize="9"
            letterSpacing="1">
              {Math.round(d.value * 100)}
            </text>
          </g>);

      })}
    </svg>);

}

Object.assign(window, {
  MonogramMark, Hero3D, HeroAmbient, BrandSeal, HeroArtwork,
  CraftIcon, CraftIconDefs, COMP_ICONS, COMP_SIZES, CompCardBg,
  ManifestoWeave, ProjectMockup, SkillRadar
});