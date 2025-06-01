import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTypingStats } from "./use-typing-stats";
import { Session, Sentence, Character } from "@dakenjin/core";

describe("useTypingStats", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createTestSession = () => {
    const characters = [
      new Character({ label: "あ", inputPatterns: ["a"] }),
      new Character({ label: "い", inputPatterns: ["i"] }),
      new Character({ label: "う", inputPatterns: ["u"] }),
    ];
    const sentence = new Sentence(characters, "あいう");
    return new Session([sentence]);
  };

  it("should return initial stats for new session", () => {
    const session = createTestSession();
    const { result } = renderHook(() => useTypingStats(session));

    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.totalKeystrokes).toBe(0);
    expect(result.current.successfulKeystrokes).toBe(0);
    expect(result.current.failedKeystrokes).toBe(0);
    expect(result.current.accuracy).toBe(0);
    expect(result.current.kps).toBe(0);
    expect(result.current.cpm).toBe(0);
    expect(result.current.isActive).toBe(false);
  });

  it("should calculate stats for active session", () => {
    const session = createTestSession();
    session.start();

    vi.advanceTimersByTime(5000);

    const { result } = renderHook(() => useTypingStats(session));

    expect(result.current.elapsedTime).toBe(5);
    expect(result.current.isActive).toBe(true);
  });

  it("should calculate keystroke stats correctly", () => {
    const session = createTestSession();
    session.start();
    const sentence = session.currentSentence!;
    void sentence.currentCharacter;

    const character = sentence.currentCharacter!;
    character.inputLog.recordKeyInput("x", false);
    character.inputLog.recordKeyInput("y", false);
    sentence.inputCurrentCharacter("a");

    const { result } = renderHook(() => useTypingStats(session));

    expect(result.current.totalKeystrokes).toBe(3);
    expect(result.current.successfulKeystrokes).toBe(1);
    expect(result.current.failedKeystrokes).toBe(2);
    expect(result.current.accuracy).toBe(33.3);
  });

  it("should memoize analyzer instance", () => {
    const session = createTestSession();
    const { result, rerender } = renderHook(() => useTypingStats(session));

    const stats1 = result.current;
    rerender();
    const stats2 = result.current;

    expect(stats1).toEqual(stats2);
  });
});
