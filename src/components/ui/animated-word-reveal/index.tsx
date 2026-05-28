interface Token {
  t: string;
  c?: string;
}

interface AnimatedWordRevealProps {
  tokens: Token[];
  progress: number;
  className?: string;
  paragraphClassName?: string;
}

export function AnimatedWordReveal({
  tokens,
  progress,
  className = "manifesto__quote",
  paragraphClassName,
}: AnimatedWordRevealProps) {
  const ease = (x: number) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  const total = tokens.length;

  const wordOpacity = (i: number) => {
    const start = (i / total) * 0.78;
    const end = start + 0.22;
    const raw = (progress - start) / (end - start);
    if (raw <= 0) return 0;
    if (raw >= 1) return 1;
    return ease(raw);
  };

  return (
    <p className={className} ref={paragraphClassName as any}>
      {tokens.map((token, i) => {
        const o = wordOpacity(i);
        return (
          <span
            key={i}
            className={`word${token.c === "accent" ? " accent" : ""}`}
            style={{
              opacity: 0.08 + o * 0.92,
              filter: `blur(${(1 - o) * 4}px)`,
              transform: `translateY(${(1 - o) * 6}px)`,
            }}>
            {token.t}
          </span>
        );
      })}
    </p>
  );
}
