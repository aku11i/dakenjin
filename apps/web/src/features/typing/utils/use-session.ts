import { useState, useCallback } from "react";
import { Sentence, Session, Character } from "@dakenjin/core";

type UseSessionParams = {
  sentences: Sentence[];
};

type SessionSnapshot = {
  currentSentence: Sentence | null;
  currentCharacter: Character | null;
  completedSentences: Sentence[];
  isCompleted: boolean;
  completedCharacters: Character[];
  futureCharacters: Character[];
  futureCharacterPreviews: string[];
  currentCharacterPreview: string;
};

function createSessionSnapshot(session: Session): SessionSnapshot {
  const currentSentence = session.currentSentence;
  const currentCharacter = currentSentence?.currentCharacter || null;
  const currentCharacterSet = currentSentence?.characterSet;

  return {
    currentSentence,
    currentCharacter,
    completedSentences: session.completedSentences,
    isCompleted: session.isCompleted(),
    completedCharacters: currentCharacterSet?.completedCharacters || [],
    futureCharacters:
      currentCharacter && currentCharacterSet
        ? currentCharacterSet.incompletedCharacters.slice(1)
        : currentCharacterSet?.incompletedCharacters || [],
    futureCharacterPreviews: currentCharacterSet
      ? (currentCharacter
          ? currentCharacterSet.incompletedCharacters.slice(1)
          : currentCharacterSet.incompletedCharacters
        ).map((character) => {
          const actualIndex = currentCharacterSet.characters.findIndex(
            (c) => c === character,
          );
          return actualIndex !== -1
            ? currentCharacterSet.getCharacterPreview(actualIndex)
            : character.getPreview();
        })
      : [],
    currentCharacterPreview:
      currentCharacter && currentCharacterSet
        ? currentCharacterSet.getCharacterPreview(
            currentCharacterSet.characters.findIndex(
              (c) => c === currentCharacter,
            ),
          )
        : "",
  };
}

export function useSession({ sentences }: UseSessionParams) {
  const [session] = useState(() => {
    return new Session(sentences);
  });

  const [inputs, setInputs] = useState("");

  const [sessionSnapshot, setSessionSnapshot] = useState(() =>
    createSessionSnapshot(session),
  );

  const input = useCallback(
    (character: string): boolean => {
      const { currentSentence, currentCharacter } = sessionSnapshot;

      if (!currentCharacter || !currentSentence) {
        return false;
      }

      const isValid = currentSentence.inputCurrentCharacter(character);

      if (isValid) {
        const snapshot = createSessionSnapshot(session);
        setInputs(snapshot.currentCharacter?.inputs || "");
        setSessionSnapshot(snapshot);
      }

      return isValid;
    },
    [session, sessionSnapshot],
  );

  return {
    session,
    currentSentence: sessionSnapshot.currentSentence,
    currentCharacter: sessionSnapshot.currentCharacter,
    completedSentences: sessionSnapshot.completedSentences,
    sentences: session.sentences,
    inputs,
    isCompleted: sessionSnapshot.isCompleted,
    input,
    // sessionSnapshotから直接取得
    completedCharacters: sessionSnapshot.completedCharacters,
    futureCharacters: sessionSnapshot.futureCharacters,
    futureCharacterPreviews: sessionSnapshot.futureCharacterPreviews,
    currentCharacterPreview: sessionSnapshot.currentCharacterPreview,
  };
}
