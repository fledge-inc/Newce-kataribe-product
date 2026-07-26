import {AppHeader} from "@/components/app-header";
import {BottomNav} from "@/components/bottom-nav";
import {SurveyForm} from "@/components/survey-form";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function SurveyPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Survey");

  return (
    <main className="min-h-svh bg-washi pb-[68px]">
      <AppHeader title={t("title")} back />
      <SurveyForm />
      <BottomNav />
    </main>
  );
}
