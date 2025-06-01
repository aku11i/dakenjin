import { InputPatternResolver } from "../character";

const createNInputPatternResolver = (): InputPatternResolver => {
  return (context) => {
    // 次の文字が「な行」の場合は "nn" のみ
    if (context.next && context.next.getPreview(context).startsWith("n")) {
      return ["nn"];
    }
    // 文章の最後の場合は "nn" のみ
    if (!context.next) {
      return ["nn"];
    }
    // それ以外は両方許可
    return ["n", "nn"];
  };
};

const createSmallTsuInputPatternResolver = (): InputPatternResolver => {
  return (context) => {
    const basePatterns = ["xtu", "ltu", "xtsu", "ltsu"];

    if (!context.next) {
      return basePatterns;
    }

    // 次の文字の入力パターンから促音可能な子音を抽出
    const nextPatterns = context.next.inputPatterns;
    const consonants = new Set<string>();

    for (const pattern of nextPatterns) {
      // k, g, s, z, t, d, h, b, p, m, y, r, w, f から始まるパターン
      // または ch, sh, ts などの2文字子音を抽出
      if (pattern.match(/^k/)) consonants.add("k");
      if (pattern.match(/^g/)) consonants.add("g");
      if (pattern.match(/^s/)) consonants.add("s");
      if (pattern.match(/^z/)) consonants.add("z");
      if (pattern.match(/^t/)) consonants.add("t");
      if (pattern.match(/^c/)) consonants.add("c");
      if (pattern.match(/^d/)) consonants.add("d");
      if (pattern.match(/^h/)) consonants.add("h");
      if (pattern.match(/^b/)) consonants.add("b");
      if (pattern.match(/^p/)) consonants.add("p");
      if (pattern.match(/^m/)) consonants.add("m");
      if (pattern.match(/^y/)) consonants.add("y");
      if (pattern.match(/^r/)) consonants.add("r");
      if (pattern.match(/^w/)) consonants.add("w");
      if (pattern.match(/^f/)) consonants.add("f");
      if (pattern.match(/^j/)) consonants.add("j");
    }

    // 促音パターンを先に、ベースパターンを後に配置
    return [...Array.from(consonants), ...basePatterns];
  };
};

