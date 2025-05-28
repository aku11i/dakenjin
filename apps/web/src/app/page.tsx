"use client";

import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const sampleSentences = [
    {
      words: [
        {
          label: "こんにちは",
          ruby: "こんにちは",
          inputPatterns: ["konnichiha", "konnitiha"],
        },
        {
          label: "世界",
          ruby: "せかい",
          inputPatterns: ["sekai"],
        },
      ],
    },
    {
      words: [
        {
          label: "プログラミング",
          ruby: "ぷろぐらみんぐ",
          inputPatterns: ["programming", "puroguramingu"],
        },
        {
          label: "は",
          ruby: "は",
          inputPatterns: ["ha", "wa"],
        },
        {
          label: "楽しい",
          ruby: "たのしい",
          inputPatterns: ["tanoshii", "tanosii"],
        },
      ],
    },
    {
      words: [
        {
          label: "タイピング",
          ruby: "たいぴんぐ",
          inputPatterns: ["typing", "taipingu"],
        },
        {
          label: "練習",
          ruby: "れんしゅう",
          inputPatterns: ["renshuu", "rensyuu", "renshu"],
        },
        {
          label: "を",
          ruby: "を",
          inputPatterns: ["wo", "o"],
        },
        {
          label: "頑張ろう",
          ruby: "がんばろう",
          inputPatterns: ["ganbarou", "ganbaro"],
        },
      ],
    },
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
