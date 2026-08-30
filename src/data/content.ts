import type {
  LocalizedText,
  Product,
  ProductCategory,
  Store,
  SurveyQuestion
} from "@/types/content";
import {sectionsFor} from "./section-templates";

const text = (
  ja: string,
  en: string,
  zhCN: string,
  zhTW: string,
  ko: string
): LocalizedText => ({
  ja,
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ko
});

export const categories: ProductCategory[] = [
  {id: "all", label: text("すべて", "All", "全部", "全部", "전체")},
  {id: "dashi", label: text("だし", "Dashi", "高汤", "高湯", "다시")},
  {
    id: "seasoning",
    label: text("調味料", "Seasoning", "调味料", "調味料", "조미료")
  },
  {id: "gift", label: text("ギフト", "Gifts", "礼品", "禮品", "선물")},
  {id: "other", label: text("その他", "Other", "其他", "其他", "기타")}
];

const commonUsage = [
  {
    number: 1,
    text: text(
      "鍋に水400mlとだしパック1袋を入れます。",
      "Place one dashi packet in a pot with 400 ml of water.",
      "锅中加入400毫升水和1袋高汤包。",
      "鍋中加入400毫升水和1袋高湯包。",
      "냄비에 물 400ml와 다시 팩 1개를 넣습니다."
    )
  },
  {
    number: 2,
    text: text(
      "沸騰後、中火で2〜3分煮出します。",
      "After boiling, simmer over medium heat for 2 to 3 minutes.",
      "煮沸后用中火熬煮2至3分钟。",
      "煮沸後以中火熬煮2至3分鐘。",
      "끓은 뒤 중불에서 2~3분 우려냅니다."
    )
  },
  {
    number: 3,
    text: text(
      "だしパックを取り出してお使いください。",
      "Remove the packet and use the finished stock.",
      "取出高汤包后即可使用。",
      "取出高湯包後即可使用。",
      "다시 팩을 꺼낸 뒤 사용하세요."
    )
  }
];

/** 調味料は「かける・混ぜる」ので手順が異なる。 */
const seasoningUsage = [
  {
    number: 1,
    text: text(
      "よく振ってから、小さじ1杯ほどを目安に加えます。",
      "Shake well, then add about one teaspoon as a guide.",
      "充分摇匀后，以约一小匙为标准加入。",
      "充分搖勻後，以約一小匙為標準加入。",
      "잘 흔든 뒤 작은술 1스푼 정도를 기준으로 넣습니다."
    )
  },
  {
    number: 2,
    text: text(
      "味を見ながら少しずつ足して整えます。",
      "Taste as you go and add a little at a time.",
      "边尝味边少量逐次添加调整。",
      "邊嘗味邊少量逐次添加調整。",
      "맛을 보면서 조금씩 더해 간을 맞춥니다."
    )
  },
  {
    number: 3,
    text: text(
      "開封後は冷蔵庫で保存し、お早めにお使いください。",
      "After opening, refrigerate and use promptly.",
      "开封后请冷藏保存并尽早使用。",
      "開封後請冷藏保存並盡早使用。",
      "개봉 후에는 냉장 보관하고 되도록 빨리 사용하세요."
    )
  }
];

/** ギフト・道具は調理手順が無いので、店頭での流れを示す。 */
const giftUsage = [
  {
    number: 1,
    text: text(
      "包装の要不要と、のし紙の表書きをお選びください。",
      "Choose whether you need wrapping, and the inscription for the ceremonial paper.",
      "请选择是否需要包装，以及熨斗纸的题字。",
      "請選擇是否需要包裝，以及熨斗紙的題字。",
      "포장 여부와 노시 종이의 문구를 골라 주세요."
    )
  },
  {
    number: 2,
    text: text(
      "この画面を店員にお見せいただくと、そのままご案内できます。",
      "Show this screen to a staff member and they can take it from there.",
      "将此画面出示给店员，即可直接为您办理。",
      "將此畫面出示給店員，即可直接為您辦理。",
      "이 화면을 직원에게 보여 주시면 그대로 안내해 드립니다."
    )
  },
  {
    number: 3,
    text: text(
      "配送をご希望の場合はレジでお申し付けください。",
      "If you would like it shipped, please ask at the register.",
      "如需配送，请在收银台告知。",
      "如需配送，請在收銀台告知。",
      "배송을 원하시면 계산대에서 말씀해 주세요."
    )
  }
];

const nutritionPerPacket = text(
  "1袋（8g）あたり",
  "Per packet (8 g)",
  "每袋（8克）",
  "每袋（8公克）",
  "1팩(8g)당"
);

const nutritionPer100 = text(
  "100mlあたり",
  "Per 100 ml",
  "每100毫升",
  "每100毫升",
  "100ml당"
);

const shelfDashi = {
  area: text(
    "だし・調味料コーナー",
    "Dashi & Seasoning corner",
    "高汤・调味料区",
    "高湯・調味料區",
    "다시・조미료 코너"
  ),
  mapX: 21,
  mapY: 47
};

const shelfSeasoning = {
  area: text(
    "調味料コーナー",
    "Seasoning corner",
    "调味料区",
    "調味料區",
    "조미료 코너"
  ),
  mapX: 53,
  mapY: 47
};

const shelfGift = {
  area: text("ギフトコーナー", "Gift corner", "礼品区", "禮品區", "선물 코너"),
  mapX: 25,
  mapY: 15
};

const shelfOther = {
  area: text("道具コーナー", "Tableware corner", "器具区", "器具區", "도구 코너"),
  mapX: 82,
  mapY: 15
};

const dietaryNone = text("—", "—", "—", "—", "—");
const dietaryVegetarian = text(
  "ベジタリアン対応可",
  "Vegetarian friendly",
  "可素食",
  "可素食",
  "베지테리언 가능"
);

const usageAsPacket = text(
  "だしパック",
  "Dashi packet",
  "高汤包",
  "高湯包",
  "다시 팩"
);
const usageAsLiquid = text("液体・かける", "Liquid, pour on", "液体・淋用", "液體・淋用", "액체・뿌리기");

