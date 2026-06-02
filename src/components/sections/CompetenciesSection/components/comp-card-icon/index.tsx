import { Icon } from "@/src/components/ui/Icon";

interface CompCardIconProps {
  kind: string;
}

export function CompCardIcon({ kind }: CompCardIconProps) {
  return (
    <div className="comp-card__icon-glass">
      <Icon kind={kind} />
    </div>
  );
}
