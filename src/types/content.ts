export const locales = ["ja", "en", "zh-CN", "zh-TW", "ko", "ne"] as const;

export type Locale = (typeof locales)[number];

/**
 * コンテンツ本文は ja/en/zh-CN/zh-TW/ko の5言語分のみ持つ（詳細は
 * data/section-templates.ts のコメント参照）。ネパール語のように本文の
 * 翻訳をまだ持たないロケールは en を必須フォールバックとして使うため、
 * en 以外は任意キーにしておく。
 */
export type LocalizedText = Partial<Record<Locale, string>> & {en: string};

export type ProductCategoryId = "all" | "dashi" | "seasoning" | "gift" | "other";

/** 商品が属する実カテゴリ（"all" は絞り込み用の擬似カテゴリなので除く）。 */
export type RealCategoryId = Exclude<ProductCategoryId, "all">;

export interface ProductCategory {
  id: ProductCategoryId;
  label: LocalizedText;
}

export interface UsageStep {
  number: number;
  text: LocalizedText;
}

export interface ProductDetailSection {
  id: "features" | "usage" | "materials" | "comparison" | "details";
  title: LocalizedText;
  body: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
}

/** 「なぜ選ばれているか」の3点（参考画面06）。表示名は messages 側に持つ。 */
export type FeatureId =
  | "selected-ingredients"
  | "no-additives"
  | "careful-process"
  | "easy-to-use"
  | "gift-ready"
  | "long-life";

/** アレルギー表示。表示名は messages の Allergen に持たせて5言語の重複を避ける。 */
export type AllergenId =
  | "wheat"
  | "soy"
  | "milk"
  | "egg"
  | "shrimp"
  | "mackerel"
  | "none";

/** 栄養成分表示の1行。項目名は messages の Nutrition に持つ。 */
export type NutritionKey =
  | "energy"
  | "protein"
  | "fat"
  | "carbohydrate"
  | "salt";

export interface NutritionRow {
  key: NutritionKey;
  value: string;
}

/** 売場案内（参考画面10）。mapX / mapY は館内図 SVG 上の 0〜100 の相対座標。 */
export interface ShelfLocation {
  area: LocalizedText;
  mapX: number;
  mapY: number;
}

/** 比較表の1商品ぶん（参考画面08）。beginner / gift は3段階。 */
export interface CompareSpec {
  base: LocalizedText;
  taste: LocalizedText;
  dishes: LocalizedText;
  usage: LocalizedText;
  dietary: LocalizedText;
  beginner: 1 | 2 | 3;
  gift: 1 | 2 | 3;
}

export interface Product {
  id: string;
  slug: string;
  category: RealCategoryId;
  /** 写真が無い商品は undefined。MediaPlaceholder で受ける。 */
  image?: string;
  imageAlt: LocalizedText;
  name: LocalizedText;
  romanizedName: string;
  shortDescription: LocalizedText;
  summary: LocalizedText;
  recommendation: LocalizedText;
  tags: LocalizedText[];
  sections: ProductDetailSection[];
  usageSteps: UsageStep[];
  featured: boolean;

  /** 特徴の3点（参考06） */
  features: FeatureId[];
  /** 味と香り（参考06） */
  taste: LocalizedText;
  /** 原材料の本文（参考09） */
  ingredientsText: LocalizedText;
  allergens: AllergenId[];
  /** 「1袋8gあたり」等の但し書き */
  nutritionBasis: LocalizedText;
  nutrition: NutritionRow[];
  shelf: ShelfLocation;
  compare: CompareSpec;
  recipeIds: string[];
}

export interface RecipeIngredient {
  name: LocalizedText;
  amount: LocalizedText;
}

export interface Recipe {
  id: string;
  slug: string;
  name: LocalizedText;
  romanizedName: string;
  /** 写真が無いレシピは undefined。 */
  image?: string;
  imageAlt: LocalizedText;
  summary: LocalizedText;
  /** 調理時間（分） */
  minutes: number;
  /** 何人前 */
  serves: number;
  ingredients: RecipeIngredient[];
  steps: LocalizedText[];
  /** このレシピで使う商品 */
  productIds: string[];
}

/** 館内図の区画（参考画面10）。座標は 0〜100 の相対値。 */
export interface StoreArea {
  id: string;
  label: LocalizedText;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Store {
  id: string;
  name: LocalizedText;
  welcomeTitle: LocalizedText;
  welcomeBody: LocalizedText;
  address: LocalizedText;
  hours: LocalizedText;
  heroImage: string;
  heroImageAlt: LocalizedText;
  featuredProductIds: string[];
  areas: StoreArea[];
}

/** アンケート（参考画面11）。設問と選択肢の文言は messages の Survey に持つ。 */
export interface SurveyQuestion {
  id: "understanding" | "intent" | "helpful";
  /** 顔アイコンで答える3択か、選択肢チップか */
  kind: "face" | "chips";
  optionIds: string[];
}
