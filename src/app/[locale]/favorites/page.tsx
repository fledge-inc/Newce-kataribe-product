import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {FavoritesList} from "@/components/favorites-list";
import {SectionHeader} from "@/components/section-header";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function FavoritesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Favorites");

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={t("title")} back />

      <section className="gutter border-b border-rule bg-washi pb-8 pt-9">
        <SectionHeader title={t("title")} locale={locale} />
        <p className="mt-5 text-center text-[12px] leading-6 tracking-jp-tight text-muted">
          {t("lead")}
        </p>
      </section>

      <FavoritesList />
      <BottomNav />
    </main>
  );
}
