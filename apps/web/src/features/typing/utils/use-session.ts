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

  // セッション状態のスナップショットを管理
  const [sessionSnapshot, setSessionSnapshot] = useState(() => {
    const currentSentence = session.currentSentence;
    const currentCharacter = currentSentence?.currentCharacter || null;
    const currentCharacterSet = currentSentence?.characterSet;

    return {
      currentSentence,
      currentCharacter,
      completedSentences: session.completedSentences,
      isCompleted: session.isCompleted(),
      // CharacterSet関連の情報も含める
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
      currentCharacterPreview: currentCharacter && currentCharacterSet
        ? currentCharacterSet.getCharacterPreview(
            currentCharacterSet.characters.findIndex(c => c === currentCharacter)
          )
        : "",
      suggestions: currentCharacterSet?.getCurrentCharacterSuggestions() || [],
    };
  });

  const input = useCallback(
    (character: string): boolean => {
      const { currentSentence, currentCharacter } = sessionSnapshot;

      if (!currentCharacter || !currentSentence) {
        return false;
      }

      const isValid = currentSentence.inputCurrentCharacter(character);

      if (isValid) {
        setInputs(currentCharacter.inputs);

        if (currentCharacter.isCompleted()) {
          setInputs("");
        }

        // 状態のスナップショットを更新してReactに変更を通知
        const newCurrentSentence = session.currentSentence;
        const newCurrentCharacter =
          newCurrentSentence?.currentCharacter || null;
        const newCurrentCharacterSet = newCurrentSentence?.characterSet;

        setSessionSnapshot({
          currentSentence: newCurrentSentence,
          currentCharacter: newCurrentCharacter,
          completedSentences: session.completedSentences,
          isCompleted: session.isCompleted(),
          // CharacterSet関連の情報も更新
          completedCharacters:
            newCurrentCharacterSet?.completedCharacters || [],
          futureCharacters:
            newCurrentCharacter && newCurrentCharacterSet
              ? newCurrentCharacterSet.incompletedCharacters.slice(1)
              : newCurrentCharacterSet?.incompletedCharacters || [],
          futureCharacterPreviews: newCurrentCharacterSet
            ? (newCurrentCharacter
                ? newCurrentCharacterSet.incompletedCharacters.slice(1)
                : newCurrentCharacterSet.incompletedCharacters
              ).map((character) => {
                const actualIndex = newCurrentCharacterSet.characters.findIndex(
                  (c) => c === character,
                );
                return actualIndex !== -1
                  ? newCurrentCharacterSet.getCharacterPreview(actualIndex)
                  : character.getPreview();
              })
            : [],
          currentCharacterPreview: newCurrentCharacter && newCurrentCharacterSet
            ? newCurrentCharacterSet.getCharacterPreview(
                newCurrentCharacterSet.characters.findIndex(c => c === newCurrentCharacter)
              )
            : "",
          suggestions:
            newCurrentCharacterSet?.getCurrentCharacterSuggestions() || [],
        });
      }

      return isValid;
    },
    [session, sessionSnapshot],
  );

  return {
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
    suggestions: sessionSnapshot.suggestions,
  };
}
