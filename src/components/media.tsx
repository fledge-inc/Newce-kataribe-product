import {ImageWithFallback} from "./image-with-fallback";
import {MediaPlaceholder} from "./media-placeholder";

interface MediaProps {
  /** 未設定なら MediaPlaceholder を出す */
  src?: string;
  alt: string;
  /** 写真が無いときに出す文言 */
  placeholderLabel: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  imageClassName?: string;
}

/**
 * 写真の有無を1箇所で吸収する。商品13点・レシピ7品に対して手元の写真は7枚しか
 * 無いので、呼び出し側それぞれで分岐させずここでまとめる。
 */
export function Media({
  src,
  alt,
  placeholderLabel,
  className = "",
  ...rest
}: MediaProps) {
  if (!src) {
    return <MediaPlaceholder label={placeholderLabel} className={className} />;
  }
  return (
    <ImageWithFallback src={src} alt={alt} className={className} {...rest} />
  );
}
