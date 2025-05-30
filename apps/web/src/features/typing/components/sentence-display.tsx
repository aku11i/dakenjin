import type { Sentence } from "@dakenjin/core";

type SentenceDisplayProps = {
  sentence: Sentence;
};

export function SentenceDisplay({ sentence }: SentenceDisplayProps) {
  return <div className="text-2xl">{sentence.label}</div>;
}
