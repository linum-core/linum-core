"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { ContactGrid } from "./components/contact-grid";
import "./styles.css";

export function ContactSection() {
  const t = useTranslations();
  const ref = useReveal();

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="contact__bg" aria-hidden="true" />
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 24 }}>
          {t("contact.num")} · {t("contact.category")}
        </div>
        <ContactGrid />
      </div>
    </section>
  );
}
