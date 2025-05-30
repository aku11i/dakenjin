"use client";

import { Sentence } from "@dakenjin/core";
import { fromText } from "@dakenjin/core/src/characters/japanese";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const sampleSentences = [
    new Sentence(fromText("こんにちはせかい"), "こんにちは世界"),
    new Sentence(
      fromText("プログラミングはたのしい"),
      "プログラミングは楽しい",
    ),
    new Sentence(
      fromText("タイピングれんしゅうをがんばろう"),
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
