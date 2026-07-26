import {notFound} from "next/navigation";
import {AppHeader} from "@/components/app-header";
import {ProductDetailView} from "@/components/product-detail-view";
import {getProductBySlug, products} from "@/data/content";
import {getRecipesByIds} from "@/data/recipes";
import {getLocalizedText} from "@/lib/localized";
import {routing} from "@/i18n/routing";
import {setRequestLocale} from "next-intl/server";

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

  const relatedRecipes = getRecipesByIds(product.recipeIds);

  return (
    <main className="min-h-svh bg-kinari">
      {/* ヒーロー写真に重ねるので overlay */}
      <AppHeader
        title={getLocalizedText(product.name, locale)}
        back
        overlay
      />
      <ProductDetailView
        product={product}
        locale={locale}
        relatedRecipes={relatedRecipes}
      />
    </main>
  );
}
