import { useState, useCallback, useMemo } from "react";
import { Word, Sentence, Session } from "@dakenjin/core";

type UseSentenceData = {
  words: Array<{
    label: string;
    ruby?: string;
    inputPatterns: string[];
  }>;
};

type UseSessionParams = {
  sentences: UseSentenceData[];
};

export function useSession({ sentences }: UseSessionParams) {
  const [session] = useState(() => {
    const sentenceInstances = sentences.map((sentenceData) => {
      const wordInstances = sentenceData.words.map(
        (word) =>
          new Word({
            label: word.label,
            ruby: word.ruby,
            inputPatterns: word.inputPatterns,
          }),
      );
      return new Sentence(wordInstances);
    });
    return new Session(sentenceInstances);
  });

  const [inputs, setInputs] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const currentSentence = session.currentSentence;
  const currentWord = currentSentence?.currentWord || null;
  const completedSentences = session.completedSentences;
  const isCompleted = session.isCompleted();

  useMemo(() => {
    if (currentWord) {
      setSuggestions(currentWord.getSuggestions());
    }
  }, [currentWord]);

  const input = useCallback(
    (character: string): boolean => {
      if (!currentWord) {
        return false;
      }

      const isValid = currentWord.input(character);

      if (isValid) {
        setInputs(currentWord.inputs);
        setSuggestions(currentWord.getSuggestions());

        if (currentWord.isCompleted()) {
          setInputs("");
          const nextWord = currentSentence?.currentWord;
          if (nextWord) {
            setSuggestions(nextWord.getSuggestions());
          } else {
            const nextSentence = session.currentSentence;
            const nextSentenceWord = nextSentence?.currentWord;
            if (nextSentenceWord) {
              setSuggestions(nextSentenceWord.getSuggestions());
            }
          }
        }
      }

      return isValid;
    },
    [currentWord, currentSentence, session],
  );

  return {
    currentSentence,
    currentWord: currentWord
      ? {
          label: currentWord.label,
          ruby: currentWord.ruby,
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
