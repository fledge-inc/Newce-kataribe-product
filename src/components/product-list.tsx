"use client";

import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {useMemo, useState} from "react";
import {categories, products} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import type {Product, ProductCategoryId} from "@/types/content";
import {useRouter} from "@/i18n/navigation";
import {CloseGlyph, SearchGlyph, SlidersGlyph} from "./glyphs";
import {Media} from "./media";
import {ProductCard} from "./product-card";

const MAX_COMPARE = 3;

/** 比較の選択モードで使う行。通常時は ProductCard(row) に委ねる。 */
function SelectableRow({
  product,
  locale,
  selected,
  disabled,
  onToggle,
  placeholderLabel
}: {
  product: Product;
  locale: string;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
  placeholderLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled && !selected}
      aria-pressed={selected}
      className={`gutter grid min-h-[120px] w-full grid-cols-[20px_96px_1fr] items-center gap-4 border-b border-rule bg-washi py-5 text-left ${
        disabled && !selected ? "opacity-40" : ""
      }`}
    >
      <span
        className={`flex h-[18px] w-[18px] items-center justify-center border ${
          selected ? "border-shu bg-shu" : "border-rule-strong"
        }`}
        aria-hidden="true"
      >
        {selected && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="m1.6 5.2 2.2 2.2L8.4 2.6"
              fill="none"
              stroke="#fff"
              strokeWidth="1.2"
            />
          </svg>
        )}
      </span>
      <Media
        src={product.image}
        alt={getLocalizedText(product.imageAlt, locale)}
        placeholderLabel={placeholderLabel}
        width={192}
        height={192}
        sizes="96px"
        className="h-[96px] w-[96px] bg-kinari"
        imageClassName="h-full w-full object-cover"
      />
      <span className="min-w-0">
        <span className="mincho block text-[16px] leading-7 tracking-jp-tight">
          {getLocalizedText(product.name, locale)}
        </span>
        <span className="mt-1.5 block text-[12px] leading-6 text-muted">
          {getLocalizedText(product.shortDescription, locale)}
        </span>
      </span>
    </button>
  );
}

export function ProductList() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategoryId>(
    categories.some((item) => item.id === initialCategory)
      ? (initialCategory as ProductCategoryId)
      : "all"
  );
  const [comparing, setComparing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

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

  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
          ? [...prev, id]
          : prev
    );

  const exitCompare = () => {
    setComparing(false);
    setSelected([]);
  };

  const placeholderLabel = t("Common.photoPending");

  return (
    <>
      <div className="gutter bg-washi pt-5">
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
          className="hide-scrollbar gutter gutter-x mt-1 flex overflow-x-auto"
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

      <div className="gutter flex min-h-11 items-center justify-between border-y border-rule bg-kinari">
        <p className="text-[10px] tracking-jp text-muted">
          {comparing
            ? t("Products.compareHint")
            : t("Products.count", {count: filtered.length})}
        </p>
        <button
          type="button"
          onClick={() => (comparing ? exitCompare() : setComparing(true))}
          className="flex min-h-11 items-center gap-2 text-[10px] tracking-jp"
        >
          {!comparing && <SlidersGlyph size={14} />}
          {comparing ? t("Products.compareCancel") : t("Products.compare")}
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className={comparing ? "pb-20" : undefined}>
          {filtered.map((product) =>
            comparing ? (
              <SelectableRow
                key={product.id}
                product={product}
                locale={locale}
                selected={selected.includes(product.id)}
                disabled={selected.length >= MAX_COMPARE}
                onToggle={() => toggleSelect(product.id)}
                placeholderLabel={placeholderLabel}
              />
            ) : (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                variant="row"
              />
            )
          )}
        </div>
      ) : (
        <div className="gutter flex min-h-[340px] flex-col items-center justify-center text-center">
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

      {/* 選択モードのバー。ボトムナビの上に重ねる */}
      {comparing && (
        <div className="mobile-fixed bottom-[68px] border-t border-rule bg-washi p-3">
          <button
            type="button"
            disabled={selected.length < 2}
            onClick={() =>
              router.push(`/compare?ids=${selected.join(",")}`, {locale})
            }
            className={`mincho flex min-h-12 w-full items-center justify-center text-[12px] tracking-jp ${
              selected.length >= 2
                ? "bg-sumi text-white"
                : "border border-rule text-muted"
            }`}
          >
            {selected.length >= 2
              ? t("Products.compareGo", {count: selected.length})
              : t("Products.compareMax")}
          </button>
        </div>
      )}
    </>
  );
}
