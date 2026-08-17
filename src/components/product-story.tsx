"use client";

import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {useFavorites} from "@/lib/favorites";
import {CircleChevron, Chevron, SealDot} from "./glyphs";
import {Media} from "./media";
import {Reveal} from "./reveal";
import {ShareSheet} from "./share-sheet";

/** ものがたりの1コマ。文言はサーバ側でローカライズ済みのものを受け取る */
export interface StoryFrame {
  id: string;
  title: string;
  /** 見出しに添える金色の別言語表記（ja では英語、他言語では日本語） */
  kicker: string;
  lead?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  /** 基本の使い方の手順（usage のコマにだけ入る） */
  steps?: {number: number; text: string}[];
}

/** 原材料・アレルギー・栄養成分（details のコマで使う） */
export interface StoryDetails {
  ingredients: string;
  allergens: string[];
  nutrition: {label: string; value: string}[];
  basis: string;
}

/** 最後のコマから続く「となりの棚」への導線 */
export interface StoryNeighbor {
  slug: string;
  name: string;
}

interface ProductStoryProps {
  productId: string;
  badge: string;
  frames: StoryFrame[];
  details: StoryDetails;
  neighbors: StoryNeighbor[];
  locale: string;
}

/** ヘッダー(64px)の下に貼り付くバッジ+カウンター行の高さぶん */
const pad2 = (value: number) => String(value).padStart(2, "0");

