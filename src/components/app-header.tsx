"use client";

import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";

interface AppHeaderProps {
  title: string;
  back?: boolean;
  /**
   * ヒーロー写真の上に重ねる。ページを少しスクロールすると和紙地に切り替わる。
   */
  overlay?: boolean;
}

/** 罫線だけで組んだメニュー記号（lucide の Menu より細く、和の線に近い）。 */
function RuleStack() {
  return (
    <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden="true">
      <span className="h-px w-full bg-current" />
      <span className="h-px w-full bg-current" />
      <span className="h-px w-full bg-current" />
    </span>
  );
}

function BackArrow() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
      <path
        d="M19 6H1M1 6l5-5M1 6l5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function GlobeGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="10" cy="10" r="8.5" />
        <ellipse cx="10" cy="10" rx="4" ry="8.5" />
        <path d="M1.9 7.2h16.2M1.9 12.8h16.2" />
      </g>
    </svg>
  );
}

export function AppHeader({
  title,
  back = false,
  overlay = false
}: AppHeaderProps) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const [solid, setSolid] = useState(!overlay);

  useEffect(() => {
    if (!overlay) {
      setSolid(true);
      return;
    }

    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const tone = solid ? "text-ink" : "text-white";
  const surface = solid
    ? "bg-washi/95 border-b border-rule backdrop-blur-[2px]"
    : "bg-transparent border-b border-transparent";

  return (
    <header
      className={`sticky top-0 z-30 flex h-[60px] items-center px-3 transition-colors duration-300 ${surface} ${tone} ${
        solid ? "" : "on-dark text-on-photo glyph-on-photo"
      }`}
    >
      <div className="w-11">
        {back ? (
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-11 w-11 items-center justify-center"
            aria-label={t("back")}
          >
            <BackArrow />
          </button>
        ) : (
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            aria-label={t("menu")}
          >
            <RuleStack />
          </button>
        )}
      </div>

      <h1
        className={`mincho min-w-0 flex-1 truncate px-1 text-center text-[15px] tracking-jp transition-opacity duration-300 ${
          overlay && !solid ? "opacity-0" : "opacity-100"
        }`}
      >
        {title}
      </h1>

      <button
        type="button"
        onClick={() => router.push("/", {locale})}
        className="flex h-11 w-11 items-center justify-center"
        aria-label={t("changeLanguage")}
      >
        <GlobeGlyph />
      </button>
    </header>
  );
}
