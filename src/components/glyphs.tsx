/**
 * 1px の線だけで組んだ記号一式。lucide の汎用アイコンを置き換え、
 * kayanoya.com のヘアライン表現に揃える。
 */

export function Chevron({
  size = 10,
  direction = "right"
}: {
  size?: number;
  direction?: "right" | "down";
}) {
  const rotation = direction === "down" ? "rotate(90 6 6)" : undefined;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="flex-none"
    >
      <path
        d="m4 1 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        transform={rotation}
      />
    </svg>
  );
}

/** 細い円の中にシェブロン。茅乃舎サイトの導線記号。 */
export function CircleChevron({
  size = 22,
  direction = "right"
}: {
  size?: number;
  direction?: "right" | "down";
}) {
  return (
    <span
      className="hairline-circle"
      style={{width: size, height: size}}
      aria-hidden="true"
    >
      <Chevron size={Math.round(size * 0.42)} direction={direction} />
    </span>
  );
}

/** 落款のような朱の点。強調を色面ではなく点で示す。 */
export function SealDot({className = ""}: {className?: string}) {
  return (
    <span
      className={`inline-block h-[5px] w-[5px] flex-none bg-shu ${className}`}
      aria-hidden="true"
    />
  );
}

/** 見出しの上に置く縦罫。 */
export function VerticalRule({
  height = 24,
  className = "bg-rule-strong"
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={`block w-px ${className}`}
      style={{height}}
      aria-hidden="true"
    />
  );
}

export function PlayTriangle({size = 12}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 1.5 10 6l-7 4.5z" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function SearchGlyph({size = 16}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="7.6" cy="7.6" r="5.6" />
        <path d="m11.8 11.8 4.2 4.2" />
      </g>
    </svg>
  );
}

export function CloseGlyph({size = 14}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PinGlyph({size = 15}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M9 16.5c3.1-3.8 4.6-6.5 4.6-8.2a4.6 4.6 0 1 0-9.2 0c0 1.7 1.5 4.4 4.6 8.2z" />
        <circle cx="9" cy="8.1" r="1.8" />
      </g>
    </svg>
  );
}

export function BagGlyph({size = 15}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M3.4 5.6h11.2L13.8 16H4.2z" />
        <path d="M6.4 5.6V4.3a2.6 2.6 0 0 1 5.2 0v1.3" />
      </g>
    </svg>
  );
}

export function ShareGlyph({size = 15}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="13.6" cy="4" r="2.3" />
        <circle cx="4.4" cy="9" r="2.3" />
        <circle cx="13.6" cy="14" r="2.3" />
        <path d="m6.5 7.8 5-2.6M6.5 10.2l5 2.6" />
      </g>
    </svg>
  );
}

export function CaptionsGlyph({size = 15}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="1.5" y="3.5" width="15" height="11" />
        <path d="M5 9.4h3M10 9.4h3" />
      </g>
    </svg>
  );
}

/** カテゴリー用の線画（だし・調味料・ギフト・その他）。 */
const categoryGlyphs = {
  dashi: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 9.5h14l-1.4 8.2H5.4z" />
      <path d="M18 11.6h1.8a1.9 1.9 0 0 1 0 3.8h-2.1" />
      <path d="M8 6.4c0-1.2 1.2-1.4 1.2-2.6M11 6.4c0-1.2 1.2-1.4 1.2-2.6M14 6.4c0-1.2 1.2-1.4 1.2-2.6" />
    </g>
  ),
  seasoning: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 3.5h6l.9 3.4H7.1z" />
      <path d="M6.6 6.9h8.8l1.1 11.6H5.5z" />
      <path d="M10 10.4v1.4M12 10.4v1.4M11 13.2v1.4" />
    </g>
  ),
  gift: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3.5 8.4h15v3h-15zM4.9 11.4h13.2v7.1H4.9z" />
      <path d="M11 8.4v10.1" />
      <path d="M11 8.4C9.5 6 8.3 4.8 7.3 4.8a2 2 0 0 0 0 3.6zM11 8.4c1.5-2.4 2.7-3.6 3.7-3.6a2 2 0 0 1 0 3.6z" />
    </g>
  ),
  // 「その他」— レシピの本と紛れないよう、点だけの中立な記号にする
  other: (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="4.6" cy="11" r="1.5" />
      <circle cx="11" cy="11" r="1.5" />
      <circle cx="17.4" cy="11" r="1.5" />
    </g>
  )
} as const;

export type CategoryGlyphName = keyof typeof categoryGlyphs;

export function CategoryGlyph({
  name,
  size = 24
}: {
  name: CategoryGlyphName;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      {categoryGlyphs[name]}
    </svg>
  );
}

export function SlidersGlyph({size = 15}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M2 5.5h14M2 12.5h14" />
        <circle cx="6.5" cy="5.5" r="1.8" />
        <circle cx="11.5" cy="12.5" r="1.8" />
      </g>
    </svg>
  );
}
