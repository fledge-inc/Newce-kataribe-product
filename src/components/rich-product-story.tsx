"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Link} from "@/i18n/navigation";
import {useFavorites} from "@/lib/favorites";
import {ShareSheet} from "./share-sheet";
import {LanguagePill} from "./site-header";

const pages = [
  {
    src: "/images/kataribe-v2/story/kayanoya-dashi/page-01.png",
    alt: "The story of Kayanoya Dashi: a quiet depth drawn from the sea."
  },
  {
    src: "/images/kataribe-v2/story/kayanoya-dashi/page-02.png",
    alt: "Four ingredients: roasted flying fish, dried bonito, round herring and kombu kelp."
  },
  {
    src: "/images/kataribe-v2/story/kayanoya-dashi/page-03.png",
    alt: "How to prepare Kayanoya Dashi in three simple steps."
  },
  {
    src: "/images/kataribe-v2/story/kayanoya-dashi/page-04.png",
    alt: "Everyday dishes made with dashi: soup, simmered dishes, rice and tamagoyaki."
  },
  {
    src: "/images/kataribe-v2/story/kayanoya-dashi/page-05.png",
    alt: "Kayanoya Dashi contents, allergens, ingredients and nutrition per packet."
  },
  {
    src: "/images/kataribe-v2/story/kayanoya-dashi/page-06.png",
    alt: "Related dashi products, a guest review, save and social sharing options."
  }
] as const;

const relatedProducts = [
  {slug: "vegetable-dashi", label: "Vegetable Dashi", left: "4%"},
  {slug: "reduced-salt-dashi", label: "Reduced Salt Dashi", left: "35%"},
  {slug: "niboshi-dashi", label: "Niboshi Dashi", left: "66%"}
] as const;

const pad2 = (value: number) => String(value).padStart(2, "0");

export function RichProductStory({locale}: {locale: string}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(1);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const {has, toggle} = useFavorites();
  const productId = "product-kayanoya-dashi";

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.page);
        if (!Number.isNaN(index)) setCurrent(index);
      },
      {root: rail, threshold: [0.55, 0.75]}
    );

    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setShareOpen(true);
    }
  };

  const shareToLine = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Kayanoya Dashi");
    window.open(`https://line.me/R/msg/text/?${text}%0A${url}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative h-svh overflow-hidden bg-kinari">
      <div
        ref={railRef}
        className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain"
      >
        {pages.map((page, index) => (
          <section
            key={page.src}
            ref={(element) => {
              pageRefs.current[index] = element;
            }}
            data-page={index + 1}
            aria-label={`Story page ${index + 1} of ${pages.length}`}
            className="relative h-full snap-start snap-always overflow-hidden bg-kinari"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={page.src}
                alt={page.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 639px) 100vw, 420px"
                className="object-cover object-center"
              />

              {index === 5 && (
                <div className="absolute inset-0 z-10">
                  {relatedProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      locale={locale}
                      aria-label={`Open ${product.label}`}
                      className="absolute top-[56%] h-[22%] w-[30%] rounded-sm focus-visible:bg-white/15"
                      style={{left: product.left}}
                    />
                  ))}

                  <button
                    type="button"
                    aria-label={has(productId) ? "Remove saved product" : "Save product"}
                    onClick={() => toggle(productId)}
                    className="absolute left-[10%] top-[85%] h-[10%] w-[17%] rounded-full focus-visible:bg-white/20"
                  />
                  <button
                    type="button"
                    aria-label="Share Kayanoya Dashi"
                    onClick={() => setShareOpen(true)}
                    className="absolute left-[31%] top-[85%] h-[10%] w-[17%] rounded-full focus-visible:bg-white/20"
                  />
                  <button
                    type="button"
                    aria-label="Share on LINE"
                    onClick={shareToLine}
                    className="absolute left-[52%] top-[85%] h-[10%] w-[17%] rounded-full focus-visible:bg-white/20"
                  />
                  <button
                    type="button"
                    aria-label="Copy link"
                    onClick={copyLink}
                    className="absolute left-[73%] top-[85%] h-[10%] w-[17%] rounded-full focus-visible:bg-white/20"
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="absolute right-4 top-4 z-30 rounded-full shadow-[0_5px_22px_rgb(20_20_15_/_0.18)]">
        <LanguagePill />
      </div>

      <div
        className="pointer-events-none absolute right-5 top-[72px] z-20 min-w-[72px] rounded-sm bg-kinari/85 px-2 py-1 text-right shadow-[0_1px_10px_rgb(20_20_15_/_0.12)] backdrop-blur-[2px]"
        aria-live="polite"
      >
        <span key={current} className="counter-swap mincho text-[19px] text-ink">
          {pad2(current)}
        </span>
        <span className="mincho text-[13px] text-ink-soft"> / 06</span>
      </div>

      <nav
        className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3"
        aria-label="Story pages"
      >
        {pages.map((page, index) => (
          <button
            key={page.src}
            type="button"
            aria-label={`Go to page ${index + 1}`}
            aria-current={current === index + 1 ? "step" : undefined}
            onClick={() => pageRefs.current[index]?.scrollIntoView({behavior: "smooth", block: "start"})}
            className={`h-2.5 w-2.5 rounded-full border border-kinari/80 shadow-[0_1px_4px_rgb(20_20_15_/_0.32)] transition-colors ${
              current === index + 1 ? "bg-shu" : "bg-[#9c9587]"
            }`}
          />
        ))}
      </nav>

      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>

      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Kayanoya Dashi"
        isFavorite={has(productId)}
        onToggleFavorite={() => toggle(productId)}
      />
    </div>
  );
}
