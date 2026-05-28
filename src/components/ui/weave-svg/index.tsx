interface WeaveSVGProps {
  progress: number;
  className?: string;
}

export function WeaveSVG({ progress, className = "manifesto__weave" }: WeaveSVGProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <path
          className="w-blue"
          d="M-5 40 C15 25, 35 60, 55 45 S75 30, 105 50"
          style={{ "--off": `${3000 * (1 - progress)}` } as React.CSSProperties}
        />
        <path
          className="w-red"
          d="M-5 62 C15 75, 35 38, 55 55 S75 70, 105 42"
          style={
            {
              "--off": `${3000 * (1 - Math.max(0, progress - 0.1) / 0.9)}`,
            } as React.CSSProperties
          }
        />
        <path
          className="w-blue w-thin"
          d="M28 -5 C30 25, 27 60, 32 105"
          style={{ "--off": `${3000 * (1 - progress)}` } as React.CSSProperties}
        />
        <path
          className="w-red w-thin"
          d="M70 -5 C72 30, 69 65, 74 105"
          style={{ "--off": `${3000 * (1 - progress)}` } as React.CSSProperties}
        />
      </svg>
    </div>
  );
}
