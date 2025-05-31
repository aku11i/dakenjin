import { describe, it, expect } from "vitest";
import { Session, Sentence, CharacterSet } from "../index";
import { fromJapaneseText } from "../characters/japanese";

describe("Session E2E Tests - Complete Application Flow", () => {
  it("should complete all three sample sentences from page.tsx", () => {
    // Create the exact same sentences as defined in page.tsx
    const sampleSentences = [
      new Sentence(
        new CharacterSet(fromJapaneseText("こんにちはせかい")),
        "こんにちは世界",
      ),
      new Sentence(
        new CharacterSet(fromJapaneseText("プログラミングはたのしい")),
        "プログラミングは楽しい",
      ),
      new Sentence(
        new CharacterSet(fromJapaneseText("タイピングれんしゅうをがんばろう")),
        "タイピング練習を頑張ろう",
      ),
    ];

    const session = new Session(sampleSentences);

    // Verify initial state
    expect(session.isCompleted()).toBe(false);
    expect(session.completedSentences).toHaveLength(0);
    expect(session.currentSentence).toBe(sampleSentences[0]);

    // ========== Sentence 1: "こんにちはせかい" ==========
    let currentSentence = session.currentSentence!;
    expect(currentSentence.label).toBe("こんにちは世界");

    // こ
    expect(currentSentence.inputCurrentCharacter("k")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);

    // ん (context-aware: followed by に, so requires nn)
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);

    // に
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // ち
    expect(currentSentence.inputCurrentCharacter("c")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // は
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // せ
    expect(currentSentence.inputCurrentCharacter("s")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("e")).toBe(true);

    // か
    expect(currentSentence.inputCurrentCharacter("k")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // い
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // Verify first sentence is completed
    expect(currentSentence.isCompleted()).toBe(true);
    expect(session.completedSentences).toHaveLength(1);
    expect(session.currentSentence).toBe(sampleSentences[1]);

    // ========== Sentence 2: "プログラミングはたのしい" ==========
    currentSentence = session.currentSentence!;
    expect(currentSentence.label).toBe("プログラミングは楽しい");

    // プ
    expect(currentSentence.inputCurrentCharacter("p")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // ロ
    expect(currentSentence.inputCurrentCharacter("r")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);

    // グ
    expect(currentSentence.inputCurrentCharacter("g")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // ラ
    expect(currentSentence.inputCurrentCharacter("r")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // ミ
    expect(currentSentence.inputCurrentCharacter("m")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // ン (context-aware: followed by グ, so allows single n)
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);

    // グ
    expect(currentSentence.inputCurrentCharacter("g")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // は
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // た
    expect(currentSentence.inputCurrentCharacter("t")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // の
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);

    // し
    expect(currentSentence.inputCurrentCharacter("s")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // い
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // Verify second sentence is completed
    expect(currentSentence.isCompleted()).toBe(true);
    expect(session.completedSentences).toHaveLength(2);
    expect(session.currentSentence).toBe(sampleSentences[2]);

    // ========== Sentence 3: "タイピングれんしゅうをがんばろう" ==========
    currentSentence = session.currentSentence!;
    expect(currentSentence.label).toBe("タイピング練習を頑張ろう");

    // タ
    expect(currentSentence.inputCurrentCharacter("t")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // イ
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // ピ
    expect(currentSentence.inputCurrentCharacter("p")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);

    // ン (context-aware: followed by グ, so allows single n)
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);

    // グ
    expect(currentSentence.inputCurrentCharacter("g")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // れ
    expect(currentSentence.inputCurrentCharacter("r")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("e")).toBe(true);

    // ん (context-aware: followed by し, so allows single n)
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);

    // しゅ (two characters as one)
    expect(currentSentence.inputCurrentCharacter("s")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // う
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // を
    expect(currentSentence.inputCurrentCharacter("w")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);

    // が
    expect(currentSentence.inputCurrentCharacter("g")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // ん (context-aware: followed by ば, so allows single n)
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);

    // ば
    expect(currentSentence.inputCurrentCharacter("b")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // ろ
    expect(currentSentence.inputCurrentCharacter("r")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);

    // う
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    // Verify third sentence is completed
    expect(currentSentence.isCompleted()).toBe(true);
    expect(session.completedSentences).toHaveLength(3);
    expect(session.currentSentence).toBe(null);

    // Verify entire session is completed
    expect(session.isCompleted()).toBe(true);
  });

  it("should handle errors and recovery during the complete session", () => {
    const sampleSentences = [
      new Sentence(
        new CharacterSet(fromJapaneseText("こんにちは")),
        "こんにちは",
      ),
      new Sentence(
        new CharacterSet(fromJapaneseText("ありがとう")),
        "ありがとう",
      ),
    ];

    const session = new Session(sampleSentences);
    let currentSentence = session.currentSentence!;

    // Type first sentence with some errors
    expect(currentSentence.inputCurrentCharacter("k")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);

    // Error: try wrong character
    expect(currentSentence.inputCurrentCharacter("x")).toBe(false);
    expect(currentSentence.currentCharacter?.inputs).toBe("");

    // Correct input
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("n")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("c")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("h")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);

    // First sentence completed, move to second
    expect(session.completedSentences).toHaveLength(1);
    currentSentence = session.currentSentence!;

    // Complete second sentence
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("r")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("i")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("g")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("a")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("t")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("o")).toBe(true);
    expect(currentSentence.inputCurrentCharacter("u")).toBe(true);

    expect(session.isCompleted()).toBe(true);
  });
});
