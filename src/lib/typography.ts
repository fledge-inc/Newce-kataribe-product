import type {Locale} from "@/types/content";

const minchoBodyLocales = new Set<string>(["ja", "zh-CN", "zh-TW"]);
const verticalLocales = new Set<string>(["ja", "zh-CN", "zh-TW"]);

/**
 * 本文まで明朝で組むロケール。英語・韓国語は小さい字の可読性を優先して
 * ゴシックのままにする（見出しは全ロケール明朝）。
 */
export function isMinchoBodyLocale(locale: string): boolean {
  return minchoBodyLocales.has(locale);
}

/** 縦組みが自然に読めるロケールだけ tategaki を許す。 */
export function isVerticalLocale(locale: string): boolean {
  return verticalLocales.has(locale);
}

/** 縦組み可能なら .tategaki、それ以外は空文字を返す。 */
export function tategakiClass(locale: string): string {
  return isVerticalLocale(locale) ? "tategaki" : "";
}

/** 言語選択やフッターで使う、ロケールのラテン表記。 */
export const latinLabel: Record<Locale, string> = {
  ja: "JAPANESE",
  en: "ENGLISH",
  "zh-CN": "CHINESE / SIMPLIFIED",
  "zh-TW": "CHINESE / TRADITIONAL",
  ko: "KOREAN"
};
