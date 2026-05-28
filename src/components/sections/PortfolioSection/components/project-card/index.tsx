import { ProjectMedia } from "../project-media";
import { TagPill } from "@/src/components/ui/tag-pill";

interface ProjectCardProps {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  status: "done" | "wip";
  links: [string, string][];
  hue: string;
}

export function ProjectCard({
  title,
  year,
  desc,
  tags,
  status,
  links,
  hue,
}: ProjectCardProps) {
  return (
    <article className="proj reveal">
      <ProjectMedia status={status} year={year} hue={hue} title={title} />
      <div className="proj__content">
        <h3 className="proj__title">{title}</h3>
        <p className="proj__desc">{desc}</p>
        <div className="proj__tags">
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
