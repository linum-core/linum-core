"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Enum_Sections } from "@/src/constants/enums";
import { SideLogo } from "./components/side-logo";
import { NavLangDropdown } from "./components/nav-lang-dropdown";
import { NavSocialIcons } from "./components/nav-social-icons";
import { NavStatus } from "./components/nav-status";
import "./styles.css";

export function Header() {
  const t = useTranslations();
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
      Enum_Sections.MANIFESTO,
      Enum_Sections.PORTFOLIO,
      Enum_Sections.CEO,
      Enum_Sections.COMPETENCIES,
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
    [Enum_Sections.HERO, t("nav.home")],
    [Enum_Sections.MANIFESTO, t("nav.manifesto")],
    [Enum_Sections.PORTFOLIO, t("nav.portfolio")],
    [Enum_Sections.CEO, t("nav.ceo")],
    [Enum_Sections.COMPETENCIES, t("nav.competencies")],
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
        <NavStatus />
        <NavLangDropdown />
        <NavSocialIcons />
        <button
          className="nav__contact-btn"
          onClick={() => scrollTo(Enum_Sections.CONTACT)}
        >
          <svg className="nav__contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
          </svg>
          {t("nav.contact_cta")}
        </button>
      </div>
    </nav>
  );
}
