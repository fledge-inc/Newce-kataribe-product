"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {CloseGlyph} from "./glyphs";

/**
 * 共有・保存の下から出るシート（参考画面12）。
 *
 * 参考画面には Instagram が並んでいるが、Instagram は Web から直接投稿する
 * 手段が無い。押せるのに何も起きないボタンを置くより、リンクのコピーに
 * 集約する方が誠実なので、ここでは出していない。
 */
export function ShareSheet({
  open,
  onClose,
  title,
  isFavorite,
  onToggleFavorite
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const t = useTranslations("Share");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setUrl(window.location.href);
      setCopied(false);
    }
  }, [open]);

  // シートが開いている間は Esc で閉じられるようにする
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const shareText = `${title}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const links = [
    {
      id: "line",
      label: "LINE",
      href: `https://line.me/R/msg/text/?${encodedText}%0A${encodedUrl}`
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    },
    {
      id: "mail",
      label: t("mail"),
      href: `mailto:?subject=${encodedText}&body=${encodedUrl}`
    }
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // クリップボードが使えない環境では入力欄から手動でコピーしてもらう
      setCopied(false);
    }
  };

  const useNativeShare = async () => {
    try {
      await navigator.share({title, url});
      onClose();
    } catch {
      // 共有をキャンセルした場合は何もしない
    }
  };

  const canShareNatively =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-sumi/55"
        aria-label={t("close")}
        onClick={onClose}
      />

      <div
        className="mobile-fixed relative max-h-[86svh] overflow-y-auto border-t border-rule bg-washi pb-8"
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
      >
        <div className="gutter flex min-h-14 items-center justify-between border-b border-rule">
          <h2 className="mincho text-[14px] tracking-jp">{t("title")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-muted"
            aria-label={t("close")}
          >
            <CloseGlyph />
          </button>
        </div>

        <div className="gutter pt-6">
          {canShareNatively && (
            <button
              type="button"
              onClick={useNativeShare}
              className="mincho mb-4 flex min-h-12 w-full items-center justify-center bg-sumi text-[12px] tracking-jp text-white"
            >
              {t("system")}
            </button>
          )}

          <ul className="border-t border-rule">
            {links.map((link) => (
              <li key={link.id} className="border-b border-rule">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mincho flex min-h-[52px] items-center text-[13px] tracking-jp"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="border-b border-rule">
              <button
                type="button"
                onClick={copyLink}
                className="mincho flex min-h-[52px] w-full items-center justify-between text-left text-[13px] tracking-jp"
              >
                {t("copyLink")}
                {copied && (
                  <span className="text-[11px] tracking-jp text-shu">
                    {t("copied")}
                  </span>
                )}
              </button>
            </li>
          </ul>

          <div className="mt-8 border-t border-rule pt-6">
            <h3 className="mincho text-[12px] tracking-jp">{t("saveTitle")}</h3>
            <button
              type="button"
              onClick={onToggleFavorite}
              className={`mincho mt-4 flex min-h-12 w-full items-center justify-center border text-[12px] tracking-jp ${
                isFavorite
                  ? "border-shu/50 text-shu"
                  : "border-ink text-ink"
              }`}
            >
              {isFavorite ? t("saved") : t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
