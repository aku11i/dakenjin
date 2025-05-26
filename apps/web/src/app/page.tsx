"use client";

import { WordInput } from "../features/typing/components/word-input";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <WordInput
        label="プログラミング"
        ruby="ぷろぐらみんぐ"
        inputPatterns={["programming", "puroguramingu"]}
        onComplete={() => console.log("入力完了！")}
      />
    </div>
  );
}
