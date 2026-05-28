interface CardBackgroundProps {
  color?: string;
  className?: string;
}

export function CardBackground({
  color = "#ff00ff",
  className = "comp-card__bg",
}: CardBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, ${color}22 0%, transparent 50%)`,
      }}
    />
  );
}
