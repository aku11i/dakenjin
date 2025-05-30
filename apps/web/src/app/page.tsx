"use client";

import { SessionInput } from "../features/typing/components/session-input";

export default function Home() {
  const sampleSentences = [
    {
      label: "こんにちは世界",
      characters: [
        { label: "こ", inputPatterns: ["ko"] },
        { label: "ん", inputPatterns: ["n", "nn"] },
        { label: "に", inputPatterns: ["ni"] },
        { label: "ち", inputPatterns: ["chi", "ti"] },
        { label: "は", inputPatterns: ["ha", "wa"] },
        { label: "せ", inputPatterns: ["se"] },
        { label: "か", inputPatterns: ["ka"] },
        { label: "い", inputPatterns: ["i"] },
      ],
    },
    {
      label: "プログラミングは楽しい",
      characters: [
        { label: "プ", inputPatterns: ["pu"] },
        { label: "ロ", inputPatterns: ["ro"] },
        { label: "グ", inputPatterns: ["gu"] },
        { label: "ラ", inputPatterns: ["ra"] },
        { label: "ミ", inputPatterns: ["mi"] },
        { label: "ン", inputPatterns: ["n", "nn"] },
        { label: "グ", inputPatterns: ["gu"] },
        { label: "は", inputPatterns: ["ha", "wa"] },
        { label: "た", inputPatterns: ["ta"] },
        { label: "の", inputPatterns: ["no"] },
        { label: "し", inputPatterns: ["shi", "si"] },
        { label: "い", inputPatterns: ["i"] },
      ],
    },
    {
      label: "タイピング練習を頑張ろう",
      characters: [
        { label: "タ", inputPatterns: ["ta"] },
        { label: "イ", inputPatterns: ["i"] },
        { label: "ピ", inputPatterns: ["pi"] },
        { label: "ン", inputPatterns: ["n", "nn"] },
        { label: "グ", inputPatterns: ["gu"] },
        { label: "れ", inputPatterns: ["re"] },
        { label: "ん", inputPatterns: ["n", "nn"] },
        { label: "しゅ", inputPatterns: ["shu", "syu"] },
        { label: "う", inputPatterns: ["u"] },
        { label: "を", inputPatterns: ["wo"] },
        { label: "が", inputPatterns: ["ga"] },
        { label: "ん", inputPatterns: ["n", "nn"] },
        { label: "ば", inputPatterns: ["ba"] },
        { label: "ろ", inputPatterns: ["ro"] },
        { label: "う", inputPatterns: ["u"] },
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
