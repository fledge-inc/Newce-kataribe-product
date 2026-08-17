/**
 * デフォルメ店内マップ専用の記号。参考画像の「テーマパークの案内図」の
 * トーンに合わせ、コーナー記号だけ色を持たせる（他は線画のまま）。
 */

/** レジスター。レジカウンターの記号。 */
export function RegisterGlyph({size = 24}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2.5" y="14.5" width="21" height="6" />
        <path d="M5.5 14.5 7 8h9.5l1.5 6.5" />
        <rect x="8" y="3.5" width="7" height="2.6" />
        <path d="M11.5 6.1V8" />
        <path d="M9 11h5.5" />
        <path d="M6 17.5h3" />
      </g>
    </svg>
  );
}

/** 人参。野菜コーナーだけは色で覚えてもらう。 */
export function CarrotGlyph({size = 26}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g
        fill="none"
        stroke="#77894a"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M14.6 9.4 17.8 4.8" />
        <path d="M15.6 10.4 20.8 8.2" />
        <path d="M13.6 8.6 13.4 3.4" />
      </g>
      <path
        d="M15 9c2 .9 2.7 3.3 1.3 5.1-2.4 3.1-6.4 6.1-10.6 7.5-.9.3-1.7-.5-1.4-1.4C5.7 16 8.7 12 11.8 9.6 13 8.7 14 8.5 15 9Z"
        fill="#d5813f"
      />
      <g stroke="#f6efdf" strokeWidth="1" strokeLinecap="round">
        <path d="M12.2 12.6l2.4 1.2" />
        <path d="M9.4 15.6l2.2 1.1" />
      </g>
    </svg>
  );
}

/** 調味料の振出し瓶。 */
export function ShakerGlyph({size = 24}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 4h6l.9 3.6H7.1z" />
        <path d="M6.6 7.6h8.8l1 12.9H5.6z" />
        <path d="M10 11v1.4M12.4 11v1.4M11.2 14.2v1.4" />
      </g>
    </svg>
  );
}

/** ギフト箱。 */
export function GiftGlyph({size = 24}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3.5 8.4h15v3h-15zM4.9 11.4h13.2v7.1H4.9z" />
        <path d="M11 8.4v10.1" />
        <path d="M11 8.4C9.5 6 8.3 4.8 7.3 4.8a2 2 0 0 0 0 3.6zM11 8.4c1.5-2.4 2.7-3.6 3.7-3.6a2 2 0 0 1 0 3.6z" />
      </g>
    </svg>
  );
}

/** 階段。 */
export function StairsGlyph({size = 22}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 20.5h5v-4.5h4.5v-4.5H17V7h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

/** 上向きの矢印。階段の「上へ」を示す。 */
export function UpArrowGlyph({size = 14}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 14" aria-hidden="true">
      <path
        d="M6 13V1.5M6 1.5 1.8 5.7M6 1.5l4.2 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 開き戸の弧。入口の両開き扉とスタッフルームの片開き扉に使う。
 * `flip` で開く向きを反転する。
 */
export function DoorArc({
  size = 30,
  flip = false
}: {
  size?: number;
  flip?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      aria-hidden="true"
      style={flip ? {transform: "scaleX(-1)"} : undefined}
    >
      <path
        d="M2 28V2c14.4 0 26 11.6 26 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M2 28h26" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
