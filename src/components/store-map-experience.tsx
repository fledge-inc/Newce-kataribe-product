"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {CircleChevron, CloseGlyph} from "./glyphs";
import {ImageWithFallback} from "./image-with-fallback";
import {Media} from "./media";

export interface MapProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  imageAlt: string;
  x: number;
  y: number;
}

function ProductPin({active}: {active: boolean}) {
  return (
    <svg
      width={active ? 34 : 28}
      height={active ? 40 : 34}
      viewBox="0 0 28 34"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgb(20_20_15_/_0.28)]"
    >
      <path
        d="M14 33C9.2 26.2 4 20.9 4 13.5a10 10 0 1 1 20 0c0 7.4-5.2 12.7-10 19.5Z"
        fill={active ? "var(--shu)" : "var(--washi)"}
        stroke="var(--shu)"
        strokeWidth="1.5"
      />
      <circle
        cx="14"
        cy="13.5"
        r="4"
        fill={active ? "var(--washi)" : "none"}
        stroke="var(--shu)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function StoreMapExperience({
  products,
  locale
}: {
  products: MapProduct[];
  locale: string;
}) {
  const t = useTranslations("StoreMap");
  const tCommon = useTranslations("Common");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = products.find((product) => product.id === selectedId);

  return (
    <section
      id="info"
      className="relative -mt-[60px] h-[calc(100svh-68px)] min-h-[620px] overflow-hidden bg-sumi"
      aria-label={t("title")}
    >
      <ImageWithFallback
        src="/images/store/kayanoya-store-map.webp"
        alt={t("imageAlt")}
        fill
        sizes="(max-width: 639px) 100vw, 420px"
        priority
        className="absolute inset-0"
        imageClassName="object-cover object-center"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-sumi/55 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute left-0 top-[82px] z-10 border-y border-r border-rule bg-washi px-5 py-4">
        <h2 className="mincho text-[19px] tracking-jp-tight text-ink">
          {t("title")}
        </h2>
        <p className="mt-1.5 text-[11px] tracking-jp-tight text-muted">
          {t("hint")}
        </p>
      </div>

      <div className="absolute inset-0 z-10" aria-label={t("productsLabel")}>
        {products.map((product) => {
          const active = product.id === selectedId;

          return (
            <button
              key={product.id}
              type="button"
              aria-label={`${t("openProduct")}: ${product.name}`}
              aria-pressed={active}
              onClick={() => setSelectedId(product.id)}
              className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-full items-end justify-center transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
              style={{left: `${product.x}%`, top: `${product.y}%`}}
            >
              <ProductPin active={active} />
            </button>
          );
        })}
      </div>

      {selected && (
        <aside
          className="absolute inset-x-0 bottom-0 z-20 border-t border-rule-strong bg-washi shadow-[0_-8px_24px_rgb(20_20_15_/_0.14)]"
          aria-label={selected.name}
        >
          <div className="flex h-7 items-center justify-center">
            <span className="h-px w-10 bg-rule-strong" aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-muted"
            aria-label={tCommon("close")}
          >
            <CloseGlyph size={12} />
          </button>

          <div className="grid grid-cols-[116px_minmax(0,1fr)] gap-5 px-5 pb-6">
            <Media
              src={selected.image}
              alt={selected.imageAlt}
              placeholderLabel={tCommon("photoPending")}
              width={232}
              height={280}
              sizes="116px"
              className="h-[140px] w-[116px] bg-kinari"
              imageClassName="h-full w-full object-cover"
            />

            <div className="min-w-0 pt-1">
              <p className="text-[9px] uppercase tracking-latin text-muted">
                {selected.category}
              </p>
              <h3 className="mincho mt-2 text-[20px] leading-7 tracking-jp-tight text-ink">
                {selected.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-muted">
                {selected.description}
              </p>

              <Link
                href={`/products/${selected.slug}`}
                locale={locale}
                className="mincho mt-4 flex min-h-11 items-center justify-between border-b border-rule-strong text-[12px] tracking-jp-tight text-ink"
              >
                <span>{t("viewDetails")}</span>
                <CircleChevron size={22} />
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="mincho mx-5 mb-4 min-h-11 text-[11px] tracking-jp-tight text-muted"
          >
            {t("backToMap")}
          </button>
        </aside>
      )}
    </section>
  );
}
