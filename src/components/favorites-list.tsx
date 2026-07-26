"use client";

import {useLocale, useTranslations} from "next-intl";
import {products} from "@/data/content";
import {useFavorites} from "@/lib/favorites";
import {Link} from "@/i18n/navigation";
import {LoadingState} from "./loading-state";
import {ProductCard} from "./product-card";

export function FavoritesList() {
  const t = useTranslations("Favorites");
  const locale = useLocale();
  const {ids, ready, has, toggle} = useFavorites();

  // localStorage は useEffect でしか読めないため、読み込み前は空と区別する
  if (!ready) {
    return <LoadingState />;
  }

  const saved = products.filter((product) => has(product.id));

  if (saved.length === 0) {
    return (
      <div className="gutter flex min-h-[340px] flex-col items-center justify-center text-center">
        <span className="h-6 w-px bg-rule-strong" aria-hidden="true" />
        <p className="mincho mt-6 text-[15px] tracking-jp">{t("empty")}</p>
        <Link
          href="/products"
          locale={locale}
          className="mincho mt-4 flex min-h-11 items-center border-b border-ink px-1 text-[12px] tracking-jp"
        >
          {t("emptyAction")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="gutter flex min-h-11 items-center border-b border-rule bg-kinari text-[10px] tracking-jp text-muted">
        {ids.length}
      </p>
      {saved.map((product) => (
        <div key={product.id} className="relative">
          <ProductCard product={product} locale={locale} variant="row" />
          <button
            type="button"
            onClick={() => toggle(product.id)}
            className="mincho absolute bottom-2 right-4 flex min-h-11 items-center px-1 text-[10px] tracking-jp text-muted"
          >
            {t("remove")}
          </button>
        </div>
      ))}
    </>
  );
}
