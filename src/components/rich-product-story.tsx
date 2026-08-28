"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Instagram, MessageCircle, Phone, Star} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {LanguagePill} from "./site-header";

const pages = [
  {image: "/images/products/kayanoya-dashi.jpg", alt: "A silver pouch of Kayanoya Original Dashi Stock Powder.", position: "center 54%"},
  {image: "/images/ingredients/dashi-ingredients.jpg", alt: "Roasted flying fish used to make Kayanoya Dashi.", position: "center"},
  {image: "/images/kataribe-v2/story/kayanoya-dashi/backgrounds/page-03-bg.png", alt: "Kayanoya Dashi being prepared in hot water.", position: "center 46%"},
  {image: "/images/kataribe-v2/story/kayanoya-dashi/backgrounds/page-04-bg.png", alt: "Everyday dishes prepared with dashi.", position: "center 57%"},
  {image: "/images/kataribe-v2/story/kayanoya-dashi/backgrounds/page-05-bg.png", alt: "Kayanoya Dashi pouch, packet and Japanese ingredients.", position: "center 56%"},
  {image: "/images/kataribe-v2/story/kayanoya-dashi/backgrounds/page-06-bg.png", alt: "A warm cup of dashi with Kayanoya products.", position: "center 8%"}
] as const;

const relatedProducts = [
  {
    label: "Vegetable Dashi",
    image: "/images/products/vegetable-dashi.jpg",
    shopUrl: "https://www.kubara.jp/kayanoya/all_dashi/yasaidashi/586000/"
  },
  {
    label: "Reduced Salt Dashi",
    image: "/images/products/reduced-salt-dashi.jpg",
    shopUrl: "https://www.kubara.jp/kayanoya/dashi/genen-kayanoyadashi/577500/"
  },
  {
    label: "Niboshi Dashi",
    image: "/images/products/niboshi-dashi.jpg",
    shopUrl: "https://www.kubara.jp/kayanoya/all_dashi/niboshidashi/"
  }
] as const;

const pad2 = (value: number) => String(value).padStart(2, "0");

function Reveal({children, className = "", delay = 0}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`story-reveal ${className}`} style={{transitionDelay: `${delay}ms`}}>
      {children}
    </div>
  );
}

function StoryCopy({page}: {page: number}) {
  if (page === 1) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>KAYANOYA ORIGINAL</Reveal>
        <Reveal delay={210}><h1 className="story-heading">Kayanoya<br />Dashi</h1></Reveal>
        <Reveal className="story-rule" delay={350}><span /></Reveal>
        <Reveal delay={460}>
          <p className="story-body story-intro-copy">A clear depth, drawn from the sea. Four carefully selected Japanese ingredients make authentic dashi simple for everyday cooking.</p>
        </Reveal>
        <Reveal className="story-scroll-cue" delay={650}>SCROLL TO DISCOVER <span aria-hidden="true">↓</span></Reveal>
      </>
    );
  }

  if (page === 2) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>FOUR JAPANESE INGREDIENTS</Reveal>
        <Reveal delay={220}><h2 className="story-heading story-heading-sm">Depth, aroma,<br />and a clean finish.</h2></Reveal>
        <Reveal className="story-rule" delay={360}><span /></Reveal>
        <Reveal delay={470}>
          <p className="story-body">Grilled ago brings aroma. Bonito and round herring add depth and gentle sweetness. Ma kombu gives the stock its refined finish.</p>
        </Reveal>
        <Reveal className="story-chip-grid" delay={640}>
          <span>GRILLED AGO</span><span>BONITO FLAKES</span>
          <span>ROUND HERRING</span><span>MA KOMBU</span>
        </Reveal>
      </>
    );
  }

  if (page === 3) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>HOW TO PREPARE</Reveal>
        <Reveal delay={220}><h2 className="story-heading story-heading-sm">Authentic dashi<br />in 2–3 minutes.</h2></Reveal>
        <Reveal className="story-rule" delay={360}><span /></Reveal>
        <Reveal className="story-steps" delay={480}>
          <span><b>01</b>Add one packet to 400 ml of water.</span>
          <span><b>02</b>Bring to a boil, then simmer for 2–3 minutes.</span>
          <span><b>03</b>Remove and discard the packet.</span>
        </Reveal>
      </>
    );
  }

  if (page === 4) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>EVERYDAY COOKING</Reveal>
        <Reveal delay={220}><h2 className="story-heading story-heading-sm">One packet.<br />Countless possibilities.</h2></Reveal>
        <Reveal className="story-rule" delay={360}><span /></Reveal>
        <Reveal delay={480}>
          <p className="story-body">From miso soup and simmered dishes to seasoned rice and tamagoyaki, dashi quietly brings out the character of every ingredient.</p>
        </Reveal>
        <Reveal className="story-use-note" delay={640}>
          <b>ANOTHER WAY TO USE IT</b>
          <span>Tear open the packet and use the powder as a seasoning.</span>
        </Reveal>
      </>
    );
  }

  if (page === 5) {
    return (
      <>
        <Reveal className="story-kicker" delay={70}>PRODUCT DETAILS</Reveal>
        <Reveal delay={170}><h2 className="story-heading story-heading-sm">What is inside.</h2></Reveal>
        <Reveal className="story-rule" delay={270}><span /></Reveal>
        <Reveal className="story-spec-grid" delay={370}>
          <span><b>CONTENTS</b>8 g × 30 packets</span>
          <span><b>ALLERGENS</b>Wheat · Soy</span>
          <span><b>STORAGE</b>Keep away from humidity and direct sunlight.</span>
        </Reveal>
        <Reveal className="story-nutrition" delay={520}>
          <b>NUTRITION PER PACKET</b>
          <dl>
            <div><dt>Energy</dt><dd>25 kcal</dd></div>
            <div><dt>Protein</dt><dd>2.45 g</dd></div>
            <div><dt>Fat</dt><dd>0.23 g</dd></div>
            <div><dt>Carbohydrate</dt><dd>3.31 g</dd></div>
            <div><dt>Salt</dt><dd>1.06 g</dd></div>
          </dl>
        </Reveal>
        <Reveal delay={670}>
          <p className="story-ingredients">Bonito flakes, sardine extract, roasted flying fish, round herring, kelp, dextrin, yeast extract, salt, powdered soy sauce and fermented seasoning.</p>
        </Reveal>
      </>
    );
  }

  return (
    <>
      <Reveal className="story-kicker" delay={70}>DISCOVER MORE</Reveal>
      <Reveal delay={180}><h2 className="story-heading story-heading-sm">Find your<br />next dashi.</h2></Reveal>
      <Reveal className="story-rule" delay={300}><span /></Reveal>
      <Reveal delay={400}>
        <p className="story-body">Choose a stock that fits the ingredients you love and the food you cook every day.</p>
      </Reveal>
    </>
  );
}

