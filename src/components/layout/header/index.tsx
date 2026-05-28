"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/src/libs/animation/hooks/useLanguage";
import { Enum_Sections } from "@/src/constants/enums";
import { SideLogo } from "./components/side-logo";

export function Header() {
  const t = useTranslations();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(Enum_Sections.HERO);

  // scroll → is-scrolled class
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = [
      Enum_Sections.HERO,
      Enum_Sections.COMPETENCIES,
      Enum_Sections.PORTFOLIO,
      Enum_Sections.CEO,
      Enum_Sections.FEEDBACKS,
      Enum_Sections.CONTACT,
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id as Enum_Sections);
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const links: [string, string][] = [
    [Enum_Sections.COMPETENCIES, t("nav.competencies")],
    [Enum_Sections.PORTFOLIO, t("nav.portfolio")],
    [Enum_Sections.CEO, t("nav.ceo")],
    [Enum_Sections.FEEDBACKS, t("nav.feedbacks")],
    [Enum_Sections.CONTACT, t("nav.contact")],
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav__rail" aria-hidden="true" />
      <SideLogo scrollTo={scrollTo} />

      <div className="nav__links">
        {links.map(([id, label]) => (
          <a
            key={id}
            className={`nav__link${activeSection === id ? " is-active" : ""}`}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(id);
            }}>
            {label}
          </a>
        ))}
      </div>

      <div className="nav__right">
        <div className="nav__trust" aria-label="Disponível">
          <span className="nav__trust-dot" />
          {t("nav.available")}
        </div>
        <div className="nav__lang" role="group" aria-label="Language">
          {(["pt-BR", "en", "es"] as const).map((l) => (
            <button
              key={l}
              className={currentLanguage === l ? "is-active" : ""}
              onClick={() => changeLanguage(l)}>
              {l === "pt-BR" ? "PT" : l === "en" ? "EN" : "ES"}
            </button>
          ))}
        </div>

        <button className="nav__cta" onClick={() => scrollTo(Enum_Sections.CONTACT)}>
          {t("nav.contact")} <span>→</span>
        </button>
      </div>
    </nav>
  );
}
