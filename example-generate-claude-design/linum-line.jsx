/* =========================================================
   LINUM CORE — 3D flow line wrapper
   Replaces the 2D SVG with a Three.js animated wave field.
   ========================================================= */

function LinumLine({ height = 120 }) {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    let dispose;
    let cancelled = false;
    let attempts = 0;
    function tryMount() {
      if (cancelled) return;
      if (window.THREE && window.LinumFlow3D) {
        try {
          dispose = window.LinumFlow3D.mount(ref.current);
          if (!dispose) setFailed(true);
        } catch (err) {
          console.warn("[LinumLine] 3D mount failed, using 2D fallback:", err);
          setFailed(true);
        }
      } else if (++attempts < 80) {
        setTimeout(tryMount, 80);
      } else {
        setFailed(true);
      }
    }
    tryMount();
    return () => {
      cancelled = true;
      if (typeof dispose === "function") dispose();
    };
  }, []);
  return (
    <div
      className={"linum-line linum-line--3d" + (failed ? " is-fallback" : "")}
      ref={ref}
      style={{ height }}
      aria-hidden="true">
      {failed && <LinumLineFallback height={height} />}
    </div>
  );
}

/* SVG fallback — same general aesthetic, no WebGL needed */
function LinumLineFallback({ height }) {
  return (
    <svg viewBox={`0 0 1200 ${height}`} preserveAspectRatio="none"
         style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="fb-blue" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0" stopColor="#6FA3D2" stopOpacity="0"/>
          <stop offset="0.5" stopColor="#6FA3D2" stopOpacity="1"/>
          <stop offset="1" stopColor="#6FA3D2" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="fb-red" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0" stopColor="#FF6B6B" stopOpacity="0"/>
          <stop offset="0.5" stopColor="#FF6B6B" stopOpacity="1"/>
          <stop offset="1" stopColor="#FF6B6B" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`M 0 ${height/2} C 200 ${height*0.2}, 400 ${height*0.8}, 600 ${height/2} S 1000 ${height*0.2}, 1200 ${height/2}`}
            fill="none" stroke="url(#fb-blue)" strokeWidth="1.4"
            style={{ filter: "drop-shadow(0 0 6px rgba(111,163,210,0.6))" }}/>
      <path d={`M 0 ${height/2} C 200 ${height*0.8}, 400 ${height*0.2}, 600 ${height/2} S 1000 ${height*0.8}, 1200 ${height/2}`}
            fill="none" stroke="url(#fb-red)" strokeWidth="1.4"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,107,107,0.6))" }}/>
    </svg>
  );
}

window.LinumLine = LinumLine;
