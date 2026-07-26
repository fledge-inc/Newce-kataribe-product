"use client";

import {useLocale, useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

/**
 * lucide の塗り気味なアイコンをやめ、1px の線画に統一する。
 * 罫線設計に馴染ませるため stroke は常に 1。
 */
const glyphs = {
  home: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 9.2 11 3l8 6.2" />
      <path d="M5.2 10.6V19h11.6v-8.4" />
    </g>
  ),
  products: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3.5 6.6 11 3l7.5 3.6v8.8L11 19l-7.5-3.6z" />
      <path d="M3.5 6.6 11 10.2l7.5-3.6M11 10.2V19" />
    </g>
  ),
  recipes: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M11 5.6C9.4 4.2 6.9 3.7 3.6 4v12.4c3.3-.3 5.8.2 7.4 1.6 1.6-1.4 4.1-1.9 7.4-1.6V4c-3.3-.3-5.8.2-7.4 1.6z" />
      <path d="M11 5.6v12.4" />
    </g>
  ),
  store: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M11 19c3.6-4.3 5.4-7.4 5.4-9.4A5.4 5.4 0 0 0 5.6 9.6C5.6 11.6 7.4 14.7 11 19z" />
      <circle cx="11" cy="9.5" r="2.1" />
    </g>
  )
} as const;

function NavGlyph({name}: {name: keyof typeof glyphs}) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      {glyphs[name]}
    </svg>
  );
}

export function BottomNav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  // ハッシュ項目（/store#recipes 等）は同一ページ内アンカーなので、
  // ルートで見ると常に /store に一致してしまう。現在地の印は付けない。
  const items = [
    {href: "/store", label: t("home"), glyph: "home", route: "/store"},
    {
      href: "/products",
      label: t("products"),
      glyph: "products",
      route: "/products"
    },
    {href: "/store#recipes", label: t("recipes"), glyph: "recipes", route: null},
    {href: "/store#info", label: t("store"), glyph: "store", route: null}
  ] as const;

  return (
    <nav
      className="mobile-fixed grid h-[68px] grid-cols-4 border-t border-rule bg-washi"
      aria-label="Primary"
    >
      {items.map((item) => {
        const active =
          item.route === "/store"
            ? pathname === "/store"
            : item.route !== null && pathname.startsWith(item.route);

        return (
          <Link
            key={item.href}
            href={item.href}
            locale={locale}
            className={`relative flex min-h-11 flex-col items-center justify-center gap-1.5 ${
              active ? "text-ink" : "text-muted"
            }`}
          >
            {active && (
              <span
                className="absolute inset-x-5 top-0 h-px bg-ink"
                aria-hidden="true"
              />
            )}
            <NavGlyph name={item.glyph} />
            <span className="mincho text-[10px] tracking-jp">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
