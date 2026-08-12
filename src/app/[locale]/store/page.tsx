import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {
  StoreMapExperience,
  type MapProduct
} from "@/components/store-map-experience";
import {products, store} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {setRequestLocale} from "next-intl/server";

const pinLayout = [
  {x: 50, y: 66},
  {x: 27, y: 67},
  {x: 73, y: 67},
  {x: 35, y: 46},
  {x: 66, y: 46},
  {x: 38, y: 31},
  {x: 66, y: 31}
] as const;

const mapProductIds = [
  "product-kayanoya-dashi",
  "product-vegetable-dashi",
  "product-reduced-salt-dashi",
  "product-niboshi-dashi",
  "product-chicken-dashi",
  "product-golden-dashi",
  "product-shiro-dashi"
] as const;

export default async function StorePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const mapProducts = mapProductIds.flatMap((id, index): MapProduct[] => {
    const product = products.find((candidate) => candidate.id === id);
    const position = pinLayout[index];

    if (!product || !position) return [];

    return [
      {
        id: product.id,
        slug: product.slug,
        name: getLocalizedText(product.name, locale),
        description: getLocalizedText(product.shortDescription, locale),
        category: getLocalizedText(product.shelf.area, locale),
        image: product.image,
        imageAlt: getLocalizedText(product.imageAlt, locale),
        x: position.x,
        y: position.y
      }
    ];
  });

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={getLocalizedText(store.name, locale)} overlay />
      <StoreMapExperience locale={locale} products={mapProducts} />
      <BottomNav />
    </main>
  );
}
