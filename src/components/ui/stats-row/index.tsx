import { StatItem } from "../stat-item";

interface StatItemData {
  num: string;
  label: string;
}

interface StatsRowProps {
  stats: StatItemData[];
  className?: string;
}

export function StatsRow({ stats, className = "hero__stats reveal-stagger" }: StatsRowProps) {
  return (
    <div className={className}>
      {stats.map((s) => (
        <StatItem key={s.num} num={s.num} label={s.label} />
      ))}
    </div>
  );
}
