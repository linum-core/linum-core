"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { SectionHead } from "@/src/components/ui/SectionHead";
import { CraftIconDefs } from "@/src/components/ui/Icon";
import { CompCard } from "./components/comp-card";

interface CompItem {
  icon: string;
  size: "lg" | "md" | "sm";
  color: string;
  titleKey: string;
  bodyKey: string;
  tags: string[];
}

const items: CompItem[] = [
  {
    icon: "compass",
    size: "lg",
    color: "rgba(74,122,184,0.25)",
    titleKey: "competencies.consulting.title",
    bodyKey: "competencies.consulting.description",
    tags: ["Discovery", "Roadmap", "OKRs"],
  },
  {
    icon: "lens",
    size: "md",
    color: "rgba(194,59,59,0.2)",
    titleKey: "competencies.architecture.title",
    bodyKey: "competencies.architecture.description",
    tags: ["Figma", "Design System", "UX Research"],
  },
  {
    icon: "quill",
    size: "sm",
    color: "rgba(74,122,184,0.2)",
    titleKey: "competencies.dev.title",
    bodyKey: "competencies.dev.description",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: "anchor",
    size: "sm",
    color: "rgba(194,59,59,0.15)",
    titleKey: "competencies.api.title",
    bodyKey: "competencies.api.description",
    tags: ["Node.js", "PostgreSQL", "APIs"],
  },
  {
    icon: "knot",
    size: "md",
    color: "rgba(74,122,184,0.2)",
    titleKey: "competencies.integrations.title",
    bodyKey: "competencies.integrations.description",
    tags: ["Microservices", "DDD", "Event-driven"],
  },
  {
    icon: "key",
    size: "lg",
    color: "rgba(194,59,59,0.18)",
    titleKey: "competencies.cloud.title",
    bodyKey: "competencies.cloud.description",
    tags: ["AWS", "GCP", "Terraform"],
  },
];

export function CompetenciesSection() {
  const t = useTranslations();
  const ref = useReveal();

  return (
    <section className="section comp" id="comp" ref={ref}>
      <CraftIconDefs />
      <div className="container">
        <SectionHead
          num="II"
          category={t("nav.competencies")}
          title={
            <>
              {t("competencies.title")} <em>{t("competencies.subtitle")}</em>
            </>
          }
          lede={t("competencies.subtitle")}
        />
        <div className="comp-grid">
          {items.map((item, i) => (
            <CompCard
              key={item.titleKey}
              icon={item.icon}
              size={item.size}
              color={item.color}
              titleKey={item.titleKey}
              bodyKey={item.bodyKey}
              tags={item.tags}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
