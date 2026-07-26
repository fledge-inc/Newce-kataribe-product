"use client";

import {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {surveyQuestions} from "@/data/content";
import {Link} from "@/i18n/navigation";

/** 顔アイコン3種。塗らず 1px の線だけで描く。 */
function Face({mood}: {mood: "good" | "neutral" | "bad"}) {
  const mouth =
    mood === "good"
      ? "M8.5 14.6c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"
      : mood === "neutral"
        ? "M8.6 15h6.8"
        : "M8.5 16.2c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8";
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="9.2" />
        <circle cx="9" cy="10" r="0.7" />
        <circle cx="15" cy="10" r="0.7" />
        <path d={mouth} />
      </g>
    </svg>
  );
}

const faces = ["good", "neutral", "bad"] as const;

export function SurveyForm() {
  const t = useTranslations("Survey");
  const locale = useLocale();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const pick = (questionId: string, optionId: string) =>
    setAnswers((prev) => ({...prev, [questionId]: optionId}));

  const allAnswered = surveyQuestions.every((q) => answers[q.id]);

  if (sent) {
    return (
      <div className="gutter flex min-h-[60svh] flex-col items-center justify-center text-center">
        <span className="h-6 w-px bg-rule-strong" aria-hidden="true" />
        <h2 className="mincho mt-6 text-[18px] tracking-jp">
          {t("thanksTitle")}
        </h2>
        <p className="mt-4 max-w-[280px] text-[12px] leading-7 tracking-jp-tight text-muted">
          {t("thanksBody")}
        </p>
        <Link
          href="/store"
          locale={locale}
          className="mincho mt-8 flex min-h-11 items-center border-b border-ink px-1 text-[12px] tracking-jp"
        >
          {t("backHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="gutter pb-16 pt-8">
      <p className="text-center text-[12px] leading-6 tracking-jp-tight text-muted">
        {t("intro")}
      </p>

      <div className="mt-9 space-y-10">
        {surveyQuestions.map((question, index) => (
          <fieldset key={question.id} className="border-t border-rule pt-6">
            <legend className="sr-only">{t(`q_${question.id}`)}</legend>
            <p className="mincho flex items-baseline gap-3 text-[14px] leading-7 tracking-jp">
              <span className="text-[11px] text-muted">Q{index + 1}</span>
              {t(`q_${question.id}`)}
            </p>

            {question.kind === "face" ? (
              <div className="mt-6 grid grid-cols-3 gap-2">
                {question.optionIds.map((optionId, optionIndex) => {
                  const active = answers[question.id] === optionId;
                  return (
                    <button
                      key={optionId}
                      type="button"
                      onClick={() => pick(question.id, optionId)}
                      aria-pressed={active}
                      className={`flex min-h-[104px] flex-col items-center justify-center gap-3 border px-1 text-center ${
                        active
                          ? "border-ink text-ink"
                          : "border-rule text-muted"
                      }`}
                    >
                      <Face mood={faces[optionIndex] ?? "neutral"} />
                      <span className="mincho text-[10px] leading-4 tracking-jp-tight">
                        {t(`o_${optionId}`)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-2">
                {question.optionIds.map((optionId) => {
                  const active = answers[question.id] === optionId;
                  return (
                    <button
                      key={optionId}
                      type="button"
                      onClick={() => pick(question.id, optionId)}
                      aria-pressed={active}
                      className={`mincho flex min-h-12 items-center justify-center border px-2 text-center text-[11px] tracking-jp ${
                        active
                          ? "border-ink text-ink"
                          : "border-rule text-muted"
                      }`}
                    >
                      {t(`o_${optionId}`)}
                    </button>
                  );
                })}
              </div>
            )}
          </fieldset>
        ))}
      </div>

      <button
        type="button"
        disabled={!allAnswered}
        onClick={() => setSent(true)}
        className={`mincho mt-10 flex min-h-12 w-full items-center justify-center text-[13px] tracking-jp ${
          allAnswered
            ? "bg-sumi text-white"
            : "border border-rule text-muted"
        }`}
      >
        {t("submit")}
      </button>

      {/* 送信先が無いことは隠さず明記する */}
      <p className="mt-5 text-center text-[10px] leading-5 tracking-jp-tight text-muted">
        {t("prototypeNote")}
      </p>
    </div>
  );
}
