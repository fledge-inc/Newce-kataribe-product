"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {
  CarrotGlyph,
  DoorArc,
  GiftGlyph,
  RegisterGlyph,
  ShakerGlyph,
  StairsGlyph,
  UpArrowGlyph
} from "./map-glyphs";
import {ImageWithFallback} from "./image-with-fallback";

export interface MapProduct {
  id: string;
  slug: string;
  name: string;
  image?: string;
  /** 地図面に対する 0〜100 の相対座標。ピンの先端が指す位置 */
  x: number;
  y: number;
}

/** ピン先端からの見た目サイズ。座標計算とスタイルで共有する */
const PIN_WIDTH = 54;
const PIN_HEIGHT = 62;

function ProductPin({
  product,
  active
}: {
  product: MapProduct;
  active: boolean;
}) {
  return (
    <span
      className={`relative block transition-transform duration-300 ${
        active ? "scale-110" : ""
      }`}
      style={{width: PIN_WIDTH, height: PIN_HEIGHT}}
    >
      <svg
        viewBox="0 0 54 62"
        className="absolute inset-0 h-full w-full drop-shadow-[0_2px_3px_rgb(20_20_15_/_0.25)]"
        aria-hidden="true"
      >
        <path
          d="M27 60C17.5 46.5 5.5 38.5 5.5 24a21.5 21.5 0 1 1 43 0c0 14.5-12 22.5-21.5 36Z"
          fill={active ? "var(--shu)" : "var(--washi)"}
          stroke={active ? "var(--shu)" : "#8a6a3a"}
          strokeWidth="2"
        />
      </svg>
      <span
        className={`absolute left-1/2 top-[7px] h-[34px] w-[34px] -translate-x-1/2 overflow-hidden rounded-full border ${
          active ? "border-washi/80 bg-washi" : "border-map-line bg-kinari"
        }`}
      >
        {product.image ? (
          <ImageWithFallback
            src={product.image}
            alt=""
            width={68}
            height={68}
            sizes="34px"
            className="h-full w-full"
            imageClassName="h-full w-full object-cover"
          />
        ) : (
          <span className="mincho flex h-full w-full items-center justify-center text-[15px] tracking-normal text-ink">
            {product.name.slice(0, 1)}
          </span>
        )}
      </span>
    </span>
  );
}

/** コーナー案内（野菜・調味料・ギフト）。 */
function CornerBlock({
  icon,
  label,
  caption,
  style
}: {
  icon: React.ReactNode;
  label: string;
  caption: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-1.5 rounded-[3px] border border-map-line bg-map-block px-1 text-center"
      style={style}
    >
      <span className="text-kogane">{icon}</span>
      <span className="mincho whitespace-pre-line text-[10px] leading-4 tracking-jp-tight text-ink">
        {label}
      </span>
      <span className="text-[7px] leading-3 tracking-latin text-muted">
        {caption}
      </span>
    </div>
  );
}

