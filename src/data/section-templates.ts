import type {
  LocalizedText,
  ProductDetailSection,
  RealCategoryId
} from "@/types/content";

/**
 * 詳細ページの長文を、カテゴリ別に全5言語で1組ずつ持つ。
 *
 * 商品を13点に増やすにあたり、全商品の全項目を5言語で個別に書くと約900文
 * になり現実的でない。要点（商品名・短い説明・タグ・比較行・売場）は
 * `content.ts` 側で商品ごとに個別作成し、長文はここのテンプレートを流用する。
 * 嘘の翻訳を混ぜないための割り切りで、実運用では商品ごとの原稿に差し替える。
 */

const text = (
  ja: string,
  en: string,
  zhCN: string,
  zhTW: string,
  ko: string
): LocalizedText => ({ja, en, "zh-CN": zhCN, "zh-TW": zhTW, ko});

const titles = {
  features: text(
    "これは何か",
    "What it is",
    "这是什么",
    "這是什麼",
    "어떤 제품인가요"
  ),
  usage: text("基本の使い方", "How to use it", "基本用法", "基本用法", "기본 사용법"),
  materials: text(
    "素材と製法",
    "Ingredients and craft",
    "食材与工艺",
    "食材與工藝",
    "재료와 제조법"
  ),
  comparison: text(
    "ほかの商品との違い",
    "How it compares",
    "与其他商品的区别",
    "與其他商品的差異",
    "다른 제품과의 차이"
  ),
  details: text(
    "原材料とアレルギー",
    "Ingredients and allergens",
    "配料与过敏原",
    "成分與過敏原",
    "원재료와 알레르기"
  )
};

type TemplateBodies = Record<ProductDetailSection["id"], LocalizedText>;

