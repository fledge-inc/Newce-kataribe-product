# OMOTELL user prototype blueprint

## 1. Screen and component inventory

| Screen | Route | Primary reusable components |
|---|---|---|
| Language selection | `/[locale]` | `BrandMark`, `LanguageOption` |
| Store home | `/[locale]/store` | `AppHeader`, `HeroBanner`, `SectionHeader`, `ProductCard`, `BottomNav` |
| Product list | `/[locale]/products` | `AppHeader`, `SearchField`, `CategoryTabs`, `ProductListItem`, `EmptyState`, `BottomNav` |
| Product detail | `/[locale]/products/[slug]` | `ProductHero`, `AnchorTabs`, `InfoSection`, `Tag`, `FixedCta`, `ImageWithFallback` |
| Features | product-detail anchor | `InfoSection`, `FeatureGrid`, `MediaCard` |
| Recipes | future route/anchor | `StepList`, `RecipeCard`, `VideoPlayer` |
| Comparison | future route | `ComparisonTable`, `ProductSelector` |
| Ingredients | future route/anchor | `IngredientList`, `AllergenBadge`, `NutritionTable` |
| Show to staff | future route | `StaffProductCard`, `StoreMap` |
| Survey | future route | `SurveyQuestion`, `ChoiceGroup` |
| Share/save | bottom sheet | `BottomSheet`, `ShareAction`, `SaveButton` |

Cross-screen states: `LoadingState`, `ImageWithFallback`, `EmptyState`, and route-level not-found handling.

## 2. Data type definitions

Canonical TypeScript definitions live in `src/types/content.ts`.

- `Locale`: `ja | en | zh-CN | zh-TW | ko`
- `LocalizedText`: locale-keyed text
- `Product`: identity, translated content, images, tags, details, usage, nutrition, and category
- `Store`: translated store metadata, hero media, featured product IDs, and categories
- `ProductCategory`: category identity and translated label
- `ProductDetailSection`: anchor ID, translated title/body, and optional image
- `UsageStep`: translated instruction and optional media

Product-specific names, descriptions, tags, ingredients, and recommendations are never embedded in components.

## 3. Directory structure

```text
.
├── docs/
│   ├── reference/
│   │   ├── screens/
│   │   └── proposal/
│   ├── 00-development-process.md
│   └── 01-product-blueprint.md
├── messages/
├── public/images/
├── src/
│   ├── app/[locale]/
│   ├── components/
│   ├── data/
│   ├── i18n/
│   ├── lib/
│   └── types/
└── tests/
    ├── screenshots/
    └── visual.spec.ts
```

## 4. Design tokens

| Token | Value | Purpose |
|---|---:|---|
| Canvas | `#F7F4EE` | warm off-white background |
| Surface | `#FFFFFF` | cards and controls |
| Ink | `#24211D` | primary text |
| Muted | `#6E685F` | supporting text |
| Rule | `#DED7CB` | beige borders |
| Gold | `#A87935` | primary action and active state |
| Gold dark | `#795522` | accessible pressed/text state |
| Soft gold | `#F1E7D7` | tags and quiet emphasis |
| Error | `#A54135` | error messaging |
| Radius | `6, 8, 12, 16px` | controls through hero surfaces |
| Spacing | `4px` base | all layout spacing |
| Mobile width | `390px` | centered desktop shell |
| Tap target | `44px` minimum | accessibility |

Typography: Noto Sans JP for interface and body; Noto Serif JP for selected product/store display names. Font sizes use fixed responsive-safe values rather than viewport scaling.

## 5. Implementation plan

1. Archive all supplied visuals and split the UI montage into per-screen references.
2. Establish the Next.js App Router, TypeScript, Tailwind, `next-intl`, Lucide, and Playwright toolchain.
3. Define typed mock content and five-locale translation helpers.
4. Build shared shell, header, navigation, cards, image fallback, and state components.
5. Implement language selection and verify locale switching.
6. Implement store home with hero, featured products, categories, and bottom navigation.
7. Implement searchable/filterable product list with an empty state.
8. Implement product detail with product hero, anchor tabs, scroll synchronization, rich sections, and fixed CTA.
9. Add route loading states and image failure behavior.
10. Capture and inspect screenshots at 390x844 for every page, plus 360px and 430px overflow checks.

## Deliberate deviations from the montage

- The first delivery uses a Tokyo Station store context from the requirements rather than copying every montage label.
- Official product photography is used as content media; the montage itself is not used as UI.
- Bottom navigation uses Lucide icons and 44px targets.
- Product detail is long-form enough to validate sticky anchor tab synchronization.

