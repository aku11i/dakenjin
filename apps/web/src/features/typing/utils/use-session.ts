import { useState, useCallback, useMemo } from "react";
import { Sentence, Session } from "@dakenjin/core";

type UseSessionParams = {
  sentences: Sentence[];
};

export function useSession({ sentences }: UseSessionParams) {
  const [session] = useState(() => {
    return new Session(sentences);
  });

  const [inputs, setInputs] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const currentSentence = session.currentSentence;
  const currentCharacter = currentSentence?.currentCharacter || null;
  const completedSentences = session.completedSentences;
  const isCompleted = session.isCompleted();

  useMemo(() => {
    if (currentCharacter) {
      setSuggestions(currentCharacter.getSuggestions());
    }
  }, [currentCharacter]);

  const input = useCallback(
    (character: string): boolean => {
      if (!currentCharacter) {
        return false;
      }

      const isValid = currentCharacter.input(character);

      if (isValid) {
        setInputs(currentCharacter.inputs);
        setSuggestions(currentCharacter.getSuggestions());

        if (currentCharacter.isCompleted()) {
          setInputs("");
          const nextCharacter = currentSentence?.currentCharacter;
          if (nextCharacter) {
            setSuggestions(nextCharacter.getSuggestions());
          } else {
            const nextSentence = session.currentSentence;
            const nextSentenceCharacter = nextSentence?.currentCharacter;
            if (nextSentenceCharacter) {
              setSuggestions(nextSentenceCharacter.getSuggestions());
            }
          }
        }
      }

      return isValid;
    },
    [currentCharacter, currentSentence, session],
  );

  return {
    currentSentence,
    currentCharacter,
    completedSentences,
    sentences: session.sentences,
    inputs,
    suggestions,
    isCompleted,
    input,
  };
}
