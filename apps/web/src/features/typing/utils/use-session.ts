import { useState, useCallback } from "react";
import { Sentence, Session } from "@dakenjin/core";

type UseSessionParams = {
  sentences: Sentence[];
};

export function useSession({ sentences }: UseSessionParams) {
  const [session] = useState(() => {
    return new Session(sentences);
  });

  const [inputs, setInputs] = useState("");

  const currentSentence = session.currentSentence;
  const currentCharacter = currentSentence?.currentCharacter || null;
  const completedSentences = session.completedSentences;
  const isCompleted = session.isCompleted();

  const input = useCallback(
    (character: string): boolean => {
      if (!currentCharacter || !currentSentence) {
        return false;
      }

      const isValid = currentSentence.inputCurrentCharacter(character);

      if (isValid) {
        setInputs(currentCharacter.inputs);

        if (currentCharacter.isCompleted()) {
          setInputs("");
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
    isCompleted,
    input,
  };
}
