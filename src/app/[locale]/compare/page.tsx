import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {CompareTable} from "@/components/compare-table";
import {SectionHeader} from "@/components/section-header";
import {getProductById} from "@/data/content";
import {Link} from "@/i18n/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";

const MAX_ITEMS = 3;

export default async function ComparePage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{ids?: string}>;
}) {
  const {locale} = await params;
  const {ids} = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations();

  const items = (ids ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, MAX_ITEMS)
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> =>
      Boolean(product)
    );

  const rowLabels = {
    base: t("Compare.base"),
    taste: t("Compare.taste"),
    dishes: t("Compare.dishes"),
    usage: t("Compare.usage"),
    dietary: t("Compare.dietary"),
    beginner: t("Compare.beginner"),
    gift: t("Compare.gift")
  };

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={t("Compare.title")} back />

      <section className="gutter border-b border-rule bg-washi pb-8 pt-9">
        <SectionHeader title={t("Compare.title")} locale={locale} />
        <p className="mt-5 text-center text-[12px] leading-6 tracking-jp-tight text-muted">
          {t("Compare.lead")}
        </p>
      </section>

      {items.length > 0 ? (
        <>
          <div className="border-b border-rule bg-washi">
            <CompareTable
              items={items}
              locale={locale}
              rowLabels={rowLabels}
            />
          </div>

          <div className="gutter flex flex-col items-center py-8">
            <p className="text-[10px] tracking-jp text-muted">
              {t("Compare.note")}
            </p>
            <Link
              href="/products"
              locale={locale}
              className="mincho mt-4 flex min-h-11 items-center border-b border-ink px-1 text-[12px] tracking-jp"
            >
              {t("Compare.reset")}
            </Link>
          </div>
        </>
      ) : (
        <div className="gutter flex min-h-[340px] flex-col items-center justify-center text-center">
          <span className="h-6 w-px bg-rule-strong" aria-hidden="true" />
          <p className="mincho mt-6 text-[15px] tracking-jp">
            {t("Compare.empty")}
          </p>
          <Link
            href="/products"
            locale={locale}
            className="mincho mt-4 flex min-h-11 items-center border-b border-ink px-1 text-[12px] tracking-jp"
          >
            {t("Compare.emptyAction")}
          </Link>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
