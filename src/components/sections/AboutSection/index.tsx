"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { SectionHead } from "@/src/components/ui/SectionHead";
import { PortraitFrame } from "./components/portrait-frame";
import { SkillsPanel } from "./components/skills-panel";

export function AboutSection() {
  const t = useTranslations();
  const ref = useReveal();

  return (
    <section className="section ceo" id="ceo" ref={ref}>
      <div className="container">
        <SectionHead
          num="IV"
          category={t("ceo.category")}
          title={
            <>
              {t("ceo.title_a")} <em>{t("ceo.title_b")}</em>
            </>
          }
          lede={t("ceo.lede")}
        />

        <div className="ceo__grid">
          <PortraitFrame />

          {/* Content */}
          <div className="reveal">
            <h3 className="ceo__name">{t("ceo.name")}</h3>
            <div className="ceo__role">{t("ceo.role")}</div>

            <div className="ceo__bio ceo__bio--editorial">
              <p dangerouslySetInnerHTML={{ __html: t.raw("ceo.bio1") as string }} />
              <p>{t("ceo.bio2")}</p>
            </div>

            <SkillsPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
