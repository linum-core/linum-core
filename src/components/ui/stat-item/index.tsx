interface StatItemProps {
  num: string;
  label: string;
}

export function StatItem({ num, label }: StatItemProps) {
  return (
    <div className="hero__stat">
      <div className="hero__stat-num grad-text">{num}</div>
      <div className="hero__stat-label">{label}</div>
    </div>
  );
}
