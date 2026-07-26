import type {FeatureId} from "@/types/content";

/**
 * 「なぜ選ばれているか」の3点（参考画面06）。
 * 囲みを作らず、縦のヘアラインだけで3分割する。
 */
const glyphs: Record<FeatureId, React.ReactNode> = {
  "selected-ingredients": (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 18c0-6 3.6-10 9-10.4C12.6 12.6 9 16 4 18z" />
      <path d="M13 7.6C15 5.4 18 4.4 21 4.6c.3 3-.7 6-2.9 8" />
      <path d="M4 20h16" />
    </g>
  ),
  "no-additives": (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="8.4" />
      <path d="m6 6 12 12" />
    </g>
  ),
  "careful-process": (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M5.5 20h13l-1-8.5H6.5z" />
      <path d="M9 8.6c0-1.4 1.4-1.7 1.4-3.1M13.6 8.6c0-1.4 1.4-1.7 1.4-3.1" />
    </g>
  ),
  "easy-to-use": (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="8.4" />
      <path d="m8.2 12.2 2.6 2.6 5-5.4" />
    </g>
  ),
  "gift-ready": (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 9.6h16v3.2H4zM5.4 12.8h13.2V20H5.4z" />
      <path d="M12 9.6V20" />
      <path d="M12 9.6C10.6 7.4 9.5 6.3 8.6 6.3a1.9 1.9 0 0 0 0 3.3zM12 9.6c1.4-2.2 2.5-3.3 3.4-3.3a1.9 1.9 0 0 1 0 3.3z" />
    </g>
  ),
  "long-life": (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7v5.4l3.4 2" />
    </g>
  )
};

export function FeatureGrid({
  features,
  labels
}: {
  features: FeatureId[];
  /** FeatureId → 表示名（messages 由来） */
  labels: Record<string, string>;
}) {
  if (features.length === 0) return null;

  return (
    <div className="mt-7 grid grid-cols-3 border-y border-rule">
      {features.map((feature, index) => (
        <div
          key={feature}
          className={`flex flex-col items-center gap-3 px-1 py-6 text-center ${
            index > 0 ? "border-l border-rule" : ""
          }`}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="text-ink-soft"
          >
            {glyphs[feature]}
          </svg>
          <span className="mincho text-[10px] leading-4 tracking-jp-tight text-ink-soft">
            {labels[feature] ?? feature}
          </span>
        </div>
      ))}
    </div>
  );
}
