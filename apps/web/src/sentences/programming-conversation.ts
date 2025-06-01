import { SentenceCollection, createSentenceFactory } from "@dakenjin/core";

const factory = createSentenceFactory();

export const programmingConversation = new SentenceCollection({
  name: "プログラミング会話",
  description: "開発現場でよく交わされるプログラミング関連の会話表現",
  sentences: [
    factory.fromText(
      "このバグはどこからはっせいしているのでしょうか",
      "このバグはどこから発生しているのでしょうか",
    ),
    factory.fromText(
      "データベースのせっけいをみなおしたほうがよいとおもいます",
      "データベースの設計を見直した方が良いと思います",
    ),
    factory.fromText(
      "フレームワークのバージョンアップをけんとうしましょう",
      "フレームワークのバージョンアップを検討しましょう",
    ),
    factory.fromText(
      "テストケースをついかしてください",
      "テストケースを追加してください",
    ),
    factory.fromText(
      "コードレビューをおねがいします",
      "コードレビューをお願いします",
    ),
    factory.fromText(
      "パフォーマンスのかいぜんがひつようです",
      "パフォーマンスの改善が必要です",
    ),
    factory.fromText(
      "がいぶれんけいのしようをかくにんしてください",
      "外部連携の仕様を確認してください",
    ),
    factory.fromText(
      "リファクタリングのじかんをとりましょう",
      "リファクタリングの時間を取りましょう",
    ),
    factory.fromText(
      "セキュリティのぜいじゃくせいがみつかりました",
      "セキュリティの脆弱性が見つかりました",
    ),
    factory.fromText(
      "デプロイのじゅんびはできていますか",
      "デプロイの準備はできていますか",
    ),
  ],
});
