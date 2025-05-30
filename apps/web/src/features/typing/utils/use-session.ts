import { useState, useCallback, useMemo } from "react";
import { Character, Sentence, Session } from "@dakenjin/core";

type UseSentenceData = {
  label: string;
  characters: Array<{
    label: string;
    inputPatterns: string[];
  }>;
};

type UseSessionParams = {
  sentences: UseSentenceData[];
};

export function useSession({ sentences }: UseSessionParams) {
  const [session] = useState(() => {
    const sentenceInstances = sentences.map((sentenceData) => {
      const characterInstances = sentenceData.characters.map(
        (character) =>
          new Character({
            label: character.label,
            inputPatterns: character.inputPatterns,
          }),
      );
      return new Sentence(characterInstances, sentenceData.label);
    });
    return new Session(sentenceInstances);
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
    currentCharacter: currentCharacter
      ? {
          label: currentCharacter.label,
        }
      : null,
    completedSentences,
    sentences: session.sentences,
    inputs,
    suggestions,
    isCompleted,
    input,
  };
}
