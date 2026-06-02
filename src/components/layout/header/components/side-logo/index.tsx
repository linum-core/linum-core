"use client";

import { useTranslations } from "next-intl";
import { Enum_Sections } from "@/src/constants/enums";

interface ISideLogoProps {
  scrollTo: (id: Enum_Sections) => void;
}

export function SideLogo({ scrollTo }: ISideLogoProps) {
  const t = useTranslations();

  return (
    <a
      className="nav__brand"
      href={`#${Enum_Sections.HERO}`}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(Enum_Sections.HERO);
      }}>
      <span className="nav__brand-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo-no-write-inverted.svg"
          alt="Linum Core"
          width={90}
          height={90}
        />
      </span>
      <span className="nav__brand-word">
        Linum<span className="nav__brand-dot">·</span>Core
        <small>{t("nav.tagline")}</small>
      </span>
    </a>
  );
}
