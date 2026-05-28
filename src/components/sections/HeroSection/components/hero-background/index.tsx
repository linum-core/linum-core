export function HeroBackground() {
  return (
    <div className="hero__bg" aria-hidden="true">
      <div className="hero__bg-mesh" />
      <div className="hero__bg-vignette" />
      <svg
        className="hero__bg-noise"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0.9 0 0 0 0 0.94 0 0 0 0 1 0 0 0 0.45 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
