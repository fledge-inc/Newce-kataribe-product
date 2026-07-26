import type {
  LocalizedText,
  Product,
  ProductCategory,
  Store
} from "@/types/content";

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

export const products: Product[] = [
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
        imageAlt: text("茅乃舎だしの素材", "Ingredients used in Kayanoya Dashi", "茅乃舎高汤的食材", "茅乃舍高湯的食材", "가야노야 다시의 재료")
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
        imageAlt: text("だしの使い方", "Preparing dashi in a pot", "锅中熬煮高汤", "鍋中熬煮高湯", "냄비에서 다시를 우리는 모습")
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
          "風味原料（かつお節、煮干しうるめいわし、焼きあご、真昆布）、でん粉分解物、酵母エキス、食塩、粉末しょうゆ。小麦・大豆を含みます。",
          "Flavor ingredients include bonito, round herring, roasted flying fish, and kelp. Contains wheat and soy.",
          "风味原料包括鲣鱼干、圆腹鲱干、烤飞鱼和真昆布。含小麦和大豆。",
          "風味原料包括鰹魚乾、圓腹鯡乾、烤飛魚和真昆布。含小麥和大豆。",
          "가쓰오부시, 눈퉁멸, 구운 날치, 다시마 등이 들어 있습니다. 밀과 대두를 함유합니다."
        )
      }
    ],
    usageSteps: commonUsage,
    featured: true
  },
  {
    id: "product-vegetable-dashi",
    slug: "vegetable-dashi",
    category: "dashi",
    image: "/images/products/vegetable-dashi.jpg",
    imageAlt: text("野菜だしの商品パッケージ", "A pouch of Vegetable Dashi", "蔬菜高汤产品包装", "蔬菜高湯產品包裝", "야채 다시 제품 패키지"),
    name: text("野菜だし", "Vegetable Dashi", "蔬菜高汤", "蔬菜高湯", "야채 다시"),
    romanizedName: "VEGETABLE DASHI",
    shortDescription: text("5種の国産野菜の甘みとコク。", "Sweetness and depth from five Japanese vegetables.", "五种日本国产蔬菜的甘甜与醇厚。", "五種日本國產蔬菜的甘甜與醇厚。", "일본산 채소 다섯 가지의 단맛과 깊은 풍미."),
    summary: text("玉ねぎ、にんにく、人参、セロリ、キャベツを凝縮した洋風だしです。", "A Western-style stock of onion, garlic, carrot, celery, and cabbage.", "浓缩洋葱、大蒜、胡萝卜、芹菜和卷心菜的西式高汤。", "濃縮洋蔥、大蒜、胡蘿蔔、芹菜和高麗菜的西式高湯。", "양파, 마늘, 당근, 셀러리, 양배추를 농축한 서양식 다시입니다."),
    recommendation: text("スープ、パスタ、煮込み料理に。", "For soups, pasta, and stews.", "适合汤、意面和炖菜。", "適合湯、義大利麵和燉菜。", "수프, 파스타, 스튜에 잘 맞습니다."),
    tags: [text("野菜", "Vegetable", "蔬菜", "蔬菜", "채소"), text("洋風", "Western style", "西式", "西式", "서양식")],
    sections: [],
    usageSteps: commonUsage,
    featured: true
  },
  {
    id: "product-reduced-salt-dashi",
    slug: "reduced-salt-dashi",
    category: "dashi",
    image: "/images/products/reduced-salt-dashi.jpg",
    imageAlt: text("減塩茅乃舎だしの商品パッケージ", "A pouch of Reduced-salt Kayanoya Dashi", "减盐茅乃舎高汤产品包装", "減鹽茅乃舍高湯產品包裝", "저염 가야노야 다시 제품 패키지"),
    name: text("減塩 茅乃舎だし", "Reduced-salt Dashi", "减盐茅乃舎高汤", "減鹽茅乃舍高湯", "저염 가야노야 다시"),
    romanizedName: "REDUCED-SALT DASHI",
    shortDescription: text("うまみはそのまま、塩分53%カット。", "The same umami with 53% less salt.", "鲜味不减，盐分减少53%。", "鮮味不減，鹽分減少53%。", "감칠맛은 그대로, 소금은 53% 줄였습니다."),
    summary: text("茅乃舎だしと同じ素材を使い、塩分を控えました。", "Made with the original dashi ingredients and less salt.", "使用与原味高汤相同的食材，降低盐分。", "使用與原味高湯相同的食材，降低鹽分。", "기본 다시와 같은 재료를 사용하고 소금은 줄였습니다."),
    recommendation: text("薄味を好む方、味付けを自分で調整したい方に。", "For lighter seasoning and more control over flavor.", "适合喜爱清淡口味或想自行调味的人。", "適合喜愛清淡口味或想自行調味的人。", "담백한 맛을 좋아하거나 간을 직접 조절하고 싶은 분께."),
    tags: [text("減塩", "Reduced salt", "减盐", "減鹽", "저염"), text("和風", "Japanese style", "日式", "日式", "일본식")],
    sections: [],
    usageSteps: commonUsage,
    featured: true
  },
  {
    id: "product-niboshi-dashi",
    slug: "niboshi-dashi",
    category: "dashi",
    image: "/images/products/niboshi-dashi.jpg",
    imageAlt: text("煮干しだしの商品パッケージ", "A pouch of Niboshi Dashi", "小鱼干高汤产品包装", "小魚乾高湯產品包裝", "멸치 다시 제품 패키지"),
    name: text("煮干しだし", "Niboshi Dashi", "小鱼干高汤", "小魚乾高湯", "멸치 다시"),
    romanizedName: "NIBOSHI DASHI",
    shortDescription: text("煮干しの力強いうまみと香り。", "Bold umami and aroma from dried fish.", "小鱼干带来的浓郁鲜味与香气。", "小魚乾帶來的濃郁鮮味與香氣。", "말린 생선의 진한 감칠맛과 향."),
    summary: text("味わい深く、味噌汁や麺料理によく合うだしです。", "A deeply flavored stock for miso soup and noodles.", "风味深厚，适合味噌汤和面食。", "風味深厚，適合味噌湯和麵食。", "깊은 맛으로 된장국과 면 요리에 잘 맞습니다."),
    recommendation: text("魚介の風味が好きな方、しっかりしただしを求める方に。", "For seafood lovers who prefer a full-bodied stock.", "适合喜爱海鲜风味和浓郁高汤的人。", "適合喜愛海鮮風味和濃郁高湯的人。", "해산물 풍미와 진한 국물을 좋아하는 분께."),
    tags: [text("煮干し", "Dried fish", "小鱼干", "小魚乾", "멸치"), text("濃厚", "Full-bodied", "浓郁", "濃郁", "진한 맛")],
    sections: [],
    usageSteps: commonUsage,
    featured: false
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
  heroImage: "/images/store/kayanoya-interior.jpg",
  heroImageAlt: text("茅乃舎の店内", "Interior of a Kayanoya store", "茅乃舎店内", "茅乃舍店內", "가야노야 매장 내부"),
  featuredProductIds: [
    "product-kayanoya-dashi",
    "product-vegetable-dashi",
    "product-reduced-salt-dashi"
  ]
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

