import type {Locale, Product} from "@/types/content";
import {getLocalizedText} from "@/lib/localized";

export interface RichStoryRelatedProduct {
  label: string;
  image: string;
  shopUrl: string;
}

export interface RichProductStoryData {
  productName: string;
  shareText: string;
  pages: {
    image: string;
    alt: string;
    position: string;
    kicker: string;
    title: string;
    body: string;
    chips?: string[];
    steps?: {number: number; text: string}[];
    note?: {label: string; text: string};
  }[];
  details: {
    contentsLabel: string;
    contents: string;
    allergensLabel: string;
    allergens: string;
    storageLabel: string;
    storage: string;
    nutritionLabel: string;
    nutrition: {label: string; value: string}[];
    ingredients: string;
  };
  relatedProducts: RichStoryRelatedProduct[];
  labels: {
    scroll: string;
    map: string;
    page: string;
    pages: string;
    instagram: string;
    x: string;
    whatsapp: string;
    google: string;
  };
}

const mapProducts = [
  "kayanoya-dashi",
  "shiro-dashi",
  "vegetable-dashi",
  "niboshi-dashi",
  "golden-dashi",
  "reduced-salt-dashi"
] as const;

export const richStoryProductSlugs = new Set<string>(mapProducts);

const productEditorialImages: Record<string, string> = Object.fromEntries(
  mapProducts.map((slug) => [slug, `/images/kataribe-v2/story/product-backgrounds/${slug}.jpg`])
);

const shopUrls: Record<string, string> = {
  "kayanoya-dashi": "https://www.kubara.jp/kayanoya/dashi/kayanoyadashi/570000/",
  "shiro-dashi": "https://www.kubara.jp/kayanoya/seasoning/tsuyu/267400/",
  "vegetable-dashi": "https://www.kubara.jp/kayanoya/all_dashi/yasaidashi/586000/",
  "niboshi-dashi": "https://www.kubara.jp/kayanoya/all_dashi/niboshidashi/",
  "golden-dashi": "https://www.kubara.jp/kayanoya/all_dashi/",
  "reduced-salt-dashi": "https://www.kubara.jp/kayanoya/dashi/genen-kayanoyadashi/577500/"
};

const productContents: Record<string, string> = {
  "kayanoya-dashi": "8 g × 30",
  "shiro-dashi": "500 ml",
  "vegetable-dashi": "8 g × 24",
  "niboshi-dashi": "8 g × 30",
  "golden-dashi": "8 g × 20",
  "reduced-salt-dashi": "8 g × 27"
};

