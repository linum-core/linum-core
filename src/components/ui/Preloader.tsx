"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PreloaderThreads } from "./PreloaderThreads";

export function Preloader() {
  const t = useTranslations("preloader");
  const [done, setDone] = useState(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return true;
    }

    return false;
  });

  useEffect(() => {
    if (done) return;

    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => setDone(true), 3800);
    const skip = () => setDone(true);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("click", skip, { once: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [done]);

  useEffect(() => {
    if (done) {
      const timeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [done]);

  return (
    <div className={"preloader" + (done ? " is-done" : "")}>
      <div className="preloader__vignette" />
      <div className="preloader__halo" />

      <div className="preloader__stage">
        {/* Phase 1 — abstract infinity threads draw in (engraving sketch) */}
        <PreloaderThreads />

        {/* Phase 2 — the actual brand logo emerges crisp */}
        <div className="preloader__logo-wrap">
          <div className="preloader__logo-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-colors-inverted.svg"
            alt="Linum Core"
            className="preloader__logo"
          />
        </div>
      </div>

      <div className="preloader__caption">
        <span>{t("caption")}</span>
      </div>

      <div className="preloader__progress" aria-hidden="true">
        <div className="preloader__progress-bar" />
      </div>
    </div>
  );
}