export const HIRAGANA_CHARACTERS = [
  { label: "あ", inputPatterns: ["a"] },
  { label: "い", inputPatterns: ["i"] },
  { label: "う", inputPatterns: ["u"] },
  { label: "え", inputPatterns: ["e"] },
  { label: "お", inputPatterns: ["o"] },
  { label: "か", inputPatterns: ["ka"] },
  { label: "き", inputPatterns: ["ki"] },
  { label: "く", inputPatterns: ["ku"] },
  { label: "け", inputPatterns: ["ke"] },
  { label: "こ", inputPatterns: ["ko"] },
  { label: "が", inputPatterns: ["ga"] },
  { label: "ぎ", inputPatterns: ["gi"] },
  { label: "ぐ", inputPatterns: ["gu"] },
  { label: "げ", inputPatterns: ["ge"] },
  { label: "ご", inputPatterns: ["go"] },
  { label: "さ", inputPatterns: ["sa"] },
  { label: "し", inputPatterns: ["si", "shi"] },
  { label: "す", inputPatterns: ["su"] },
  { label: "せ", inputPatterns: ["se"] },
  { label: "そ", inputPatterns: ["so"] },
  { label: "ざ", inputPatterns: ["za"] },
  { label: "じ", inputPatterns: ["zi", "ji"] },
  { label: "ず", inputPatterns: ["zu"] },
  { label: "ぜ", inputPatterns: ["ze"] },
  { label: "ぞ", inputPatterns: ["zo"] },
  { label: "た", inputPatterns: ["ta"] },
  { label: "ち", inputPatterns: ["ti", "chi"] },
  { label: "つ", inputPatterns: ["tu", "tsu"] },
  { label: "て", inputPatterns: ["te"] },
  { label: "と", inputPatterns: ["to"] },
  { label: "だ", inputPatterns: ["da"] },
  { label: "ぢ", inputPatterns: ["di"] },
  { label: "づ", inputPatterns: ["du"] },
  { label: "で", inputPatterns: ["de"] },
  { label: "ど", inputPatterns: ["do"] },
  { label: "な", inputPatterns: ["na"] },
  { label: "に", inputPatterns: ["ni"] },
  { label: "ぬ", inputPatterns: ["nu"] },
  { label: "ね", inputPatterns: ["ne"] },
  { label: "の", inputPatterns: ["no"] },
  { label: "は", inputPatterns: ["ha"] },
  { label: "ひ", inputPatterns: ["hi"] },
  { label: "ふ", inputPatterns: ["hu", "fu"] },
  { label: "へ", inputPatterns: ["he"] },
  { label: "ほ", inputPatterns: ["ho"] },
  { label: "ば", inputPatterns: ["ba"] },
  { label: "び", inputPatterns: ["bi"] },
  { label: "ぶ", inputPatterns: ["bu"] },
  { label: "べ", inputPatterns: ["be"] },
  { label: "ぼ", inputPatterns: ["bo"] },
  { label: "ぱ", inputPatterns: ["pa"] },
  { label: "ぴ", inputPatterns: ["pi"] },
  { label: "ぷ", inputPatterns: ["pu"] },
  { label: "ぺ", inputPatterns: ["pe"] },
  { label: "ぽ", inputPatterns: ["po"] },
  { label: "ま", inputPatterns: ["ma"] },
  { label: "み", inputPatterns: ["mi"] },
  { label: "む", inputPatterns: ["mu"] },
  { label: "め", inputPatterns: ["me"] },
  { label: "も", inputPatterns: ["mo"] },
  { label: "や", inputPatterns: ["ya"] },
  { label: "ゆ", inputPatterns: ["yu"] },
  { label: "よ", inputPatterns: ["yo"] },
  { label: "ら", inputPatterns: ["ra"] },
  { label: "り", inputPatterns: ["ri"] },
  { label: "る", inputPatterns: ["ru"] },
  { label: "れ", inputPatterns: ["re"] },
  { label: "ろ", inputPatterns: ["ro"] },
  { label: "わ", inputPatterns: ["wa"] },
  { label: "ゐ", inputPatterns: ["wi"] },
  { label: "ゑ", inputPatterns: ["we"] },
  { label: "を", inputPatterns: ["wo"] },
  {
    label: "ん",
    inputPatterns: ["nn", "n"],
    inputPatternResolver: createNInputPatternResolver(),
  },
  { label: "ぁ", inputPatterns: ["xa", "la"] },
  { label: "ぃ", inputPatterns: ["xi", "li"] },
  { label: "ぅ", inputPatterns: ["xu", "lu"] },
  { label: "ぇ", inputPatterns: ["xe", "le"] },
  { label: "ぉ", inputPatterns: ["xo", "lo"] },
  { label: "ゃ", inputPatterns: ["xya", "lya"] },
  { label: "ゅ", inputPatterns: ["xyu", "lyu"] },
  { label: "ょ", inputPatterns: ["xyo", "lyo"] },
  {
    label: "っ",
    inputPatterns: ["xtu", "ltu", "xtsu", "ltsu"],
    inputPatternResolver: createSmallTsuInputPatternResolver(),
  },
  { label: "ふぁ", inputPatterns: ["fa"] },
  { label: "ふぃ", inputPatterns: ["fi"] },
  { label: "ふぇ", inputPatterns: ["fe"] },
  { label: "ふぉ", inputPatterns: ["fo"] },
  { label: "きゃ", inputPatterns: ["kya"] },
  { label: "きゅ", inputPatterns: ["kyu"] },
  { label: "きょ", inputPatterns: ["kyo"] },
  { label: "ぎゃ", inputPatterns: ["gya"] },
  { label: "ぎゅ", inputPatterns: ["gyu"] },
  { label: "ぎょ", inputPatterns: ["gyo"] },
  { label: "しゃ", inputPatterns: ["sya", "sha"] },
  { label: "しゅ", inputPatterns: ["syu", "shu"] },
  { label: "しょ", inputPatterns: ["syo", "sho"] },
  { label: "じゃ", inputPatterns: ["ja", "zya", "jya"] },
  { label: "じゅ", inputPatterns: ["ju", "zyu", "jyu"] },
  { label: "じょ", inputPatterns: ["jo", "zyo", "jyo"] },
  { label: "ちゃ", inputPatterns: ["tya", "cha"] },
  { label: "ちゅ", inputPatterns: ["tyu", "chu"] },
  { label: "ちょ", inputPatterns: ["tyo", "cho"] },
  { label: "てぃ", inputPatterns: ["thi", "texi", "teli"] },
  { label: "にゃ", inputPatterns: ["nya"] },
  { label: "にゅ", inputPatterns: ["nyu"] },
  { label: "にょ", inputPatterns: ["nyo"] },
  { label: "ひゃ", inputPatterns: ["hya"] },
  { label: "ひゅ", inputPatterns: ["hyu"] },
  { label: "ひょ", inputPatterns: ["hyo"] },
  { label: "びゃ", inputPatterns: ["bya"] },
  { label: "びゅ", inputPatterns: ["byu"] },
  { label: "びょ", inputPatterns: ["byo"] },
  { label: "ぴゃ", inputPatterns: ["pya"] },
  { label: "ぴゅ", inputPatterns: ["pyu"] },
  { label: "ぴょ", inputPatterns: ["pyo"] },
  { label: "みゃ", inputPatterns: ["mya"] },
  { label: "みゅ", inputPatterns: ["myu"] },
  { label: "みょ", inputPatterns: ["myo"] },
  { label: "りゃ", inputPatterns: ["rya"] },
  { label: "りゅ", inputPatterns: ["ryu"] },
  { label: "りょ", inputPatterns: ["ryo"] },
] as const;

