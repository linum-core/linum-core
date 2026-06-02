"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { SectionHead } from "@/src/components/ui/SectionHead";
import { CompCard } from "./components/comp-card";
import "./styles.css";

interface CompItem {
  icon: string;
  titleKey: string;
  subtitleKey: string;
  tags: string[];
}

const items: CompItem[] = [
  {
    icon: "compass",
    titleKey: "competencies.strategy.title",
    subtitleKey: "competencies.strategy.subtitle",
    tags: ["Strategy", "OKRs", "Discovery", "Roadmap"],
  },
  {
    icon: "lens",
    titleKey: "competencies.design.title",
    subtitleKey: "competencies.design.subtitle",
    tags: ["Figma", "Design System", "UX", "Mobile"],
  },
  {
    icon: "links",
    titleKey: "competencies.integrations.title",
    subtitleKey: "competencies.integrations.subtitle",
    tags: ["REST", "GraphQL", "Webhooks", "OAuth"],
  },
  {
    icon: "server",
    titleKey: "competencies.architecture.title",
    subtitleKey: "competencies.architecture.subtitle",
    tags: ["DDD", "CQRS", "Microservices", "Event-driven"],
  },
  {
    icon: "monitor",
    titleKey: "competencies.management.title",
    subtitleKey: "competencies.management.subtitle",
    tags: ["Vercel", "Analytics", "CMS", "Performance"],
  },
  {
    icon: "chart",
    titleKey: "competencies.growth.title",
    subtitleKey: "competencies.growth.subtitle",
    tags: ["GA4", "Funnels", "Data", "Growth"],
  },
  {
    icon: "rocket",
    titleKey: "competencies.digital.title",
    subtitleKey: "competencies.digital.subtitle",
    tags: ["Branding", "Strategy", "Launch", "Digital"],
  },
  {
    icon: "mappin",
    titleKey: "competencies.planning.title",
    subtitleKey: "competencies.planning.subtitle",
    tags: ["Roadmap", "KPIs", "Personas", "Canvas"],
  },
  {
    icon: "cloud",
    titleKey: "competencies.cloud.title",
    subtitleKey: "competencies.cloud.subtitle",
    tags: ["AWS", "GCP", "Terraform", "CI/CD"],
  },
  {
    icon: "search",
    titleKey: "competencies.seo.title",
    subtitleKey: "competencies.seo.subtitle",
    tags: ["SEO", "Core Web Vitals", "Content", "Ranking"],
  },
  {
    icon: "globe",
    titleKey: "competencies.web.title",
    subtitleKey: "competencies.web.subtitle",
    tags: ["React", "Next.js", "Landing Pages", "CRO"],
  },
];

export function CompetenciesSection() {
  const t = useTranslations();
  const ref = useReveal();

  return (
    <section className="section comp" id="competencies" ref={ref}>
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
          {items.map((item) => (
            <CompCard
              key={item.titleKey}
              icon={item.icon}
              titleKey={item.titleKey}
              subtitleKey={item.subtitleKey}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
