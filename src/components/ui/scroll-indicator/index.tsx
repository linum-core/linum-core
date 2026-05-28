interface ScrollIndicatorProps {
  label?: string;
  className?: string;
}

export function ScrollIndicator({
  label = "Scroll",
  className = "hero__scroll",
}: ScrollIndicatorProps) {
  return (
    <div className={className}>
      <span>{label}</span>
      <div className="scroll-line" />
    </div>
  );
}
