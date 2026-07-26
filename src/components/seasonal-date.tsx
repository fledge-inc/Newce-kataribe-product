import {getSeasonalTerm} from "@/data/seasons";
import {routing} from "@/i18n/routing";
import {isVerticalLocale} from "@/lib/typography";

const TOKYO = "Asia/Tokyo";

/**
 * `/favicon.ico` のようなパスは App Router 上で `[locale]` に一致してしまい、
 * locale に "favicon.ico" が渡る。BCP-47 として不正なので Intl が RangeError を
 * 投げる。ルーティング側の 404 が最終的に勝つとはいえ、表示部品が投げるのは
 * 筋が悪いので、既知のロケール以外は既定ロケールに寄せる。
 */
function safeLocale(locale: string): string {
  return (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;
}

const kanjiNumbers = [
  "〇",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九"
];

/** 1〜31 を漢数字に。月（1〜12）と日（1〜31）だけを想定。 */
function toKanjiNumber(value: number): string {
  if (value <= 10) {
    return value === 10 ? "十" : kanjiNumbers[value];
  }
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const tensPart = tens === 1 ? "十" : `${kanjiNumbers[tens]}十`;
  return ones === 0 ? tensPart : `${tensPart}${kanjiNumbers[ones]}`;
}

/** 店舗は東京にあるので、閲覧者の端末時計ではなく Asia/Tokyo で日付を決める。 */
function tokyoParts(rawLocale: string) {
  const locale = safeLocale(rawLocale);
  const now = new Date();
  const numeric = new Intl.DateTimeFormat("en-US", {
    timeZone: TOKYO,
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(now);

  const get = (type: string) =>
    Number(numeric.find((part) => part.type === type)?.value ?? "0");

  const month = get("month");
  const day = get("day");

  const weekday = new Intl.DateTimeFormat(locale, {
    timeZone: TOKYO,
    weekday: "long"
  }).format(now);

  const monthDay = new Intl.DateTimeFormat(locale, {
    timeZone: TOKYO,
    month: "long",
    day: "numeric"
  }).format(now);

  return {month, day, weekday, monthDay};
}

interface SeasonalDateProps {
  locale: string;
  /** 写真の上（light）かキャンバスの上（dark）か。 */
  variant?: "light" | "dark";
  className?: string;
}

export function SeasonalDate({
  locale,
  variant = "dark",
  className = ""
}: SeasonalDateProps) {
  const {month, day, weekday, monthDay} = tokyoParts(locale);
  const term = getSeasonalTerm(month, day);
  const vertical = isVerticalLocale(locale);

  const tone = variant === "light" ? "text-white" : "text-ink";
  const subTone = variant === "light" ? "text-white/70" : "text-muted";
  const ruleTone = variant === "light" ? "bg-white/40" : "bg-rule-strong";

  if (!vertical) {
    // 英語・韓国語は横組み。
    return (
      <div className={`mincho ${tone} ${className}`}>
        <p className="text-[11px] uppercase tracking-latin opacity-80">
          {weekday}
        </p>
        <p className="mt-1 text-[34px] font-normal leading-none">{monthDay}</p>
        <span className={`mt-4 block h-px w-8 ${ruleTone}`} aria-hidden="true" />
        <p className="mt-4 text-[15px] tracking-jp">{term.kanji}</p>
        <p className={`mt-1 text-[11px] tracking-jp-tight ${subTone}`}>
          {term.en}
        </p>
      </div>
    );
  }

  // 日本語・中国語は縦組み。右から「七月／二六／日曜日」の順に読ませる。
  return (
    <div className={`mincho flex items-start justify-end gap-3 ${tone} ${className}`}>
      <div className={`tategaki text-[11px] tracking-jp ${subTone} pt-1`}>
        {term.kana ? (
          <span>{locale === "ja" ? term.kana : term.en}</span>
        ) : null}
      </div>

      <div className="tategaki text-[15px] tracking-jp">{term.kanji}</div>

      <div className="flex items-start gap-2">
        <div className={`tategaki text-[11px] tracking-jp ${subTone} pt-1`}>
          {weekday}
        </div>
        <div className="tategaki text-[38px] leading-none">
          {toKanjiNumber(day)}
        </div>
        <div className="tategaki text-[13px] tracking-jp pt-1">
          {toKanjiNumber(month)}月
        </div>
      </div>
    </div>
  );
}
