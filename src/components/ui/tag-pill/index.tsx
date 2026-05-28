interface TagPillProps {
  label: string;
  className?: string;
}

export function TagPill({ label, className = "comp-card__tag" }: TagPillProps) {
  return <span className={className}>{label}</span>;
}
