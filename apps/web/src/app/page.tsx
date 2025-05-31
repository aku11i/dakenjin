"use client";

import {
  Sentence,
  createCharacterSetFactory,
  CharacterSet,
} from "@dakenjin/core";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const factory = createCharacterSetFactory();
  const sampleSentences = [
    new Sentence(
      new CharacterSet(factory.fromText("こんにちはせかい").characters),
      "こんにちは世界",
    ),
    new Sentence(
      new CharacterSet(factory.fromText("プログラミングはたのしい").characters),
      "プログラミングは楽しい",
    ),
    new Sentence(
      new CharacterSet(
        factory.fromText("タイピングれんしゅうをがんばろう").characters,
      ),
      "タイピング練習を頑張ろう",
    ),
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
