import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {Chevron} from "@/components/glyphs";
import {ImageWithFallback} from "@/components/image-with-fallback";
import {Media} from "@/components/media";
import {recipes} from "@/data/recipes";
import {getLocalizedText} from "@/lib/localized";
import {Link} from "@/i18n/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function RecipesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={t("Recipes.title")} overlay />

      {/* 見出しの写真帯 */}
      <section className="on-dark relative -mt-[60px] aspect-[390/260] w-full overflow-hidden bg-sumi text-white">
        <ImageWithFallback
          src="/images/recipes/dashi-pot.jpg"
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, 420px"
          priority
          className="absolute inset-0"
          imageClassName="object-cover"
        />
        <div className="veil-band absolute inset-0" aria-hidden="true" />
        <div className="text-on-photo gutter absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="h-5 w-px bg-white/50" aria-hidden="true" />
          <h1 className="mincho mt-4 text-[22px] tracking-jp">
            {t("Recipes.title")}
          </h1>
          <p className="mt-3 max-w-[280px] text-[11px] leading-6 tracking-jp-tight text-white/80">
            {t("Recipes.lead")}
          </p>
        </div>
      </section>

      <p className="gutter flex min-h-11 items-center border-b border-rule bg-kinari text-[10px] tracking-jp text-muted">
        {t("Recipes.count", {count: recipes.length})}
      </p>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link
              href={`/recipes/${recipe.slug}`}
              locale={locale}
              className="gutter grid min-h-[120px] grid-cols-[96px_1fr_20px] items-center gap-4 border-b border-rule bg-washi py-5"
            >
              <Media
                src={recipe.image}
                alt={getLocalizedText(recipe.imageAlt, locale)}
                placeholderLabel={t("Common.photoPending")}
                width={192}
                height={192}
                sizes="96px"
                loading="eager"
                className="h-[96px] w-[96px] bg-kinari"
                imageClassName="h-full w-full object-cover"
              />
              <span className="min-w-0">
                <span className="mincho block text-[16px] leading-7 tracking-jp-tight">
                  {getLocalizedText(recipe.name, locale)}
                </span>
                <span className="mt-1.5 block text-[12px] leading-6 text-muted">
                  {getLocalizedText(recipe.summary, locale)}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-3 text-[10px] tracking-jp text-muted">
                  <span>{t("Recipes.minutes", {count: recipe.minutes})}</span>
                  <span className="h-2.5 w-px bg-rule" aria-hidden="true" />
                  <span>{t("Recipes.serves", {count: recipe.serves})}</span>
                </span>
              </span>
              <Chevron size={11} />
            </Link>
          </li>
        ))}
      </ul>

      <BottomNav />
    </main>
  );
}
