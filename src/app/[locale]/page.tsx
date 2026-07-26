import {BrandMark} from "@/components/brand-mark";
import {CircleChevron, SealDot} from "@/components/glyphs";
import {ImageWithFallback} from "@/components/image-with-fallback";
import {SeasonalDate} from "@/components/seasonal-date";
import {Link} from "@/i18n/navigation";
import {latinLabel} from "@/lib/typography";
import type {Locale} from "@/types/content";
import {getTranslations, setRequestLocale} from "next-intl/server";

/** 七十二候を出すので、ビルド時の日付で固定されないよう 1 時間ごとに再生成する。 */
export const revalidate = 3600;

const languageOptions: {locale: Locale; label: string}[] = [
  {locale: "ja", label: "日本語"},
  {locale: "en", label: "English"},
  {locale: "zh-CN", label: "简体中文"},
  {locale: "zh-TW", label: "繁體中文"},
  {locale: "ko", label: "한국어"}
];

export default async function LanguagePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Language");
  const tCommon = await getTranslations("Common");

  return (
    <main className="on-dark relative min-h-svh overflow-hidden bg-sumi text-white">
      <ImageWithFallback
        src="/images/store/kayanoya-interior.jpg"
        alt=""
        fill
        sizes="(max-width: 639px) 100vw, 420px"
        priority
        className="absolute inset-0"
        imageClassName="object-cover"
      />
      <div className="veil-full absolute inset-0" aria-hidden="true" />

      <div className="text-on-photo relative flex min-h-svh flex-col gutter pb-8 pt-10">
        <BrandMark variant="light" />
        <p className="mt-4 max-w-[240px] text-[11px] leading-6 tracking-jp-tight text-white/70">
          {tCommon("tagline")}
        </p>

        <div className="mt-9 flex justify-end">
          <SeasonalDate locale={locale} variant="light" />
        </div>

        <div className="mt-auto pt-12">
          <h1 className="mincho text-[19px] tracking-jp">{t("title")}</h1>
          <p className="mt-2 text-[11px] tracking-jp-tight text-white/65">
            {t("subtitle")}
          </p>

          <ul className="mt-6 border-t border-white/25">
            {languageOptions.map((option) => {
              const current = locale === option.locale;
              return (
                <li key={option.locale} className="border-b border-white/25">
                  <Link
                    href="/store"
                    locale={option.locale}
                    className="flex min-h-[60px] items-center gap-3 py-2"
                  >
                    <span className="w-2 flex-none">
                      {current && <SealDot />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mincho block text-[17px] tracking-jp">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-[9px] tracking-latin text-white/65">
                        {latinLabel[option.locale]}
                      </span>
                    </span>
                    <span className="text-white/70">
                      <CircleChevron size={26} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mincho mt-10 text-center text-[10px] tracking-latin text-white/55">
          久原本家　KUBARA HONKE
        </p>
      </div>
    </main>
  );
}
