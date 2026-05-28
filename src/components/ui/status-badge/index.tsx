type StatusType = "done" | "wip";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  className = "proj__status",
}: StatusBadgeProps) {
  const statusClass = status === "done" ? "is-done" : "is-wip";

  return (
    <div className={`${className} ${statusClass}`}>
      <span className="status-dot" />
      {label}
    </div>
  );
}
