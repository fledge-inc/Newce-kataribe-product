interface BrandMarkProps {
  compact?: boolean;
  variant?: "light" | "dark";
}

export function BrandMark({
  compact = false,
  variant = "dark"
}: BrandMarkProps) {
  const tone = variant === "light" ? "text-white" : "text-ink";
  const ruleTone = variant === "light" ? "bg-white/50" : "bg-rule-strong";

  return (
    <div className={`flex items-center gap-3 ${tone}`} aria-label="OMOTELL">
      <span
        className={`mincho tracking-latin ${compact ? "text-[13px]" : "text-[16px]"}`}
      >
        OMOTELL
      </span>
      {!compact && (
        <span className={`h-px w-7 ${ruleTone}`} aria-hidden="true" />
      )}
    </div>
  );
}
