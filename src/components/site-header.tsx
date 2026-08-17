"use client";

import {useEffect, useRef, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter, Link} from "@/i18n/navigation";
import type {Locale} from "@/types/content";
import {Chevron, SealDot} from "./glyphs";

const languageOptions: {locale: Locale; label: string; short: string}[] = [
  {locale: "ja", label: "日本語", short: "JA"},
  {locale: "en", label: "English", short: "EN"},
  {locale: "zh-CN", label: "简体中文", short: "CN"},
  {locale: "zh-TW", label: "繁體中文", short: "TW"},
  {locale: "ko", label: "한국어", short: "KO"}
];

function GlobeGlyph({size = 15}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="10" cy="10" r="8.5" />
        <ellipse cx="10" cy="10" rx="4" ry="8.5" />
        <path d="M1.9 7.2h16.2M1.9 12.8h16.2" />
      </g>
    </svg>
  );
}

/**
 * 言語選択画面の代わりに置く切替ピル。
 * 「🌐 日本語 ▼」を押すとその場でドロップダウンが開き、
 * 現在のページのまま locale だけ差し替える。
 */
function LanguagePill() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current =
    languageOptions.find((option) => option.locale === locale) ??
    languageOptions[0];

  // 外側タップと Esc で閉じる
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("changeLanguage")}
        className="flex min-h-9 items-center gap-1.5 rounded-full border border-rule-strong bg-washi px-3.5 text-ink"
      >
        <GlobeGlyph />
        <span className="mincho text-[12px] tracking-jp-tight">
          {current.label}
        </span>
        <Chevron size={8} direction="down" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("changeLanguage")}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[168px] border border-rule-strong bg-washi py-1 shadow-[0_10px_28px_rgb(20_20_15_/_0.16)]"
        >
          {languageOptions.map((option) => {
            const selected = option.locale === locale;
            return (
              <li key={option.locale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, {locale: option.locale});
                  }}
                  className="flex min-h-11 w-full items-center gap-2.5 px-4 text-left"
                >
                  <span className="w-[5px] flex-none">
                    {selected && <SealDot />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mincho block text-[13px] tracking-jp-tight text-ink">
                      {option.label}
                    </span>
                  </span>
                  <span className="text-[8px] uppercase tracking-latin text-muted">
                    {option.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/**
 * 2画面共通のヘッダー。左に筆書きの「かたりべ」ロゴ（ホームへ戻る）、
 * 右に言語切替ピル。参考画像の構図をそのまま持つ。
 */
export function SiteHeader() {
  const t = useTranslations("Common");

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-kinari">
      <div className="flex h-[64px] items-center justify-between gutter">
        <Link href="/" aria-label={t("brand")} className="block">
          <span className="fude block text-[26px] leading-none text-kogane">
            かたりべ
          </span>
          <span className="mincho mt-1 block text-[8px] uppercase tracking-[0.42em] text-kogane/80">
            Kataribe
          </span>
        </Link>
        <LanguagePill />
      </div>
    </header>
  );
}
