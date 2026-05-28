import Image from "next/image";
import { useTranslations } from "next-intl";

export function PortraitFrame() {
  const t = useTranslations();

  return (
    <div className="reveal">
      <div className="ceo__portrait-wrap">
        <div className="ceo__portrait">
          <div className="ceo__portrait-mark">{t("ceo.portrait_caption")}</div>
          <div className="ceo__portrait-corner">{t("ceo.portrait_corner")}</div>
          <div className="ceo__portrait-frame" />
          <Image
            src="/assets/Frame.png"
            alt="Gabriel Gomes"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{ filter: "brightness(1.45) saturate(1.18)", zIndex: 1 }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
