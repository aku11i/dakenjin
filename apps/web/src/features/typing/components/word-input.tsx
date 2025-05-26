"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@heroui/react";
import { useWord } from "../utils/use-word";

type WordInputProps = {
  label: string;
  ruby?: string;
  inputPatterns: string[];
  onComplete?: () => void;
};

export function WordInput({
  label,
  ruby,
  inputPatterns,
  onComplete,
}: WordInputProps) {
  const { input, isCompleted, inputs, suggestions, label: wordLabel, ruby: wordRuby } = useWord({ label, ruby, inputPatterns });
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key.length !== 1) {
        return;
      }

      e.preventDefault();
      const isValid = input(e.key);

      if (isValid) {
        setError(false);

        if (isCompleted && onComplete) {
          onComplete();
        }
      } else {
        setError(true);
        setTimeout(() => setError(false), 300);
      }
    },
    [input, isCompleted, onComplete],
  );

  const firstSuggestion = suggestions[0] || "";

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 text-center">
        <div
          className={`mb-2 text-lg font-mono ${error ? "animate-pulse" : ""}`}
        >
          <span className="text-green-500">{inputs}</span>
          <span className={error ? "text-red-400" : "text-gray-400"}>
            {firstSuggestion}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{wordLabel}</h2>
        {wordRuby && <p className="text-sm text-gray-500">{wordRuby}</p>}
      </div>

      {!isCompleted && !isFocused && (
        <Button
          onPress={() => inputRef.current?.focus()}
          color="primary"
          variant="flat"
          className="w-full"
        >
          タイピングを開始
        </Button>
      )}

      <input
        ref={inputRef}
        type="text"
        value={inputs}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isCompleted}
        readOnly
        className="sr-only"
        aria-label="タイピング入力"
      />

      {isCompleted && (
        <div className="text-center text-green-600 font-semibold">完了！</div>
      )}
    </div>
  );
}
