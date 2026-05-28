"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { useSectionProgress } from "@/src/libs/animation/hooks/useSectionProgress";
import { ManifestoQuote } from "./components/manifesto-quote";

export function ManifestoSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useReveal();
  const progress = useSectionProgress(sectionRef);

  const [wordProgress, setWordProgress] = useState(0);
  const quoteScrollRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = quoteScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const raw = (start - r.top) / (start - end);
      setWordProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rawTokens = t.raw("manifesto.tokens");
  const tokens: Array<{ t: string; c?: string }> = Array.isArray(rawTokens)
    ? rawTokens
    : [];

  return (
    <section className="manifesto" id="manifesto" ref={sectionRef}>
      <div className="manifesto__weave" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <path
            className="w-blue"
            d="M-5 40 C15 25, 35 60, 55 45 S75 30, 105 50"
            style={{ "--off": `${3000 * (1 - progress)}` } as React.CSSProperties}
          />
          <path
            className="w-red"
            d="M-5 62 C15 75, 35 38, 55 55 S75 70, 105 42"
            style={
              {
                "--off": `${3000 * (1 - Math.max(0, progress - 0.1) / 0.9)}`,
              } as React.CSSProperties
            }
          />
          <path
            className="w-blue w-thin"
            d="M28 -5 C30 25, 27 60, 32 105"
            style={{ "--off": `${3000 * (1 - progress)}` } as React.CSSProperties}
          />
          <path
            className="w-red w-thin"
            d="M70 -5 C72 30, 69 65, 74 105"
            style={{ "--off": `${3000 * (1 - progress)}` } as React.CSSProperties}
          />
        </svg>
      </div>

      <div className="container-narrow manifesto__inner">
        <div className="eyebrow manifesto__eyebrow reveal">{t("manifesto.eyebrow")}</div>

        <div ref={quoteRef as React.RefObject<HTMLDivElement>}>
          <div ref={quoteScrollRef}>
            <ManifestoQuote tokens={tokens} wordProgress={wordProgress} />
          </div>
        </div>

        <div className="manifesto__attrib reveal">{t("manifesto.attrib")}</div>
      </div>
    </section>
  );
}
