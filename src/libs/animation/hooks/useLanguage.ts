"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/src/libs/animation/navigation";

export type SupportedLanguage = "en" | "pt-BR" | "es";

export const languageLabels: Record<SupportedLanguage, { label: string; flag: string }> =
  {
    en: { label: "English", flag: "🇺🇸" },
    "pt-BR": { label: "Português", flag: "🇧🇷" },
    es: { label: "Español", flag: "🇪🇸" },
  };

export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguage = useLocale();
  const changeLanguage = (lang: string) => router.replace(pathname, { locale: lang });
  return { currentLanguage, changeLanguage, languageLabels };
}
