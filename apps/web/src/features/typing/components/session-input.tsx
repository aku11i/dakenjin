"use client";

import { useState, useCallback } from "react";
import { Progress } from "../../../ui/components";
import { Sentence } from "@dakenjin/core";
import { useSession } from "../utils/use-session";
import { TypingDisplay } from "./typing-display";
import { SentenceDisplay } from "./sentence-display";
import { TypingInput } from "./typing-input";

type SessionInputProps = {
  sentences: Sentence[];
  onComplete?: () => void;
};

export function SessionInput({ sentences, onComplete }: SessionInputProps) {
  const {
    currentSentence,
    currentCharacter,
    completedSentences,
    sentences: allSentences,
    input,
    isCompleted,
    inputs,
    completedCharacters,
    futureCharacters,
    futureCharacterPreviews,
    currentCharacterPreview,
  } = useSession({ sentences });

  const [error, setError] = useState(false);

  const handleError = useCallback(() => {
    setError(true);
    setTimeout(() => setError(false), 300);
  }, []);

  const progress = (completedSentences.length / allSentences.length) * 100;
  const currentSentenceIndex = completedSentences.length;

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 bg-card rounded-3xl p-6 shadow-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground font-medium bg-secondary px-3 py-1 rounded-full">
            文章 {Math.min(currentSentenceIndex + 1, allSentences.length)} /{" "}
            {allSentences.length}
          </span>
          <span className="text-sm text-muted-foreground font-medium bg-accent px-3 py-1 rounded-full">
            {Math.round(progress)}% 完了
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {currentSentence && (
        <div className="mb-6 text-center">
          <div className="mb-6 space-y-4">
            <TypingDisplay
              completedCharacters={completedCharacters}
              currentCharacter={currentCharacter}
              futureCharacters={futureCharacters}
              futureCharacterPreviews={futureCharacterPreviews}
              currentInputs={inputs}
              currentCharacterPreview={currentCharacterPreview}
              error={error}
            />
            <SentenceDisplay sentence={currentSentence} />
          </div>
        </div>
      )}

      <TypingInput
        value={inputs}
        onInput={(character) => (currentCharacter ? input(character) : false)}
        onComplete={onComplete}
        isCompleted={isCompleted}
        onError={handleError}
      />

      {isCompleted && (
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 shadow-lg border border-primary/20">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            セッション完了！
          </h2>
          <p className="text-muted-foreground text-lg">
            全ての文章の入力が完了しました。お疲れ様でした！
          </p>
        </div>
      )}
    </div>
  );
}
