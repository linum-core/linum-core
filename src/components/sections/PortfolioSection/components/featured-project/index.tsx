import { useTranslations } from "next-intl";
import { ProjectMockup } from "@/src/components/ui/ProjectMockup";
import { TagPill } from "@/src/components/ui/tag-pill";

interface FeaturedProjectProps {
  title: string;
  desc: string;
  tags: string[];
  links: [string, string][];
  hue: string;
}

export function FeaturedProject({
  title,
  desc,
  tags,
  links,
  hue,
}: FeaturedProjectProps) {
  const t = useTranslations();

  return (
    <article className="proj-featured reveal">
      <div className="proj-featured__media">
        <ProjectMockup kind={hue} title={title} />
      </div>
      <div>
        <div className="proj-featured__label">{t("portfolio.featured_label")}</div>
        <h3 className="proj-featured__title">{title}</h3>
        <p className="proj-featured__desc">{desc}</p>
        <div className="proj__tags" style={{ marginBottom: 28 }}>
          {tags.map((tg) => (
            <TagPill key={tg} label={tg} className="proj__tag" />
          ))}
        </div>
        <div className="proj__links">
          {links.map(([label, icon]) => (
            <a
              key={label}
              href="#"
              className="proj__link"
              onClick={(e) => e.preventDefault()}>
              {label} <span style={{ marginLeft: 6 }}>{icon}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
