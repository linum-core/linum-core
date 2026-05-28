import { useTranslations } from "next-intl";
import { CompCardIcon } from "../comp-card-icon";
import { TagPill } from "@/src/components/ui/tag-pill";

interface CompCardProps {
  icon: string;
  size: "lg" | "md" | "sm";
  color: string;
  titleKey: string;
  bodyKey: string;
  tags: string[];
  index: number;
}

export function CompCard({
  icon,
  size,
  color,
  titleKey,
  bodyKey,
  tags,
  index,
}: CompCardProps) {
  const t = useTranslations();

  return (
    <article className="comp-card reveal" data-size={size}>
      <div
        className="comp-card__bg"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${color}, transparent 60%)`,
        }}
      />
      <span className="comp-card__num">0{index + 1}</span>
      <CompCardIcon kind={icon} />
      <h3 className="comp-card__title">{t(titleKey)}</h3>
      <p className="comp-card__body">{t(bodyKey)}</p>
      <div className="comp-card__tags">
        {tags.map((tag) => (
          <TagPill key={tag} label={tag} className="comp-card__tag" />
        ))}
      </div>
    </article>
  );
}