const ui = {
  ja: {
    ingredients: "素材と仕立て", usage: "基本の使い方", table: "毎日の食卓へ", details: "商品詳細",
    discover: "次のだしを見つける", discoverBody: "好みの素材や、毎日の料理に合うだしをお選びください。",
    scroll: "スクロールして読む ↓", another: "もうひとつの使い方", contents: "内容量", allergens: "アレルゲン",
    storage: "保存方法", storageText: "多湿・直射日光を避けて常温で保存してください。", nutrition: "栄養成分",
    map: "マップ", page: "ストーリーページ", pages: "ストーリーページ一覧", instagram: "Instagramで共有",
    x: "Xで共有", whatsapp: "WhatsAppで共有", google: "Googleマップで茅乃舎の口コミを見る"
  },
  en: {
    ingredients: "INGREDIENTS & CRAFT", usage: "HOW TO PREPARE", table: "EVERYDAY COOKING", details: "PRODUCT DETAILS",
    discover: "Find your next dashi.", discoverBody: "Choose a stock that fits the ingredients you love and the food you cook every day.",
    scroll: "SCROLL TO DISCOVER ↓", another: "ANOTHER WAY TO USE IT", contents: "CONTENTS", allergens: "ALLERGENS",
    storage: "STORAGE", storageText: "Keep away from humidity and direct sunlight.", nutrition: "NUTRITION",
    map: "MAP", page: "Story page", pages: "Story pages", instagram: "Share on Instagram",
    x: "Share on X", whatsapp: "Share on WhatsApp", google: "View Kayanoya reviews on Google Maps"
  },
  "zh-CN": {
    ingredients: "食材与工艺", usage: "基本用法", table: "融入每日料理", details: "商品详情",
    discover: "寻找下一款高汤", discoverBody: "根据喜爱的食材与日常料理，选择适合您的高汤。",
    scroll: "向下滚动阅读 ↓", another: "另一种用法", contents: "内容量", allergens: "过敏原",
    storage: "保存方法", storageText: "请避开潮湿与阳光直射，常温保存。", nutrition: "营养成分",
    map: "地图", page: "故事页面", pages: "故事页面导航", instagram: "分享到Instagram",
    x: "分享到X", whatsapp: "分享到WhatsApp", google: "在Google地图查看茅乃舎评价"
  },
  "zh-TW": {
    ingredients: "食材與工藝", usage: "基本用法", table: "融入每日料理", details: "商品詳情",
    discover: "尋找下一款高湯", discoverBody: "依照喜愛的食材與日常料理，選擇適合您的高湯。",
    scroll: "向下捲動閱讀 ↓", another: "另一種用法", contents: "內容量", allergens: "過敏原",
    storage: "保存方法", storageText: "請避開潮濕與陽光直射，常溫保存。", nutrition: "營養成分",
    map: "地圖", page: "故事頁面", pages: "故事頁面導覽", instagram: "分享到Instagram",
    x: "分享到X", whatsapp: "分享到WhatsApp", google: "在Google地圖查看茅乃舍評價"
  },
  ko: {
    ingredients: "재료와 제조법", usage: "기본 사용법", table: "매일의 식탁", details: "상품 정보",
    discover: "다음 다시를 찾아보세요", discoverBody: "좋아하는 재료와 매일 만드는 요리에 어울리는 다시를 골라 보세요.",
    scroll: "아래로 스크롤해 보기 ↓", another: "또 다른 사용법", contents: "내용량", allergens: "알레르기",
    storage: "보관 방법", storageText: "습기와 직사광선을 피해 실온에 보관하세요.", nutrition: "영양 성분",
    map: "지도", page: "스토리 페이지", pages: "스토리 페이지 목록", instagram: "Instagram에 공유",
    x: "X에 공유", whatsapp: "WhatsApp에 공유", google: "Google 지도에서 가야노야 리뷰 보기"
  },
  ne: {
    ingredients: "सामग्री र निर्माण", usage: "प्रयोग गर्ने तरिका", table: "दैनिक भोजनका लागि", details: "उत्पादन विवरण",
    discover: "आफ्नो अर्को दाशी छान्नुहोस्", discoverBody: "मनपर्ने सामग्री र दैनिक परिकारसँग मिल्ने दाशी रोज्नुहोस्।",
    scroll: "तल स्क्रोल गरेर हेर्नुहोस् ↓", another: "प्रयोग गर्ने अर्को तरिका", contents: "परिमाण", allergens: "एलर्जी तत्व",
    storage: "भण्डारण", storageText: "चिस्यान र प्रत्यक्ष घामबाट टाढा सामान्य तापक्रममा राख्नुहोस्।", nutrition: "पोषण विवरण",
    map: "नक्सा", page: "कथा पृष्ठ", pages: "कथा पृष्ठहरू", instagram: "Instagram मा साझा गर्नुहोस्",
    x: "X मा साझा गर्नुहोस्", whatsapp: "WhatsApp मा साझा गर्नुहोस्", google: "Google Maps मा Kayanoya समीक्षा हेर्नुहोस्"
  }
} satisfies Record<Locale, Record<string, string>>;

