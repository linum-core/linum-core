interface FilterChipProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function FilterChip({
  label,
  count,
  isActive,
  onClick,
  className = "filter-chip",
}: FilterChipProps) {
  return (
    <button
      className={`${className}${isActive ? " is-active" : ""}`}
      onClick={onClick}>
      {label}
      <span className="filter-chip__count">
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}
