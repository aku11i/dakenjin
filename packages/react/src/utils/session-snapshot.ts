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

  return {
    currentSentence,
    currentCharacter,
    completedSentences: session.completedSentences,
    isCompleted: session.isCompleted(),
    completedCharacters: currentSentence?.completedCharacters || [],
    futureCharacters:
      currentCharacter && currentSentence
        ? currentSentence.incompletedCharacters.slice(1)
        : currentSentence?.incompletedCharacters || [],
    futureCharacterPreviews: currentSentence
      ? (currentCharacter
          ? currentSentence.incompletedCharacters.slice(1)
          : currentSentence.incompletedCharacters
        ).map((character) => {
          const actualIndex = currentSentence.characters.findIndex(
            (c) => c === character,
          );
          return actualIndex !== -1
            ? currentSentence.getCharacterPreview(actualIndex)
            : character.getPreview();
        })
      : [],
    currentCharacterPreview:
      currentCharacter && currentSentence
        ? currentSentence.getCharacterPreview(
            currentSentence.characters.findIndex((c) => c === currentCharacter),
          )
        : "",
  };
}
