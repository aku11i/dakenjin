"use client";

import { useState, useCallback } from "react";
import type { Sentence, Session } from "@dakenjin/core";
import { Session as SessionClass } from "@dakenjin/core";
import {
  createSessionSnapshot,
  type SessionSnapshot,
} from "../utils/session-snapshot";

export type UseSessionParams = {
  sentences: Sentence[];
};

export type UseSessionReturn = {
  session: Session;
  currentSentence: Sentence | null;
  currentCharacter: SessionSnapshot["currentCharacter"];
  completedSentences: Sentence[];
  sentences: Sentence[];
  inputs: string;
  isCompleted: boolean;
  input: (character: string) => boolean;
  reset: () => void;
  completedCharacters: SessionSnapshot["completedCharacters"];
  futureCharacters: SessionSnapshot["futureCharacters"];
  futureCharacterPreviews: SessionSnapshot["futureCharacterPreviews"];
  currentCharacterPreview: SessionSnapshot["currentCharacterPreview"];
  progress: number;
};

export function useSession({ sentences }: UseSessionParams): UseSessionReturn {
  const [session, setSession] = useState(() => {
    return new SessionClass(sentences);
  });

  const [inputs, setInputs] = useState("");

  const [sessionSnapshot, setSessionSnapshot] = useState(() =>
    createSessionSnapshot(session),
  );

  const input = useCallback(
    (character: string): boolean => {
      if (
        !session.currentSentence ||
        !session.currentSentence.currentCharacter
      ) {
        return false;
      }

      const isValid = session.currentSentence.inputCurrentCharacter(character);

      if (isValid) {
        const snapshot = createSessionSnapshot(session);
        setSessionSnapshot(snapshot);
        setInputs(
          snapshot.currentCharacter?.inputs ||
            snapshot.completedCharacters[
              snapshot.completedCharacters.length - 1
            ]?.inputs ||
            "",
        );
      }

      return isValid;
    },
    [session],
  );

  const reset = useCallback(() => {
    const newSession = new SessionClass(sentences);
    setSession(newSession);
    setInputs("");
    setSessionSnapshot(createSessionSnapshot(newSession));
  }, [sentences]);

  const progress = (() => {
    const totalSentences = session.sentences.length;
    const completedSentences = session.completedSentences.length;
    const currentSentenceProgress = sessionSnapshot.currentSentence
      ? sessionSnapshot.completedCharacters.length /
        sessionSnapshot.currentSentence.characterSet.characters.length
      : 0;

    return (
      ((completedSentences + currentSentenceProgress) / totalSentences) * 100
    );
  })();

  return {
    session,
    currentSentence: sessionSnapshot.currentSentence,
    currentCharacter: sessionSnapshot.currentCharacter,
    completedSentences: sessionSnapshot.completedSentences,
    sentences: session.sentences,
    inputs,
    isCompleted: sessionSnapshot.isCompleted,
    input,
    reset,
    completedCharacters: sessionSnapshot.completedCharacters,
    futureCharacters: sessionSnapshot.futureCharacters,
    futureCharacterPreviews: sessionSnapshot.futureCharacterPreviews,
    currentCharacterPreview: sessionSnapshot.currentCharacterPreview,
    progress,
  };
}