const nepaliProducts: Record<string, {name: string; short: string; summary: string; recommendation: string; taste: string; ingredients: string; tags: string[]}> = {
  "kayanoya-dashi": {
    name: "कायानोया दाशी", short: "भुटेको उड्ने माछाबाट बनेको गहिरो उमामीयुक्त उत्कृष्ट जापानी झोल।",
    summary: "भुटेको उड्ने माछा, बोनिटो, सुकाएको हेरिङ र कोम्बुलाई सन्तुलित रूपमा मिसाइएको छ।",
    recommendation: "मिसो सुप, उमालेका परिकार र दैनिक जापानी खानाका लागि सजिलो र भरपर्दो छनोट।",
    taste: "सफा अन्त्यसहित परिष्कृत र गोलो उमामी।",
    ingredients: "बोनिटो, सुकाएको हेरिङ, भुटेको उड्ने माछा, कोम्बु, डेक्स्ट्रिन, यीस्ट एक्स्ट्र्याक्ट, नुन र सोया सस पाउडर।",
    tags: ["दाशी प्याकेट", "भुटेको उड्ने माछा", "बोनिटो", "कोम्बु"]
  },
  "shiro-dashi": {
    name: "शिरो दाशी", short: "परिकारको प्राकृतिक रङ जोगाउँदै स्वाद मिलाउने तरल दाशी।",
    summary: "हल्का सोया सस र दाशीको मिश्रणले अण्डा, सुप र नुडललाई सजिलै स्वादिलो बनाउँछ।",
    recommendation: "रोल गरिएको अण्डा, चावानमुशी र उदोनको झोलका लागि।",
    taste: "नरम दाशीको सुवास र सजिलै मिलाउन सकिने नुनिलोपन।",
    ingredients: "सोया सस, नुन, चिनी, बोनिटो एक्स्ट्र्याक्ट, कोम्बु एक्स्ट्र्याक्ट र मिरिन।",
    tags: ["तरल", "हल्का सोया सस"]
  },
  "vegetable-dashi": {
    name: "तरकारी दाशी", short: "पाँच जापानी तरकारीको मिठास र गहिराइ।",
    summary: "प्याज, लसुन, गाजर, सेलरी र बन्दाकोबीबाट बनेको स्वादिलो तर हल्का पश्चिमी शैलीको झोल।",
    recommendation: "सुप, पास्ता, स्ट्यु र तरकारीका परिकारका लागि।",
    taste: "लामो समय रहने गहिराइसँग कोमल तरकारी मिठास।",
    ingredients: "प्याज, लसुन, गाजर, सेलरी, बन्दाकोबी, यीस्ट एक्स्ट्र्याक्ट, नुन र मसला।",
    tags: ["तरकारी", "पश्चिमी शैली", "मासुरहित"]
  },
  "niboshi-dashi": {
    name: "निबोशी दाशी", short: "सुकाएको माछाको बलियो उमामी र सुवास।",
    summary: "मिसो सुप र नुडलसँग विशेष रूपमा मिल्ने गहिरो स्वादको झोल।",
    recommendation: "समुद्री स्वाद र भरिलो झोल मन पराउनेहरूका लागि।",
    taste: "भुटेको सुवास, बलियो स्वाद र लामो उमामी।",
    ingredients: "सुकाएको हेरिङ, बोनिटो, कोम्बु, डेक्स्ट्रिन, यीस्ट एक्स्ट्र्याक्ट र नुन।",
    tags: ["सुकाएको माछा", "गहिरो स्वाद"]
  },
  "golden-dashi": {
    name: "गोल्डेन रेसियो दाशी", short: "सन्तुलित अनुपातमा बोनिटो र कोम्बु मिसाइएको विशेष दाशी।",
    summary: "छनोट गरिएका सामग्रीको अनुपातबाट पहिलो झोलजस्तै सफा सुवास र नाजुक स्वाद निकालिएको छ।",
    recommendation: "दाशीको आफ्नै सुवास र सफा सुपको स्वाद लिन चाहनेहरूका लागि।",
    taste: "सफा सुवास र नाजुक, परिष्कृत मिठास।",
    ingredients: "बोनिटो, कोम्बु र नुन।",
    tags: ["बोनिटो", "कोम्बु", "सीमित उत्पादन"]
  },
  "reduced-salt-dashi": {
    name: "कम नुनको कायानोया दाशी", short: "परिचित उमामी कायम राखी नुन घटाइएको जापानी दाशी।",
    summary: "कायानोया दाशीका मूल सामग्रीको स्वादलाई अझ स्पष्ट बनाउँदै नुन कम गरिएको छ।",
    recommendation: "हल्का स्वाद चाहने वा आफ्नै तरिकाले मसला मिलाउन चाहनेहरूका लागि।",
    taste: "कम नुनिलो, सफा र सामग्रीको सुवास स्पष्ट।",
    ingredients: "बोनिटो, सुकाएको हेरिङ, भुटेको उड्ने माछा, कोम्बु, डेक्स्ट्रिन, यीस्ट एक्स्ट्र्याक्ट र सोया सस पाउडर।",
    tags: ["कम नुन", "जापानी शैली"]
  }
};

