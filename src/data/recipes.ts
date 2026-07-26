import type {LocalizedText, Recipe} from "@/types/content";

const text = (
  ja: string,
  en: string,
  zhCN: string,
  zhTW: string,
  ko: string
): LocalizedText => ({ja, en, "zh-CN": zhCN, "zh-TW": zhTW, ko});

/** 材料の分量でよく使う単位。 */
const amt = {
  packet1: text("1袋", "1 packet", "1袋", "1袋", "1팩"),
  water400: text("400ml", "400 ml", "400毫升", "400毫升", "400ml"),
  water600: text("600ml", "600 ml", "600毫升", "600毫升", "600ml"),
  eggs3: text("3個", "3", "3个", "3個", "3개"),
  toTaste: text("適量", "To taste", "适量", "適量", "적당량"),
  tbsp1: text("大さじ1", "1 tbsp", "1大匙", "1大匙", "1큰술"),
  tsp1: text("小さじ1", "1 tsp", "1小匙", "1小匙", "1작은술"),
  rice2: text("2合", "2 cups (uncooked)", "2杯（米）", "2杯（米）", "2컵(쌀)")
};

const potImage = "/images/recipes/dashi-pot.jpg";
const potImageAlt = text(
  "鍋でだしを取る様子",
  "Brewing dashi in a pot",
  "锅中熬煮高汤",
  "鍋中熬煮高湯",
  "냄비에서 다시를 우리는 모습"
);

