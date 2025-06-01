"use client";

import { createSentenceFactory } from "@dakenjin/core";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const factory = createSentenceFactory();
  const sampleSentences = [
    factory.fromText("こんにちはせかい"),
    factory.fromText("プログラミングはたのしい"),
    factory.fromText("タイピングれんしゅうをがんばろう"),
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center pt-20 p-4">
      <SessionInput
        sentences={sampleSentences}
        onComplete={() => console.log("セッション完了！")}
      />
    </div>
  );
}
