import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SessionAnalyzer } from "./session-analyzer";
import { Session, Sentence, Character, CharacterSet } from "./index";

describe("SessionAnalyzer", () => {
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

  it("should return initial values for new session", () => {
    const analyzer = new SessionAnalyzer(session);

    expect(analyzer.getDuration()).toBe(0);
    expect(analyzer.getTotalKeystrokes()).toBe(0);
    expect(analyzer.getSuccessfulKeystrokes()).toBe(0);
    expect(analyzer.getFailedKeystrokes()).toBe(0);
    expect(analyzer.calcAccuracy()).toBe(0);
    expect(analyzer.calcKps()).toBe(0);
    expect(analyzer.calcCpm()).toBe(0);
    expect(analyzer.isActive()).toBe(false);
  });

  it("should calculate values for active session", () => {
    session.start();

    vi.advanceTimersByTime(10000);

    const analyzer = new SessionAnalyzer(session);

    expect(analyzer.getDuration()).toBe(10);
    expect(analyzer.isActive()).toBe(true);
  });

  it("should calculate keystroke values correctly", () => {
    const currentSentence = session.currentSentence;
    const sentence = currentSentence!;
    void sentence.currentCharacter;

    const character = sentence.currentCharacter!;
    character.inputLog.recordKeyInput("x", false);
    character.inputLog.recordKeyInput("y", false);
    sentence.inputCurrentCharacter("a");

    const analyzer = new SessionAnalyzer(session);

    expect(analyzer.getTotalKeystrokes()).toBe(3);
    expect(analyzer.getSuccessfulKeystrokes()).toBe(1);
    expect(analyzer.getFailedKeystrokes()).toBe(2);
    expect(analyzer.calcAccuracy()).toBe(33.3);
  });

  it("should calculate KPS and CPM correctly", () => {
    session.start();
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

    const analyzer = new SessionAnalyzer(session);

    expect(analyzer.calcKps()).toBe(0.5);
    expect(analyzer.calcCpm()).toBe(30);
  });

  it("should handle completed session", () => {
    session.start();
    const currentSentence = session.currentSentence;
    const sentence = currentSentence!;
    void sentence.currentCharacter;
    sentence.inputCurrentCharacter("a");
    sentence.inputCurrentCharacter("i");
    sentence.inputCurrentCharacter("u");

    session.isCompleted();

    const analyzer = new SessionAnalyzer(session);

    expect(analyzer.isActive()).toBe(false);
    expect(analyzer.getTotalKeystrokes()).toBe(3);
    expect(analyzer.getSuccessfulKeystrokes()).toBe(3);
    expect(analyzer.calcAccuracy()).toBe(100);
  });

  describe("individual methods", () => {
    it("should calculate duration correctly", () => {
      const analyzer = new SessionAnalyzer(session);
      expect(analyzer.getDuration()).toBe(0);

      session.start();
      vi.advanceTimersByTime(5500);

      expect(analyzer.getDuration()).toBe(5.5);
    });

    it("should count keystrokes correctly", () => {
      const analyzer = new SessionAnalyzer(session);
      const sentence = session.currentSentence!;
      void sentence.currentCharacter;

      expect(analyzer.getTotalKeystrokes()).toBe(0);
      expect(analyzer.getSuccessfulKeystrokes()).toBe(0);
      expect(analyzer.getFailedKeystrokes()).toBe(0);

      const character = sentence.currentCharacter!;
      character.inputLog.recordKeyInput("x", false);
      character.inputLog.recordKeyInput("a", true);

      expect(analyzer.getTotalKeystrokes()).toBe(2);
      expect(analyzer.getSuccessfulKeystrokes()).toBe(1);
      expect(analyzer.getFailedKeystrokes()).toBe(1);
    });

    it("should calculate accuracy correctly", () => {
      const analyzer = new SessionAnalyzer(session);
      const sentence = session.currentSentence!;
      void sentence.currentCharacter;

      expect(analyzer.calcAccuracy()).toBe(0);

      const character = sentence.currentCharacter!;
      character.inputLog.recordKeyInput("a", true);
      character.inputLog.recordKeyInput("b", false);
      character.inputLog.recordKeyInput("c", true);

      expect(analyzer.calcAccuracy()).toBe(66.7);
    });

    it("should calculate KPS correctly", () => {
      const analyzer = new SessionAnalyzer(session);
      session.start();
      const sentence = session.currentSentence!;
      void sentence.currentCharacter;

      expect(analyzer.calcKps()).toBe(0);

      sentence.inputCurrentCharacter("a");
      sentence.inputCurrentCharacter("i");
      vi.advanceTimersByTime(2000);

      expect(analyzer.calcKps()).toBe(1);
    });

    it("should calculate CPM correctly", () => {
      const analyzer = new SessionAnalyzer(session);
      session.start();
      const sentence = session.currentSentence!;
      void sentence.currentCharacter;

      expect(analyzer.calcCpm()).toBe(0);

      sentence.inputCurrentCharacter("a");
      sentence.inputCurrentCharacter("i");
      sentence.inputCurrentCharacter("u");
      vi.advanceTimersByTime(6000);

      expect(analyzer.calcCpm()).toBe(30);
    });

    it("should check active status correctly", () => {
      const analyzer = new SessionAnalyzer(session);

      expect(analyzer.isActive()).toBe(false);

      session.start();
      expect(analyzer.isActive()).toBe(true);

      const sentence = session.currentSentence!;
      sentence.inputCurrentCharacter("a");
      sentence.inputCurrentCharacter("i");
      sentence.inputCurrentCharacter("u");
      session.isCompleted();

      expect(analyzer.isActive()).toBe(false);
    });
  });
});