export const KATAKANA_CHARACTERS = [
  { label: "ア", inputPatterns: ["a"] },
  { label: "イ", inputPatterns: ["i"] },
  { label: "ウ", inputPatterns: ["u"] },
  { label: "エ", inputPatterns: ["e"] },
  { label: "オ", inputPatterns: ["o"] },
  { label: "カ", inputPatterns: ["ka"] },
  { label: "キ", inputPatterns: ["ki"] },
  { label: "ク", inputPatterns: ["ku"] },
  { label: "ケ", inputPatterns: ["ke"] },
  { label: "コ", inputPatterns: ["ko"] },
  { label: "ガ", inputPatterns: ["ga"] },
  { label: "ギ", inputPatterns: ["gi"] },
  { label: "グ", inputPatterns: ["gu"] },
  { label: "ゲ", inputPatterns: ["ge"] },
  { label: "ゴ", inputPatterns: ["go"] },
  { label: "サ", inputPatterns: ["sa"] },
  { label: "シ", inputPatterns: ["si", "shi"] },
  { label: "ス", inputPatterns: ["su"] },
  { label: "セ", inputPatterns: ["se"] },
  { label: "ソ", inputPatterns: ["so"] },
  { label: "ザ", inputPatterns: ["za"] },
  { label: "ジ", inputPatterns: ["zi", "ji"] },
  { label: "ズ", inputPatterns: ["zu"] },
  { label: "ゼ", inputPatterns: ["ze"] },
  { label: "ゾ", inputPatterns: ["zo"] },
  { label: "タ", inputPatterns: ["ta"] },
  { label: "チ", inputPatterns: ["ti", "chi"] },
  { label: "ツ", inputPatterns: ["tu", "tsu"] },
  { label: "テ", inputPatterns: ["te"] },
  { label: "ト", inputPatterns: ["to"] },
  { label: "ダ", inputPatterns: ["da"] },
  { label: "ヂ", inputPatterns: ["di"] },
  { label: "ヅ", inputPatterns: ["du"] },
  { label: "デ", inputPatterns: ["de"] },
  { label: "ド", inputPatterns: ["do"] },
  { label: "ナ", inputPatterns: ["na"] },
  { label: "ニ", inputPatterns: ["ni"] },
  { label: "ヌ", inputPatterns: ["nu"] },
  { label: "ネ", inputPatterns: ["ne"] },
  { label: "ノ", inputPatterns: ["no"] },
  { label: "ハ", inputPatterns: ["ha"] },
  { label: "ヒ", inputPatterns: ["hi"] },
  { label: "フ", inputPatterns: ["hu", "fu"] },
  { label: "ヘ", inputPatterns: ["he"] },
  { label: "ホ", inputPatterns: ["ho"] },
  { label: "バ", inputPatterns: ["ba"] },
  { label: "ビ", inputPatterns: ["bi"] },
  { label: "ブ", inputPatterns: ["bu"] },
  { label: "ベ", inputPatterns: ["be"] },
  { label: "ボ", inputPatterns: ["bo"] },
  { label: "パ", inputPatterns: ["pa"] },
  { label: "ピ", inputPatterns: ["pi"] },
  { label: "プ", inputPatterns: ["pu"] },
  { label: "ペ", inputPatterns: ["pe"] },
  { label: "ポ", inputPatterns: ["po"] },
  { label: "マ", inputPatterns: ["ma"] },
  { label: "ミ", inputPatterns: ["mi"] },
  { label: "ム", inputPatterns: ["mu"] },
  { label: "メ", inputPatterns: ["me"] },
  { label: "モ", inputPatterns: ["mo"] },
  { label: "ヤ", inputPatterns: ["ya"] },
  { label: "ユ", inputPatterns: ["yu"] },
  { label: "ヨ", inputPatterns: ["yo"] },
  { label: "ラ", inputPatterns: ["ra"] },
  { label: "リ", inputPatterns: ["ri"] },
  { label: "ル", inputPatterns: ["ru"] },
  { label: "レ", inputPatterns: ["re"] },
  { label: "ロ", inputPatterns: ["ro"] },
  { label: "ワ", inputPatterns: ["wa"] },
  { label: "ヰ", inputPatterns: ["wi"] },
  { label: "ヱ", inputPatterns: ["we"] },
  { label: "ヲ", inputPatterns: ["wo"] },
  {
    label: "ン",
    inputPatterns: ["nn", "n"],
    inputPatternResolver: createNInputPatternResolver(),
  },
  { label: "ァ", inputPatterns: ["xa", "la"] },
  { label: "ィ", inputPatterns: ["xi", "li"] },
  { label: "ゥ", inputPatterns: ["xu", "lu"] },
  { label: "ェ", inputPatterns: ["xe", "le"] },
  { label: "ォ", inputPatterns: ["xo", "lo"] },
  { label: "ャ", inputPatterns: ["xya", "lya"] },
  { label: "ュ", inputPatterns: ["xyu", "lyu"] },
  { label: "ョ", inputPatterns: ["xyo", "lyo"] },
  {
    label: "ッ",
    inputPatterns: ["xtu", "ltu", "xtsu", "ltsu"],
    inputPatternResolver: createSmallTsuInputPatternResolver(),
  },
  { label: "ファ", inputPatterns: ["fa"] },
  { label: "フィ", inputPatterns: ["fi"] },
  { label: "フェ", inputPatterns: ["fe"] },
  { label: "フォ", inputPatterns: ["fo"] },
  { label: "キャ", inputPatterns: ["kya"] },
  { label: "キュ", inputPatterns: ["kyu"] },
  { label: "キョ", inputPatterns: ["kyo"] },
  { label: "ギャ", inputPatterns: ["gya"] },
  { label: "ギュ", inputPatterns: ["gyu"] },
  { label: "ギョ", inputPatterns: ["gyo"] },
  { label: "シャ", inputPatterns: ["sya", "sha"] },
  { label: "シュ", inputPatterns: ["syu", "shu"] },
  { label: "ショ", inputPatterns: ["syo", "sho"] },
  { label: "ジャ", inputPatterns: ["ja", "zya", "jya"] },
  { label: "ジュ", inputPatterns: ["ju", "zyu", "jyu"] },
  { label: "ジョ", inputPatterns: ["jo", "zyo", "jyo"] },
  { label: "チャ", inputPatterns: ["tya", "cha"] },
  { label: "チュ", inputPatterns: ["tyu", "chu"] },
  { label: "チョ", inputPatterns: ["tyo", "cho"] },
  { label: "ティ", inputPatterns: ["thi", "texi", "teli"] },
  { label: "ニャ", inputPatterns: ["nya"] },
  { label: "ニュ", inputPatterns: ["nyu"] },
  { label: "ニョ", inputPatterns: ["nyo"] },
  { label: "ヒャ", inputPatterns: ["hya"] },
  { label: "ヒュ", inputPatterns: ["hyu"] },
  { label: "ヒョ", inputPatterns: ["hyo"] },
  { label: "ビャ", inputPatterns: ["bya"] },
  { label: "ビュ", inputPatterns: ["byu"] },
  { label: "ビョ", inputPatterns: ["byo"] },
  { label: "ピャ", inputPatterns: ["pya"] },
  { label: "ピュ", inputPatterns: ["pyu"] },
  { label: "ピョ", inputPatterns: ["pyo"] },
  { label: "ミャ", inputPatterns: ["mya"] },
  { label: "ミュ", inputPatterns: ["myu"] },
  { label: "ミョ", inputPatterns: ["myo"] },
  { label: "リャ", inputPatterns: ["rya"] },
  { label: "リュ", inputPatterns: ["ryu"] },
  { label: "リョ", inputPatterns: ["ryo"] },
] as const;

export const PUNCTUATION_CHARACTERS = [
  { label: "、", inputPatterns: [","] },
  { label: "！", inputPatterns: ["!"] },
  { label: "？", inputPatterns: ["?"] },
  { label: "ー", inputPatterns: ["-"] },
  { label: "〜", inputPatterns: ["~"] },
] as const;

export const JAPANESE_CHARACTERS = [
  ...HIRAGANA_CHARACTERS,
  ...KATAKANA_CHARACTERS,
  ...PUNCTUATION_CHARACTERS,
].reverse();
