import {notFound} from "next/navigation";
import {AppHeader} from "@/components/app-header";
import {Media} from "@/components/media";
import {SealDot} from "@/components/glyphs";
import {StoreMap} from "@/components/store-map";
import {getProductBySlug, products, store} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {routing} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({locale, slug: product.slug}))
  );
}

export default async function StaffPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations();
  const area = getLocalizedText(product.shelf.area, locale);

  return (
    // 店頭で相手に見せる画面なので、暗い地ではなく明るい和紙地で組む
    <main className="min-h-svh bg-washi">
      <AppHeader title={t("Staff.title")} back />

      <div className="gutter pb-12 pt-8">
        <div className="flex flex-col items-center">
          <span className="h-5 w-px bg-rule-strong" aria-hidden="true" />
          <h1 className="mincho mt-4 text-[16px] tracking-jp">
            {t("Staff.title")}
          </h1>
        </div>

        {/* 商品 */}
        <div className="mt-8 grid grid-cols-[104px_1fr] items-center gap-5 border-y border-rule py-6">
          <Media
            src={product.image}
            alt={getLocalizedText(product.imageAlt, locale)}
            placeholderLabel={t("Common.photoPending")}
            width={208}
            height={208}
            sizes="104px"
            priority
            className="h-[104px] w-[104px] bg-kinari"
            imageClassName="h-full w-full object-cover"
          />
          <div className="min-w-0">
            <p className="mincho text-[19px] leading-8 tracking-jp">
              {getLocalizedText(product.name, locale)}
            </p>
            <p className="mt-1 text-[9px] tracking-latin text-muted">
              {product.romanizedName}
            </p>
            <p className="mt-2.5 text-[12px] leading-6 tracking-jp-tight text-muted">
              {getLocalizedText(product.shortDescription, locale)}
            </p>
          </div>
        </div>

        {/* 売場 */}
        <p className="mincho mt-8 flex items-center gap-2 text-[15px] tracking-jp">
          <SealDot />
          {t("Staff.shelfIs", {area})}
        </p>

        <div className="mt-5 border border-rule p-3">
          <StoreMap
            areas={store.areas}
            locale={locale}
            markX={product.shelf.mapX}
            markY={product.shelf.mapY}
            markLabel={`${t("Staff.mapLabel")} — ${area}`}
          />
        </div>

        {/* 店員への一文 — この画面の主役なので大きく */}
        <div className="mt-8 border-y border-ink py-6 text-center">
          <p className="mincho text-[15px] leading-8 tracking-jp">
            {t("Staff.showThis")}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1">
          <p className="mincho text-[12px] tracking-jp text-muted">
            {getLocalizedText(store.name, locale)}
          </p>
          <p className="text-[11px] tracking-jp-tight text-muted">
            {getLocalizedText(store.address, locale)}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={`/products/${product.slug}`}
            locale={locale}
            className="mincho flex min-h-11 items-center border-b border-ink px-1 text-[12px] tracking-jp"
          >
            {t("Staff.backToProduct")}
          </Link>
        </div>
      </div>
    </main>
  );
}
