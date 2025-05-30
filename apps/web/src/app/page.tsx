"use client";

import { Sentence, fromJapaneseText } from "@dakenjin/core";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const sampleSentences = [
    new Sentence(fromJapaneseText("こんにちはせかい"), "こんにちは世界"),
    new Sentence(
      fromJapaneseText("プログラミングはたのしい"),
      "プログラミングは楽しい",
    ),
    new Sentence(
      fromJapaneseText("タイピングれんしゅうをがんばろう"),
      "タイピング練習を頑張ろう",
    ),
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SessionInput
        sentences={sampleSentences}
        onComplete={() => console.log("セッション完了！")}
      />
    </div>
  );
}
