import {notFound} from "next/navigation";
import {
  ProductStory,
  type StoryDetails,
  type StoryFrame,
  type StoryNeighbor
} from "@/components/product-story";
import {getProductBySlug, products} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {routing} from "@/i18n/routing";
import type {LocalizedText} from "@/types/content";
import {getTranslations, setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({locale, slug: product.slug}))
  );
}

/** マップに置いている6品。むすびの「となりの棚」もこの中から選ぶ */
const neighborPool = [
  "product-kayanoya-dashi",
  "product-shiro-dashi",
  "product-vegetable-dashi",
  "product-niboshi-dashi",
  "product-golden-dashi",
  "product-reduced-salt-dashi"
];

export default async function ProductStoryPage({
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

  const tAllergen = await getTranslations("Allergen");
  const tNutrition = await getTranslations("Nutrition");

  /** 見出しに添える金色の別言語表記。日本語では英語を、他言語では日本語を出す */
  const kickerOf = (textObj: LocalizedText) =>
    locale === "ja" ? textObj.en : textObj.ja;

  const frames: StoryFrame[] = [
    {
      id: "intro",
      title: getLocalizedText(product.name, locale),
      kicker: locale === "ja" ? product.romanizedName : product.name.ja,
      lead: getLocalizedText(product.shortDescription, locale),
      body: getLocalizedText(product.summary, locale),
      image: product.image,
      imageAlt: getLocalizedText(product.imageAlt, locale)
    },
    ...product.sections.map((section): StoryFrame => {
      return {
        id: section.id,
        title: getLocalizedText(section.title, locale),
        kicker: kickerOf(section.title),
        body: getLocalizedText(section.body, locale),
        image: section.image,
        imageAlt: section.imageAlt
          ? getLocalizedText(section.imageAlt, locale)
          : undefined,
        steps:
          section.id === "usage"
            ? product.usageSteps.map((step) => ({
                number: step.number,
                text: getLocalizedText(step.text, locale)
              }))
            : undefined
      };
    })
  ];

  const details: StoryDetails = {
    ingredients: getLocalizedText(product.ingredientsText, locale),
    allergens: product.allergens.map((id) => tAllergen(id)),
    nutrition: product.nutrition.map((row) => ({
      label: tNutrition(row.key),
      value: row.value
    })),
    basis: getLocalizedText(product.nutritionBasis, locale)
  };

  const neighbors: StoryNeighbor[] = neighborPool
    .filter((id) => id !== product.id)
    .slice(0, 2)
    .flatMap((id) => {
      const neighbor = products.find((candidate) => candidate.id === id);
      return neighbor
        ? [{slug: neighbor.slug, name: getLocalizedText(neighbor.name, locale)}]
        : [];
    });

  return (
    <main className="min-h-svh bg-kinari">
      <ProductStory
        productId={product.id}
        badge={getLocalizedText(product.name, locale)}
        frames={frames}
        details={details}
        neighbors={neighbors}
        locale={locale}
      />
    </main>
  );
}
