import type {Locale, LocalizedText} from "@/types/content";

export function getLocalizedText(text: LocalizedText, locale: string): string {
  const value = text[locale as Locale];
  return value ?? text.en;
}

