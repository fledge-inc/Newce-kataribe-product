import type {AllergenId, NutritionRow} from "@/types/content";

/** アレルギー表示（参考画面09）。塗りを使わず、ヘアラインの枠だけで示す。 */
export function AllergenBadges({
  allergens,
  labels,
  heading
}: {
  allergens: AllergenId[];
  labels: Record<string, string>;
  heading: string;
}) {
  if (allergens.length === 0) return null;

  return (
    <div className="mt-7">
      <h3 className="mincho text-[12px] tracking-jp">{heading}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {allergens.map((allergen) => (
          <span
            key={allergen}
            className={`mincho border px-2.5 py-1 text-[10px] tracking-jp ${
              allergen === "none"
                ? "border-rule text-muted"
                : "border-shu/45 text-shu"
            }`}
          >
            {labels[allergen] ?? allergen}
          </span>
        ))}
      </div>
    </div>
  );
}

/** 栄養成分表示（参考画面09）。罫線だけの2列表。 */
export function NutritionTable({
  rows,
  basis,
  labels,
  heading
}: {
  rows: NutritionRow[];
  basis: string;
  labels: Record<string, string>;
  heading: string;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="mincho text-[12px] tracking-jp">{heading}</h3>
        <p className="text-[10px] tracking-jp-tight text-muted">{basis}</p>
      </div>
      <dl className="mt-3 border-t border-rule">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between gap-4 border-b border-rule py-3"
          >
            <dt className="text-[12px] tracking-jp-tight text-ink-soft">
              {labels[row.key] ?? row.key}
            </dt>
            <dd className="mincho text-[13px] tracking-jp-tight">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
