import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const sample = new SentenceCollection({
  name: "基本練習",
  description: "プログラミングとタイピングの基本的な文章",
  sentences: [
    factory.fromText("こんにちはせかい"),
    factory.fromText("プログラミングはたのしい"),
    factory.fromText("タイピングれんしゅうをがんばろう"),
  ],
});
