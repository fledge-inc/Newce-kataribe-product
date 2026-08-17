import {StoreMapHome, type MapProduct} from "@/components/store-map-home";
import {products} from "@/data/content";
import {getLocalizedText} from "@/lib/localized";
import {setRequestLocale} from "next-intl/server";

/**
 * ピンの座標（地図面に対する 0〜100）。棚の縦アイルに沿わせる。
 * 参考画像の 6 ピンの構図に合わせている。
 */
const pinLayout: {id: string; x: number; y: number}[] = [
  {id: "product-kayanoya-dashi", x: 31, y: 30},
  {id: "product-shiro-dashi", x: 62, y: 30},
  {id: "product-vegetable-dashi", x: 30, y: 44},
  {id: "product-niboshi-dashi", x: 65, y: 44},
  {id: "product-golden-dashi", x: 50, y: 63},
  {id: "product-reduced-salt-dashi", x: 28, y: 79}
];

export default async function MapHomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const mapProducts = pinLayout.flatMap((pin): MapProduct[] => {
    const product = products.find((candidate) => candidate.id === pin.id);
    if (!product) return [];

    return [
      {
        id: product.id,
        slug: product.slug,
        name: getLocalizedText(product.name, locale),
        image: product.image,
        x: pin.x,
        y: pin.y
      }
    ];
  });

  return (
    // ヘッダー(64px)は layout 側。マップ区画が残りの高さを全て使う
    <main className="bg-kinari">
      <StoreMapHome locale={locale} products={mapProducts} />
    </main>
  );
}
