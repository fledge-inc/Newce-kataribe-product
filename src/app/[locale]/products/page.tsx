import {Suspense} from "react";
import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {LoadingState} from "@/components/loading-state";
import {ProductList} from "@/components/product-list";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function ProductsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Products");

  return (
    <main className="min-h-svh bg-kinari pb-[68px]">
      <AppHeader title={t("title")} />
      <Suspense fallback={<LoadingState />}>
        <ProductList />
      </Suspense>
      <BottomNav />
    </main>
  );
}

