"use client";

import { Sentence, fromJapaneseText, CharacterSet } from "@dakenjin/core";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const sampleSentences = [
    new Sentence(
      new CharacterSet(fromJapaneseText("こんにちはせかい")),
      "こんにちは世界",
    ),
    new Sentence(
      new CharacterSet(fromJapaneseText("プログラミングはたのしい")),
      "プログラミングは楽しい",
    ),
    new Sentence(
      new CharacterSet(fromJapaneseText("タイピングれんしゅうをがんばろう")),
      "タイピング練習を頑張ろう",
    ),
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <SessionInput
        sentences={sampleSentences}
        onComplete={() => console.log("セッション完了！")}
      />
    </div>
  );
}
