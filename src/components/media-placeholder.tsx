/**
 * 写真がまだ無い箇所の受け皿。
 *
 * 手元の写真は7枚しかないため、当てにいくと別商品の写真を使うことになる。
 * 誤った写真より「意図的な空き」として見せた方が誠実で、
 * 生成り地＋ヘアライン＋明朝という本文の意匠にも馴染む。
 */
export function MediaPlaceholder({
  label,
  className = ""
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-kinari ${className}`}
      role="img"
      aria-label={label}
    >
      <span className="h-5 w-px bg-rule-strong" aria-hidden="true" />
      <span className="mincho px-4 text-center text-[10px] tracking-jp text-muted">
        {label}
      </span>
    </div>
  );
}
