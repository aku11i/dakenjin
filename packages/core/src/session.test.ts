import { describe, it, expect } from "vitest";
import { Session } from "./session";
import { Sentence } from "./sentence";
import { Character } from "./character";
import { CharacterSet } from "./character-set";

describe("Session", () => {
  describe("constructor", () => {
    it("should initialize with an array of Sentences", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);
      expect(session.sentences).toEqual([sentence]);
    });

    it("should throw error when initializing with empty array", () => {
      expect(() => new Session([])).toThrow(
        "Session must have at least one sentence",
      );
    });
  });

  describe("currentSentence", () => {
    it("should return the first incomplete sentence", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence = new Sentence(
        characterSet1,
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const incompleteSentence = new Sentence(
        characterSet2,
        "incomplete sentence",
      );

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.currentSentence).toBe(incompleteSentence);
    });

    it("should return null when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.currentSentence).toBeNull();
    });
  });

  describe("completedSentences", () => {
    it("should return all completed sentences", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence1 = new Sentence(
        characterSet1,
        "completed sentence 1",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const completedSentence2 = new Sentence(
        characterSet2,
        "completed sentence 2",
      );

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const characterSet3 = new CharacterSet([character3]);
      const incompleteSentence = new Sentence(
        characterSet3,
        "incomplete sentence",
      );

      const session = new Session([
        completedSentence1,
        completedSentence2,
        incompleteSentence,
      ]);
      expect(session.completedSentences).toEqual([
        completedSentence1,
        completedSentence2,
      ]);
    });

    it("should return empty array when no sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.completedSentences).toEqual([]);
    });
  });

  describe("incompletedSentences", () => {
    it("should return all incomplete sentences", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence = new Sentence(
        characterSet1,
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const incompleteSentence1 = new Sentence(
        characterSet2,
        "incomplete sentence 1",
      );

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const characterSet3 = new CharacterSet([character3]);
      const incompleteSentence2 = new Sentence(
        characterSet3,
        "incomplete sentence 2",
      );

      const session = new Session([
        completedSentence,
        incompleteSentence1,
        incompleteSentence2,
      ]);
      expect(session.incompletedSentences).toEqual([
        incompleteSentence1,
        incompleteSentence2,
      ]);
    });

    it("should return empty array when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.incompletedSentences).toEqual([]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.isCompleted()).toBe(true);
    });

    it("should return false when at least one sentence is incomplete", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence = new Sentence(
        characterSet1,
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const incompleteSentence = new Sentence(
        characterSet2,
        "incomplete sentence",
      );

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.isCompleted()).toBe(false);
    });
  });

  describe("inputLog", () => {
    it("should initialize with null timestamps", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);

      const log = session.inputLog;
      expect(log.startTime).toBeNull();
      expect(log.endTime).toBeNull();
    });

    it("should automatically mark start time when accessing currentSentence", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);

      expect(session.inputLog.startTime).toBeNull();

      const current = session.currentSentence;

      expect(current).toBe(sentence);
      expect(session.inputLog.startTime).not.toBeNull();
      expect(session.inputLog.endTime).toBeNull();
    });

    it("should not overwrite start time if already set", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);

      session.currentSentence; // Mark start time
      const firstStartTime = session.inputLog.startTime;

      session.currentSentence; // Access again

      expect(session.inputLog.startTime).toBe(firstStartTime);
    });

    it("should automatically mark end time when session is completed", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);

      session.currentSentence; // Mark start time
      expect(session.inputLog.endTime).toBeNull();

      // Complete the sentence
      sentence.currentCharacter; // Start sentence
      sentence.inputCurrentCharacter("a"); // Complete sentence

      const beforeTime = new Date();
      session.isCompleted(); // Check completion - should mark end time
      const afterTime = new Date();

      const log = session.inputLog;
      expect(log.endTime).not.toBeNull();
      expect(new Date(log.endTime!)).toBeInstanceOf(Date);
      expect(new Date(log.endTime!).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(log.endTime!).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should not mark end time when session is not completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);

      session.currentSentence; // Mark start time

      // Complete only first sentence
      sentence1.currentCharacter; // Start sentence1
      sentence1.inputCurrentCharacter("a"); // Complete sentence1

      session.isCompleted(); // Check completion - should not mark end time

      expect(session.inputLog.endTime).toBeNull();
    });

    it("should handle multi-sentence session completion", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);

      session.currentSentence; // Mark start time

      // Complete first sentence
      sentence1.currentCharacter; // Start sentence1
      sentence1.inputCurrentCharacter("a"); // Complete sentence1
      session.isCompleted(); // Check completion - should not mark end time yet
      expect(session.inputLog.endTime).toBeNull();

      // Complete second sentence
      sentence2.currentCharacter; // Start sentence2
      sentence2.inputCurrentCharacter("b"); // Complete sentence2

      const beforeTime = new Date();
      session.isCompleted(); // Check completion - should mark end time
      const afterTime = new Date();

      const log = session.inputLog;
      expect(log.endTime).not.toBeNull();
      expect(new Date(log.endTime!).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(log.endTime!).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should store time in ISO string format", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);

      session.currentSentence; // Mark start time

      // Complete the sentence
      sentence.currentCharacter; // Start sentence
      sentence.inputCurrentCharacter("a"); // Complete sentence
      session.isCompleted(); // Mark end time

      const log = session.inputLog;
      expect(typeof log.startTime).toBe("string");
      expect(typeof log.endTime).toBe("string");
      expect(log.startTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
      expect(log.endTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });

    it("should return the same log instance", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
      const session = new Session([sentence]);

      const log1 = session.inputLog;
      const log2 = session.inputLog;

      expect(log1).toBe(log2); // Same object
    });
  });
});