const nutritionLabels: Record<Locale, Record<string, string>> = {
  ja: {energy: "熱量", protein: "たんぱく質", fat: "脂質", carbohydrate: "炭水化物", salt: "食塩相当量"},
  en: {energy: "Energy", protein: "Protein", fat: "Fat", carbohydrate: "Carbohydrate", salt: "Salt"},
  "zh-CN": {energy: "能量", protein: "蛋白质", fat: "脂肪", carbohydrate: "碳水化合物", salt: "食盐"},
  "zh-TW": {energy: "熱量", protein: "蛋白質", fat: "脂肪", carbohydrate: "碳水化合物", salt: "食鹽"},
  ko: {energy: "열량", protein: "단백질", fat: "지방", carbohydrate: "탄수화물", salt: "소금"},
  ne: {energy: "ऊर्जा", protein: "प्रोटिन", fat: "बोसो", carbohydrate: "कार्बोहाइड्रेट", salt: "नुन"}
};

const allergenLabels: Record<Locale, Record<string, string>> = {
  ja: {wheat: "小麦", soy: "大豆", milk: "乳", egg: "卵", shrimp: "えび", mackerel: "さば", none: "なし"},
  en: {wheat: "Wheat", soy: "Soy", milk: "Milk", egg: "Egg", shrimp: "Shrimp", mackerel: "Mackerel", none: "None"},
  "zh-CN": {wheat: "小麦", soy: "大豆", milk: "乳", egg: "鸡蛋", shrimp: "虾", mackerel: "鲭鱼", none: "无"},
  "zh-TW": {wheat: "小麥", soy: "大豆", milk: "乳", egg: "蛋", shrimp: "蝦", mackerel: "鯖魚", none: "無"},
  ko: {wheat: "밀", soy: "대두", milk: "우유", egg: "달걀", shrimp: "새우", mackerel: "고등어", none: "없음"},
  ne: {wheat: "गहुँ", soy: "सोया", milk: "दूध", egg: "अण्डा", shrimp: "झिँगेमाछा", mackerel: "म्याकरेल", none: "छैन"}
};

function localizedProductCopy(product: Product, locale: Locale) {
  if (locale === "ne") return nepaliProducts[product.slug];
  return {
    name: getLocalizedText(product.name, locale),
    short: getLocalizedText(product.shortDescription, locale),
    summary: getLocalizedText(product.summary, locale),
    recommendation: getLocalizedText(product.recommendation, locale),
    taste: getLocalizedText(product.taste, locale),
    ingredients: getLocalizedText(product.ingredientsText, locale),
    tags: product.tags.slice(0, 4).map((tag) => getLocalizedText(tag, locale))
  };
}

