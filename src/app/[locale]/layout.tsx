import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {SiteHeader} from "@/components/site-header";
import {routing} from "@/i18n/routing";
import {isMinchoBodyLocale} from "@/lib/typography";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* ヘッダーは2画面で共有。遷移してもロゴと言語ピルは動かない */}
      <div
        className={`mobile-shell ${isMinchoBodyLocale(locale) ? "mincho" : ""}`}
      >
        <SiteHeader />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}

