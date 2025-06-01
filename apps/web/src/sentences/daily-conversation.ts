import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const dailyConversation = new SentenceCollection({
  name: "日常会話",
  description: "挨拶や日常的な会話で使われる基本表現",
  sentences: [
    factory.fromText("おはようございます", "おはようございます"),
    factory.fromText(
      "きょうもいちにちよろしくおねがいします",
      "今日も一日よろしくお願いします",
    ),
    factory.fromText(
      "こんにちはきょうはいいてんきですね",
      "こんにちは今日はいい天気ですね",
    ),
    factory.fromText(
      "おつかれさまですきょうもがんばりましたね",
      "お疲れ様です今日も頑張りましたね",
    ),
    factory.fromText(
      "こんばんはきょうはどうでしたか",
      "こんばんは今日はどうでしたか",
    ),
    factory.fromText(
      "きょうはいろいろとありがとうございました",
      "今日はいろいろとありがとうございました",
    ),
    factory.fromText(
      "ありがとうございますほんとうにかんしゃしています",
      "ありがとうございます本当に感謝しています",
    ),
    factory.fromText(
      "おかげさまでとてもたすかりました",
      "おかげさまでとても助かりました",
    ),
    factory.fromText(
      "すみませんちょっとしつもんがあります",
      "すみませんちょっと質問があります",
    ),
    factory.fromText(
      "おいそがしいところすみませんがおじかんをいただけますか",
      "お忙しいところすみませんがお時間をいただけますか",
    ),
    factory.fromText(
      "きょうもいちにちおつかれさまでした",
      "今日も一日お疲れ様でした",
    ),
    factory.fromText(
      "あしたもまたよろしくおねがいします",
      "明日もまたよろしくお願いします",
    ),
    factory.fromText("それではいってきます", "それでは行ってきます"),
    factory.fromText(
      "ゆうがたごろにはもどるよていです",
      "夕方頃には戻る予定です",
    ),
    factory.fromText(
      "ただいまもどりましたながいいちにちでした",
      "ただいま戻りました長い一日でした",
    ),
    factory.fromText(
      "きょうもいちにちおつかれさまでした",
      "今日も一日お疲れ様でした",
    ),
    factory.fromText(
      "おかえりなさいきょうはどうでしたか",
      "おかえりなさい今日はどうでしたか",
    ),
    factory.fromText(
      "ほんとうにおつかれさまでしたゆっくりやすんでください",
      "本当にお疲れ様でしたゆっくり休んでください",
    ),
    factory.fromText(
      "はじめましてよろしくおねがいします",
      "はじめましてよろしくお願いします",
    ),
    factory.fromText(
      "これからどうぞよろしくおねがいいたします",
      "これからどうぞよろしくお願いいたします",
    ),
  ],
});
