export const locales = ["ja", "en", "zh-CN", "zh-TW", "ko"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export type ProductCategoryId = "all" | "dashi" | "seasoning" | "gift" | "other";

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

export interface Product {
  id: string;
  slug: string;
  category: Exclude<ProductCategoryId, "all">;
  image: string;
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
}

export interface Store {
  id: string;
  name: LocalizedText;
  welcomeTitle: LocalizedText;
  welcomeBody: LocalizedText;
  address: LocalizedText;
  heroImage: string;
  heroImageAlt: LocalizedText;
  featuredProductIds: string[];
}

