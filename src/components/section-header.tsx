import {Link} from "@/i18n/navigation";
import {Chevron, VerticalRule} from "./glyphs";

/**
 * kubara.jp の「人気商品ランキング」と同じ組み。
 * 見出しの上に短い縦罫を落とし、中央に明朝＋広い字間で置く。
 */
export function SectionHeader({
  title,
  action,
  href,
  locale,
  variant = "dark"
}: {
  title: string;
  action?: string;
  href?: string;
  locale: string;
  variant?: "light" | "dark";
}) {
  const tone = variant === "light" ? "text-white" : "text-ink";
  const ruleTone = variant === "light" ? "bg-white/45" : "bg-rule-strong";
  const actionTone = variant === "light" ? "text-white/75" : "text-muted";

  return (
    <div className={`flex flex-col items-center ${tone}`}>
      <VerticalRule height={22} className={ruleTone} />
      <h2 className="mincho mt-4 text-center text-[17px] tracking-jp">
        {title}
      </h2>
      {action && href && (
        <Link
          href={href}
          locale={locale}
          className={`mt-2 flex min-h-11 items-center gap-1.5 text-[11px] tracking-jp ${actionTone}`}
        >
          {action}
          <Chevron size={9} />
        </Link>
      )}
    </div>
  );
}
