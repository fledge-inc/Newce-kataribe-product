import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {
  CategoryGlyph,
  CircleChevron,
  type CategoryGlyphName
} from "@/components/glyphs";
import {ImageWithFallback} from "@/components/image-with-fallback";
import {ProductCard} from "@/components/product-card";
import {SeasonalDate} from "@/components/seasonal-date";
import {SectionHeader} from "@/components/section-header";
import {categories, products, store} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {tategakiClass} from "@/lib/typography";
import {Link} from "@/i18n/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";

/** 七十二候を出すので 1 時間ごとに再生成する。 */
export const revalidate = 3600;

export default async function StorePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const featured = store.featuredProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  const categoryGlyphs: CategoryGlyphName[] = [
    "dashi",
    "seasoning",
    "gift",
    "other"
  ];
  const tategaki = tategakiClass(locale);

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={getLocalizedText(store.name, locale)} overlay />

      {/* ヒーロー — 全画面幅、墨のグラデーション、縦組みの歓迎文 */}
      <section className="on-dark relative -mt-[60px] aspect-[390/460] w-full overflow-hidden bg-sumi text-white">
        <ImageWithFallback
          src={store.heroImage}
          alt={getLocalizedText(store.heroImageAlt, locale)}
          fill
          sizes="(max-width: 430px) 100vw, 390px"
          priority
          className="absolute inset-0"
          imageClassName="object-cover"
        />
        <div className="veil-hero absolute inset-0" aria-hidden="true" />

        <div className="text-on-photo absolute inset-0 flex flex-col px-6 pb-8 pt-[76px]">
          <div className="flex flex-1 justify-between gap-4">
            <SeasonalDate locale={locale} variant="light" className="pt-1" />

            {tategaki ? (
              <p
                className={`mincho ${tategaki} max-h-full text-[26px] leading-[1.7] tracking-jp`}
              >
                {getLocalizedText(store.welcomeTitle, locale)}
              </p>
            ) : (
              <p className="mincho max-w-[190px] text-right text-[24px] leading-[1.5] tracking-jp-tight">
                {getLocalizedText(store.welcomeTitle, locale)}
              </p>
            )}
          </div>

          <p className="mt-6 text-[11px] leading-6 tracking-jp-tight text-white/80">
            {getLocalizedText(store.welcomeBody, locale)}
          </p>
        </div>
      </section>

      {/* 今月のおすすめ — 横スクロールのレール */}
      <section className="bg-kinari pt-11">
        <div className="px-6">
          <SectionHeader
            title={t("Store.recommended")}
            action={t("Common.viewAll")}
            href="/products"
            locale={locale}
          />
        </div>
        {/* scroll-px-6 がないと snap-start が左パディングを飲み込んでしまう */}
        <div className="hide-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
          <span className="w-2 flex-none" aria-hidden="true" />
        </div>
      </section>

      {/* カテゴリー — 囲みをやめ、縦ヘアラインで 4 分割 */}
      <section className="mt-11 border-y border-rule bg-washi py-9">
        <div className="px-6">
          <SectionHeader title={t("Store.categories")} locale={locale} />
        </div>
        <div className="mt-6 grid grid-cols-4">
          {categories.slice(1).map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              locale={locale}
              className={`flex min-h-[84px] flex-col items-center justify-center gap-3 px-1 text-center ${
                index > 0 ? "border-l border-rule" : ""
              }`}
            >
              <CategoryGlyph name={categoryGlyphs[index]} />
              <span className="mincho text-[11px] tracking-jp">
                {getLocalizedText(category.label, locale)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* だしのご案内 — 全画面の写真バンド */}
      <section id="recipes" className="section-anchor">
        <Link
          href="/products/kayanoya-dashi#usage"
          locale={locale}
          className="on-dark relative block aspect-[390/280] w-full overflow-hidden bg-sumi text-white"
        >
          <ImageWithFallback
            src="/images/recipes/dashi-pot.jpg"
            alt=""
            fill
            sizes="(max-width: 430px) 100vw, 390px"
            className="absolute inset-0"
            imageClassName="object-cover"
          />
          <div className="veil-band absolute inset-0" aria-hidden="true" />
          <div className="text-on-photo absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <p className="text-[9px] tracking-latin text-white/70">
              DASHI GUIDE
            </p>
            <h2 className="mincho mt-4 text-[21px] tracking-jp">
              {t("Store.guideTitle")}
            </h2>
            <p className="mt-3 max-w-[260px] text-[11px] leading-6 tracking-jp-tight text-white/80">
              {t("Store.guideBody")}
            </p>
            <span className="mt-5 text-white/80">
              <CircleChevron size={30} />
            </span>
          </div>
        </Link>
      </section>

      {/* 店舗情報 — 墨のバンドで締める */}
      <section
        id="info"
        className="section-anchor bg-sumi px-6 pb-14 pt-11 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="h-5 w-px bg-white/40" aria-hidden="true" />
          <h2 className="mincho mt-4 text-[15px] tracking-jp">
            {t("Store.storeInfo")}
          </h2>
        </div>
        <div className="mt-7 border-t border-white/20 pt-6 text-center">
          <p className="mincho text-[17px] tracking-jp">
            {getLocalizedText(store.name, locale)}
          </p>
          <p className="mt-3 text-[12px] leading-7 tracking-jp-tight text-white/70">
            {getLocalizedText(store.address, locale)}
          </p>
        </div>
        <p className="mincho mt-9 text-center text-[9px] tracking-latin text-white/45">
          久原本家　KUBARA HONKE
        </p>
      </section>

      <BottomNav />
    </main>
  );
}