export function RichProductStory({locale}: {locale: string}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.page));
      },
      {root: rail, threshold: [0.45, 0.65, 0.85]}
    );
    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  const shareToInstagram = async () => {
    const shareData = {
      title: "Kayanoya Dashi",
      text: "Discover Kayanoya Dashi",
      url: window.location.href
    };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`).catch(() => undefined);
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const shareToX = () => {
    const text = encodeURIComponent("Discover Kayanoya Dashi");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
  };

  const shareToWhatsApp = () => {
    const message = encodeURIComponent(`Discover Kayanoya Dashi ${window.location.href}`);
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const openGoogleReviews = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=%E5%BE%A1%E6%96%99%E7%90%86%20%E8%8C%85%E4%B9%83%E8%88%8E%20%E7%A6%8F%E5%B2%A1%E7%9C%8C%E7%B3%9F%E5%B1%8B%E9%83%A1%E4%B9%85%E5%B1%B1%E7%94%BA%E7%8C%AA%E9%87%8E395-1",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="rich-story-shell">
      <div ref={railRef} className="story-rail hide-scrollbar">
        {pages.map((page, index) => {
          const pageNumber = index + 1;
          return (
            <section
              key={page.image}
              ref={(element) => { pageRefs.current[index] = element; }}
              data-page={pageNumber}
              aria-label={`Story page ${pageNumber} of ${pages.length}`}
              className={`product-story-section story-page-${pageNumber} ${current === pageNumber ? "is-current" : ""}`}
            >
              <div className="story-visual">
                <Image
                  src={page.image}
                  alt={page.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 639px) 100vw, 420px"
                  className="story-visual-image"
                  style={{objectPosition: page.position}}
                />
              </div>
              <div className="story-panel">
                <StoryCopy page={pageNumber} />
                {pageNumber === 6 && (
                  <>
                    <Reveal className="story-related-grid" delay={540}>
                      {relatedProducts.map((product) => (
                        <a
                          key={product.shopUrl}
                          href={product.shopUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${product.label}`}
                          className="story-related-card"
                        >
                          <span className="story-related-image">
                            <Image src={product.image} alt="" fill sizes="120px" className="object-cover" />
                          </span>
                          <span>{product.label}</span>
                        </a>
                      ))}
                    </Reveal>
                    <Reveal className="story-actions" delay={700}>
                      <button type="button" onClick={shareToInstagram} aria-label="Share on Instagram">
                        <b aria-hidden="true"><Instagram /></b><span>INSTAGRAM</span>
                      </button>
                      <button type="button" onClick={shareToX} aria-label="Share on X">
                        <b className="story-x-icon" aria-hidden="true">𝕏</b><span>X</span>
                      </button>
                      <button type="button" onClick={shareToWhatsApp} aria-label="Share on WhatsApp">
                        <b className="story-whatsapp-icon" aria-hidden="true"><MessageCircle /><Phone /></b><span>WHATSAPP</span>
                      </button>
                      <button type="button" onClick={openGoogleReviews} aria-label="View Kayanoya reviews on Google Maps">
                        <b aria-hidden="true"><Star /></b><span>GOOGLE</span>
                      </button>
                    </Reveal>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <Link href="/" locale={locale} className="story-map-link" aria-label="Back to store map">
        <span aria-hidden="true">←</span> MAP
      </Link>
      <div className="story-language"><LanguagePill /></div>
      <div className="story-counter" aria-live="polite">
        <span key={current} className="counter-swap">{pad2(current)}</span><small> / 06</small>
      </div>
      <nav className="story-pagination" aria-label="Story pages">
        {pages.map((page, index) => (
          <button
            key={page.image}
            type="button"
            aria-label={`Go to page ${index + 1}`}
            aria-current={current === index + 1 ? "step" : undefined}
            onClick={() => pageRefs.current[index]?.scrollIntoView({behavior: "smooth", block: "start"})}
            className={current === index + 1 ? "is-current" : ""}
          />
        ))}
      </nav>
    </div>
  );
}
