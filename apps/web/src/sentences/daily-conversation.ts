import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const dailyConversation = new SentenceCollection({
  name: "日常会話",
  description: "挨拶や日常的な会話で使われる基本表現",
  sentences: [
    factory.fromText("おはようございます", "おはようございます"),
    factory.fromText(
      "きょうもよろしくおねがいします",
      "今日もよろしくお願いします",
    ),
    factory.fromText("こんにちは", "こんにちは"),
    factory.fromText("おつかれさまです", "お疲れ様です"),
    factory.fromText("こんばんは", "こんばんは"),
    factory.fromText(
      "きょうはありがとうございました",
      "今日はありがとうございました",
    ),
    factory.fromText("ありがとうございます", "ありがとうございます"),
    factory.fromText("とてもたすかりました", "とても助かりました"),
    factory.fromText("すみません", "すみません"),
    factory.fromText(
      "ちょっとおじかんをいただけますか",
      "ちょっとお時間をいただけますか",
    ),
    factory.fromText("おつかれさまでした", "お疲れ様でした"),
    factory.fromText(
      "あしたもよろしくおねがいします",
      "明日もよろしくお願いします",
    ),
    factory.fromText("いってきます", "いってきます"),
    factory.fromText("ゆうがたにはもどります", "夕方には戻ります"),
    factory.fromText("ただいまもどりました", "ただいま戻りました"),
    factory.fromText("おつかれさまです", "お疲れ様です"),
    factory.fromText("おかえりなさい", "おかえりなさい"),
    factory.fromText("おつかれさまでした", "お疲れ様でした"),
    factory.fromText("はじめまして", "はじめまして"),
    factory.fromText(
      "どうぞよろしくおねがいいたします",
      "どうぞよろしくお願いいたします",
    ),
  ],
});
