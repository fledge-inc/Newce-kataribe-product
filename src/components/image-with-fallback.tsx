"use client";

import Image from "next/image";
import {useState} from "react";
import {useTranslations} from "next-intl";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /**
   * スナップするスクロールレール内では、遅延読み込みの画像が入るたびに
   * 高さが動いて再スナップし、読み込みが連鎖することがある。
   * そうした箇所では "eager" を渡してレイアウトを確定させる。
   */
  loading?: "eager" | "lazy";
  className?: string;
  imageClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority,
  loading,
  className = "",
  imageClassName = ""
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const t = useTranslations("Common");

  if (failed) {
    return (
      <div
        className={`flex min-h-24 items-center justify-center bg-kinari text-muted ${className}`}
        role="img"
        aria-label={t("imageUnavailable")}
      >
        <div className="flex flex-col items-center gap-3 px-3 text-center">
          <span className="h-4 w-px bg-rule-strong" aria-hidden="true" />
          <span className="mincho text-[11px] tracking-jp">
            {t("imageUnavailable")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${fill ? "" : "relative"} overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : loading}
        className={imageClassName}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
