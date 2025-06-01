"use client";

import { SentenceCollection } from "@dakenjin/core";
import { sentences } from "../sentences";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const collections = Object.values(sentences);
  const randomSentences = SentenceCollection.pick(collections, 10);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center pt-20 p-4">
      <SessionInput
        sentences={randomSentences}
        onComplete={() => console.log("セッション完了！")}
      />
    </div>
  );
}
