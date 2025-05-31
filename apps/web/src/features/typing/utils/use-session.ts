import { useState, useCallback, useMemo } from "react";
import { Sentence, Session, Character } from "@dakenjin/core";

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
    if (currentSentence) {
      setSuggestions(currentSentence.getCurrentCharacterSuggestions());
    }
  }, [currentSentence, currentCharacter]);

  const input = useCallback(
    (character: string): boolean => {
      if (!currentCharacter || !currentSentence) {
        return false;
      }

      const isValid = currentSentence.inputCurrentCharacter(character);

      if (isValid) {
        setInputs(currentCharacter.inputs);
        setSuggestions(currentSentence.getCurrentCharacterSuggestions());

        if (currentCharacter.isCompleted()) {
          setInputs("");
          const nextCharacter = currentSentence?.currentCharacter;
          if (nextCharacter) {
            setSuggestions(currentSentence.getCurrentCharacterSuggestions());
          } else {
            const nextSentence = session.currentSentence;
            if (nextSentence) {
              setSuggestions(nextSentence.getCurrentCharacterSuggestions());
            }
          }
        }
      }

      return isValid;
    },
    [currentCharacter, currentSentence, session],
  );

  const getFutureCharacterPreview = useCallback(
    (character: Character): string => {
      if (!currentSentence) return character.getPreview();

      const characterIndex = currentSentence.characters.findIndex(
        (c) => c === character,
      );
      if (characterIndex === -1) return character.getPreview();

      return currentSentence.getCharacterPreview(characterIndex);
    },
    [currentSentence],
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
    getFutureCharacterPreview,
  };
}
