import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const dailyConversation = new SentenceCollection({
  name: "日常会話",
  description: "挨拶や日常的な会話で使われる基本表現",
  sentences: [
    factory.fromText(
      "おはようございます。きょうもよろしくおねがいします",
      "おはようございます。今日もよろしくお願いします",
    ),
    factory.fromText(
      "こんにちは。おつかれさまです",
      "こんにちは。お疲れ様です",
    ),
    factory.fromText(
      "こんばんは。きょうはありがとうございました",
      "こんばんは。今日はありがとうございました",
    ),
    factory.fromText(
      "ありがとうございます。とてもたすかりました",
      "ありがとうございます。とても助かりました",
    ),
    factory.fromText(
      "すみません。ちょっとおじかんをいただけますか",
      "すみません。ちょっとお時間をいただけますか",
    ),
    factory.fromText(
      "おつかれさまでした。あしたもよろしくおねがいします",
      "お疲れ様でした。明日もよろしくお願いします",
    ),
    factory.fromText(
      "いってきます。ゆうがたにはもどります",
      "いってきます。夕方には戻ります",
    ),
    factory.fromText(
      "ただいまもどりました。おつかれさまです",
      "ただいま戻りました。お疲れ様です",
    ),
    factory.fromText(
      "おかえりなさい。おつかれさまでした",
      "おかえりなさい。お疲れ様でした",
    ),
    factory.fromText(
      "はじめまして。どうぞよろしくおねがいいたします",
      "はじめまして。どうぞよろしくお願いいたします",
    ),
  ],
});
