import {notFound} from "next/navigation";
import {AppHeader} from "@/components/app-header";
import {ProductDetailView} from "@/components/product-detail-view";
import {getProductBySlug, products} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {routing} from "@/i18n/routing";
import {getTranslations, setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({locale, slug: product.slug}))
  );
}

export default async function ProductDetailPage({
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

  const t = await getTranslations("Product");
  const labels = {
    recommendedFor: t("recommendedFor"),
    features: t("features"),
    usage: t("usage"),
    materials: t("materials"),
    comparison: t("comparison"),
    details: t("details"),
    usageTitle: t("usageTitle"),
    showShelf: t("showShelf"),
    showStaff: t("showStaff"),
    share: t("share"),
    videoCaption: t("videoCaption")
  };

  const hasHero = product.sections.length > 0;

  return (
    <main className="min-h-svh bg-kinari">
      {/* ヒーロー写真がある時だけヘッダーを写真に重ねる */}
      <AppHeader
        title={getLocalizedText(product.name, locale)}
        back
        overlay={hasHero}
      />
      {hasHero ? (
        <ProductDetailView product={product} locale={locale} labels={labels} />
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="text-[13px] leading-7 tracking-jp-tight text-muted">
            {getLocalizedText(product.summary, locale)}
          </p>
        </div>
      )}
    </main>
  );
}

