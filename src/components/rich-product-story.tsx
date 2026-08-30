"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Instagram, MessageCircle, Phone, Star} from "lucide-react";
import {Link} from "@/i18n/navigation";
import type {RichProductStoryData} from "@/data/rich-story";
import {LanguagePill} from "./site-header";

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

function StoryCopy({page, story}: {page: number; story: RichProductStoryData}) {
  const copy = story.pages[page - 1];

  if (page === 1) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>{copy.kicker}</Reveal>
        <Reveal delay={210}><h1 className="story-heading">{copy.title}</h1></Reveal>
        <Reveal className="story-rule" delay={350}><span /></Reveal>
        <Reveal delay={460}>
          <p className="story-body story-intro-copy">{copy.body}</p>
        </Reveal>
        <Reveal className="story-scroll-cue" delay={650}>{story.labels.scroll}</Reveal>
      </>
    );
  }

  if (page === 2) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>{copy.kicker}</Reveal>
        <Reveal delay={220}><h2 className="story-heading story-heading-sm">{copy.title}</h2></Reveal>
        <Reveal className="story-rule" delay={360}><span /></Reveal>
        <Reveal delay={470}>
          <p className="story-body">{copy.body}</p>
        </Reveal>
        <Reveal className="story-chip-grid" delay={640}>
          {copy.chips?.map((chip) => <span key={chip}>{chip}</span>)}
        </Reveal>
      </>
    );
  }

  if (page === 3) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>{copy.kicker}</Reveal>
        <Reveal delay={220}><h2 className="story-heading story-heading-sm">{copy.title}</h2></Reveal>
        <Reveal className="story-rule" delay={360}><span /></Reveal>
        <Reveal delay={420}><p className="story-body">{copy.body}</p></Reveal>
        <Reveal className="story-steps" delay={480}>
          {copy.steps?.map((step) => <span key={step.number}><b>{pad2(step.number)}</b>{step.text}</span>)}
        </Reveal>
      </>
    );
  }

  if (page === 4) {
    return (
      <>
        <Reveal className="story-kicker" delay={90}>{copy.kicker}</Reveal>
        <Reveal delay={220}><h2 className="story-heading story-heading-sm">{copy.title}</h2></Reveal>
        <Reveal className="story-rule" delay={360}><span /></Reveal>
        <Reveal delay={480}>
          <p className="story-body">{copy.body}</p>
        </Reveal>
        <Reveal className="story-use-note" delay={640}>
          <b>{copy.note?.label}</b>
          <span>{copy.note?.text}</span>
        </Reveal>
      </>
    );
  }

  if (page === 5) {
    return (
      <>
        <Reveal className="story-kicker" delay={70}>{copy.kicker}</Reveal>
        <Reveal delay={170}><h2 className="story-heading story-heading-sm">{copy.title}</h2></Reveal>
        <Reveal className="story-rule" delay={270}><span /></Reveal>
        <Reveal className="story-spec-grid" delay={370}>
          <span><b>{story.details.contentsLabel}</b>{story.details.contents}</span>
          <span><b>{story.details.allergensLabel}</b>{story.details.allergens}</span>
          <span><b>{story.details.storageLabel}</b>{story.details.storage}</span>
        </Reveal>
        <Reveal className="story-nutrition" delay={520}>
          <b>{story.details.nutritionLabel}</b>
          <dl>
            {story.details.nutrition.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
          </dl>
        </Reveal>
        <Reveal delay={670}>
          <p className="story-ingredients">{story.details.ingredients}</p>
        </Reveal>
      </>
    );
  }

  return (
    <>
      <Reveal className="story-kicker" delay={70}>{copy.kicker}</Reveal>
      <Reveal delay={180}><h2 className="story-heading story-heading-sm">{copy.title}</h2></Reveal>
      <Reveal className="story-rule" delay={300}><span /></Reveal>
      <Reveal delay={400}>
        <p className="story-body">{copy.body}</p>
      </Reveal>
    </>
  );
}

export function RichProductStory({locale, story}: {locale: string; story: RichProductStoryData}) {
  const {pages, relatedProducts} = story;
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
      title: story.productName,
      text: story.shareText,
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
    const text = encodeURIComponent(story.shareText);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
  };

  const shareToWhatsApp = () => {
    const message = encodeURIComponent(`${story.shareText} ${window.location.href}`);
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
              key={`${page.image}-${pageNumber}`}
              ref={(element) => { pageRefs.current[index] = element; }}
              data-page={pageNumber}
              aria-label={`${story.labels.page} ${pageNumber} / ${pages.length}`}
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
                <StoryCopy page={pageNumber} story={story} />
                {pageNumber === 6 && (
                  <>
                    <Reveal className="story-related-grid" delay={540}>
                      {relatedProducts.map((product) => (
                        <a
                          key={product.shopUrl}
                          href={product.shopUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={product.label}
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
                      <button type="button" onClick={shareToInstagram} aria-label={story.labels.instagram}>
                        <b aria-hidden="true"><Instagram /></b><span>INSTAGRAM</span>
                      </button>
                      <button type="button" onClick={shareToX} aria-label={story.labels.x}>
                        <b className="story-x-icon" aria-hidden="true">𝕏</b><span>X</span>
                      </button>
                      <button type="button" onClick={shareToWhatsApp} aria-label={story.labels.whatsapp}>
                        <b className="story-whatsapp-icon" aria-hidden="true"><MessageCircle /><Phone /></b><span>WHATSAPP</span>
                      </button>
                      <button type="button" onClick={openGoogleReviews} aria-label={story.labels.google}>
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

      <Link href="/" locale={locale} className="story-map-link" aria-label={story.labels.map}>
        <span aria-hidden="true">←</span> {story.labels.map}
      </Link>
      <div className="story-language"><LanguagePill /></div>
      <div className="story-counter" aria-live="polite">
        <span key={current} className="counter-swap">{pad2(current)}</span><small> / 06</small>
      </div>
      <nav className="story-pagination" aria-label={story.labels.pages}>
        {pages.map((page, index) => (
          <button
            key={`${page.image}-${index + 1}`}
            type="button"
            aria-label={`${story.labels.page} ${index + 1}`}
            aria-current={current === index + 1 ? "step" : undefined}
            onClick={() => pageRefs.current[index]?.scrollIntoView({behavior: "smooth", block: "start"})}
            className={current === index + 1 ? "is-current" : ""}
          />
        ))}
      </nav>
    </div>
  );
}
