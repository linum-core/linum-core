import { useTranslations } from "next-intl";

interface Channel {
  label: string;
  value: string;
  href: string;
}

const CHANNELS: Channel[] = [
  {
    label: "Email",
    value: "ggvgabriel05@gmail.com",
    href: "mailto:ggvgabriel05@gmail.com",
  },
  { label: "WhatsApp", value: "+55 11 99000-0000", href: "#" },
  {
    label: "LinkedIn",
    value: "in/gabriel-linum",
    href: "https://linkedin.com/in/gabriel-linum",
  },
  {
    label: "GitHub",
    value: "github.com/linumcore",
    href: "https://github.com/linumcore",
  },
  { label: "Instagram", value: "@linumcore", href: "https://instagram.com/linumcore" },
];

export function ContactGrid() {
  const t = useTranslations();

  return (
    <div className="contact__inner">
      <div className="reveal">
        <h2 className="contact__title">
          {t("contact.title_a")} <em>{t("contact.title_b")}</em> {t("contact.title_c")}
        </h2>
        <p className="contact__lede">{t("contact.lede")}</p>
        <button className="btn">
          {t("contact.cta")} <span className="btn__arrow">→</span>
        </button>
      </div>
      <div className="reveal contact__channels">
        {CHANNELS.map((c) => (
          <a key={c.label} className="contact-channel" href={c.href}>
            <div>
              <div className="contact-channel__label">{c.label}</div>
              <div className="contact-channel__value">{c.value}</div>
            </div>
            <span className="contact-channel__arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
