import type {Product} from "@/types/content";
import {getLocalizedText} from "@/lib/localized";
import {Link} from "@/i18n/navigation";
import {Media} from "./media";

/** 3段階の評価。星ではなく朱の点で示し、意匠に揃える。 */
function Level({value, max = 3}: {value: number; max?: number}) {
  return (
    <span className="flex items-center gap-1" aria-label={`${value} / ${max}`}>
      {Array.from({length: max}, (_, i) => (
        <span
          key={i}
          className={`h-[5px] w-[5px] ${
            i < value ? "bg-shu" : "border border-rule-strong"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

type RowKey =
  | "base"
  | "taste"
  | "dishes"
  | "usage"
  | "dietary"
  | "beginner"
  | "gift";

/**
 * 比較表（参考画面08）。最大3商品。
 * 列が増えると横に溢れるため、外側で overflow-x を閉じ込める。
 */
export function CompareTable({
  items,
  locale,
  rowLabels
}: {
  items: Product[];
  locale: string;
  rowLabels: Record<RowKey, string>;
}) {
  const rows: RowKey[] = [
    "base",
    "taste",
    "dishes",
    "usage",
    "dietary",
    "beginner",
    "gift"
  ];

  // 見出し列 + 商品列。3商品でも 430px に収まる幅にする
  const gridCols = `88px repeat(${items.length}, minmax(104px, 1fr))`;

  return (
    <div className="hide-scrollbar overflow-x-auto">
      <div style={{minWidth: 88 + items.length * 104}}>
        {/* 商品サムネの行 */}
        <div
          className="grid border-b border-rule-strong"
          style={{gridTemplateColumns: gridCols}}
        >
          <div aria-hidden="true" />
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              locale={locale}
              className="border-l border-rule px-2 py-3"
            >
              <Media
                src={product.image}
                alt={getLocalizedText(product.imageAlt, locale)}
                placeholderLabel={getLocalizedText(product.name, locale)}
                width={208}
                height={208}
                sizes="104px"
                loading="eager"
                className="aspect-square w-full bg-washi"
                imageClassName="h-full w-full object-cover"
              />
              <span className="mincho mt-2 block text-[11px] leading-4 tracking-jp-tight">
                {getLocalizedText(product.name, locale)}
              </span>
            </Link>
          ))}
        </div>

        {rows.map((row) => (
          <div
            key={row}
            className="grid border-b border-rule"
            style={{gridTemplateColumns: gridCols}}
          >
            <div className="bg-kinari px-3 py-3">
              <span className="mincho text-[10px] leading-4 tracking-jp text-muted">
                {rowLabels[row]}
              </span>
            </div>
            {items.map((product) => (
              <div key={product.id} className="border-l border-rule px-3 py-3">
                {row === "beginner" || row === "gift" ? (
                  <Level value={product.compare[row]} />
                ) : (
                  <span className="text-[11px] leading-5 tracking-jp-tight text-ink-soft">
                    {getLocalizedText(product.compare[row], locale)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
