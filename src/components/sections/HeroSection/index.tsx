"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { Enum_Sections } from "@/src/constants/enums";
import { HeroBackground } from "./components/hero-background";
import { HeroCtaButton } from "./components/hero-cta-button";
import { Perspective3dWrap } from "./components/perspective-3d-wrap";
import { StatsRow } from "@/src/components/ui/stats-row";
import { ScrollIndicator } from "@/src/components/ui/scroll-indicator";

const DEFAULT_STATS = [
  { num: "12+", label: "Sistemas em produção" },
  { num: "100%", label: "Entrega no prazo" },
  { num: "5 anos", label: "Cliente médio" },
];

export function HeroSection() {
  const t = useTranslations();
  const ref = useReveal();

  return (
    <section
      className="section hero"
      id={Enum_Sections.HERO}
      data-screen-label="01 Hero"
      ref={ref as React.RefObject<HTMLElement>}>
      <HeroBackground />

      {/* Top-right meta */}
      <div className="hero__meta-top">
        <div>{t("hero.meta_a")}</div>
        <div style={{ opacity: 0.6 }}>{t("hero.meta_b")}</div>
      </div>

      {/* Main grid */}
      <div className="hero__inner">
        {/* Left: text */}
        <div>
          <div className="eyebrow hero__eyebrow reveal">{t("hero.eyebrow")}</div>
          <h1 className="hero__title reveal">
            {t("hero.title_a")} <em>{t("hero.title_b")}</em>
          </h1>
          <p className="hero__lede reveal">{t("hero.lede")}</p>
          <HeroCtaButton />
          <StatsRow
            stats={
              Array.isArray(t.raw("hero.stats"))
                ? (t.raw("hero.stats") as Array<{ num: string; label: string }>)
                : DEFAULT_STATS
            }
            className="hero__stats reveal-stagger"
          />
        </div>

        {/* Right: brand seal */}
        <div className="reveal">
          <Perspective3dWrap />
        </div>
      </div>

      <ScrollIndicator
        label={t("hero.scroll")}
        className="hero__scroll"
      />
    </section>
  );
}
