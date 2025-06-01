import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const dailyConversation = new SentenceCollection({
  name: "日常会話",
  description: "挨拶や日常的な会話で使われる基本表現",
  sentences: [
    factory.fromText("おはようございます"),
    factory.fromText("こんにちは"),
    factory.fromText("こんばんは"),
    factory.fromText("ありがとうございます"),
    factory.fromText("すみません"),
    factory.fromText("おつかれさまでした"),
    factory.fromText("いってきます"),
    factory.fromText("ただいま"),
    factory.fromText("おかえりなさい"),
    factory.fromText("よろしくおねがいします"),
  ],
});
