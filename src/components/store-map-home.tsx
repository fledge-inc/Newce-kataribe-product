"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {ImageWithFallback} from "./image-with-fallback";
import {LanguagePill} from "./site-header";

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

  const instruction =
    locale === "en"
      ? "Tap a pin to discover its story"
      : locale === "ja"
        ? "ピンをタップして、商品の物語へ"
        : "Tap a pin to discover its story";

  return (
    <section
      aria-label={t("title")}
      className="relative h-svh min-h-[600px] overflow-hidden bg-kinari"
    >
      <div className="absolute right-4 top-4 z-30 rounded-full shadow-[0_5px_22px_rgb(20_20_15_/_0.18)]">
        <LanguagePill />
      </div>

      {/* 写実的な俯瞰マップ。ピンは画像に焼き込まず、既存UIを重ねる。 */}
      <div className="absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src="/images/kataribe-v2/map/store-map-portrait.png"
          alt={t("title")}
          fill
          priority
          sizes="(max-width: 639px) 100vw, 420px"
          className="absolute inset-0"
          imageClassName="object-cover object-center"
        />

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
                  router.push("/products/kayanoya-dashi", {locale: "en"});
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

      <p className="mincho absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] border border-kogane/60 bg-kinari/90 px-5 py-3 text-[12px] tracking-[0.05em] text-kogane shadow-[0_5px_20px_rgb(0_0_0_/_0.16)] backdrop-blur-sm">
        {instruction}
      </p>
    </section>
  );
}
