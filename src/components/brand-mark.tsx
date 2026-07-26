interface BrandMarkProps {
  compact?: boolean;
  variant?: "light" | "dark";
}

/**
 * 明朝の「語り部」を主、細い字間の KATARIBE を従に置く。
 * 老舗の意匠に馴染ませつつ、訪日客にも読み方が伝わる組み方。
 */
export function BrandMark({
  compact = false,
  variant = "dark"
}: BrandMarkProps) {
  const tone = variant === "light" ? "text-white" : "text-ink";
  const subTone = variant === "light" ? "text-white/60" : "text-muted";
  const ruleTone = variant === "light" ? "bg-white/50" : "bg-rule-strong";

  if (compact) {
    return (
      <span
        className={`mincho text-[15px] tracking-jp ${tone}`}
        aria-label="語り部 kataribe"
      >
        語り部
      </span>
    );
  }

  return (
    <div className={tone} aria-label="語り部 kataribe">
      <div className="flex items-center gap-3">
        <span className="mincho text-[22px] tracking-jp">語り部</span>
        <span className={`h-px w-7 ${ruleTone}`} aria-hidden="true" />
      </div>
      <span
        className={`mincho mt-2 block text-[10px] tracking-latin ${subTone}`}
      >
        KATARIBE
      </span>
    </div>
  );
}
