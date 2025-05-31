"use client";

import { useState, useCallback } from "react";
import { Progress, Button } from "../../../ui/components";
import { Sentence } from "@dakenjin/core";
import { useSession } from "@dakenjin/react";
import { TypingDisplay } from "./typing-display";
import { SentenceDisplay } from "./sentence-display";
import { TypingInput } from "./typing-input";
import { TypingStatsDisplay } from "./typing-stats";

type SessionInputProps = {
  sentences: Sentence[];
  onComplete?: () => void;
};

export function SessionInput({ sentences, onComplete }: SessionInputProps) {
  const {
    session,
    currentSentence,
    currentCharacter,
    completedSentences,
    sentences: allSentences,
    input,
    isCompleted,
    start,
    inputs,
    completedCharacters,
    futureCharacters,
    futureCharacterPreviews,
    currentCharacterPreview,
    progress,
  } = useSession({ sentences });

  const [error, setError] = useState(false);

  const handleError = useCallback(() => {
    setError(true);
    setTimeout(() => setError(false), 300);
  }, []);

  const currentSentenceIndex = completedSentences.length;

  if (!session.isStarted) {
    return (
      <div className="w-full max-w-3xl">
        <div className="text-center bg-card rounded-3xl p-8 shadow-lg border border-border space-y-6">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-foreground">
            タイピング練習を開始しましょう
          </h2>
          <p className="text-muted-foreground text-lg">
            {allSentences.length}つの文章でタイピング練習を行います
          </p>

          <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              練習する文章
            </h3>
            {allSentences.map((sentence, index) => (
              <div
                key={index}
                className="text-left p-4 bg-background rounded-xl border border-border"
              >
                <div className="text-sm text-muted-foreground mb-2">
                  文章 {index + 1}
                </div>
                <div className="text-lg">{sentence.label}</div>
              </div>
            ))}
          </div>

          <Button onClick={start} size="lg" className="mt-6">
            タイピングを開始
          </Button>
        </div>
      </div>
    );
  }

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
        autoFocus={true}
      />

      {isCompleted && (
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 shadow-lg border border-primary/20 space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            セッション完了！
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            全ての文章の入力が完了しました。お疲れ様でした！
          </p>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">結果</h3>
            <TypingStatsDisplay session={session} />
          </div>
        </div>
      )}
    </div>
  );
}
