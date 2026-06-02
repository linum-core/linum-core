"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { SectionHead } from "@/src/components/ui/SectionHead";
import { FilterBar } from "@/src/components/ui/filter-bar";
import { ProjectCard } from "./components/project-card";
import { FeaturedProject } from "./components/featured-project";
import "./styles.css";

// ---------------------------------------------------------------------------
// Project data — PT (default). EN strings will come from i18n in Phase 3.
// ---------------------------------------------------------------------------

interface ProjectItem {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  status: "done" | "wip";
  links: [string, string][];
  hue: string;
}

const FEATURED: ProjectItem = {
  title: "Atelier Vésper",
  desc: "Plataforma de gestão para um ateliê de alta-costura francês. Estoque de tecidos, encomendas sob medida, gestão de provas e financeiro reunidos em uma única costura de dados — substituindo cinco planilhas e dois sistemas legados.",
  tags: ["Next.js 15", "tRPC", "Prisma", "Postgres", "Stripe"],
  status: "done",
  year: "2026",
  hue: "navy",
  links: [
    ["Live", "↗"],
    ["Case study", "↗"],
  ],
};

const ITEMS: ProjectItem[] = [
  {
    title: "Nodo Health",
    year: "2025",
    desc: "Prontuário eletrônico para uma rede de clínicas integrativas. Foco em fluxo do profissional e privacidade do paciente.",
    tags: ["React Native", "FHIR", "AWS"],
    status: "done",
    links: [["Case", "↗"]],
    hue: "wine",
  },
  {
    title: "Trama API",
    year: "2025",
    desc: "Orquestração entre ERPs legados e canais de venda modernos. Idempotência, retries e auditoria ponta a ponta.",
    tags: ["Node", "Kafka", "K8s"],
    status: "wip",
    links: [["Docs", "↗"]],
    hue: "neutral",
  },
  {
    title: "Ofício Studio",
    year: "2024",
    desc: "Site institucional e CMS para um estúdio de arquitetura. Editorial, denso, lento — como deveria ser.",
    tags: ["Astro", "Sanity"],
    status: "done",
    links: [["Live", "↗"]],
    hue: "navy",
  },
  {
    title: "Linum CLI",
    year: "2025",
    desc: "Ferramenta interna para scaffolding e auditoria de projetos. Open source, escrita em Rust.",
    tags: ["Rust", "OSS"],
    status: "wip",
    links: [["GitHub", "↗"]],
    hue: "wine",
  },
  {
    title: "Coral Atlas",
    year: "2024",
    desc: "Visualização de dados ambientais para uma ONG marinha. Mapas, séries temporais, narrativas guiadas.",
    tags: ["D3", "MapboxGL"],
    status: "done",
    links: [
      ["Live", "↗"],
      ["Case", "↗"],
    ],
    hue: "neutral",
  },
];

const FILTERS = ["Todos", "Concluídos", "Em curso", "Open Source"];

// ---------------------------------------------------------------------------

export function PortfolioSection() {
  const t = useTranslations();
  const ref = useReveal();
  const [active, setActive] = useState(FILTERS[0]);

  const allItems: ProjectItem[] = [FEATURED, ...ITEMS];

  const matches = (item: ProjectItem): boolean => {
    if (active === FILTERS[0]) return true;
    if (active === FILTERS[1]) return item.status === "done";
    if (active === FILTERS[2]) return item.status === "wip";
    if (active === FILTERS[3]) return item.tags.includes("OSS");
    return true;
  };

  const counts = [
    allItems.length,
    allItems.filter((i) => i.status === "done").length,
    allItems.filter((i) => i.status === "wip").length,
    allItems.filter((i) => i.tags.includes("OSS")).length,
  ];

  const showFeatured = active === FILTERS[0] || matches(FEATURED);
  const gridItems = ITEMS.filter(matches);

  return (
    <section className="section portfolio" id="portfolio" ref={ref}>
      <div className="container">
        <SectionHead
          num="III"
          category={t("portfolio.category")}
          title={
            <>
              Trabalhos <em>recentes</em>
            </>
          }
          lede="Uma seleção de projetos entregues. Cada um pensado como uma costura específica — não há solução pronta repetida."
        />

        <FilterBar
          filters={FILTERS}
          counts={counts}
          activeFilter={active}
          onFilterChange={setActive}
          className="portfolio__filter reveal"
        />

        {showFeatured && (
          <FeaturedProject
            title={FEATURED.title}
            desc={FEATURED.desc}
            tags={FEATURED.tags}
            links={FEATURED.links}
            hue={FEATURED.hue}
          />
        )}

        <div className="proj-grid">
          {gridItems.map((p) => (
            <ProjectCard
              key={p.title}
              title={p.title}
              year={p.year}
              desc={p.desc}
              tags={p.tags}
              status={p.status}
              links={p.links}
              hue={p.hue}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
