import { useState, useCallback } from "react";
import { Word } from "@dakenjin/core";

type UseWordParams = {
  label: string;
  ruby?: string;
  inputPatterns: string[];
};

export function useWord({ label, ruby, inputPatterns }: UseWordParams) {
  const [word] = useState(() => new Word({ label, ruby, inputPatterns }));
  const [inputs, setInputs] = useState("");
  const [suggestions, setSuggestions] = useState(word.getSuggestions());
  const [isCompleted, setIsCompleted] = useState(false);

  const input = useCallback(
    (character: string): boolean => {
      const isValid = word.input(character);

      if (isValid) {
        setInputs(word.inputs);
        setSuggestions(word.getSuggestions());
        setIsCompleted(word.isCompleted());
      }

      return isValid;
    },
    [word],
  );

  return {
    label: word.label,
    ruby: word.ruby,
    inputs,
    suggestions,
    isCompleted,
    input,
  };
}
