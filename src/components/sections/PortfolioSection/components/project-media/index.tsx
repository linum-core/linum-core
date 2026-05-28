import { useTranslations } from "next-intl";
import { ProjectMockup } from "@/src/components/ui/ProjectMockup";

interface ProjectMediaProps {
  status: "done" | "wip";
  year: string;
  hue: string;
  title: string;
}

export function ProjectMedia({ status, year, hue, title }: ProjectMediaProps) {
  const t = useTranslations();

  return (
    <div className="proj__media">
      <div className={`proj__status proj__status--${status}`}>
        <span className="proj__status-dot" />
        {status === "done" ? t("portfolio.done") : t("portfolio.wip")}
      </div>
      <div className="proj__year">{year}</div>
      <div className="proj__media-inner">
        <ProjectMockup kind={hue} title={title} />
      </div>
    </div>
  );
}