export const recipes: Recipe[] = [
  {
    id: "recipe-misoshiru",
    slug: "misoshiru",
    name: text("味噌汁", "Miso Soup", "味噌汤", "味噌湯", "된장국"),
    romanizedName: "MISOSHIRU",
    image: potImage,
    imageAlt: potImageAlt,
    summary: text(
      "だしを取るところから始める、いちばん基本の一杯。",
      "The most basic bowl, starting from brewing the dashi.",
      "从熬高汤开始，最基本的一碗。",
      "從熬高湯開始，最基本的一碗。",
      "다시를 우리는 것부터 시작하는 가장 기본적인 한 그릇."
    ),
    minutes: 15,
    serves: 2,
    ingredients: [
      {
        name: text("だしパック", "Dashi packet", "高汤包", "高湯包", "다시 팩"),
        amount: amt.packet1
      },
      {name: text("水", "Water", "水", "水", "물"), amount: amt.water400},
      {
        name: text("味噌", "Miso", "味噌", "味噌", "된장"),
        amount: amt.tbsp1
      },
      {
        name: text("豆腐・わかめ", "Tofu and wakame", "豆腐、裙带菜", "豆腐、裙帶菜", "두부·미역"),
        amount: amt.toTaste
      }
    ],
    steps: [
      text(
        "鍋に水とだしパックを入れ、沸騰後に中火で2〜3分煮出します。",
        "Put water and the dashi packet in a pot; after boiling, simmer 2–3 minutes over medium heat.",
        "锅中加水与高汤包，煮沸后中火熬煮2至3分钟。",
        "鍋中加水與高湯包，煮沸後中火熬煮2至3分鐘。",
        "냄비에 물과 다시 팩을 넣고 끓으면 중불에서 2~3분 우립니다."
      ),
      text(
        "だしパックを取り出し、豆腐とわかめを加えて温めます。",
        "Remove the packet, then add tofu and wakame and heat through.",
        "取出高汤包，加入豆腐和裙带菜加热。",
        "取出高湯包，加入豆腐和裙帶菜加熱。",
        "다시 팩을 꺼내고 두부와 미역을 넣어 데웁니다."
      ),
      text(
        "火を止めてから味噌を溶き入れます。煮立てないのがこつです。",
        "Turn off the heat before dissolving the miso. The trick is not to let it boil.",
        "关火后再化开味噌。诀窍是不要再煮沸。",
        "關火後再化開味噌。訣竅是不要再煮沸。",
        "불을 끄고 된장을 풀어 넣습니다. 끓이지 않는 것이 요령입니다."
      )
    ],
    productIds: [
      "product-kayanoya-dashi",
      "product-reduced-salt-dashi",
      "product-niboshi-dashi"
    ]
  },

  {
    id: "recipe-dashimaki",
    slug: "dashimaki",
    name: text("だし巻き卵", "Rolled Omelet", "高汤玉子烧", "高湯玉子燒", "달걀말이"),
    romanizedName: "DASHIMAKI TAMAGO",
    imageAlt: text(
      "だし巻き卵",
      "Japanese rolled omelet",
      "高汤玉子烧",
      "高湯玉子燒",
      "달걀말이"
    ),
    summary: text(
      "だしをたっぷり含ませた、やわらかな卵焼き。",
      "A soft omelet holding plenty of dashi.",
      "饱含高汤的柔软煎蛋卷。",
      "飽含高湯的柔軟煎蛋捲。",
      "다시를 듬뿍 머금은 부드러운 달걀말이."
    ),
    minutes: 20,
    serves: 2,
    ingredients: [
      {name: text("卵", "Eggs", "鸡蛋", "雞蛋", "달걀"), amount: amt.eggs3},
      {
        name: text("だし", "Dashi", "高汤", "高湯", "다시"),
        amount: text("80ml", "80 ml", "80毫升", "80毫升", "80ml")
      },
      {
        name: text("白だし", "Shiro dashi", "白高汤", "白高湯", "시로다시"),
        amount: amt.tsp1
      },
      {
        name: text("油", "Oil", "油", "油", "기름"),
        amount: amt.toTaste
      }
    ],
    steps: [
      text(
        "卵を溶き、冷ましただしと白だしを加えて混ぜます。",
        "Beat the eggs, then mix in the cooled dashi and shiro dashi.",
        "打散鸡蛋，加入放凉的高汤和白高汤拌匀。",
        "打散雞蛋，加入放涼的高湯和白高湯拌勻。",
        "달걀을 풀고 식힌 다시와 시로다시를 넣어 섞습니다."
      ),
      text(
        "熱した卵焼き器に薄く流し、半熟のうちに手前へ巻きます。",
        "Pour a thin layer into a hot pan and roll it toward you while still soft.",
        "倒入热锅摊薄，半熟时向自己方向卷起。",
        "倒入熱鍋攤薄，半熟時向自己方向捲起。",
        "달군 팬에 얇게 붓고 반숙일 때 앞쪽으로 말아 줍니다."
      ),
      text(
        "残りの卵液を数回に分けて同じように巻き重ねます。",
        "Repeat with the remaining egg mixture in several additions.",
        "将剩余蛋液分数次以同样方式卷叠。",
        "將剩餘蛋液分數次以同樣方式捲疊。",
        "남은 달걀물을 여러 번에 나누어 같은 방식으로 말아 겹칩니다."
      ),
      text(
        "巻きすで形を整え、粗熱が取れてから切り分けます。",
        "Shape with a bamboo mat, let it cool slightly, then slice.",
        "用竹帘整形，稍微放凉后切分。",
        "用竹簾整形，稍微放涼後切分。",
        "김발로 모양을 잡고 한 김 식힌 뒤 썹니다."
      )
    ],
    productIds: ["product-kayanoya-dashi", "product-shiro-dashi"]
  },

  {
    id: "recipe-takikomi",
    slug: "takikomi-gohan",
    name: text("炊き込みご飯", "Seasoned Rice", "什锦炊饭", "什錦炊飯", "다키코미 밥"),
    romanizedName: "TAKIKOMI GOHAN",
    imageAlt: text(
      "炊き込みご飯",
      "Japanese seasoned rice",
      "什锦炊饭",
      "什錦炊飯",
      "다키코미 밥"
    ),
    summary: text(
      "だしパックを破って米と炊くだけ。具は季節のもので。",
      "Open a dashi packet, cook it with the rice, and add whatever is in season.",
      "拆开高汤包与米同煮即可，配料随季节而定。",
      "拆開高湯包與米同煮即可，配料隨季節而定。",
      "다시 팩을 뜯어 쌀과 함께 짓기만. 재료는 제철 것으로."
    ),
    minutes: 60,
    serves: 4,
    ingredients: [
      {name: text("米", "Rice", "米", "米", "쌀"), amount: amt.rice2},
      {
        name: text("だしパック", "Dashi packet", "高汤包", "高湯包", "다시 팩"),
        amount: amt.packet1
      },
      {
        name: text("きのこ・根菜", "Mushrooms and root vegetables", "菌菇、根菜", "菇類、根菜", "버섯·뿌리채소"),
        amount: amt.toTaste
      },
      {
        name: text("だし醤油", "Dashi soy sauce", "高汤酱油", "高湯醬油", "다시 간장"),
        amount: amt.tbsp1
      }
    ],
    steps: [
      text(
        "米を研いで30分ほど浸水させ、水気を切ります。",
        "Rinse the rice, soak about 30 minutes, and drain.",
        "淘米后浸泡约30分钟，沥干水分。",
        "淘米後浸泡約30分鐘，瀝乾水分。",
        "쌀을 씻어 30분 정도 불린 뒤 물기를 뺍니다."
      ),
      text(
        "炊飯器に米、だしパックの中身、だし醤油、規定量の水を入れます。",
        "Add the rice, the contents of the dashi packet, dashi soy sauce, and the usual amount of water.",
        "在电饭锅中放入米、高汤包内容物、高汤酱油和标准水量。",
        "在電鍋中放入米、高湯包內容物、高湯醬油和標準水量。",
        "밥솥에 쌀, 다시 팩 내용물, 다시 간장, 규정량의 물을 넣습니다."
      ),
      text(
        "具材をのせて普通に炊き、炊き上がったらさっくり混ぜます。",
        "Top with the ingredients, cook as usual, then fold gently when done.",
        "放上配料正常炊煮，煮好后轻轻拌匀。",
        "放上配料正常炊煮，煮好後輕輕拌勻。",
        "재료를 올려 평소대로 짓고, 다 되면 가볍게 섞습니다."
      )
    ],
    productIds: ["product-kayanoya-dashi", "product-ago-shoyu"]
  },

  {
    id: "recipe-chawanmushi",
    slug: "chawanmushi",
    name: text("茶碗蒸し", "Chawanmushi", "茶碗蒸", "茶碗蒸", "차완무시"),
    romanizedName: "CHAWANMUSHI",
    imageAlt: text(
      "茶碗蒸し",
      "Japanese savory egg custard",
      "茶碗蒸",
      "茶碗蒸",
      "차완무시"
    ),
    summary: text(
      "だしの香りをそのまま味わう、なめらかな蒸し物。",
      "A smooth steamed custard that shows off the dashi aroma.",
      "直接品味高汤香气的滑嫩蒸品。",
      "直接品味高湯香氣的滑嫩蒸品。",
      "다시의 향을 그대로 즐기는 부드러운 찜 요리."
    ),
    minutes: 30,
    serves: 2,
    ingredients: [
      {name: text("卵", "Eggs", "鸡蛋", "雞蛋", "달걀"), amount: text("2個", "2", "2个", "2個", "2개")},
      {
        name: text("だし", "Dashi", "高汤", "高湯", "다시"),
        amount: text("300ml", "300 ml", "300毫升", "300毫升", "300ml")
      },
      {
        name: text("白だし", "Shiro dashi", "白高汤", "白高湯", "시로다시"),
        amount: amt.tsp1
      },
      {
        name: text("鶏肉・銀杏・三つ葉", "Chicken, ginkgo, mitsuba", "鸡肉、银杏、鸭儿芹", "雞肉、銀杏、鴨兒芹", "닭고기·은행·미쓰바"),
        amount: amt.toTaste
      }
    ],
    steps: [
      text(
        "だしを取り、白だしを加えて人肌まで冷まします。",
        "Brew the dashi, add shiro dashi, and cool to body temperature.",
        "熬好高汤，加入白高汤后放凉至体温。",
        "熬好高湯，加入白高湯後放涼至體溫。",
        "다시를 우리고 시로다시를 넣어 체온 정도로 식힙니다."
      ),
      text(
        "溶き卵と合わせ、こし器で二度こします。",
        "Combine with the beaten eggs and strain twice.",
        "与蛋液混合，用滤网过筛两次。",
        "與蛋液混合，用濾網過篩兩次。",
        "푼 달걀과 합쳐 체에 두 번 거릅니다."
      ),
      text(
        "器に具を入れて卵液を注ぎ、弱火で15分ほど蒸します。",
        "Put the fillings in cups, pour in the mixture, and steam gently about 15 minutes.",
        "将配料放入容器，倒入蛋液，小火蒸约15分钟。",
        "將配料放入容器，倒入蛋液，小火蒸約15分鐘。",
        "그릇에 재료를 담고 달걀물을 부어 약한 불에서 15분쯤 찝니다."
      )
    ],
    productIds: ["product-golden-dashi", "product-shiro-dashi"]
  },

  {
    id: "recipe-ohitashi",
    slug: "ohitashi",
    name: text("野菜のだし浸し", "Vegetables in Dashi", "高汤浸蔬菜", "高湯浸蔬菜", "채소 다시 절임"),
    romanizedName: "OHITASHI",
    imageAlt: text(
      "野菜のだし浸し",
      "Vegetables steeped in dashi",
      "高汤浸蔬菜",
      "高湯浸蔬菜",
      "채소 다시 절임"
    ),
    summary: text(
      "茹でた野菜をだしに浸すだけ。冷やしても温かくても。",
      "Simply steep boiled vegetables in dashi — good chilled or warm.",
      "只需将焯好的蔬菜浸入高汤，冷热皆宜。",
      "只需將燙好的蔬菜浸入高湯，冷熱皆宜。",
      "데친 채소를 다시에 담그기만. 차게도 따뜻하게도."
    ),
    minutes: 15,
    serves: 2,
    ingredients: [
      {
        name: text("季節の野菜", "Seasonal vegetables", "时令蔬菜", "時令蔬菜", "제철 채소"),
        amount: text("200g", "200 g", "200克", "200公克", "200g")
      },
      {
        name: text("だし", "Dashi", "高汤", "高湯", "다시"),
        amount: amt.water400
      },
      {
        name: text("だし醤油", "Dashi soy sauce", "高汤酱油", "高湯醬油", "다시 간장"),
        amount: amt.tbsp1
      }
    ],
    steps: [
      text(
        "だしにだし醤油を合わせ、浸し地を作って冷まします。",
        "Combine dashi with dashi soy sauce to make the steeping liquid, and let it cool.",
        "将高汤与高汤酱油混合制成浸汁并放凉。",
        "將高湯與高湯醬油混合製成浸汁並放涼。",
        "다시에 다시 간장을 합쳐 절임 국물을 만들어 식힙니다."
      ),
      text(
        "野菜を固めに茹でて冷水にとり、水気をしっかり絞ります。",
        "Boil the vegetables until just firm, cool in water, and squeeze out moisture well.",
        "蔬菜焯至偏硬后过冷水，充分挤干水分。",
        "蔬菜燙至偏硬後過冷水，充分擠乾水分。",
        "채소를 살짝 단단하게 데쳐 찬물에 헹구고 물기를 꼭 짭니다."
      ),
      text(
        "浸し地に30分以上浸けて、味を含ませます。",
        "Steep for at least 30 minutes to let the flavor soak in.",
        "浸泡30分钟以上使其入味。",
        "浸泡30分鐘以上使其入味。",
        "30분 이상 담가 맛이 배게 합니다."
      )
    ],
    productIds: ["product-vegetable-dashi", "product-golden-dashi", "product-ago-shoyu"]
  },

  {
    id: "recipe-udon",
    slug: "udon",
    name: text("かけうどん", "Udon in Broth", "清汤乌冬面", "清湯烏龍麵", "가케 우동"),
    romanizedName: "KAKE UDON",
    imageAlt: text(
      "かけうどん",
      "Udon noodles in hot broth",
      "清汤乌冬面",
      "清湯烏龍麵",
      "가케 우동"
    ),
    summary: text(
      "つゆがすべて。だしの違いがそのまま出る一杯。",
      "The broth is everything — the choice of dashi shows directly.",
      "汤头决定一切，高汤的差异会直接体现。",
      "湯頭決定一切，高湯的差異會直接體現。",
      "국물이 전부. 다시의 차이가 그대로 드러나는 한 그릇."
    ),
    minutes: 20,
    serves: 2,
    ingredients: [
      {
        name: text("うどん", "Udon noodles", "乌冬面", "烏龍麵", "우동면"),
        amount: text("2玉", "2 portions", "2份", "2份", "2인분")
      },
      {
        name: text("だしパック", "Dashi packet", "高汤包", "高湯包", "다시 팩"),
        amount: amt.packet1
      },
      {name: text("水", "Water", "水", "水", "물"), amount: amt.water600},
      {
        name: text("白だし", "Shiro dashi", "白高汤", "白高湯", "시로다시"),
        amount: amt.tbsp1
      },
      {
        name: text("ねぎ・天かす", "Scallion and tenkasu", "葱、天妇罗碎", "蔥、天婦羅碎", "파·튀김 부스러기"),
        amount: amt.toTaste
      }
    ],
    steps: [
      text(
        "水とだしパックでだしを取り、白だしで味を調えます。",
        "Brew dashi from the water and packet, then season with shiro dashi.",
        "用水与高汤包熬出高汤，再以白高汤调味。",
        "用水與高湯包熬出高湯，再以白高湯調味。",
        "물과 다시 팩으로 국물을 내고 시로다시로 간을 맞춥니다."
      ),
      text(
        "うどんを表示どおり茹で、湯を切って器に盛ります。",
        "Boil the udon as directed, drain, and place in bowls.",
        "按包装说明煮好乌冬面，沥干后盛入碗中。",
        "按包裝說明煮好烏龍麵，瀝乾後盛入碗中。",
        "우동을 표시대로 삶아 물기를 빼고 그릇에 담습니다."
      ),
      text(
        "熱いつゆを注ぎ、ねぎと天かすをのせます。",
        "Pour over the hot broth and top with scallion and tenkasu.",
        "倒入热汤，放上葱和天妇罗碎。",
        "倒入熱湯，放上蔥和天婦羅碎。",
        "뜨거운 국물을 붓고 파와 튀김 부스러기를 올립니다."
      )
    ],
    productIds: [
      "product-niboshi-dashi",
      "product-chicken-dashi",
      "product-shiro-dashi",
      "product-curry"
    ]
  },

  {
    id: "recipe-oden",
    slug: "oden",
    name: text("おでん", "Oden", "关东煮", "關東煮", "오뎅"),
    romanizedName: "ODEN",
    imageAlt: text(
      "おでん",
      "Japanese oden hot pot",
      "关东煮",
      "關東煮",
      "오뎅"
    ),
    summary: text(
      "だしを多めに取って、じっくり煮含める冬の鍋。",
      "Brew plenty of dashi and simmer slowly — a winter pot.",
      "多熬些高汤，慢慢煨煮的冬季锅物。",
      "多熬些高湯，慢慢煨煮的冬季鍋物。",
      "다시를 넉넉히 내어 천천히 끓이는 겨울 전골."
    ),
    minutes: 90,
    serves: 4,
    ingredients: [
      {
        name: text("だしパック", "Dashi packet", "高汤包", "高湯包", "다시 팩"),
        amount: text("2袋", "2 packets", "2袋", "2袋", "2팩")
      },
      {
        name: text("水", "Water", "水", "水", "물"),
        amount: text("1.2L", "1.2 L", "1.2升", "1.2公升", "1.2L")
      },
      {
        name: text("大根・卵・練り物", "Daikon, eggs, fish cakes", "萝卜、鸡蛋、鱼糕", "蘿蔔、雞蛋、魚糕", "무·달걀·어묵"),
        amount: amt.toTaste
      },
      {
        name: text("だし醤油", "Dashi soy sauce", "高汤酱油", "高湯醬油", "다시 간장"),
        amount: text("大さじ2", "2 tbsp", "2大匙", "2大匙", "2큰술")
      }
    ],
    steps: [
      text(
        "だしを多めに取り、だし醤油で薄めに味を付けます。",
        "Brew a generous amount of dashi and season lightly with dashi soy sauce.",
        "多熬些高汤，用高汤酱油调成淡味。",
        "多熬些高湯，用高湯醬油調成淡味。",
        "다시를 넉넉히 내고 다시 간장으로 연하게 간합니다."
      ),
      text(
        "大根など火の通りにくいものから順に入れます。",
        "Add the slowest-cooking items, such as daikon, first.",
        "从萝卜等不易熟的食材开始依序放入。",
        "從蘿蔔等不易熟的食材開始依序放入。",
        "무처럼 익는 데 오래 걸리는 것부터 넣습니다."
      ),
      text(
        "弱火で1時間ほど煮て、一度冷ますと味が染みます。",
        "Simmer gently about an hour; cooling once helps the flavor soak in.",
        "小火煮约1小时，放凉一次更入味。",
        "小火煮約1小時，放涼一次更入味。",
        "약한 불에서 1시간쯤 끓이고 한 번 식히면 맛이 뱁니다."
      )
    ],
    productIds: [
      "product-kayanoya-dashi",
      "product-vegetable-dashi",
      "product-chicken-dashi",
      "product-gift-set"
    ]
  }
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getRecipesByIds(ids: string[]): Recipe[] {
  return ids
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter((recipe): recipe is Recipe => Boolean(recipe));
}
