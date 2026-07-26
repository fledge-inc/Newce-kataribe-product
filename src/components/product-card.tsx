import type {Product} from "@/types/content";
import {getLocalizedText} from "@/lib/localized";
import {ImageWithFallback} from "./image-with-fallback";
import {Chevron} from "./glyphs";
import {Link} from "@/i18n/navigation";

interface ProductCardProps {
  product: Product;
  locale: string;
  variant?: "tile" | "row";
}

export function ProductCard({
  product,
  locale,
  variant = "tile"
}: ProductCardProps) {
  const name = getLocalizedText(product.name, locale);
  const description = getLocalizedText(product.shortDescription, locale);

  if (variant === "row") {
    return (
      <Link
        href={`/products/${product.slug}`}
        locale={locale}
        className="grid min-h-[120px] grid-cols-[96px_1fr_20px] items-center gap-4 border-b border-rule bg-washi px-4 py-5"
      >
        <ImageWithFallback
          src={product.image}
          alt={getLocalizedText(product.imageAlt, locale)}
          width={192}
          height={192}
          sizes="96px"
          className="h-[96px] w-[96px] bg-kinari"
          imageClassName="h-full w-full object-cover"
        />
        <span className="min-w-0">
          <span className="mincho block text-[16px] leading-7 tracking-jp-tight">
            {name}
          </span>
          <span className="mt-1.5 block text-[12px] leading-6 text-muted">
            {description}
          </span>
        </span>
        <Chevron size={11} />
      </Link>
    );
  }

  // レール用の縦長タイル。名前は折り返して切らない。
  return (
    <Link
      href={`/products/${product.slug}`}
      locale={locale}
      className="block w-[148px] flex-none snap-start"
    >
      <ImageWithFallback
        src={product.image}
        alt={getLocalizedText(product.imageAlt, locale)}
        width={296}
        height={370}
        sizes="148px"
        loading="eager"
        className="aspect-[4/5] w-full bg-washi"
        imageClassName="h-full w-full object-cover"
      />
      <span className="mincho mt-3 block text-[13px] leading-5 tracking-jp-tight">
        {name}
      </span>
    </Link>
  );
}
