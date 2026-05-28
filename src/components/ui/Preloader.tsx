"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

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
        <svg className="preloader__threads" viewBox="0 0 500 200" aria-hidden="true">
          <path
            className="thr thr-a"
            d="M 100 100 C 100 40, 220 40, 250 100 C 280 160, 400 160, 400 100 C 400 40, 280 40, 250 100 C 220 160, 100 160, 100 100 Z"
          />
          <path
            className="thr thr-b"
            d="M 250 100 C 280 160, 400 160, 400 100 C 400 40, 280 40, 250 100"
          />
          <path
            className="thr thr-a thr-thin"
            d="M 96 100 C 96 36, 220 36, 250 100 C 280 164, 404 164, 404 100 C 404 36, 280 36, 250 100 C 220 164, 96 164, 96 100 Z"
          />
          <path
            className="thr thr-b thr-thin"
            d="M 92 100 C 92 32, 220 32, 250 100 C 280 168, 408 168, 408 100 C 408 32, 280 32, 250 100"
          />
          <path
            className="thr thr-strand thr-strand-a"
            d="M 220 100 C 232 92, 268 108, 280 100"
          />
          <path
            className="thr thr-strand thr-strand-b"
            d="M 220 100 C 232 108, 268 92, 280 100"
          />
          <circle className="thr-node" cx="250" cy="100" r="2.5" />
        </svg>

        {/* Phase 2 — the actual brand logo emerges crisp */}
        <div className="preloader__logo-wrap">
          <div className="preloader__logo-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/linum-core-logo.png"
            alt="Linum Core"
            className="preloader__logo"
          />
        </div>
      </div>

      <div className="preloader__caption">
        <span>Connecting essences</span>
        {/* <span>{t("preloader.caption")}</span> */}
      </div>

      <div className="preloader__progress" aria-hidden="true">
        <div className="preloader__progress-bar" />
      </div>
    </div>
  );
}
