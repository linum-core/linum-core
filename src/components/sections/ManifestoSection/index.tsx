"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { useSectionProgress } from "@/src/libs/animation/hooks/useSectionProgress";
import { ManifestoQuote } from "./components/manifesto-quote";
import { ManifestoWeave } from "./components/manifesto-weave";

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
      <ManifestoWeave progress={progress} />

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
