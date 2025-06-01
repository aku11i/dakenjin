import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const dailyConversation = new SentenceCollection({
  name: "日常会話",
  description: "挨拶や日常的な会話で使われる基本表現",
  sentences: [
    factory.fromText("おはようございます。今日もよろしくお願いします"),
    factory.fromText("こんにちは。お疲れ様です"),
    factory.fromText("こんばんは。今日はありがとうございました"),
    factory.fromText("ありがとうございます。とても助かりました"),
    factory.fromText("すみません。ちょっとお時間をいただけますか"),
    factory.fromText("お疲れ様でした。明日もよろしくお願いします"),
    factory.fromText("いってきます。夕方には戻ります"),
    factory.fromText("ただいま戻りました。お疲れ様です"),
    factory.fromText("おかえりなさい。お疲れ様でした"),
    factory.fromText("はじめまして。どうぞよろしくお願いいたします"),
  ],
});
