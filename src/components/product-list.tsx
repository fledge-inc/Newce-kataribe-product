"use client";

import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {useMemo, useState} from "react";
import {categories, products} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import type {ProductCategoryId} from "@/types/content";
import {CloseGlyph, SearchGlyph, SlidersGlyph} from "./glyphs";
import {ProductCard} from "./product-card";

export function ProductList() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategoryId>(
    categories.some((item) => item.id === initialCategory)
      ? (initialCategory as ProductCategoryId)
      : "all"
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const searchable = [
        getLocalizedText(product.name, locale),
        getLocalizedText(product.shortDescription, locale),
        ...product.tags.map((tag) => getLocalizedText(tag, locale))
      ]
        .join(" ")
        .toLocaleLowerCase(locale);
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [category, locale, query]);

  const clear = () => {
    setCategory("all");
    setQuery("");
  };

  return (
    <>
      <div className="bg-washi px-6 pt-5">
        {/* 検索 — 塗りの箱をやめ、下罫線だけにする */}
        <label className="relative block border-b border-rule">
          <span className="sr-only">{t("Products.searchPlaceholder")}</span>
          <span
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            <SearchGlyph />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("Products.searchPlaceholder")}
            className="mincho h-12 w-full appearance-none rounded-none border-0 bg-transparent pl-7 pr-11 text-[13px] tracking-jp-tight outline-none placeholder:text-muted/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-muted"
              aria-label={t("Common.clearFilters")}
            >
              <CloseGlyph />
            </button>
          )}
        </label>

        {/* カテゴリー — ピルをやめ、縦ヘアライン区切りのタブに */}
        <div
          className="hide-scrollbar -mx-6 mt-1 flex overflow-x-auto px-6"
          aria-label={t("Store.categories")}
        >
          {categories.map((item, index) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={`relative flex min-h-[46px] flex-none items-center px-4 ${
                  active ? "text-ink" : "text-muted"
                }`}
              >
                {index > 0 && (
                  <span
                    className="absolute left-0 top-1/2 h-3.5 w-px -translate-y-1/2 bg-rule"
                    aria-hidden="true"
                  />
                )}
                <span className="mincho whitespace-nowrap text-[12px] tracking-jp">
                  {getLocalizedText(item.label, locale)}
                </span>
                {active && (
                  <span
                    className="absolute inset-x-3 bottom-1 h-px bg-ink"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-11 items-center justify-between border-y border-rule bg-kinari px-6">
        <p className="text-[10px] tracking-jp text-muted">
          {t("Products.count", {count: filtered.length})}
        </p>
        <button
          type="button"
          className="flex min-h-11 items-center gap-2 text-[10px] tracking-jp"
        >
          <SlidersGlyph size={14} />
          {t("Products.compare")}
        </button>
      </div>

      {filtered.length > 0 ? (
        <div>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              variant="row"
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[340px] flex-col items-center justify-center px-8 text-center">
          <span className="h-6 w-px bg-rule-strong" aria-hidden="true" />
          <p className="mincho mt-6 text-[15px] tracking-jp">
            {t("Common.noResults")}
          </p>
          <button
            type="button"
            onClick={clear}
            className="mincho mt-4 min-h-11 border-b border-ink px-1 text-[12px] tracking-jp"
          >
            {t("Common.clearFilters")}
          </button>
        </div>
      )}
    </>
  );
}
