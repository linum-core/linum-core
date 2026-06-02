"use client";
import { useTranslations } from "next-intl";
import { useReveal } from "@/src/libs/animation/hooks/useReveal";
import { SectionHead } from "@/src/components/ui/SectionHead";
import { FeedbackRow } from "./components/feedback-row";
import "./styles.css";

interface FbItem {
  quote: string;
  person: string;
  role: string;
  initials: string;
}

const ITEMS: FbItem[] = [
  {
    quote:
      "Resolveram em três meses o que dois fornecedores anteriores não conseguiram em dois anos. E ainda nos ensinaram a manter.",
    person: "Marina Tavares",
    role: "CTO · Atelier Vésper",
    initials: "MT",
  },
  {
    quote:
      "Senti que o Gabriel entendeu a clínica antes de escrever uma linha de código. O sistema parece feito por dentro de nós.",
    person: "Dr. Henrique Lopes",
    role: "Diretor médico · Nodo Health",
    initials: "HL",
  },
  {
    quote:
      "Documentação impecável, decisões justificadas por escrito, prazos cumpridos. Trabalho de adulto, raro no mercado.",
    person: "Sofia Bertoletti",
    role: "Head de Engenharia · Trama",
    initials: "SB",
  },
];

export function FeedbacksSection() {
  const t = useTranslations();
  const ref = useReveal();

  return (
    <section className="section feedbacks" id="feedbacks" ref={ref}>
      <div className="container">
        <SectionHead
          num="V"
          category={t("feedbacks.category")}
          title={t("feedbacks.title")}
          lede={t("feedbacks.lede")}
        />
        <FeedbackRow items={ITEMS} />
      </div>
    </section>
  );
}
