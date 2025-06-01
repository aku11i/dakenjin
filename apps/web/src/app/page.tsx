"use client";

import { sentences } from "../sentences";
import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center pt-20 p-4">
      <SessionInput
        sentences={sentences.sample.sentences}
        onComplete={() => console.log("セッション完了！")}
      />
    </div>
  );
}