export function buildRichProductStory(product: Product, allProducts: Product[], locale: Locale): RichProductStoryData {
  const labels = ui[locale];
  const copy = localizedProductCopy(product, locale);
  const usage = product.usageSteps.map((step) => ({
    number: step.number,
    text: locale === "ne"
      ? ["पानीमा उत्पादन हाल्नुहोस्।", "उमालेपछि २–३ मिनेट पकाउनुहोस्।", "स्वाद मिलाएर परिकारमा प्रयोग गर्नुहोस्।"][step.number - 1]
      : getLocalizedText(step.text, locale)
  }));
  const relatedPool = mapProducts.filter((slug) => slug !== product.slug);
  const start = mapProducts.indexOf(product.slug as (typeof mapProducts)[number]);
  const relatedSlugs = Array.from({length: 3}, (_, index) => relatedPool[(start + index) % relatedPool.length]);
  const relatedProducts = relatedSlugs.flatMap((slug) => {
    const related = allProducts.find((candidate) => candidate.slug === slug);
    if (!related) return [];
    const relatedCopy = localizedProductCopy(related, locale);
    return [{
      label: relatedCopy.name,
      image: related.image ?? "/images/ingredients/dashi-ingredients.jpg",
      shopUrl: shopUrls[slug]
    }];
  });

  const heroImage = product.image ?? "/images/ingredients/dashi-ingredients.jpg";
  const editorialImage = productEditorialImages[product.slug] ?? "/images/ingredients/dashi-ingredients.jpg";
  const featureSection = product.sections.find((section) => section.id === "features");
  const usageSection = product.sections.find((section) => section.id === "usage");

  return {
    productName: copy.name,
    shareText: `${copy.name} — KATARIBE`,
    pages: [
      {
        image: heroImage, alt: copy.name, position: "center 52%", kicker: product.romanizedName,
        title: copy.name, body: `${copy.short} ${copy.summary}`
      },
      {
        image: editorialImage, alt: copy.name, position: "center",
        kicker: labels.ingredients,
        title: locale === "ne" ? labels.ingredients : getLocalizedText(featureSection?.title ?? product.name, locale),
        body: locale === "ne" ? copy.summary : getLocalizedText(featureSection?.body ?? product.summary, locale),
        chips: copy.tags
      },
      {
        image: editorialImage, alt: labels.usage, position: "center 58%",
        kicker: labels.usage, title: labels.usage,
        body: locale === "ne" ? copy.short : getLocalizedText(usageSection?.body ?? product.summary, locale), steps: usage
      },
      {
        image: editorialImage, alt: copy.name, position: "center 66%",
        kicker: labels.table, title: copy.recommendation, body: copy.taste,
        note: {label: labels.another, text: copy.summary}
      },
      {
        image: heroImage, alt: copy.name, position: "center 52%", kicker: labels.details, title: labels.details, body: ""
      },
      {
        image: editorialImage, alt: labels.discover,
        position: "center 48%", kicker: labels.discover, title: labels.discover, body: labels.discoverBody
      }
    ],
    details: {
      contentsLabel: labels.contents,
      contents: productContents[product.slug] ?? getLocalizedText(product.nutritionBasis, locale),
      allergensLabel: labels.allergens,
      allergens: product.allergens.map((id) => allergenLabels[locale][id] ?? id).join(" · "),
      storageLabel: labels.storage,
      storage: labels.storageText,
      nutritionLabel: labels.nutrition,
      nutrition: product.nutrition.map((row) => ({label: nutritionLabels[locale][row.key], value: row.value})),
      ingredients: copy.ingredients
    },
    relatedProducts,
    labels: {
      scroll: labels.scroll, map: labels.map, page: labels.page, pages: labels.pages,
      instagram: labels.instagram, x: labels.x, whatsapp: labels.whatsapp, google: labels.google
    }
  };
}
