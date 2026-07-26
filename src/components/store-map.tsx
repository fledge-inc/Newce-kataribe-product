import type {StoreArea} from "@/types/content";
import {getLocalizedText} from "@/lib/localized";

/**
 * 館内図（参考画面10）。写真ではなくインラインの SVG で描く。
 * ヘアラインの区画＋朱の印という、本文と同じ意匠で組む。
 *
 * 座標は 0〜100 の相対値。viewBox も 0 0 100 100 に合わせている。
 */
export function StoreMap({
  areas,
  locale,
  markX,
  markY,
  markLabel
}: {
  areas: StoreArea[];
  locale: string;
  markX: number;
  markY: number;
  markLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-auto w-full bg-washi"
      role="img"
      aria-label={markLabel}
    >
      {/* 外枠 */}
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="var(--rule-strong)"
        strokeWidth="0.5"
      />

      {areas.map((area) => {
        const isMarked =
          markX >= area.x &&
          markX <= area.x + area.width &&
          markY >= area.y &&
          markY <= area.y + area.height;

        return (
          <g key={area.id}>
            <rect
              x={area.x}
              y={area.y}
              width={area.width}
              height={area.height}
              fill={isMarked ? "var(--kinari)" : "none"}
              stroke="var(--rule)"
              strokeWidth="0.4"
            />
            {/* 現在地の印は区画の中央に立つので、名前は上寄せにして重なりを避ける */}
            <text
              x={area.x + area.width / 2}
              y={area.y + 5.6}
              textAnchor="middle"
              fill="var(--muted)"
              style={{
                fontFamily: "var(--mincho)",
                fontSize: "3.6px",
                letterSpacing: "0.08em"
              }}
            >
              {getLocalizedText(area.label, locale)}
            </text>
          </g>
        );
      })}

      {/* 現在地の印 — 朱の小さな菱形。星より意匠に馴染む */}
      <g transform={`translate(${markX} ${markY})`}>
        <circle r="4.4" fill="none" stroke="var(--shu)" strokeWidth="0.5" />
        <path d="M0 -2.2 2.2 0 0 2.2 -2.2 0Z" fill="var(--shu)" />
      </g>
    </svg>
  );
}
