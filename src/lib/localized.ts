import type {Locale, LocalizedText} from "@/types/content";

export function getLocalizedText(text: LocalizedText, locale: string): string {
  if (locale in text) {
    return text[locale as Locale];
  }

  return text.en;
}

