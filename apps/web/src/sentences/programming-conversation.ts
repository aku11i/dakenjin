import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const programmingConversation = new SentenceCollection({
  name: "プログラミング会話",
  description: "開発現場でよく交わされるプログラミング関連の会話表現",
  sentences: [
    factory.fromText("このバグはどこから発生しているのでしょうか"),
    factory.fromText("データベースの設計を見直した方が良いと思います"),
    factory.fromText("フレームワークのバージョンアップを検討しましょう"),
    factory.fromText("テストケースを追加してください"),
    factory.fromText("コードレビューをお願いします"),
    factory.fromText("パフォーマンスの改善が必要です"),
    factory.fromText("APIの仕様書を確認してください"),
    factory.fromText("リファクタリングの時間を取りましょう"),
    factory.fromText("セキュリティの脆弱性が見つかりました"),
    factory.fromText("デプロイの準備はできていますか"),
  ],
});
