import { useTranslations } from "next-intl";

export function HeroCtaButton() {
  const t = useTranslations();

  return (
    <div className="hero__cta reveal">
      <a href="#contact" className="btn">
        {t("hero.cta")} <span className="btn__arrow">→</span>
      </a>
    </div>
  );
}