const bodies: Record<RealCategoryId, TemplateBodies> = {
  dashi: {
    features: text(
      "素材のうまみをそのまま閉じ込め、家庭でも料理店のようなだしが取れるよう仕上げました。",
      "The ingredients' umami is captured as-is, so restaurant-quality stock is easy at home.",
      "原封不动地锁住食材的鲜味，在家也能煮出餐厅级的高汤。",
      "原封不動地鎖住食材的鮮味，在家也能煮出餐廳級的高湯。",
      "재료의 감칠맛을 그대로 담아, 가정에서도 전문점 같은 국물을 낼 수 있습니다."
    ),
    usage: text(
      "煮出して澄んだだしとして使うほか、袋を破って炒め物や炊き込みご飯の調味料にも使えます。",
      "Simmer for a clear stock, or open the packet and use the powder to season stir-fries and rice.",
      "既可熬煮成清澈高汤，也可拆袋将粉末用于炒菜或焖饭调味。",
      "既可熬煮成清澈高湯，也可拆袋將粉末用於炒菜或炊飯調味。",
      "팩째 우려 맑은 국물로 쓰거나, 팩을 뜯어 볶음 요리와 밥의 조미료로 쓸 수 있습니다."
    ),
    materials: text(
      "国産原料を選び、それぞれの香りとうまみを引き出してから細かく粉砕し、だしパックに詰めています。",
      "Selected Japanese ingredients are prepared to draw out aroma and umami, finely milled, and packed.",
      "精选日本国产原料，充分引出香气和鲜味后细磨装袋。",
      "精選日本國產原料，充分引出香氣和鮮味後細磨裝袋。",
      "엄선한 일본산 재료의 향과 감칠맛을 끌어낸 뒤 곱게 갈아 팩에 담습니다."
    ),
    comparison: text(
      "だしの種類によって向く料理が変わります。比較画面で味わいと用途を並べて選べます。",
      "Different stocks suit different dishes. Use the comparison view to line up flavor and use.",
      "不同高汤适合不同料理。可在比较页面并排查看风味与用途。",
      "不同高湯適合不同料理。可在比較頁面並排查看風味與用途。",
      "다시 종류에 따라 어울리는 요리가 다릅니다. 비교 화면에서 맛과 용도를 나란히 확인하세요."
    ),
    details: text(
      "原材料とアレルギー、栄養成分は下記のとおりです。気になる方はご確認ください。",
      "Ingredients, allergens, and nutrition are listed below for your reference.",
      "配料、过敏原和营养成分如下，供您参考。",
      "成分、過敏原和營養成分如下，供您參考。",
      "원재료와 알레르기, 영양 성분은 아래와 같습니다."
    )
  },

  seasoning: {
    features: text(
      "だしのうまみを土台にした調味料です。少量でも味が決まり、毎日の料理を支えます。",
      "A seasoning built on dashi umami. A small amount settles the flavor of everyday cooking.",
      "以高汤鲜味为基础的调味料。用量虽少，也能稳定每日料理的味道。",
      "以高湯鮮味為基礎的調味料。用量雖少，也能穩定每日料理的味道。",
      "다시의 감칠맛을 바탕으로 한 조미료입니다. 적은 양으로도 매일의 요리 맛이 잡힙니다."
    ),
    usage: text(
      "そのままかけても、煮物や和え物の味付けにも使えます。少しずつ加えて味を見てください。",
      "Use it straight, or to season simmered and dressed dishes. Add a little at a time and taste.",
      "可直接淋用，也可用于炖菜和凉拌调味。请少量逐次添加并尝味。",
      "可直接淋用，也可用於燉菜和涼拌調味。請少量逐次添加並嘗味。",
      "그대로 뿌려도 되고 조림이나 무침의 간에도 쓸 수 있습니다. 조금씩 넣어 맛을 보세요."
    ),
    materials: text(
      "だしの素材と醸造調味料を合わせ、角のない味わいになるよう配合を整えています。",
      "Dashi ingredients and brewed seasonings are balanced for a rounded, unaggressive flavor.",
      "将高汤食材与酿造调味料调配，使风味圆润不刺激。",
      "將高湯食材與釀造調味料調配，使風味圓潤不刺激。",
      "다시 재료와 양조 조미료를 배합해 모난 데 없는 맛으로 정리했습니다."
    ),
    comparison: text(
      "だしパックが「取る」ものなのに対し、こちらは「かける・混ぜる」ですぐ使えます。",
      "Where a dashi packet is brewed, this is poured or stirred in and ready immediately.",
      "高汤包需要熬煮，而本品可直接淋用或拌入，立即可用。",
      "高湯包需要熬煮，而本品可直接淋用或拌入，立即可用。",
      "다시 팩이 우려내는 것이라면, 이 제품은 뿌리거나 섞어 바로 쓸 수 있습니다."
    ),
    details: text(
      "原材料とアレルギー、栄養成分は下記のとおりです。気になる方はご確認ください。",
      "Ingredients, allergens, and nutrition are listed below for your reference.",
      "配料、过敏原和营养成分如下，供您参考。",
      "成分、過敏原和營養成分如下，供您參考。",
      "원재료와 알레르기, 영양 성분은 아래와 같습니다."
    )
  },

  gift: {
    features: text(
      "贈りものとして仕立てた詰合せです。挨拶や季節の贈答に、そのままお使いいただけます。",
      "An assortment prepared as a gift, ready to present for greetings or seasonal occasions.",
      "作为礼品准备的组合装，可直接用于问候或时令赠礼。",
      "作為禮品準備的組合裝，可直接用於問候或時令贈禮。",
      "선물용으로 꾸린 세트입니다. 인사나 계절 선물로 그대로 쓸 수 있습니다."
    ),
    usage: text(
      "包装と手提げをご用意しています。のし紙の有無や表書きは店頭でご相談ください。",
      "Wrapping and a carrier bag are available. Ask in store about ceremonial paper and inscriptions.",
      "备有包装和手提袋。是否需要熨斗纸及题字请在店内咨询。",
      "備有包裝和手提袋。是否需要熨斗紙及題字請在店內洽詢。",
      "포장과 손잡이 봉투를 준비했습니다. 노시 종이와 문구는 매장에서 상담해 주세요."
    ),
    materials: text(
      "定番のだしを中心に、季節の品を組み合わせています。内容は時期により変わります。",
      "Built around the standard dashi with seasonal items. Contents vary by season.",
      "以经典高汤为中心，搭配时令商品。内容随季节变动。",
      "以經典高湯為中心，搭配時令商品。內容隨季節變動。",
      "기본 다시를 중심으로 계절 품목을 조합했습니다. 구성은 시기에 따라 달라집니다."
    ),
    comparison: text(
      "単品より少しずつ多くの種類を試せます。相手の好みが分からないときにも向きます。",
      "You can try more varieties in smaller amounts than buying singly — good when unsure of tastes.",
      "比单品能少量尝试更多种类，也适合不清楚对方喜好时选择。",
      "比單品能少量嘗試更多種類，也適合不清楚對方喜好時選擇。",
      "단품보다 여러 종류를 조금씩 맛볼 수 있어, 상대의 취향을 모를 때도 좋습니다."
    ),
    details: text(
      "詰合せに含まれる各品の原材料とアレルギーは、個装の表示をご確認ください。",
      "For each item in the assortment, please check the allergen and ingredient labels on its own package.",
      "组合装内各商品的配料和过敏原，请查看各自独立包装上的标示。",
      "組合裝內各商品的成分和過敏原，請查看各自獨立包裝上的標示。",
      "세트에 포함된 각 품목의 원재료와 알레르기는 개별 포장의 표시를 확인해 주세요."
    )
  },

  other: {
    features: text(
      "だしのある暮らしを支える道具です。日々の使いやすさを考えて選んでいます。",
      "Tools that support a life with dashi, chosen for everyday ease of use.",
      "支持有高汤的生活的器具，以日常易用为标准挑选。",
      "支持有高湯的生活的器具，以日常易用為標準挑選。",
      "다시가 있는 생활을 돕는 도구입니다. 매일 쓰기 편한지를 기준으로 골랐습니다."
    ),
    usage: text(
      "ご使用前に軽くすすいでください。詳しい取り扱いは商品に同梱の説明をご覧ください。",
      "Rinse lightly before first use. See the enclosed instructions for detailed care.",
      "首次使用前请轻轻冲洗。详细使用方法请参阅商品内附说明。",
      "首次使用前請輕輕沖洗。詳細使用方法請參閱商品內附說明。",
      "사용 전 가볍게 헹궈 주세요. 자세한 취급법은 동봉된 설명을 확인하세요."
    ),
    materials: text(
      "扱いやすさと見た目の静けさを両立するよう、素材と仕上げを選んでいます。",
      "Materials and finish are chosen to balance ease of handling with a quiet appearance.",
      "在易用性与外观的沉静之间取得平衡，据此选择材质与工艺。",
      "在易用性與外觀的沉靜之間取得平衡，據此選擇材質與工藝。",
      "다루기 쉬움과 조용한 겉모습이 양립하도록 소재와 마감을 골랐습니다."
    ),
    comparison: text(
      "食品ではないため、味の比較ではなく用途と大きさでお選びください。",
      "This is not a food item, so choose by use and size rather than by flavor.",
      "本品并非食品，请依用途和尺寸而非风味来选择。",
      "本品並非食品，請依用途和尺寸而非風味來選擇。",
      "식품이 아니므로 맛이 아니라 용도와 크기로 골라 주세요."
    ),
    details: text(
      "食品ではないため、原材料とアレルギー、栄養成分の表示はありません。",
      "As this is not a food item, there are no ingredient, allergen, or nutrition listings.",
      "本品并非食品，故无配料、过敏原和营养成分标示。",
      "本品並非食品，故無成分、過敏原和營養成分標示。",
      "식품이 아니므로 원재료와 알레르기, 영양 성분 표시가 없습니다."
    )
  }
};

/**
 * カテゴリに応じた5セクションを組み立てる。
 * 写真は任意で `features` / `usage` にだけ差し込む（無ければ MediaPlaceholder が受ける）。
 */
export function sectionsFor(
  category: RealCategoryId,
  media?: {
    featuresImage?: string;
    featuresImageAlt?: LocalizedText;
    usageImage?: string;
    usageImageAlt?: LocalizedText;
  }
): ProductDetailSection[] {
  const body = bodies[category];
  return [
    {
      id: "features",
      title: titles.features,
      body: body.features,
      image: media?.featuresImage,
      imageAlt: media?.featuresImageAlt
    },
    {
      id: "usage",
      title: titles.usage,
      body: body.usage,
      image: media?.usageImage,
      imageAlt: media?.usageImageAlt
    },
    {id: "materials", title: titles.materials, body: body.materials},
    {id: "comparison", title: titles.comparison, body: body.comparison},
    {id: "details", title: titles.details, body: body.details}
  ];
}
