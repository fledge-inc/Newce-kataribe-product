import {notFound} from "next/navigation";
import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {Chevron} from "@/components/glyphs";
import {Media} from "@/components/media";
import {getRecipeBySlug, recipes} from "@/data/recipes";
import {getProductById} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {tategakiClass} from "@/lib/typography";
import {routing} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    recipes.map((recipe) => ({locale, slug: recipe.slug}))
  );
}

export default async function RecipeDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const t = await getTranslations();
  const tategaki = tategakiClass(locale);
  const name = getLocalizedText(recipe.name, locale);
  const usedProducts = recipe.productIds
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> =>
      Boolean(product)
    );

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={name} back overlay={Boolean(recipe.image)} />

      {/* ヒーロー — 写真があれば全画面、無ければ静かな見出し帯 */}
      {recipe.image ? (
        <section className="on-dark relative -mt-[60px] aspect-[390/420] w-full overflow-hidden bg-sumi text-white">
          <Media
            src={recipe.image}
            alt={getLocalizedText(recipe.imageAlt, locale)}
            placeholderLabel={t("Common.photoPending")}
            fill
            sizes="(max-width: 639px) 100vw, 420px"
            priority
            className="absolute inset-0"
            imageClassName="object-cover"
          />
          <div className="veil-hero absolute inset-0" aria-hidden="true" />
          <div className="text-on-photo gutter absolute inset-0 flex flex-col pb-7 pt-[76px]">
            <div
              className={`flex flex-1 justify-end overflow-hidden ${
                tategaki ? "items-start" : "items-end pb-4"
              }`}
            >
              {tategaki ? (
                <h1
                  className={`mincho ${tategaki} max-h-full text-[26px] leading-[1.7] tracking-jp`}
                >
                  {name}
                </h1>
              ) : (
                <h1 className="mincho max-w-[240px] text-right text-[25px] leading-[1.35] tracking-jp-tight">
                  {name}
                </h1>
              )}
            </div>
            <p className="text-[9px] tracking-latin text-white/75">
              {recipe.romanizedName}
            </p>
          </div>
        </section>
      ) : (
        <section className="gutter border-b border-rule bg-washi pb-8 pt-6">
          <p className="text-[9px] tracking-latin text-muted">
            {recipe.romanizedName}
          </p>
          <h1 className="mincho mt-3 text-[24px] leading-[1.5] tracking-jp">
            {name}
          </h1>
        </section>
      )}

      <section className="gutter bg-washi pb-8 pt-7">
        <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-jp text-muted">
          <span>{t("Recipes.minutes", {count: recipe.minutes})}</span>
          <span className="h-2.5 w-px bg-rule" aria-hidden="true" />
          <span>{t("Recipes.serves", {count: recipe.serves})}</span>
        </div>
        <p className="mincho mt-5 text-[16px] leading-8 tracking-jp-tight">
          {getLocalizedText(recipe.summary, locale)}
        </p>
      </section>

      {/* 材料 — 罫線だけの表 */}
      <section className="gutter border-t border-rule bg-washi pb-8 pt-8">
        <h2 className="mincho text-[15px] tracking-jp">
          {t("Recipes.ingredientsHeading")}
        </h2>
        <dl className="mt-4 border-t border-rule">
          {recipe.ingredients.map((ingredient) => (
            <div
              key={getLocalizedText(ingredient.name, locale)}
              className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
            >
              <dt className="text-[13px] leading-6 tracking-jp-tight text-ink-soft">
                {getLocalizedText(ingredient.name, locale)}
              </dt>
              <dd className="mincho flex-none text-[13px] tracking-jp-tight">
                {getLocalizedText(ingredient.amount, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* つくり方 — 商品詳細と同じヘアライン円のタイムライン */}
      <section className="gutter border-t border-rule bg-washi pb-9 pt-8">
        <h2 className="mincho text-[15px] tracking-jp">
          {t("Recipes.stepsHeading")}
        </h2>
        <ol className="mt-5">
          {recipe.steps.map((step, index) => (
            <li
              key={index}
              className="relative grid grid-cols-[30px_1fr] gap-4 pb-6 last:pb-0"
            >
              {index < recipe.steps.length - 1 && (
                <span
                  className="absolute left-[14.5px] top-8 h-[calc(100%-32px)] w-px bg-rule"
                  aria-hidden="true"
                />
              )}
              <span className="hairline-circle mincho h-[30px] w-[30px] text-[11px] text-ink-soft">
                {index + 1}
              </span>
              <span className="pt-1 text-[13px] leading-7 tracking-jp-tight text-ink-soft">
                {getLocalizedText(step, locale)}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* 使用する商品 */}
      {usedProducts.length > 0 && (
        <section className="border-t border-rule bg-kinari pb-10 pt-8">
          <h2 className="gutter mincho text-[15px] tracking-jp">
            {t("Recipes.usedProducts")}
          </h2>
          <ul className="mt-4">
            {usedProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  locale={locale}
                  className="gutter grid min-h-[92px] grid-cols-[64px_1fr_20px] items-center gap-4 border-b border-rule bg-washi py-4"
                >
                  <Media
                    src={product.image}
                    alt={getLocalizedText(product.imageAlt, locale)}
                    placeholderLabel={t("Common.photoPending")}
                    width={128}
                    height={128}
                    sizes="64px"
                    className="h-[64px] w-[64px] bg-kinari"
                    imageClassName="h-full w-full object-cover"
                  />
                  <span className="mincho min-w-0 text-[14px] leading-6 tracking-jp-tight">
                    {getLocalizedText(product.name, locale)}
                  </span>
                  <Chevron size={11} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <BottomNav />
    </main>
  );
}
