import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSession } from "./use-session";
import { Sentence, Character, CharacterSet } from "@dakenjin/core";

describe("useSession", () => {
  const createTestSentences = () => {
    const characters = [
      new Character({ label: "あ", inputPatterns: ["a"] }),
      new Character({ label: "い", inputPatterns: ["i"] }),
      new Character({ label: "う", inputPatterns: ["u"] }),
    ];
    return [new Sentence(new CharacterSet(characters), "あいう")];
  };

  it("should initialize with correct initial state", () => {
    const sentences = createTestSentences();
    const { result } = renderHook(() => useSession({ sentences }));

    expect(result.current.session).toBeDefined();
    expect(result.current.currentSentence).toBe(sentences[0]);
    expect(result.current.currentCharacter).toBeDefined();
    expect(result.current.completedSentences).toHaveLength(0);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.inputs).toBe("");
    expect(result.current.progress).toBe(0);
  });

  it("should handle character input correctly", () => {
    const sentences = createTestSentences();
    const { result } = renderHook(() => useSession({ sentences }));

    let inputResult: boolean;
    act(() => {
      inputResult = result.current.input("a");
    });

    expect(inputResult!).toBe(true);
    expect(result.current.inputs).toBe("");
    expect(result.current.completedCharacters).toHaveLength(1);
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it("should handle incorrect input", () => {
    const sentences = createTestSentences();
    const { result } = renderHook(() => useSession({ sentences }));

    let inputResult: boolean;
    act(() => {
      inputResult = result.current.input("x");
    });

    expect(inputResult!).toBe(false);
    expect(result.current.inputs).toBe("");
    expect(result.current.completedCharacters).toHaveLength(0);
  });

  it("should complete session when all characters are input", () => {
    const sentences = createTestSentences();
    const { result } = renderHook(() => useSession({ sentences }));

    act(() => {
      result.current.input("a");
      result.current.input("i");
      result.current.input("u");
    });

    expect(result.current.isCompleted).toBe(true);
    expect(result.current.progress).toBe(100);
    expect(result.current.completedSentences).toHaveLength(1);
  });

  it.skip("should reset session", () => {
    const sentences = createTestSentences();
    const { result } = renderHook(() => useSession({ sentences }));

    act(() => {
      result.current.input("a");
      result.current.input("i");
    });

    const beforeReset = {
      completedCharacters: result.current.completedCharacters.length,
      currentCharacter: result.current.currentCharacter?.label,
      inputs: result.current.inputs,
    };

    expect(beforeReset.completedCharacters).toBe(2);
    expect(beforeReset.currentCharacter).toBe("う");
    expect(beforeReset.inputs).toBe("i");

    act(() => {
      result.current.reset();
    });

    // Resetした後、セッションの初期状態を確認
    expect(result.current.currentSentence).toBeDefined();
    expect(result.current.currentCharacter).toBeDefined();
    expect(result.current.currentCharacter?.label).toBe("あ");
    expect(result.current.completedCharacters).toHaveLength(0);
    expect(result.current.inputs).toBe("");
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it("should provide correct future characters and previews", () => {
    const sentences = createTestSentences();
    const { result } = renderHook(() => useSession({ sentences }));

    expect(result.current.futureCharacters).toHaveLength(2);
    expect(result.current.futureCharacterPreviews).toHaveLength(2);
    expect(result.current.currentCharacterPreview).toBe("a");

    act(() => {
      result.current.input("a");
    });

    expect(result.current.futureCharacters).toHaveLength(1);
    expect(result.current.futureCharacterPreviews).toHaveLength(1);
    expect(result.current.currentCharacterPreview).toBe("i");
  });
});
