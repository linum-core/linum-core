import { FilterChip } from "../filter-chip";

interface FilterBarProps {
  filters: string[];
  counts: number[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function FilterBar({
  filters,
  counts,
  activeFilter,
  onFilterChange,
  className = "portfolio__filter",
}: FilterBarProps) {
  return (
    <div className={className}>
      {filters.map((f, i) => (
        <FilterChip
          key={f}
          label={f}
          count={counts[i]}
          isActive={activeFilter === f}
          onClick={() => onFilterChange(f)}
        />
      ))}
    </div>
  );
}
