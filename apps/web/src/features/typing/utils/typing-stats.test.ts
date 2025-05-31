import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calculateTypingStats, formatTime } from "./typing-stats";
import { Session, Sentence, Character, CharacterSet } from "@dakenjin/core";

describe("calculateTypingStats", () => {
  let session: Session;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));

    const characters = [
      new Character({ label: "あ", inputPatterns: ["a"] }),
      new Character({ label: "い", inputPatterns: ["i"] }),
      new Character({ label: "う", inputPatterns: ["u"] }),
    ];
    const sentence = new Sentence(new CharacterSet(characters), "あいう");
    session = new Session([sentence]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial stats for new session", () => {
    const stats = calculateTypingStats(session);

    expect(stats.elapsedTime).toBe(0);
    expect(stats.totalKeystrokes).toBe(0);
    expect(stats.successfulKeystrokes).toBe(0);
    expect(stats.failedKeystrokes).toBe(0);
    expect(stats.accuracy).toBe(0);
    expect(stats.kps).toBe(0);
    expect(stats.cpm).toBe(0);
    expect(stats.isActive).toBe(false);
  });

  it("should calculate stats for active session", () => {
    void session.currentSentence;

    vi.advanceTimersByTime(10000);

    const stats = calculateTypingStats(session);

    expect(stats.elapsedTime).toBe(10);
    expect(stats.isActive).toBe(true);
  });

  it("should calculate keystroke stats correctly", () => {
    const currentSentence = session.currentSentence;
    const sentence = currentSentence!;
    void sentence.currentCharacter;

    const character = sentence.currentCharacter!;
    character.inputLog.recordKeyInput("x", false);
    character.inputLog.recordKeyInput("y", false);
    sentence.inputCurrentCharacter("a");

    const stats = calculateTypingStats(session);

    expect(stats.totalKeystrokes).toBe(3);
    expect(stats.successfulKeystrokes).toBe(1);
    expect(stats.failedKeystrokes).toBe(2);
    expect(stats.accuracy).toBe(33.3);
  });

  it("should calculate KPS and CPM correctly", () => {
    const currentSentence = session.currentSentence;
    const sentence = currentSentence!;
    void sentence.currentCharacter;

    for (let i = 0; i < 5; i++) {
      const char = sentence.currentCharacter;
      if (char) {
        char.inputLog.recordKeyInput("a", true);
      }
    }

    vi.advanceTimersByTime(10000);

    const stats = calculateTypingStats(session);

    expect(stats.kps).toBe(0.5);
    expect(stats.cpm).toBe(30);
  });

  it("should handle completed session", () => {
    const currentSentence = session.currentSentence;
    const sentence = currentSentence!;
    void sentence.currentCharacter;
    sentence.inputCurrentCharacter("a");
    sentence.inputCurrentCharacter("i");
    sentence.inputCurrentCharacter("u");

    session.isCompleted();

    const stats = calculateTypingStats(session);

    expect(stats.isActive).toBe(false);
    expect(stats.totalKeystrokes).toBe(3);
    expect(stats.successfulKeystrokes).toBe(3);
    expect(stats.accuracy).toBe(100);
  });
});

describe("formatTime", () => {
  it("should format seconds correctly", () => {
    expect(formatTime(5.5)).toBe("5.5s");
    expect(formatTime(30)).toBe("30.0s");
    expect(formatTime(59.9)).toBe("59.9s");
  });

  it("should format minutes and seconds correctly", () => {
    expect(formatTime(60)).toBe("1:00.0");
    expect(formatTime(65.5)).toBe("1:05.5");
    expect(formatTime(125.3)).toBe("2:05.3");
  });

  it("should pad seconds correctly", () => {
    expect(formatTime(61)).toBe("1:01.0");
    expect(formatTime(69.5)).toBe("1:09.5");
  });
});