export function StoreMapHome({
  products,
  locale
}: {
  products: MapProduct[];
  locale: string;
}) {
  const t = useTranslations("StoreMap");
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /**
   * 主ラベルの下に添える小さな表記。日本の店内サインの流儀で
   * 日本語+英語を常に併記する（英語 UI のときは日本語を添える）。
   */
  const caption = (latin: string, ja: string) =>
    locale === "en" ? ja : latin;

  return (
    <section
      aria-label={t("title")}
      className="relative flex h-[calc(100svh-64px)] min-h-[600px] flex-col bg-kinari"
    >
      {/* 地図の額。デフォルメした売場をこの中に組む */}
      <div className="relative m-3 flex-1 overflow-hidden rounded-[4px] border border-map-frame/60 bg-map-ground">
        {/* レジカウンター */}
        <div className="absolute left-0 top-0 flex h-[12.5%] w-[57%] items-center justify-center gap-2.5 border-b border-r border-map-line bg-map-block">
          <span className="text-ink-soft">
            <RegisterGlyph size={26} />
          </span>
          <span className="text-center">
            <span className="mincho block text-[11px] tracking-jp-tight text-ink">
              {t("cashier")}
            </span>
            <span className="mt-0.5 block text-[7px] tracking-latin text-muted">
              {caption("CASHIER", "レジカウンター")}
            </span>
          </span>
        </div>

        {/* スタッフルーム */}
        <div className="absolute right-0 top-0 flex h-[12.5%] w-[43%] items-center justify-center border-b border-l border-map-line bg-washi">
          <span className="text-center">
            <span className="mincho block text-[11px] tracking-jp-tight text-ink">
              {t("staffRoom")}
            </span>
            <span className="mt-0.5 block text-[7px] tracking-latin text-muted">
              {caption("STAFF ROOM", "スタッフルーム")}
            </span>
          </span>
          <span className="absolute bottom-[-1px] left-[10%] text-map-frame">
            <DoorArc size={22} flip />
          </span>
        </div>

        {/* 商品棚（縦のアイル） */}
        {[10.5, 23, 35.5, 48, 60.5].map((x) => (
          <div
            key={x}
            className="absolute rounded-[5px] bg-map-shelf"
            style={{
              left: `${x - 3.2}%`,
              width: "6.4%",
              top: "17.5%",
              height: "57%"
            }}
            aria-hidden="true"
          />
        ))}

        {/* 右列のコーナー案内 */}
        <CornerBlock
          icon={<CarrotGlyph size={26} />}
          label={t("vegetableCorner")}
          caption={caption("VEGETABLE\nCORNER", "野菜コーナー")}
          style={{right: "3%", top: "16.5%", width: "21%", height: "20%"}}
        />
        <CornerBlock
          icon={<ShakerGlyph size={24} />}
          label={t("seasoningCorner")}
          caption={caption("SEASONING\nCORNER", "調味料コーナー")}
          style={{right: "3%", top: "41%", width: "21%", height: "20%"}}
        />
        <CornerBlock
          icon={<GiftGlyph size={24} />}
          label={t("giftCorner")}
          caption={caption("GIFT\nCORNER", "ギフトコーナー")}
          style={{right: "3%", top: "65.5%", width: "21%", height: "20%"}}
        />

        {/* 階段 */}
        <div className="absolute bottom-[2.5%] left-[3%] flex h-[13%] w-[18%] flex-col items-center justify-center gap-1 rounded-[3px] border border-map-line bg-map-block">
          <span className="text-ink-soft">
            <StairsGlyph size={20} />
          </span>
          <span className="mincho text-[10px] tracking-jp-tight text-ink">
            {t("stairs")}
          </span>
          <span className="flex items-center gap-1 text-[7px] tracking-latin text-muted">
            {caption("STAIRS", "階段")}
            <span className="text-kogane">
              <UpArrowGlyph size={9} />
            </span>
          </span>
        </div>

        {/* 入口 — 現在地 */}
        <div className="absolute inset-x-0 bottom-[1%] flex flex-col items-center">
          <span className="flex text-ink-soft" aria-hidden="true">
            <DoorArc size={30} />
            <DoorArc size={30} flip />
          </span>
          <span
            className="mt-1 h-0 w-0 border-x-[7px] border-b-[10px] border-x-transparent border-b-shu"
            aria-hidden="true"
          />
          <span className="mt-1 text-[7px] font-medium tracking-latin text-shu">
            YOU ARE HERE
          </span>
          <span className="mincho mt-0.5 text-[11px] tracking-jp text-ink">
            {t("entrance")}
          </span>
          <span className="text-[7px] tracking-latin text-muted">
            {caption("ENTRANCE", "入口")}
          </span>
        </div>

        {/* 商品ピン */}
        <div aria-label={t("productsLabel")} role="group">
          {products.map((product) => {
            const active = product.id === selectedId;
            return (
              <button
                key={product.id}
                type="button"
                aria-label={`${t("openProduct")}: ${product.name}`}
                aria-pressed={active}
                onClick={() => {
                  // ピンを朱に灯してから、ものがたり画面へ遷移する
                  setSelectedId(product.id);
                  router.push(`/products/${product.slug}`, {locale});
                }}
                className={`absolute flex flex-col items-center ${
                  active ? "z-20" : "z-10"
                }`}
                style={{
                  left: `${product.x}%`,
                  top: `${product.y}%`,
                  transform: `translate(-50%, -${PIN_HEIGHT}px)`
                }}
              >
                <ProductPin product={product} active={active} />
                <span
                  className={`mincho mt-[3px] whitespace-nowrap rounded-[3px] border px-2 py-[3px] text-[10px] tracking-jp-tight shadow-[0_1px_2px_rgb(20_20_15_/_0.12)] ${
                    active
                      ? "border-shu bg-shu text-white"
                      : "border-map-line bg-washi text-ink"
                  }`}
                >
                  {product.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
