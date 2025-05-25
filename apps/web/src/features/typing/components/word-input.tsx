"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  const word = useWord({ label, ruby, inputPatterns });
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key.length !== 1) {
        return;
      }

      e.preventDefault();
      const isValid = word.input(e.key);

      if (isValid) {
        setError(false);

        if (word.isCompleted && onComplete) {
          onComplete();
        }
      } else {
        setError(true);
        setTimeout(() => setError(false), 300);
      }
    },
    [word, onComplete],
  );

  const firstSuggestion = word.suggestions[0] || "";

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 text-center">
        <div
          className={`mb-2 text-lg font-mono ${error ? "animate-pulse" : ""}`}
        >
          <span className="text-green-500">{word.inputs}</span>
          <span className={error ? "text-red-400" : "text-gray-400"}>
            {firstSuggestion}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{word.label}</h2>
        {word.ruby && <p className="text-sm text-gray-500">{word.ruby}</p>}
      </div>

      {!isFocused && !word.isCompleted && (
        <Button
          onPress={() => setIsFocused(true)}
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
        value={word.inputs}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={word.isCompleted}
        readOnly
        className="sr-only"
        aria-label="タイピング入力"
      />

      {word.isCompleted && (
        <div className="text-center text-green-600 font-semibold">完了！</div>
      )}
    </div>
  );
}
