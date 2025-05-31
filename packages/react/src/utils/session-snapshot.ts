import type { Session, Sentence, Character } from "@dakenjin/core";

export type SessionSnapshot = {
  currentSentence: Sentence | null;
  currentCharacter: Character | null;
  completedSentences: Sentence[];
  isCompleted: boolean;
  completedCharacters: Character[];
  futureCharacters: Character[];
  futureCharacterPreviews: string[];
  currentCharacterPreview: string;
};

export function createSessionSnapshot(session: Session): SessionSnapshot {
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
