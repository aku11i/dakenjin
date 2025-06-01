import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const programmingTerms = new SentenceCollection({
  name: "プログラミング用語",
  description: "開発現場でよく使われるプログラミング関連の用語",
  sentences: [
    factory.fromText("プログラミング"),
    factory.fromText("アプリケーション"),
    factory.fromText("データベース"),
    factory.fromText("フレームワーク"),
    factory.fromText("デバッグ"),
    factory.fromText("リファクタリング"),
    factory.fromText("テストケース"),
    factory.fromText("バージョンかんり"),
    factory.fromText("アルゴリズム"),
    factory.fromText("インターフェース"),
  ],
});
