"use client";

import {useTranslations} from "next-intl";

export function LoadingState() {
  const t = useTranslations("Common");
  return (
    <div className="flex min-h-[60svh] items-center justify-center bg-kinari px-6">
      <div className="flex flex-col items-center gap-4 text-muted" role="status">
        <span className="h-6 w-6 animate-spin rounded-full border border-rule border-t-ink" />
        <span className="mincho text-[12px] tracking-jp">{t("loading")}</span>
      </div>
    </div>
  );
}
