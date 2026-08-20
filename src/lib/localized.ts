import type {Locale, LocalizedText} from "@/types/content";

export function getLocalizedText(text: LocalizedText, locale: string): string {
  return text[locale as Locale] ?? text.en;
}