export function ProductStory({
  productId,
  badge,
  frames,
  details,
  neighbors,
  locale
}: ProductStoryProps) {
  const t = useTranslations("Story");
  const tCommon = useTranslations("Common");
  const {has, toggle} = useFavorites();
  const [shareOpen, setShareOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const frameRefs = useRef<(HTMLElement | null)[]>([]);

  // アウトロも1コマとして数える
  const total = frames.length + 1;

  // 画面中央の帯に入ったコマを「いま読んでいるコマ」としてカウンターに映す
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.frame);
          if (!Number.isNaN(index)) setCurrent(index);
        }
      },
      {rootMargin: "-42% 0px -50% 0px", threshold: 0}
    );

    for (const element of frameRefs.current) {
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  const placeholder = tCommon("photoPending");

  return (
    <>
      {/* バッジと「03 / 20」。スクロールしても常に見える */}
      <div className="sticky top-[64px] z-30 bg-kinari">
        <div className="flex items-center justify-between gutter pb-2 pt-3">
          <span className="mincho rounded-[3px] bg-shu px-2.5 py-1 text-[11px] tracking-jp text-white">
            {badge}
          </span>
          <span className="mincho text-ink" aria-live="polite">
            <span
              key={current}
              className="counter-swap text-[26px] leading-none"
            >
              {pad2(current)}
            </span>
            <span className="text-[13px] text-muted"> / {pad2(total)}</span>
          </span>
        </div>
      </div>

      {frames.map((frame, index) => (
        <section
          key={frame.id}
          ref={(element) => {
            frameRefs.current[index] = element;
          }}
          data-frame={index + 1}
          className={`relative flex flex-col overflow-hidden ${
            frame.image ? "min-h-[86svh]" : "min-h-[58svh]"
          }`}
        >
          <div className="gutter pt-10">
            <Reveal>
              <h2 className="mincho text-[30px] leading-[1.45] tracking-jp text-ink">
                {frame.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mincho mt-2.5 text-[15px] italic tracking-[0.06em] text-kogane">
                {frame.kicker}
              </p>
            </Reveal>

            {frame.lead && (
              <Reveal delay={220}>
                <p className="mincho mt-9 max-w-[19ch] text-[20px] leading-[2.1] tracking-jp text-ink">
                  {frame.lead}
                </p>
              </Reveal>
            )}

            {frame.body && (
              <Reveal delay={300}>
                <p className="mt-6 max-w-[34ch] text-[13px] leading-8 tracking-jp-tight text-ink-soft">
                  {frame.body}
                </p>
              </Reveal>
            )}

            {/* 基本の使い方 — 3つの手順 */}
            {frame.steps && (
              <Reveal delay={360}>
                <ol className="mt-8 max-w-[36ch]">
                  {frame.steps.map((step, stepIndex) => (
                    <li
                      key={step.number}
                      className="relative grid grid-cols-[30px_1fr] gap-4 pb-6 last:pb-0"
                    >
                      {stepIndex < (frame.steps?.length ?? 0) - 1 && (
                        <span
                          className="absolute left-[14.5px] top-8 h-[calc(100%-32px)] w-px bg-rule"
                          aria-hidden="true"
                        />
                      )}
                      <span className="hairline-circle mincho h-[30px] w-[30px] text-[11px] text-ink-soft">
                        {step.number}
                      </span>
                      <span className="pt-1 text-[13px] leading-7 tracking-jp-tight text-ink-soft">
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {/* 原材料・アレルギー・栄養成分 */}
            {frame.id === "details" && (
              <Reveal delay={360}>
                <div className="mt-8 max-w-[38ch]">
                  <h3 className="mincho flex items-center gap-2 text-[12px] tracking-jp">
                    <SealDot />
                    {t("ingredientsHeading")}
                  </h3>
                  <p className="mt-2.5 text-[12px] leading-7 tracking-jp-tight text-ink-soft">
                    {details.ingredients}
                  </p>

                  <h3 className="mincho mt-7 flex items-center gap-2 text-[12px] tracking-jp">
                    <SealDot />
                    {t("allergensHeading")}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {details.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="mincho border border-rule-strong px-2.5 py-1 text-[10px] tracking-jp text-ink-soft"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>

                  <h3 className="mincho mt-7 flex items-center gap-2 text-[12px] tracking-jp">
                    <SealDot />
                    {t("nutritionHeading")}
                  </h3>
                  <p className="mt-2 text-[10px] tracking-jp-tight text-muted">
                    {details.basis}
                  </p>
                  <dl className="mt-3 border-t border-rule">
                    {details.nutrition.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between border-b border-rule py-2.5"
                      >
                        <dt className="text-[12px] tracking-jp-tight text-ink-soft">
                          {row.label}
                        </dt>
                        <dd className="mincho m-0 text-[12px] tracking-jp-tight text-ink">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}
          </div>

          {/* 和紙に溶け込ませた写真。コマの下端いっぱいに置く */}
          {frame.image && frame.imageAlt && (
            <Reveal delay={200} className="pointer-events-none mt-auto self-end pt-8">
              <Media
                src={frame.image}
                alt={frame.imageAlt}
                placeholderLabel={placeholder}
                width={840}
                height={640}
                sizes="(max-width: 639px) 92vw, 400px"
                className="photo-blend photo-fade ml-auto block w-[88%]"
                imageClassName="h-auto w-full object-cover"
              />
            </Reveal>
          )}
        </section>
      ))}

      {/* むすび — 共有と次の導線 */}
      <section
        ref={(element) => {
          frameRefs.current[frames.length] = element;
        }}
        data-frame={total}
        className="flex min-h-[86svh] flex-col gutter pb-20 pt-10"
      >
        <Reveal>
          <h2 className="mincho text-[30px] leading-[1.45] tracking-jp text-ink">
            {t("epilogueTitle")}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mincho mt-2.5 text-[15px] italic tracking-[0.06em] text-kogane">
            {t("epilogueKicker")}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-8 max-w-[34ch] text-[13px] leading-8 tracking-jp-tight text-ink-soft">
            {t("epilogueBody")}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="mincho flex min-h-12 items-center justify-center bg-sumi text-[12px] tracking-jp text-white"
            >
              {t("share")}
            </button>
            <a
              href="https://www.kayanoya.com/"
              target="_blank"
              rel="noreferrer"
              className="mincho flex min-h-12 items-center justify-center border border-ink text-[12px] tracking-jp text-ink"
            >
              {t("online")}
            </a>
          </div>
        </Reveal>

        {neighbors.length > 0 && (
          <Reveal delay={360}>
            <div className="mt-12">
              <h3 className="mincho flex items-center gap-2 text-[12px] tracking-jp">
                <SealDot />
                {t("neighborsTitle")}
              </h3>
              <ul className="mt-4 border-t border-rule">
                {neighbors.map((neighbor) => (
                  <li key={neighbor.slug} className="border-b border-rule">
                    <Link
                      href={`/products/${neighbor.slug}`}
                      locale={locale}
                      className="mincho flex min-h-[52px] items-center justify-between text-[13px] tracking-jp-tight text-ink"
                    >
                      {neighbor.name}
                      <Chevron size={10} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal delay={420} className="mt-auto">
          <Link
            href="/"
            locale={locale}
            className="mincho mt-12 flex min-h-12 items-center justify-between border-b border-rule-strong text-[13px] tracking-jp text-ink"
          >
            <span>{t("backToMap")}</span>
            <CircleChevron size={24} />
          </Link>
        </Reveal>
      </section>

      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={badge}
        isFavorite={has(productId)}
        onToggleFavorite={() => toggle(productId)}
      />
    </>
  );
}
