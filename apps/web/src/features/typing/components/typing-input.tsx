"use client";

import { useCallback, useState, useRef } from "react";
import { Button } from "@heroui/react";

type TypingInputProps = {
  value: string;
  onInput: (character: string) => boolean;
  onComplete?: () => void;
  isCompleted: boolean;
  onError?: () => void;
};

export function TypingInput({
  value,
  onInput,
  onComplete,
  isCompleted,
  onError,
}: TypingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (e.key.length !== 1) {
        return;
      }

      e.preventDefault();
      const isValid = onInput(e.key);

      if (isValid) {
        if (isCompleted && onComplete) {
          onComplete();
        }
      } else {
        onError?.();
      }
    },
    [onInput, isCompleted, onComplete, onError],
  );

  return (
    <>
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
        value={value}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isCompleted}
        readOnly
        className="sr-only"
        aria-label="タイピング入力"
      />
    </>
  );
}
