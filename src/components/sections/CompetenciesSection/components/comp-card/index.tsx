import { useTranslations } from "next-intl";
import { CompCardIcon } from "../comp-card-icon";

interface CompCardProps {
  icon: string;
  titleKey: string;
  subtitleKey: string;
  tags: string[];
}

export function CompCard({ icon, titleKey, subtitleKey, tags }: CompCardProps) {
  const t = useTranslations();

  return (
    <article className="comp-card reveal">
      <CompCardIcon kind={icon} />
      <h3 className="comp-card__title">{t(titleKey)}</h3>
      <p className="comp-card__subtitle">{t(subtitleKey)}</p>
      <div className="comp-card__tags">
        {tags.map((tag) => (
          <span key={tag} className="comp-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
