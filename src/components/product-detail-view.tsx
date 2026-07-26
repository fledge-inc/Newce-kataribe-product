import type {Product} from "@/types/content";
import {getLocalizedText} from "@/lib/localized";
import {tategakiClass} from "@/lib/typography";
import {ImageWithFallback} from "./image-with-fallback";
import {AnchorTabs} from "./anchor-tabs";
import {
  BagGlyph,
  CaptionsGlyph,
  PinGlyph,
  PlayTriangle,
  SealDot,
  ShareGlyph
} from "./glyphs";

interface ProductDetailViewProps {
  product: Product;
  locale: string;
  labels: {
    recommendedFor: string;
    features: string;
    usage: string;
    materials: string;
    comparison: string;
    details: string;
    usageTitle: string;
    showShelf: string;
    showStaff: string;
    share: string;
    videoCaption: string;
  };
}

/** セクション見出しに添える漢数字の通し番号。 */
const sectionIndex = ["一", "二", "三", "四", "五"];

export function ProductDetailView({
  product,
  locale,
  labels
}: ProductDetailViewProps) {
  const tabs = [
    {id: "features", label: labels.features},
    {id: "usage", label: labels.usage},
    {id: "materials", label: labels.materials},
    {id: "comparison", label: labels.comparison},
    {id: "details", label: labels.details}
  ];

  const tategaki = tategakiClass(locale);
  const name = getLocalizedText(product.name, locale);

  return (
    <>
      {/* ヒーロー — 全画面写真に商品名を縦組みで重ねる */}
      <section className="on-dark relative -mt-[60px] aspect-[390/480] w-full overflow-hidden bg-sumi text-white">
        <ImageWithFallback
          src={product.image}
          alt={getLocalizedText(product.imageAlt, locale)}
          fill
          sizes="(max-width: 430px) 100vw, 390px"
          priority
          className="absolute inset-0"
          imageClassName="object-cover"
        />
        <div className="veil-hero absolute inset-0" aria-hidden="true" />

        <div className="text-on-photo absolute inset-0 flex flex-col px-6 pb-7 pt-[76px]">
          {/* 縦組みは上から流し、横組みは下端に寄せて写真を大きく見せる */}
          <div
            className={`flex flex-1 justify-end overflow-hidden ${
              tategaki ? "items-start" : "items-end pb-5"
            }`}
          >
            {tategaki ? (
              <h1
                className={`mincho ${tategaki} max-h-full text-[27px] leading-[1.7] tracking-jp`}
              >
                {name}
              </h1>
            ) : (
              <h1 className="mincho max-w-[240px] text-right text-[26px] leading-[1.35] tracking-jp-tight">
                {name}
              </h1>
            )}
          </div>

          {/* 商品写真は中央〜右に寄るため、再生ボタンは空きやすい左下に置く */}
          <div className="flex items-end justify-between gap-4">
            <button
              type="button"
              className="hairline-circle h-12 w-12 text-white"
              aria-label="Play"
            >
              <span className="ml-0.5">
                <PlayTriangle size={13} />
              </span>
            </button>
            <p className="text-right text-[9px] tracking-latin text-white/75">
              {product.romanizedName}
            </p>
          </div>
        </div>
      </section>

      {/* 導入 */}
      <section className="bg-washi px-6 pb-9 pt-8">
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={getLocalizedText(tag, locale)}
              className="mincho border border-rule-strong px-2.5 py-1 text-[10px] tracking-jp text-ink-soft"
            >
              {getLocalizedText(tag, locale)}
            </span>
          ))}
        </div>

        <p className="mincho mt-6 text-[17px] leading-8 tracking-jp-tight">
          {getLocalizedText(product.shortDescription, locale)}
        </p>
        <p className="mt-4 text-[13px] leading-7 tracking-jp-tight text-muted">
          {getLocalizedText(product.summary, locale)}
        </p>

        <div className="mt-8 border-y border-rule py-5">
          <p className="mincho flex items-center gap-2 text-[11px] tracking-jp">
            <SealDot />
            {labels.recommendedFor}
          </p>
          <p className="mt-2.5 text-[12px] leading-6 tracking-jp-tight text-muted">
            {getLocalizedText(product.recommendation, locale)}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-[11px] tracking-jp-tight text-muted">
          <CaptionsGlyph size={14} />
          {labels.videoCaption}
        </div>
      </section>

      <AnchorTabs tabs={tabs} />

      {/* 本文 — カードをやめ、全幅のブロックを罫線で区切る */}
      <div className="pb-36">
        {product.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="section-anchor border-b border-rule bg-washi"
          >
            <div className="px-6 pb-8 pt-9">
              <div className="flex items-center gap-3">
                <span className="mincho text-[11px] tracking-jp text-muted">
                  {sectionIndex[index] ?? index + 1}
                </span>
                <span
                  className="h-px w-5 flex-none bg-rule-strong"
                  aria-hidden="true"
                />
                <h2 className="mincho text-[18px] tracking-jp">
                  {getLocalizedText(section.title, locale)}
                </h2>
              </div>
              <p className="mt-5 text-[13px] leading-8 tracking-jp-tight text-ink-soft">
                {getLocalizedText(section.body, locale)}
              </p>
            </div>

            {section.image && section.imageAlt && (
              <ImageWithFallback
                src={section.image}
                alt={getLocalizedText(section.imageAlt, locale)}
                width={780}
                height={480}
                sizes="(max-width: 430px) 100vw, 390px"
                className="aspect-[390/240] w-full bg-kinari"
                imageClassName="h-full w-full object-cover"
              />
            )}

            {section.id === "usage" && (
              <div className="px-6 pb-9 pt-8">
                <h3 className="mincho text-[13px] tracking-jp">
                  {labels.usageTitle}
                </h3>
                <ol className="mt-5">
                  {product.usageSteps.map((step, stepIndex) => (
                    <li
                      key={step.number}
                      className="relative grid grid-cols-[30px_1fr] gap-4 pb-6 last:pb-0"
                    >
                      {stepIndex < product.usageSteps.length - 1 && (
                        <span
                          className="absolute left-[14.5px] top-8 h-[calc(100%-32px)] w-px bg-rule"
                          aria-hidden="true"
                        />
                      )}
                      <span className="hairline-circle mincho h-[30px] w-[30px] text-[11px] text-ink-soft">
                        {step.number}
                      </span>
                      <span className="pt-1 text-[13px] leading-7 tracking-jp-tight text-ink-soft">
                        {getLocalizedText(step.text, locale)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* 固定 CTA */}
      <div className="mobile-fixed border-t border-rule bg-washi p-3">
        <div className="grid grid-cols-[1fr_1.3fr_48px] gap-2">
          <button
            type="button"
            className="mincho flex min-h-12 items-center justify-center gap-1.5 border border-ink px-2 text-[11px] tracking-jp"
          >
            <PinGlyph size={14} />
            {labels.showShelf}
          </button>
          <button
            type="button"
            className="mincho flex min-h-12 items-center justify-center gap-1.5 bg-sumi px-2 text-[11px] tracking-jp text-white"
          >
            <BagGlyph size={14} />
            {labels.showStaff}
          </button>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center border border-rule-strong"
            aria-label={labels.share}
          >
            <ShareGlyph size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