export const products: Product[] = [
  // ── だし ─────────────────────────────────────────────
  {
    id: "product-kayanoya-dashi",
    slug: "kayanoya-dashi",
    category: "dashi",
    image: "/images/products/kayanoya-dashi.jpg",
    imageAlt: text(
      "茅乃舎だし30袋入りの商品パッケージ",
      "A 30-packet pouch of Kayanoya Dashi",
      "茅乃舎高汤30袋装产品包装",
      "茅乃舍高湯30袋裝產品包裝",
      "가야노야 다시 30팩 제품 패키지"
    ),
    name: text("茅乃舎だし", "Kayanoya Dashi", "茅乃舎高汤", "茅乃舍高湯", "가야노야 다시"),
    romanizedName: "KAYANOYA DASHI",
    shortDescription: text(
      "焼きあごを使った、上品で深いうまみの和風だし。",
      "An elegant Japanese stock with deep umami from roasted flying fish.",
      "使用烤飞鱼制成、鲜味醇厚高雅的日式高汤。",
      "使用烤飛魚製成、鮮味醇厚高雅的日式高湯。",
      "구운 날치로 깊고 품격 있는 감칠맛을 낸 일본식 다시."
    ),
    summary: text(
      "焼きあご、かつお節、うるめいわし、真昆布の4つの素材をバランスよく配合しました。",
      "Roasted flying fish, bonito flakes, round herring, and kelp are carefully balanced.",
      "精心平衡搭配烤飞鱼、鲣鱼干、圆腹鲱和真昆布四种食材。",
      "精心平衡搭配烤飛魚、鰹魚乾、圓腹鯡和真昆布四種食材。",
      "구운 날치, 가쓰오부시, 눈퉁멸, 다시마 네 가지 재료를 균형 있게 배합했습니다."
    ),
    recommendation: text(
      "はじめてだしを使う方、毎日の味噌汁や煮物を手軽においしくしたい方に。",
      "Ideal for first-time dashi users and easy everyday miso soup or simmered dishes.",
      "适合初次使用高汤，以及想轻松做好味噌汤和炖菜的人。",
      "適合初次使用高湯，以及想輕鬆做好味噌湯和燉菜的人。",
      "다시를 처음 쓰는 분과 매일 된장국이나 조림을 손쉽게 맛내고 싶은 분께 추천합니다."
    ),
    tags: [
      text("だしパック", "Dashi packet", "高汤包", "高湯包", "다시 팩"),
      text("焼きあご", "Roasted flying fish", "烤飞鱼", "烤飛魚", "구운 날치"),
      text("かつお節", "Bonito", "鲣鱼干", "鰹魚乾", "가쓰오부시"),
      text("昆布", "Kelp", "昆布", "昆布", "다시마")
    ],
    sections: [
      {
        id: "features",
        title: text("これは何か", "What it is", "这是什么", "這是什麼", "어떤 제품인가요"),
        body: text(
          "料理店の本格的なだしを、ご家庭で手軽に味わえるよう仕上げた和風だしです。",
          "A Japanese stock created to bring restaurant-quality flavor to everyday home cooking.",
          "让您在家也能轻松享用餐厅级风味的日式高汤。",
          "讓您在家也能輕鬆享用餐廳級風味的日式高湯。",
          "전문점 수준의 깊은 맛을 가정에서 간편하게 즐길 수 있도록 만든 일본식 다시입니다."
        ),
        image: "/images/ingredients/dashi-ingredients.jpg",
        imageAlt: text(
          "茅乃舎だしの素材",
          "Ingredients used in Kayanoya Dashi",
          "茅乃舎高汤的食材",
          "茅乃舍高湯的食材",
          "가야노야 다시의 재료"
        )
      },
      {
        id: "usage",
        title: text("基本の使い方", "How to use it", "基本用法", "基本用法", "기본 사용법"),
        body: text(
          "煮出して澄んだだしとして使うほか、袋を破って炒め物や炊き込みご飯の調味料にも使えます。",
          "Simmer the packet for clear stock, or open it and use the powder to season stir-fries and rice.",
          "既可熬煮成清澈高汤，也可拆袋将粉末用于炒菜或焖饭调味。",
          "既可熬煮成清澈高湯，也可拆袋將粉末用於炒菜或炊飯調味。",
          "팩째 우려 맑은 국물로 쓰거나, 팩을 뜯어 볶음 요리와 밥의 조미료로 쓸 수 있습니다."
        ),
        image: "/images/recipes/dashi-pot.jpg",
        imageAlt: text(
          "だしの使い方",
          "Preparing dashi in a pot",
          "锅中熬煮高汤",
          "鍋中熬煮高湯",
          "냄비에서 다시를 우리는 모습"
        )
      },
      {
        id: "materials",
        title: text("素材と製法", "Ingredients and craft", "食材与工艺", "食材與工藝", "재료와 제조법"),
        body: text(
          "国産原料を選び、それぞれの香りとうまみを引き出してから細かく粉砕し、だしパックに詰めています。",
          "Selected Japanese ingredients are prepared to draw out aroma and umami, finely milled, and packed.",
          "精选日本国产原料，充分引出香气和鲜味后细磨装袋。",
          "精選日本國產原料，充分引出香氣和鮮味後細磨裝袋。",
          "엄선한 일본산 재료의 향과 감칠맛을 끌어낸 뒤 곱게 갈아 팩에 담습니다."
        )
      },
      {
        id: "comparison",
        title: text("ほかのだしとの違い", "How it compares", "与其他高汤的区别", "與其他高湯的差異", "다른 다시와의 차이"),
        body: text(
          "魚介の上品な香りとまろやかなうまみが特徴。味噌汁、煮物、うどんなど和食全般に向いています。",
          "Its refined seafood aroma and rounded umami suit miso soup, simmered dishes, noodles, and more.",
          "特点是高雅的海鲜香气和圆润鲜味，适合味噌汤、炖菜和乌冬面等日式料理。",
          "特色是高雅的海鮮香氣與圓潤鮮味，適合味噌湯、燉菜和烏龍麵等日式料理。",
          "품격 있는 해산물 향과 부드러운 감칠맛이 특징이며 된장국, 조림, 우동 등 일본 요리에 잘 맞습니다."
        )
      },
      {
        id: "details",
        title: text("原材料とアレルギー", "Ingredients and allergens", "配料与过敏原", "成分與過敏原", "원재료와 알레르기"),
        body: text(
          "気になる方は下記の原材料・アレルギー・栄養成分をご確認ください。",
          "Please check the ingredients, allergens, and nutrition listed below.",
          "如有需要，请确认以下配料、过敏原和营养成分。",
          "如有需要，請確認以下成分、過敏原和營養成分。",
          "필요하시면 아래 원재료와 알레르기, 영양 성분을 확인해 주세요."
        )
      }
    ],
    usageSteps: commonUsage,
    featured: true,
    features: ["selected-ingredients", "no-additives", "careful-process"],
    taste: text(
      "上品でまろやかなうまみと、すっきりとした後味。",
      "Refined, rounded umami with a clean finish.",
      "高雅圆润的鲜味，收口清爽。",
      "高雅圓潤的鮮味，收口清爽。",
      "품격 있고 부드러운 감칠맛에 깔끔한 뒷맛."
    ),
    ingredientsText: text(
      "風味原料（かつお節、煮干しうるめいわし、焼きあご、真昆布）、でん粉分解物、酵母エキス、食塩、粉末しょうゆ。",
      "Flavor ingredients (bonito, dried round herring, roasted flying fish, kelp), dextrin, yeast extract, salt, soy sauce powder.",
      "风味原料（鲣鱼干、圆腹鲱干、烤飞鱼、真昆布）、淀粉分解物、酵母提取物、食盐、粉末酱油。",
      "風味原料（鰹魚乾、圓腹鯡乾、烤飛魚、真昆布）、澱粉分解物、酵母萃取物、食鹽、粉末醬油。",
      "풍미 원료(가쓰오부시, 눈퉁멸, 구운 날치, 다시마), 전분분해물, 효모 추출물, 소금, 분말 간장."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: nutritionPerPacket,
    nutrition: [
      {key: "energy", value: "27 kcal"},
      {key: "protein", value: "2.6 g"},
      {key: "fat", value: "0.2 g"},
      {key: "carbohydrate", value: "3.7 g"},
      {key: "salt", value: "0.9 g"}
    ],
    shelf: shelfDashi,
    compare: {
      base: text("魚介", "Seafood", "鱼介", "魚介", "해산물"),
      taste: text("上品でまろやか", "Refined and rounded", "高雅圆润", "高雅圓潤", "품격 있고 부드러움"),
      dishes: text(
        "味噌汁、煮物、うどん",
        "Miso soup, simmered dishes, udon",
        "味噌汤、炖菜、乌冬面",
        "味噌湯、燉菜、烏龍麵",
        "된장국, 조림, 우동"
      ),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 3,
      gift: 3
    },
    recipeIds: ["recipe-misoshiru", "recipe-dashimaki", "recipe-takikomi"]
  },

  {
    id: "product-vegetable-dashi",
    slug: "vegetable-dashi",
    category: "dashi",
    image: "/images/products/vegetable-dashi.jpg",
    imageAlt: text(
      "野菜だしの商品パッケージ",
      "A pouch of Vegetable Dashi",
      "蔬菜高汤产品包装",
      "蔬菜高湯產品包裝",
      "야채 다시 제품 패키지"
    ),
    name: text("野菜だし", "Vegetable Dashi", "蔬菜高汤", "蔬菜高湯", "야채 다시"),
    romanizedName: "VEGETABLE DASHI",
    shortDescription: text(
      "5種の国産野菜の甘みとコク。",
      "Sweetness and depth from five Japanese vegetables.",
      "五种日本国产蔬菜的甘甜与醇厚。",
      "五種日本國產蔬菜的甘甜與醇厚。",
      "일본산 채소 다섯 가지의 단맛과 깊은 풍미."
    ),
    summary: text(
      "玉ねぎ、にんにく、人参、セロリ、キャベツを凝縮した洋風だしです。",
      "A Western-style stock of onion, garlic, carrot, celery, and cabbage.",
      "浓缩洋葱、大蒜、胡萝卜、芹菜和卷心菜的西式高汤。",
      "濃縮洋蔥、大蒜、胡蘿蔔、芹菜和高麗菜的西式高湯。",
      "양파, 마늘, 당근, 셀러리, 양배추를 농축한 서양식 다시입니다."
    ),
    recommendation: text(
      "スープ、パスタ、煮込み料理に。",
      "For soups, pasta, and stews.",
      "适合汤、意面和炖菜。",
      "適合湯、義大利麵和燉菜。",
      "수프, 파스타, 스튜에 잘 맞습니다."
    ),
    tags: [
      text("野菜", "Vegetable", "蔬菜", "蔬菜", "채소"),
      text("洋風", "Western style", "西式", "西式", "서양식")
    ],
    sections: sectionsFor("dashi", {
      usageImage: "/images/recipes/dashi-pot.jpg",
      usageImageAlt: text(
        "だしの使い方",
        "Preparing dashi in a pot",
        "锅中熬煮高汤",
        "鍋中熬煮高湯",
        "냄비에서 다시를 우리는 모습"
      )
    }),
    usageSteps: commonUsage,
    featured: true,
    features: ["selected-ingredients", "no-additives", "easy-to-use"],
    taste: text(
      "野菜のやさしい甘みと、後を引くコク。",
      "Gentle vegetable sweetness with a lingering depth.",
      "蔬菜的温和甘甜与余韵醇厚。",
      "蔬菜的溫和甘甜與餘韻醇厚。",
      "채소의 은은한 단맛과 여운 있는 깊은 맛."
    ),
    ingredientsText: text(
      "野菜（玉ねぎ、にんにく、人参、セロリ、キャベツ）、酵母エキス、食塩、砂糖、香辛料。",
      "Vegetables (onion, garlic, carrot, celery, cabbage), yeast extract, salt, sugar, spices.",
      "蔬菜（洋葱、大蒜、胡萝卜、芹菜、卷心菜）、酵母提取物、食盐、砂糖、香辛料。",
      "蔬菜（洋蔥、大蒜、胡蘿蔔、芹菜、高麗菜）、酵母萃取物、食鹽、砂糖、香辛料。",
      "채소(양파, 마늘, 당근, 셀러리, 양배추), 효모 추출물, 소금, 설탕, 향신료."
    ),
    allergens: ["none"],
    nutritionBasis: nutritionPerPacket,
    nutrition: [
      {key: "energy", value: "24 kcal"},
      {key: "protein", value: "1.1 g"},
      {key: "fat", value: "0.3 g"},
      {key: "carbohydrate", value: "4.5 g"},
      {key: "salt", value: "1.1 g"}
    ],
    shelf: shelfDashi,
    compare: {
      base: text("野菜", "Vegetable", "蔬菜", "蔬菜", "채소"),
      taste: text("やさしい甘み", "Gentle sweetness", "温和甘甜", "溫和甘甜", "은은한 단맛"),
      dishes: text(
        "スープ、パスタ、煮込み",
        "Soup, pasta, stew",
        "汤、意面、炖菜",
        "湯、義大利麵、燉菜",
        "수프, 파스타, 스튜"
      ),
      usage: usageAsPacket,
      dietary: dietaryVegetarian,
      beginner: 3,
      gift: 2
    },
    recipeIds: ["recipe-ohitashi", "recipe-oden"]
  },

  {
    id: "product-reduced-salt-dashi",
    slug: "reduced-salt-dashi",
    category: "dashi",
    image: "/images/products/reduced-salt-dashi.jpg",
    imageAlt: text(
      "減塩茅乃舎だしの商品パッケージ",
      "A pouch of Reduced-salt Kayanoya Dashi",
      "减盐茅乃舎高汤产品包装",
      "減鹽茅乃舍高湯產品包裝",
      "저염 가야노야 다시 제품 패키지"
    ),
    name: text("減塩 茅乃舎だし", "Reduced-salt Dashi", "减盐茅乃舎高汤", "減鹽茅乃舍高湯", "저염 가야노야 다시"),
    romanizedName: "REDUCED-SALT DASHI",
    shortDescription: text(
      "うまみはそのまま、塩分53%カット。",
      "The same umami with 53% less salt.",
      "鲜味不减，盐分减少53%。",
      "鮮味不減，鹽分減少53%。",
      "감칠맛은 그대로, 소금은 53% 줄였습니다."
    ),
    summary: text(
      "茅乃舎だしと同じ素材を使い、塩分を控えました。",
      "Made with the original dashi ingredients and less salt.",
      "使用与原味高汤相同的食材，降低盐分。",
      "使用與原味高湯相同的食材，降低鹽分。",
      "기본 다시와 같은 재료를 사용하고 소금은 줄였습니다."
    ),
    recommendation: text(
      "薄味を好む方、味付けを自分で調整したい方に。",
      "For lighter seasoning and more control over flavor.",
      "适合喜爱清淡口味或想自行调味的人。",
      "適合喜愛清淡口味或想自行調味的人。",
      "담백한 맛을 좋아하거나 간을 직접 조절하고 싶은 분께."
    ),
    tags: [
      text("減塩", "Reduced salt", "减盐", "減鹽", "저염"),
      text("和風", "Japanese style", "日式", "日式", "일본식")
    ],
    sections: sectionsFor("dashi"),
    usageSteps: commonUsage,
    featured: true,
    features: ["selected-ingredients", "no-additives", "easy-to-use"],
    taste: text(
      "塩気が控えめで、素材の香りが際立つ。",
      "Light on salt, letting the ingredients' aroma stand out.",
      "咸味清淡，突出食材香气。",
      "鹹味清淡，突出食材香氣。",
      "짠맛이 절제되어 재료의 향이 도드라집니다."
    ),
    ingredientsText: text(
      "風味原料（かつお節、うるめいわし、焼きあご、真昆布）、でん粉分解物、酵母エキス、食塩、粉末しょうゆ。",
      "Flavor ingredients (bonito, round herring, roasted flying fish, kelp), dextrin, yeast extract, salt, soy sauce powder.",
      "风味原料（鲣鱼干、圆腹鲱、烤飞鱼、真昆布）、淀粉分解物、酵母提取物、食盐、粉末酱油。",
      "風味原料（鰹魚乾、圓腹鯡、烤飛魚、真昆布）、澱粉分解物、酵母萃取物、食鹽、粉末醬油。",
      "풍미 원료(가쓰오부시, 눈퉁멸, 구운 날치, 다시마), 전분분해물, 효모 추출물, 소금, 분말 간장."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: nutritionPerPacket,
    nutrition: [
      {key: "energy", value: "26 kcal"},
      {key: "protein", value: "2.7 g"},
      {key: "fat", value: "0.2 g"},
      {key: "carbohydrate", value: "3.6 g"},
      {key: "salt", value: "0.4 g"}
    ],
    shelf: shelfDashi,
    compare: {
      base: text("魚介", "Seafood", "鱼介", "魚介", "해산물"),
      taste: text("すっきり控えめ", "Light and clean", "清爽淡雅", "清爽淡雅", "산뜻하고 담백함"),
      dishes: text(
        "味噌汁、煮物、うどん",
        "Miso soup, simmered dishes, udon",
        "味噌汤、炖菜、乌冬面",
        "味噌湯、燉菜、烏龍麵",
        "된장국, 조림, 우동"
      ),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 2,
      gift: 2
    },
    recipeIds: ["recipe-misoshiru", "recipe-chawanmushi"]
  },

  {
    id: "product-niboshi-dashi",
    slug: "niboshi-dashi",
    category: "dashi",
    image: "/images/products/niboshi-dashi.jpg",
    imageAlt: text(
      "煮干しだしの商品パッケージ",
      "A pouch of Niboshi Dashi",
      "小鱼干高汤产品包装",
      "小魚乾高湯產品包裝",
      "멸치 다시 제품 패키지"
    ),
    name: text("煮干しだし", "Niboshi Dashi", "小鱼干高汤", "小魚乾高湯", "멸치 다시"),
    romanizedName: "NIBOSHI DASHI",
    shortDescription: text(
      "煮干しの力強いうまみと香り。",
      "Bold umami and aroma from dried fish.",
      "小鱼干带来的浓郁鲜味与香气。",
      "小魚乾帶來的濃郁鮮味與香氣。",
      "말린 생선의 진한 감칠맛과 향."
    ),
    summary: text(
      "味わい深く、味噌汁や麺料理によく合うだしです。",
      "A deeply flavored stock for miso soup and noodles.",
      "风味深厚，适合味噌汤和面食。",
      "風味深厚，適合味噌湯和麵食。",
      "깊은 맛으로 된장국과 면 요리에 잘 맞습니다."
    ),
    recommendation: text(
      "魚介の風味が好きな方、しっかりしただしを求める方に。",
      "For seafood lovers who prefer a full-bodied stock.",
      "适合喜爱海鲜风味和浓郁高汤的人。",
      "適合喜愛海鮮風味和濃郁高湯的人。",
      "해산물 풍미와 진한 국물을 좋아하는 분께."
    ),
    tags: [
      text("煮干し", "Dried fish", "小鱼干", "小魚乾", "멸치"),
      text("濃厚", "Full-bodied", "浓郁", "濃郁", "진한 맛")
    ],
    sections: sectionsFor("dashi"),
    usageSteps: commonUsage,
    featured: false,
    features: ["selected-ingredients", "no-additives", "careful-process"],
    taste: text(
      "香ばしく力強い、余韻の長いうまみ。",
      "Toasty and bold, with long-lasting umami.",
      "香气浓郁强劲，鲜味余韵悠长。",
      "香氣濃郁強勁，鮮味餘韻悠長。",
      "고소하고 강한 맛, 긴 여운의 감칠맛."
    ),
    ingredientsText: text(
      "風味原料（煮干しうるめいわし、かつお節、真昆布）、でん粉分解物、酵母エキス、食塩。",
      "Flavor ingredients (dried round herring, bonito, kelp), dextrin, yeast extract, salt.",
      "风味原料（圆腹鲱干、鲣鱼干、真昆布）、淀粉分解物、酵母提取物、食盐。",
      "風味原料（圓腹鯡乾、鰹魚乾、真昆布）、澱粉分解物、酵母萃取物、食鹽。",
      "풍미 원료(눈퉁멸, 가쓰오부시, 다시마), 전분분해물, 효모 추출물, 소금."
    ),
    allergens: ["soy"],
    nutritionBasis: nutritionPerPacket,
    nutrition: [
      {key: "energy", value: "25 kcal"},
      {key: "protein", value: "3.1 g"},
      {key: "fat", value: "0.3 g"},
      {key: "carbohydrate", value: "2.6 g"},
      {key: "salt", value: "1.0 g"}
    ],
    shelf: shelfDashi,
    compare: {
      base: text("魚介", "Seafood", "鱼介", "魚介", "해산물"),
      taste: text("力強く香ばしい", "Bold and toasty", "浓郁香气", "濃郁香氣", "강하고 고소함"),
      dishes: text(
        "味噌汁、ラーメン、うどん",
        "Miso soup, ramen, udon",
        "味噌汤、拉面、乌冬面",
        "味噌湯、拉麵、烏龍麵",
        "된장국, 라멘, 우동"
      ),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 2,
      gift: 1
    },
    recipeIds: ["recipe-misoshiru", "recipe-udon"]
  },

  {
    id: "product-chicken-dashi",
    slug: "chicken-dashi",
    category: "dashi",
    image: "/images/products/niboshi-dashi.jpg",
    imageAlt: text(
      "鶏だしの商品パッケージ",
      "A pouch of Chicken Dashi",
      "鸡高汤产品包装",
      "雞高湯產品包裝",
      "닭 다시 제품 패키지"
    ),
    name: text("鶏だし", "Chicken Dashi", "鸡高汤", "雞高湯", "닭 다시"),
    romanizedName: "CHICKEN DASHI",
    shortDescription: text(
      "国産鶏のコクと、澄んだ後味。",
      "The richness of Japanese chicken with a clear finish.",
      "日本国产鸡的醇厚与清爽收口。",
      "日本國產雞的醇厚與清爽收口。",
      "일본산 닭의 진한 맛과 맑은 뒷맛."
    ),
    summary: text(
      "鶏のうまみに香味野菜を合わせ、和洋中どれにも使えるだしに仕上げました。",
      "Chicken umami paired with aromatic vegetables, at home in Japanese, Western, or Chinese cooking.",
      "以鸡的鲜味搭配香味蔬菜，日式、西式、中式料理皆可使用。",
      "以雞的鮮味搭配香味蔬菜，日式、西式、中式料理皆可使用。",
      "닭의 감칠맛에 향미 채소를 더해 일식·양식·중식 어디에나 쓸 수 있습니다."
    ),
    recommendation: text(
      "スープや鍋、炒め物の下味に使いたい方に。",
      "For soups, hot pots, and seasoning stir-fries.",
      "适合用于汤品、火锅和炒菜底味。",
      "適合用於湯品、火鍋和炒菜底味。",
      "수프, 전골, 볶음 요리의 밑간에 쓰고 싶은 분께."
    ),
    tags: [
      text("鶏", "Chicken", "鸡", "雞", "닭"),
      text("万能", "All-purpose", "万能", "萬能", "만능")
    ],
    sections: sectionsFor("dashi"),
    usageSteps: commonUsage,
    featured: false,
    features: ["selected-ingredients", "easy-to-use", "careful-process"],
    taste: text(
      "コクがありながら、後味は澄んで軽い。",
      "Rich yet clean and light on the finish.",
      "醇厚而收口清澈轻盈。",
      "醇厚而收口清澈輕盈。",
      "진하면서도 뒷맛은 맑고 가볍습니다."
    ),
    ingredientsText: text(
      "風味原料（鶏肉、鶏骨）、野菜（玉ねぎ、人参）、酵母エキス、食塩、香辛料。",
      "Flavor ingredients (chicken, chicken bone), vegetables (onion, carrot), yeast extract, salt, spices.",
      "风味原料（鸡肉、鸡骨）、蔬菜（洋葱、胡萝卜）、酵母提取物、食盐、香辛料。",
      "風味原料（雞肉、雞骨）、蔬菜（洋蔥、胡蘿蔔）、酵母萃取物、食鹽、香辛料。",
      "풍미 원료(닭고기, 닭뼈), 채소(양파, 당근), 효모 추출물, 소금, 향신료."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: nutritionPerPacket,
    nutrition: [
      {key: "energy", value: "29 kcal"},
      {key: "protein", value: "2.4 g"},
      {key: "fat", value: "0.9 g"},
      {key: "carbohydrate", value: "3.1 g"},
      {key: "salt", value: "1.2 g"}
    ],
    shelf: shelfDashi,
    compare: {
      base: text("鶏", "Chicken", "鸡", "雞", "닭"),
      taste: text("コクがあり万能", "Rich and versatile", "醇厚万能", "醇厚萬能", "진하고 만능"),
      dishes: text(
        "スープ、鍋、炒め物",
        "Soup, hot pot, stir-fry",
        "汤、火锅、炒菜",
        "湯、火鍋、炒菜",
        "수프, 전골, 볶음"
      ),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 3,
      gift: 2
    },
    recipeIds: ["recipe-oden", "recipe-udon"]
  },

  {
    id: "product-golden-dashi",
    slug: "golden-dashi",
    category: "dashi",
    image: "/images/products/golden-dashi.jpg",
    imageAlt: text(
      "黄金比のだしの商品パッケージ",
      "A pouch of Golden Ratio Dashi",
      "黄金比高汤产品包装",
      "黃金比高湯產品包裝",
      "황금비 다시 제품 패키지"
    ),
    name: text("黄金比のだし", "Golden Ratio Dashi", "黄金比高汤", "黃金比高湯", "황금비 다시"),
    romanizedName: "OGON-HI NO DASHI",
    shortDescription: text(
      "かつおと昆布を黄金比で合わせた、通販限定のだし。",
      "Bonito and kelp in a golden ratio — an online-exclusive stock.",
      "以黄金比例调配鲣鱼与昆布的网购限定高汤。",
      "以黃金比例調配鰹魚與昆布的網購限定高湯。",
      "가쓰오와 다시마를 황금비로 맞춘 온라인 한정 다시."
    ),
    summary: text(
      "一番だしの澄んだ香りを目指し、二種の素材の比率だけで仕立てました。",
      "Built from just two ingredients in careful proportion, aiming for the clarity of first-brew dashi.",
      "仅以两种食材的比例调配，追求头道高汤的清澈香气。",
      "僅以兩種食材的比例調配，追求頭道高湯的清澈香氣。",
      "두 가지 재료의 비율만으로 첫 국물의 맑은 향을 목표로 했습니다."
    ),
    recommendation: text(
      "だしそのものの香りを味わいたい方、お吸い物に使いたい方に。",
      "For those who want to taste the dashi itself, and for clear soups.",
      "适合想品尝高汤本身香气、用于清汤的人。",
      "適合想品嘗高湯本身香氣、用於清湯的人。",
      "다시 자체의 향을 즐기고 싶은 분, 맑은국에 쓰실 분께."
    ),
    tags: [
      text("かつお", "Bonito", "鲣鱼", "鰹魚", "가쓰오"),
      text("昆布", "Kelp", "昆布", "昆布", "다시마"),
      text("限定", "Limited", "限定", "限定", "한정")
    ],
    sections: sectionsFor("dashi", {
      featuresImage: "/images/ingredients/dashi-ingredients.jpg",
      featuresImageAlt: text(
        "だしの素材",
        "Dashi ingredients",
        "高汤食材",
        "高湯食材",
        "다시 재료"
      )
    }),
    usageSteps: commonUsage,
    featured: false,
    features: ["selected-ingredients", "careful-process", "no-additives"],
    taste: text(
      "澄んだ香りと、繊細で上品な甘み。",
      "A clear aroma with delicate, refined sweetness.",
      "清澈香气与细腻高雅的甘甜。",
      "清澈香氣與細膩高雅的甘甜。",
      "맑은 향과 섬세하고 품격 있는 단맛."
    ),
    ingredientsText: text(
      "風味原料（かつお節、真昆布）、食塩。",
      "Flavor ingredients (bonito, kelp), salt.",
      "风味原料（鲣鱼干、真昆布）、食盐。",
      "風味原料（鰹魚乾、真昆布）、食鹽。",
      "풍미 원료(가쓰오부시, 다시마), 소금."
    ),
    allergens: ["none"],
    nutritionBasis: nutritionPerPacket,
    nutrition: [
      {key: "energy", value: "22 kcal"},
      {key: "protein", value: "3.4 g"},
      {key: "fat", value: "0.1 g"},
      {key: "carbohydrate", value: "1.8 g"},
      {key: "salt", value: "0.7 g"}
    ],
    shelf: shelfDashi,
    compare: {
      base: text("かつお・昆布", "Bonito & kelp", "鲣鱼・昆布", "鰹魚・昆布", "가쓰오・다시마"),
      taste: text("澄んで繊細", "Clear and delicate", "清澈细腻", "清澈細膩", "맑고 섬세함"),
      dishes: text(
        "お吸い物、茶碗蒸し",
        "Clear soup, chawanmushi",
        "清汤、茶碗蒸",
        "清湯、茶碗蒸",
        "맑은국, 차완무시"
      ),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 2,
      gift: 3
    },
    recipeIds: ["recipe-chawanmushi", "recipe-ohitashi"]
  },

  // ── 調味料 ───────────────────────────────────────────
  {
    id: "product-shiro-dashi",
    slug: "shiro-dashi",
    category: "seasoning",
    image: "/images/products/shiro-dashi.jpg",
    imageAlt: text(
      "白だしの商品",
      "A bottle of Shiro Dashi",
      "白高汤商品",
      "白高湯商品",
      "시로다시 제품"
    ),
    name: text("白だし", "Shiro Dashi", "白高汤", "白高湯", "시로다시"),
    romanizedName: "SHIRO DASHI",
    shortDescription: text(
      "色を濁さず、味を決める液体だし。",
      "A liquid dashi that seasons without clouding color.",
      "不影响色泽、快速定味的液体高汤。",
      "不影響色澤、快速定味的液體高湯。",
      "색을 흐리지 않고 맛을 잡아 주는 액체 다시."
    ),
    summary: text(
      "薄口しょうゆとだしを合わせ、素材の色を活かしたまま味を調えられます。",
      "Light soy sauce blended with dashi, seasoning food while keeping its natural color.",
      "将淡口酱油与高汤调配，可在保留食材色泽的同时调味。",
      "將淡口醬油與高湯調配，可在保留食材色澤的同時調味。",
      "연간장과 다시를 합쳐 재료의 색을 살린 채 간을 맞출 수 있습니다."
    ),
    recommendation: text(
      "だし巻き卵、茶碗蒸し、うどんつゆに。",
      "For rolled omelets, chawanmushi, and udon broth.",
      "适合玉子烧、茶碗蒸和乌冬汤汁。",
      "適合玉子燒、茶碗蒸和烏龍麵湯汁。",
      "달걀말이, 차완무시, 우동 국물에."
    ),
    tags: [
      text("液体", "Liquid", "液体", "液體", "액체"),
      text("薄口", "Light soy", "淡口", "淡口", "연간장")
    ],
    sections: sectionsFor("seasoning"),
    usageSteps: seasoningUsage,
    featured: false,
    features: ["easy-to-use", "selected-ingredients", "long-life"],
    taste: text(
      "調整しやすい塩気と、やわらかなだしの香り。",
      "Manageable saltiness with a soft dashi aroma.",
      "咸度易于掌控，高汤香气柔和。",
      "鹹度易於掌控，高湯香氣柔和。",
      "조절하기 쉬운 짠맛과 부드러운 다시 향."
    ),
    ingredientsText: text(
      "しょうゆ（小麦・大豆を含む）、食塩、砂糖、かつお節エキス、昆布エキス、みりん。",
      "Soy sauce (contains wheat and soy), salt, sugar, bonito extract, kelp extract, mirin.",
      "酱油（含小麦、大豆）、食盐、砂糖、鲣鱼提取物、昆布提取物、味醂。",
      "醬油（含小麥、大豆）、食鹽、砂糖、鰹魚萃取物、昆布萃取物、味醂。",
      "간장(밀·대두 포함), 소금, 설탕, 가쓰오 추출물, 다시마 추출물, 미림."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: nutritionPer100,
    nutrition: [
      {key: "energy", value: "58 kcal"},
      {key: "protein", value: "3.2 g"},
      {key: "fat", value: "0 g"},
      {key: "carbohydrate", value: "11.2 g"},
      {key: "salt", value: "10.4 g"}
    ],
    shelf: shelfSeasoning,
    compare: {
      base: text("しょうゆ・だし", "Soy sauce & dashi", "酱油・高汤", "醬油・高湯", "간장・다시"),
      taste: text("やわらかく上品", "Soft and refined", "柔和高雅", "柔和高雅", "부드럽고 품격 있음"),
      dishes: text(
        "だし巻き卵、茶碗蒸し、うどん",
        "Rolled omelet, chawanmushi, udon",
        "玉子烧、茶碗蒸、乌冬面",
        "玉子燒、茶碗蒸、烏龍麵",
        "달걀말이, 차완무시, 우동"
      ),
      usage: usageAsLiquid,
      dietary: dietaryNone,
      beginner: 3,
      gift: 2
    },
    recipeIds: ["recipe-dashimaki", "recipe-chawanmushi", "recipe-udon"]
  },

  {
    id: "product-ago-shoyu",
    slug: "ago-shoyu",
    category: "seasoning",
    image: "/images/ingredients/dashi-ingredients.jpg",
    imageAlt: text(
      "焼あご入りだし醤油の商品",
      "A bottle of dashi soy sauce with roasted flying fish",
      "含烤飞鱼的高汤酱油商品",
      "含烤飛魚的高湯醬油商品",
      "구운 날치를 넣은 다시 간장 제품"
    ),
    name: text(
      "焼あご入り だし醤油",
      "Dashi Soy Sauce",
      "烤飞鱼高汤酱油",
      "烤飛魚高湯醬油",
      "구운 날치 다시 간장"
    ),
    romanizedName: "AGO DASHI SHOYU",
    shortDescription: text(
      "かけるだけで、料理が一段深くなる。",
      "One pour, and the dish gains depth.",
      "只需淋上，料理便更添层次。",
      "只需淋上，料理便更添層次。",
      "뿌리기만 해도 요리가 한층 깊어집니다."
    ),
    summary: text(
      "焼あごのだしをしょうゆに合わせました。卵かけご飯や冷奴にそのままどうぞ。",
      "Roasted flying fish dashi blended into soy sauce. Pour straight over rice or chilled tofu.",
      "将烤飞鱼高汤融入酱油。可直接淋在生鸡蛋拌饭或凉拌豆腐上。",
      "將烤飛魚高湯融入醬油。可直接淋在生雞蛋拌飯或涼拌豆腐上。",
      "구운 날치 다시를 간장에 더했습니다. 계란밥이나 냉두부에 그대로 뿌려 보세요."
    ),
    recommendation: text(
      "卵かけご飯、冷奴、お刺身に。",
      "For rice with egg, chilled tofu, and sashimi.",
      "适合生鸡蛋拌饭、凉拌豆腐和生鱼片。",
      "適合生雞蛋拌飯、涼拌豆腐和生魚片。",
      "계란밥, 냉두부, 사시미에."
    ),
    tags: [
      text("液体", "Liquid", "液体", "液體", "액체"),
      text("焼きあご", "Roasted flying fish", "烤飞鱼", "烤飛魚", "구운 날치")
    ],
    sections: sectionsFor("seasoning"),
    usageSteps: seasoningUsage,
    featured: false,
    features: ["easy-to-use", "selected-ingredients", "no-additives"],
    taste: text(
      "香ばしいあごの香りと、丸みのある塩気。",
      "The toasty aroma of flying fish with rounded saltiness.",
      "烤飞鱼的香气与圆润的咸味。",
      "烤飛魚的香氣與圓潤的鹹味。",
      "고소한 날치 향과 둥근 짠맛."
    ),
    ingredientsText: text(
      "しょうゆ（小麦・大豆を含む）、焼あごエキス、砂糖、みりん、かつお節エキス。",
      "Soy sauce (contains wheat and soy), roasted flying fish extract, sugar, mirin, bonito extract.",
      "酱油（含小麦、大豆）、烤飞鱼提取物、砂糖、味醂、鲣鱼提取物。",
      "醬油（含小麥、大豆）、烤飛魚萃取物、砂糖、味醂、鰹魚萃取物。",
      "간장(밀·대두 포함), 구운 날치 추출물, 설탕, 미림, 가쓰오 추출물."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: nutritionPer100,
    nutrition: [
      {key: "energy", value: "71 kcal"},
      {key: "protein", value: "4.1 g"},
      {key: "fat", value: "0 g"},
      {key: "carbohydrate", value: "13.8 g"},
      {key: "salt", value: "9.6 g"}
    ],
    shelf: shelfSeasoning,
    compare: {
      base: text("しょうゆ・魚介", "Soy sauce & seafood", "酱油・鱼介", "醬油・魚介", "간장・해산물"),
      taste: text("香ばしく丸い", "Toasty and round", "香气圆润", "香氣圓潤", "고소하고 둥근 맛"),
      dishes: text(
        "卵かけご飯、冷奴、刺身",
        "Rice with egg, chilled tofu, sashimi",
        "生鸡蛋拌饭、凉拌豆腐、生鱼片",
        "生雞蛋拌飯、涼拌豆腐、生魚片",
        "계란밥, 냉두부, 사시미"
      ),
      usage: usageAsLiquid,
      dietary: dietaryNone,
      beginner: 3,
      gift: 3
    },
    recipeIds: ["recipe-ohitashi", "recipe-takikomi"]
  },

  {
    id: "product-curry",
    slug: "kayanoya-curry",
    category: "seasoning",
    imageAlt: text(
      "茅乃舎のカレーの商品",
      "Kayanoya curry",
      "茅乃舎咖喱商品",
      "茅乃舍咖哩商品",
      "가야노야 카레 제품"
    ),
    name: text("茅乃舎のカレー", "Kayanoya Curry", "茅乃舎咖喱", "茅乃舍咖哩", "가야노야 카레"),
    romanizedName: "KAYANOYA CURRY",
    shortDescription: text(
      "だしを効かせた、和のカレー。",
      "A Japanese curry built on dashi.",
      "以高汤提味的和风咖喱。",
      "以高湯提味的和風咖哩。",
      "다시를 살린 일본식 카레."
    ),
    summary: text(
      "香辛料の香りにだしのうまみを重ね、ご飯にもうどんにも合う味に仕上げました。",
      "Spice aromas layered with dashi umami — at home with both rice and udon.",
      "在香辛料的香气上叠加高汤鲜味，配饭配乌冬面皆宜。",
      "在香辛料的香氣上疊加高湯鮮味，配飯配烏龍麵皆宜。",
      "향신료의 향에 다시의 감칠맛을 더해 밥에도 우동에도 어울립니다."
    ),
    recommendation: text(
      "辛さ控えめが好みの方、お子様と一緒に召し上がる方に。",
      "For those who prefer mild heat, and for eating together with children.",
      "适合偏好微辣、与孩子一同用餐的人。",
      "適合偏好微辣、與孩子一同用餐的人。",
      "매운맛이 약한 편을 좋아하거나 아이와 함께 드실 분께."
    ),
    tags: [
      text("レトルト", "Ready to heat", "即食", "即食", "레토르트"),
      text("和風", "Japanese style", "日式", "日式", "일본식")
    ],
    sections: sectionsFor("seasoning"),
    usageSteps: seasoningUsage,
    featured: false,
    features: ["easy-to-use", "long-life", "selected-ingredients"],
    taste: text(
      "辛さは控えめ、だしの香りが後から立つ。",
      "Mild heat, with the dashi aroma rising afterward.",
      "辣度温和，高汤香气随后浮现。",
      "辣度溫和，高湯香氣隨後浮現。",
      "매운맛은 약하고 다시 향이 뒤따라 올라옵니다."
    ),
    ingredientsText: text(
      "野菜（玉ねぎ、人参）、小麦粉、香辛料、かつお節エキス、しょうゆ、食塩。",
      "Vegetables (onion, carrot), wheat flour, spices, bonito extract, soy sauce, salt.",
      "蔬菜（洋葱、胡萝卜）、小麦粉、香辛料、鲣鱼提取物、酱油、食盐。",
      "蔬菜（洋蔥、胡蘿蔔）、小麥粉、香辛料、鰹魚萃取物、醬油、食鹽。",
      "채소(양파, 당근), 밀가루, 향신료, 가쓰오 추출물, 간장, 소금."
    ),
    allergens: ["wheat", "soy", "milk"],
    nutritionBasis: text(
      "1袋（180g）あたり",
      "Per pouch (180 g)",
      "每袋（180克）",
      "每袋（180公克）",
      "1봉(180g)당"
    ),
    nutrition: [
      {key: "energy", value: "168 kcal"},
      {key: "protein", value: "5.2 g"},
      {key: "fat", value: "8.4 g"},
      {key: "carbohydrate", value: "18.1 g"},
      {key: "salt", value: "2.3 g"}
    ],
    shelf: shelfSeasoning,
    compare: {
      base: text("香辛料・だし", "Spices & dashi", "香辛料・高汤", "香辛料・高湯", "향신료・다시"),
      taste: text("穏やかで香り高い", "Mild and aromatic", "温和芳香", "溫和芳香", "부드럽고 향이 좋음"),
      dishes: text(
        "ご飯、うどん",
        "Rice, udon",
        "米饭、乌冬面",
        "米飯、烏龍麵",
        "밥, 우동"
      ),
      usage: text("温めるだけ", "Just heat", "加热即可", "加熱即可", "데우기만"),
      dietary: dietaryNone,
      beginner: 3,
      gift: 2
    },
    recipeIds: ["recipe-udon"]
  },

  // ── ギフト ───────────────────────────────────────────
  {
    id: "product-gift-set",
    slug: "dashi-gift-set",
    category: "gift",
    imageAlt: text(
      "だし詰合せ三種の化粧箱",
      "A gift box of three dashi varieties",
      "三种高汤礼盒",
      "三種高湯禮盒",
      "다시 3종 선물 상자"
    ),
    name: text("だし詰合せ 三種", "Dashi Gift Set of Three", "高汤三种组合", "高湯三種組合", "다시 3종 세트"),
    romanizedName: "DASHI TSUMEAWASE",
    shortDescription: text(
      "定番のだし三種を、化粧箱に納めて。",
      "Three standard dashi varieties in a presentation box.",
      "将三种经典高汤装入礼盒。",
      "將三種經典高湯裝入禮盒。",
      "기본 다시 세 가지를 상자에 담았습니다."
    ),
    summary: text(
      "茅乃舎だし、野菜だし、煮干しだしの詰合せです。挨拶や手みやげにお使いいただけます。",
      "An assortment of Kayanoya, vegetable, and niboshi dashi — for greetings and gifts.",
      "茅乃舎高汤、蔬菜高汤和小鱼干高汤的组合，适合问候与伴手礼。",
      "茅乃舍高湯、蔬菜高湯和小魚乾高湯的組合，適合問候與伴手禮。",
      "가야노야 다시, 야채 다시, 멸치 다시의 세트로 인사와 선물에 좋습니다."
    ),
    recommendation: text(
      "相手の好みが分からないとき、初めての贈りものに。",
      "When you are unsure of their tastes, or for a first gift.",
      "不清楚对方喜好时，或作为初次赠礼。",
      "不清楚對方喜好時，或作為初次贈禮。",
      "상대의 취향을 모를 때, 첫 선물로."
    ),
    tags: [
      text("詰合せ", "Assortment", "组合", "組合", "세트"),
      text("化粧箱", "Gift box", "礼盒", "禮盒", "선물 상자")
    ],
    sections: sectionsFor("gift"),
    usageSteps: giftUsage,
    featured: false,
    features: ["gift-ready", "selected-ingredients", "long-life"],
    taste: text(
      "三種それぞれの味わいを少しずつ。",
      "A little of each of the three flavors.",
      "三种风味各尝一点。",
      "三種風味各嘗一點。",
      "세 가지 맛을 조금씩."
    ),
    ingredientsText: text(
      "各商品の個装表示をご確認ください。",
      "Please refer to the label on each individual package.",
      "请查看各商品独立包装上的标示。",
      "請查看各商品獨立包裝上的標示。",
      "각 제품의 개별 포장 표시를 확인해 주세요."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: text(
      "各商品の個装表示をご確認ください",
      "See each individual package",
      "请见各独立包装",
      "請見各獨立包裝",
      "각 개별 포장 참조"
    ),
    nutrition: [],
    shelf: shelfGift,
    compare: {
      base: text("詰合せ", "Assortment", "组合", "組合", "세트"),
      taste: text("三種を少しずつ", "A little of each", "三种各少量", "三種各少量", "세 가지를 조금씩"),
      dishes: text("和食全般", "Japanese cooking", "日式料理", "日式料理", "일식 전반"),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 3,
      gift: 3
    },
    recipeIds: ["recipe-misoshiru", "recipe-oden"]
  },

  {
    id: "product-seasonal-gift",
    slug: "seasonal-gift",
    category: "gift",
    imageAlt: text(
      "季節の贈り物の化粧箱",
      "A seasonal gift box",
      "时令礼盒",
      "時令禮盒",
      "계절 선물 상자"
    ),
    name: text("季節の贈り物", "Seasonal Gift", "时令礼品", "時令禮品", "계절 선물"),
    romanizedName: "KISETSU NO OKURIMONO",
    shortDescription: text(
      "その時季だけの品を組み合わせて。",
      "Composed of items available only in this season.",
      "搭配当季限定的商品。",
      "搭配當季限定的商品。",
      "그 계절에만 나오는 품목을 조합했습니다."
    ),
    summary: text(
      "七十二候にあわせて内容を替えています。今の時季の品は店頭でご確認ください。",
      "Contents change with the seventy-two micro-seasons. Ask in store for this season's selection.",
      "内容随七十二候更换。当季商品请在店内确认。",
      "內容隨七十二候更換。當季商品請在店內確認。",
      "칠십이후에 맞춰 구성이 바뀝니다. 이번 계절의 품목은 매장에서 확인해 주세요."
    ),
    recommendation: text(
      "季節の挨拶、お中元・お歳暮に。",
      "For seasonal greetings and mid-year or year-end gifts.",
      "适合时令问候、中元和岁末赠礼。",
      "適合時令問候、中元和歲末贈禮。",
      "계절 인사, 중원·세밑 선물로."
    ),
    tags: [
      text("季節限定", "Seasonal", "季节限定", "季節限定", "계절 한정"),
      text("のし対応", "Ceremonial paper", "可加熨斗纸", "可加熨斗紙", "노시 대응")
    ],
    sections: sectionsFor("gift"),
    usageSteps: giftUsage,
    featured: false,
    features: ["gift-ready", "selected-ingredients", "careful-process"],
    taste: text(
      "時季により替わります。",
      "Varies with the season.",
      "随季节变化。",
      "隨季節變化。",
      "계절에 따라 달라집니다."
    ),
    ingredientsText: text(
      "各商品の個装表示をご確認ください。",
      "Please refer to the label on each individual package.",
      "请查看各商品独立包装上的标示。",
      "請查看各商品獨立包裝上的標示。",
      "각 제품의 개별 포장 표시를 확인해 주세요."
    ),
    allergens: ["wheat", "soy"],
    nutritionBasis: text(
      "各商品の個装表示をご確認ください",
      "See each individual package",
      "请见各独立包装",
      "請見各獨立包裝",
      "각 개별 포장 참조"
    ),
    nutrition: [],
    shelf: shelfGift,
    compare: {
      base: text("詰合せ", "Assortment", "组合", "組合", "세트"),
      taste: text("時季により替わる", "Varies by season", "随季节变化", "隨季節變化", "계절에 따라 다름"),
      dishes: text("和食全般", "Japanese cooking", "日式料理", "日式料理", "일식 전반"),
      usage: usageAsPacket,
      dietary: dietaryNone,
      beginner: 2,
      gift: 3
    },
    recipeIds: ["recipe-takikomi"]
  },

  // ── その他 ───────────────────────────────────────────
  {
    id: "product-dashi-pot",
    slug: "dashi-pot",
    category: "other",
    imageAlt: text(
      "だし取りポット",
      "A dashi brewing pot",
      "熬高汤壶",
      "熬高湯壺",
      "다시 우림 포트"
    ),
    name: text("だし取りポット", "Dashi Pot", "高汤壶", "高湯壺", "다시 포트"),
    romanizedName: "DASHI POT",
    shortDescription: text(
      "冷蔵庫でそのまま、水出しのだしを。",
      "Cold-brew dashi, straight in the refrigerator.",
      "可直接放入冰箱冷泡高汤。",
      "可直接放入冰箱冷泡高湯。",
      "냉장고에 그대로 두고 찬물로 우리는 다시."
    ),
    summary: text(
      "だしパックと水を入れて一晩置くだけ。注ぎ口が細く、そのまま鍋に移せます。",
      "Add a packet and water, and leave overnight. The narrow spout pours straight into a pot.",
      "放入高汤包和水，静置一晚即可。细口设计可直接倒入锅中。",
      "放入高湯包和水，靜置一晚即可。細口設計可直接倒入鍋中。",
      "다시 팩과 물을 넣고 하룻밤 두기만 하면 됩니다. 주둥이가 좁아 그대로 냄비에 옮길 수 있습니다."
    ),
    recommendation: text(
      "毎日だしを使う方、火を使わず用意したい方に。",
      "For daily dashi users and those who prefer not to use the stove.",
      "适合每日使用高汤、想免开火准备的人。",
      "適合每日使用高湯、想免開火準備的人。",
      "매일 다시를 쓰는 분, 불을 쓰지 않고 준비하고 싶은 분께."
    ),
    tags: [
      text("道具", "Tableware", "器具", "器具", "도구"),
      text("水出し", "Cold brew", "冷泡", "冷泡", "냉침")
    ],
    sections: sectionsFor("other"),
    usageSteps: giftUsage,
    featured: false,
    features: ["easy-to-use", "careful-process", "long-life"],
    taste: text(
      "食品ではありません。",
      "Not a food item.",
      "本品并非食品。",
      "本品並非食品。",
      "식품이 아닙니다."
    ),
    ingredientsText: text(
      "本体：耐熱ガラス／ふた：ポリプロピレン。",
      "Body: heat-resistant glass. Lid: polypropylene.",
      "本体：耐热玻璃／盖子：聚丙烯。",
      "本體：耐熱玻璃／蓋子：聚丙烯。",
      "본체: 내열 유리 / 뚜껑: 폴리프로필렌."
    ),
    allergens: ["none"],
    nutritionBasis: text("—", "—", "—", "—", "—"),
    nutrition: [],
    shelf: shelfOther,
    compare: {
      base: text("耐熱ガラス", "Heat-resistant glass", "耐热玻璃", "耐熱玻璃", "내열 유리"),
      taste: text("—", "—", "—", "—", "—"),
      dishes: text("水出しだし", "Cold-brew dashi", "冷泡高汤", "冷泡高湯", "냉침 다시"),
      usage: text("道具", "Tool", "器具", "器具", "도구"),
      dietary: dietaryNone,
      beginner: 3,
      gift: 2
    },
    recipeIds: []
  },

  {
    id: "product-tenugui",
    slug: "tenugui",
    category: "other",
    imageAlt: text(
      "茅乃舎の手ぬぐい",
      "A Kayanoya tenugui cloth",
      "茅乃舎手巾",
      "茅乃舍手巾",
      "가야노야 데누구이"
    ),
    name: text("手ぬぐい", "Tenugui Cloth", "手巾", "手巾", "데누구이"),
    romanizedName: "TENUGUI",
    shortDescription: text(
      "台所に、旅の記憶に。",
      "For the kitchen, and for the memory of a trip.",
      "用于厨房，也留作旅行的记忆。",
      "用於廚房，也留作旅行的記憶。",
      "부엌에서, 그리고 여행의 기억으로."
    ),
    summary: text(
      "七十二候の草花を染めた綿の手ぬぐい。台ふきんにも、包みにも使えます。",
      "A cotton cloth dyed with plants of the seventy-two micro-seasons — a wiping cloth or a wrapper.",
      "染有七十二候草木花卉的棉质手巾，可作抹布或包裹布使用。",
      "染有七十二候草木花卉的棉質手巾，可作抹布或包裹布使用。",
      "칠십이후의 풀꽃을 물들인 면 손수건. 행주로도 보자기로도 쓸 수 있습니다."
    ),
    recommendation: text(
      "軽い手みやげ、旅の記念に。",
      "As a light souvenir or a memento of your trip.",
      "适合作为轻便伴手礼或旅行纪念。",
      "適合作為輕便伴手禮或旅行紀念。",
      "가벼운 선물이나 여행 기념으로."
    ),
    tags: [
      text("綿100%", "100% cotton", "纯棉", "純棉", "면 100%"),
      text("日本製", "Made in Japan", "日本制", "日本製", "일본산")
    ],
    sections: sectionsFor("other"),
    usageSteps: giftUsage,
    featured: false,
    features: ["gift-ready", "careful-process", "long-life"],
    taste: text(
      "食品ではありません。",
      "Not a food item.",
      "本品并非食品。",
      "本品並非食品。",
      "식품이 아닙니다."
    ),
    ingredientsText: text(
      "綿100%（日本製）。",
      "100% cotton, made in Japan.",
      "纯棉100%（日本制）。",
      "純棉100%（日本製）。",
      "면 100%(일본산)."
    ),
    allergens: ["none"],
    nutritionBasis: text("—", "—", "—", "—", "—"),
    nutrition: [],
    shelf: shelfOther,
    compare: {
      base: text("綿", "Cotton", "棉", "棉", "면"),
      taste: text("—", "—", "—", "—", "—"),
      dishes: text("台所まわり", "Around the kitchen", "厨房周边", "廚房周邊", "부엌 주변"),
      usage: text("道具", "Tool", "器具", "器具", "도구"),
      dietary: dietaryNone,
      beginner: 3,
      gift: 3
    },
    recipeIds: []
  }
];

export const store: Store = {
  id: "tokyo-station",
  name: text("茅乃舎 東京駅店", "Kayanoya Tokyo Station", "茅乃舎东京站店", "茅乃舍東京站店", "가야노야 도쿄역점"),
  welcomeTitle: text("ようこそ 茅乃舎へ", "Welcome to Kayanoya", "欢迎来到茅乃舎", "歡迎來到茅乃舍", "가야노야에 오신 것을 환영합니다"),
  welcomeBody: text("だしで、毎日の料理をもっとおいしく。", "Make everyday cooking better with dashi.", "用高汤让每日料理更加美味。", "用高湯讓每日料理更加美味。", "다시로 매일의 요리를 더 맛있게."),
  address: text(
    "東京駅 グランスタ丸の内 地下1階",
    "B1, Gransta Marunouchi, Tokyo Station",
    "东京站 Gransta 丸之内 地下1层",
    "東京站 Gransta 丸之內 地下1樓",
    "도쿄역 그란스타 마루노우치 지하 1층"
  ),
  hours: text(
    "10:00 — 21:00（無休）",
    "10:00 — 21:00 (open daily)",
    "10:00 — 21:00（全年无休）",
    "10:00 — 21:00（全年無休）",
    "10:00 — 21:00 (연중무휴)"
  ),
  heroImage: "/images/store/kayanoya-interior.jpg",
  heroImageAlt: text("茅乃舎の店内", "Interior of a Kayanoya store", "茅乃舎店内", "茅乃舍店內", "가야노야 매장 내부"),
  featuredProductIds: [
    "product-kayanoya-dashi",
    "product-vegetable-dashi",
    "product-reduced-salt-dashi",
    "product-golden-dashi"
  ],
  areas: [
    {
      id: "gift",
      label: text("ギフト", "Gifts", "礼品", "禮品", "선물"),
      x: 6,
      y: 6,
      width: 38,
      height: 18
    },
    {
      id: "tableware",
      label: text("道具", "Tableware", "器具", "器具", "도구"),
      x: 70,
      y: 6,
      width: 24,
      height: 18
    },
    {
      id: "dashi",
      label: text("だし", "Dashi", "高汤", "高湯", "다시"),
      x: 6,
      y: 30,
      width: 30,
      height: 34
    },
    {
      id: "seasoning",
      label: text("調味料", "Seasoning", "调味料", "調味料", "조미료"),
      x: 40,
      y: 30,
      width: 26,
      height: 34
    },
    {
      id: "register",
      label: text("レジ", "Register", "收银台", "收銀台", "계산대"),
      x: 70,
      y: 34,
      width: 24,
      height: 26
    },
    {
      id: "tasting",
      label: text("試食", "Tasting", "试吃", "試吃", "시식"),
      x: 40,
      y: 70,
      width: 26,
      height: 10
    },
    {
      id: "entrance",
      label: text("入口", "Entrance", "入口", "入口", "입구"),
      x: 38,
      y: 86,
      width: 24,
      height: 10
    }
  ]
};

/** 参考画面11。設問と選択肢の文言は messages の Survey に持つ。 */
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "understanding",
    kind: "face",
    optionIds: ["well", "somewhat", "not-really"]
  },
  {id: "intent", kind: "face", optionIds: ["yes", "neutral", "no"]},
  {
    id: "helpful",
    kind: "chips",
    optionIds: [
      "overview",
      "usage",
      "materials",
      "comparison",
      "nutrition",
      "other"
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
