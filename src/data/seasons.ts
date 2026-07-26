/**
 * 本朝七十二候。茅乃舎のブランド表現に合わせ、店頭画面に「今日の候」を出す。
 *
 * - `kanji` は日本語・簡体・繁体で共通して読めるため 3 ロケールで使う
 * - `kana` は ja のみ
 * - `en` は en / ko で使う
 *
 * `start` は候の始まり（月・日）。実際の節気は年によって 1 日前後するが、
 * 表示上の情緒が目的なので固定日で扱う。
 */
export interface SeasonalTerm {
  /** [month, day] — 候の始まり */
  start: [number, number];
  kanji: string;
  kana: string;
  en: string;
}

const terms: SeasonalTerm[] = [
  // 立春
  {start: [2, 4], kanji: "東風解凍", kana: "はるかぜこおりをとく", en: "East wind melts the ice"},
  {start: [2, 9], kanji: "黄鶯睍睆", kana: "うぐいすなく", en: "Bush warblers start singing"},
  {start: [2, 14], kanji: "魚上氷", kana: "うおこおりをいずる", en: "Fish rise through the ice"},
  // 雨水
  {start: [2, 19], kanji: "土脉潤起", kana: "つちのしょううるおいおこる", en: "Rain moistens the soil"},
  {start: [2, 24], kanji: "霞始靆", kana: "かすみはじめてたなびく", en: "Mist begins to linger"},
  {start: [3, 1], kanji: "草木萌動", kana: "そうもくめばえいずる", en: "Grass and trees sprout"},
  // 啓蟄
  {start: [3, 6], kanji: "蟄虫啓戸", kana: "すごもりむしとをひらく", en: "Hibernating insects open their doors"},
  {start: [3, 11], kanji: "桃始笑", kana: "ももはじめてさく", en: "Peach blossoms begin to smile"},
  {start: [3, 16], kanji: "菜虫化蝶", kana: "なむしちょうとなる", en: "Caterpillars become butterflies"},
  // 春分
  {start: [3, 21], kanji: "雀始巣", kana: "すずめはじめてすくう", en: "Sparrows start to nest"},
  {start: [3, 26], kanji: "桜始開", kana: "さくらはじめてひらく", en: "Cherry blossoms begin to open"},
  {start: [3, 31], kanji: "雷乃発声", kana: "かみなりすなわちこえをはっす", en: "Distant thunder is heard"},
  // 清明
  {start: [4, 5], kanji: "玄鳥至", kana: "つばめきたる", en: "Swallows return"},
  {start: [4, 10], kanji: "鴻雁北", kana: "こうがんかえる", en: "Wild geese fly north"},
  {start: [4, 15], kanji: "虹始見", kana: "にじはじめてあらわる", en: "Rainbows first appear"},
  // 穀雨
  {start: [4, 20], kanji: "葭始生", kana: "あしはじめてしょうず", en: "Reeds begin to sprout"},
  {start: [4, 25], kanji: "霜止出苗", kana: "しもやみてなえいずる", en: "Frost ends and rice seedlings grow"},
  {start: [4, 30], kanji: "牡丹華", kana: "ぼたんはなさく", en: "Peonies bloom"},
  // 立夏
  {start: [5, 5], kanji: "蛙始鳴", kana: "かわずはじめてなく", en: "Frogs start singing"},
  {start: [5, 10], kanji: "蚯蚓出", kana: "みみずいずる", en: "Earthworms surface"},
  {start: [5, 15], kanji: "竹笋生", kana: "たけのこしょうず", en: "Bamboo shoots sprout"},
  // 小満
  {start: [5, 21], kanji: "蚕起食桑", kana: "かいこおきてくわをはむ", en: "Silkworms wake and feed on mulberry"},
  {start: [5, 26], kanji: "紅花栄", kana: "べにばなさかう", en: "Safflowers bloom in profusion"},
  {start: [5, 31], kanji: "麦秋至", kana: "むぎのときいたる", en: "Barley ripens to gold"},
  // 芒種
  {start: [6, 6], kanji: "螳螂生", kana: "かまきりしょうず", en: "Praying mantises hatch"},
  {start: [6, 11], kanji: "腐草為蛍", kana: "くされたるくさほたるとなる", en: "Fireflies rise from the grass"},
  {start: [6, 16], kanji: "梅子黄", kana: "うめのみきばむ", en: "Plums turn yellow"},
  // 夏至
  {start: [6, 21], kanji: "乃東枯", kana: "なつかれくさかるる", en: "Self-heal withers"},
  {start: [6, 26], kanji: "菖蒲華", kana: "あやめはなさく", en: "Irises bloom"},
  {start: [7, 1], kanji: "半夏生", kana: "はんげしょうず", en: "Crow-dipper sprouts"},
  // 小暑
  {start: [7, 7], kanji: "温風至", kana: "あつかぜいたる", en: "Warm winds arrive"},
  {start: [7, 12], kanji: "蓮始開", kana: "はすはじめてひらく", en: "Lotus flowers begin to open"},
  {start: [7, 17], kanji: "鷹乃学習", kana: "たかすなわちわざをならう", en: "Young hawks learn to fly"},
  // 大暑
  {start: [7, 22], kanji: "桐始結花", kana: "きりはじめてはなをむすぶ", en: "Paulownia trees set their seed"},
  {start: [7, 28], kanji: "土潤溽暑", kana: "つちうるおうてむしあつし", en: "The earth is damp and the air is humid"},
  {start: [8, 2], kanji: "大雨時行", kana: "たいうときどきふる", en: "Great rains fall at times"},
  // 立秋
  {start: [8, 7], kanji: "涼風至", kana: "すずかぜいたる", en: "Cool winds arrive"},
  {start: [8, 12], kanji: "寒蝉鳴", kana: "ひぐらしなく", en: "Evening cicadas sing"},
  {start: [8, 17], kanji: "蒙霧升降", kana: "ふかききりまとう", en: "Thick fog drifts in"},
  // 処暑
  {start: [8, 23], kanji: "綿柎開", kana: "わたのはなしべひらく", en: "Cotton bolls open"},
  {start: [8, 28], kanji: "天地始粛", kana: "てんちはじめてさむし", en: "Heat begins to subside"},
  {start: [9, 2], kanji: "禾乃登", kana: "こくものすなわちみのる", en: "Rice ripens in the fields"},
  // 白露
  {start: [9, 7], kanji: "草露白", kana: "くさのつゆしろし", en: "Dew glistens white on grass"},
  {start: [9, 12], kanji: "鶺鴒鳴", kana: "せきれいなく", en: "Wagtails sing"},
  {start: [9, 17], kanji: "玄鳥去", kana: "つばめさる", en: "Swallows depart"},
  // 秋分
  {start: [9, 23], kanji: "雷乃収声", kana: "かみなりすなわちこえをおさむ", en: "Thunder falls silent"},
  {start: [9, 28], kanji: "蟄虫坏戸", kana: "むしかくれてとをふさぐ", en: "Insects close up their burrows"},
  {start: [10, 3], kanji: "水始涸", kana: "みずはじめてかるる", en: "Rice paddies are drained"},
  // 寒露
  {start: [10, 8], kanji: "鴻雁来", kana: "こうがんきたる", en: "Wild geese return"},
  {start: [10, 13], kanji: "菊花開", kana: "きくのはなひらく", en: "Chrysanthemums bloom"},
  {start: [10, 18], kanji: "蟋蟀在戸", kana: "きりぎりすとにあり", en: "Crickets chirp by the door"},
  // 霜降
  {start: [10, 23], kanji: "霜始降", kana: "しもはじめてふる", en: "First frost falls"},
  {start: [10, 28], kanji: "霎時施", kana: "こさめときどきふる", en: "Light rains fall now and then"},
  {start: [11, 2], kanji: "楓蔦黄", kana: "もみじつたきばむ", en: "Maples and ivy turn yellow"},
  // 立冬
  {start: [11, 7], kanji: "山茶始開", kana: "つばきはじめてひらく", en: "Camellias begin to bloom"},
  {start: [11, 12], kanji: "地始凍", kana: "ちはじめてこおる", en: "The ground begins to freeze"},
  {start: [11, 17], kanji: "金盞香", kana: "きんせんかさく", en: "Daffodils bloom fragrant"},
  // 小雪
  {start: [11, 22], kanji: "虹蔵不見", kana: "にじかくれてみえず", en: "Rainbows hide away"},
  {start: [11, 27], kanji: "朔風払葉", kana: "きたかぜこのはをはらう", en: "North wind sweeps the leaves"},
  {start: [12, 2], kanji: "橘始黄", kana: "たちばなはじめてきばむ", en: "Mandarin trees turn yellow"},
  // 大雪
  {start: [12, 7], kanji: "閉塞成冬", kana: "そらさむくふゆとなる", en: "The sky closes and winter sets in"},
  {start: [12, 12], kanji: "熊蟄穴", kana: "くまあなにこもる", en: "Bears retreat to their dens"},
  {start: [12, 16], kanji: "鱖魚群", kana: "さけのうおむらがる", en: "Salmon gather and swim upstream"},
  // 冬至
  {start: [12, 21], kanji: "乃東生", kana: "なつかれくさしょうず", en: "Self-heal sprouts"},
  {start: [12, 26], kanji: "麋角解", kana: "さわしかのつのおつる", en: "Deer shed their antlers"},
  {start: [12, 31], kanji: "雪下出麦", kana: "ゆきわたりてむぎいづる", en: "Wheat sprouts under the snow"},
  // 小寒
  {start: [1, 5], kanji: "芹乃栄", kana: "せりすなわちさかう", en: "Parsley flourishes"},
  {start: [1, 10], kanji: "水泉動", kana: "しみずあたたかをふくむ", en: "Springs begin to stir"},
  {start: [1, 15], kanji: "雉始雊", kana: "きじはじめてなく", en: "Pheasants start to call"},
  // 大寒
  {start: [1, 20], kanji: "款冬華", kana: "ふきのはなさく", en: "Butterbur buds open"},
  {start: [1, 25], kanji: "水沢腹堅", kana: "さわみずこおりつめる", en: "Mountain streams freeze solid"},
  {start: [1, 30], kanji: "鶏始乳", kana: "にわとりはじめてとやにつく", en: "Hens begin to lay"}
];

/** カレンダー順（1/1 → 12/31）に並べ替えたもの。 */
const byCalendar = [...terms].sort(
  (a, b) => a.start[0] - b.start[0] || a.start[1] - b.start[1]
);

/**
 * 月日から該当する候を返す。1/1〜1/4 は最初の候（1/5）より前なので、
 * 年をまたいで最後の候（12/31 雪下出麦）に回り込む。
 */
export function getSeasonalTerm(month: number, day: number): SeasonalTerm {
  let found = byCalendar[byCalendar.length - 1];
  for (const term of byCalendar) {
    const [m, d] = term.start;
    if (m < month || (m === month && d <= day)) {
      found = term;
    } else {
      break;
    }
  }
  return found;
}

export const seasonalTerms = terms;
