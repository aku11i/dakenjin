import { describe, it, expect } from "vitest";
import { Sentence } from "./sentence";
import { Character } from "./character";
import { CharacterSet } from "./character-set";

describe("Sentence", () => {
  describe("constructor", () => {
    it("should initialize with an array of Characters", () => {
      const characters = [
        new Character({ label: "a", inputPatterns: ["a"] }),
        new Character({ label: "b", inputPatterns: ["b"] }),
      ];
      const sentence = new Sentence(
        new CharacterSet(characters),
        "test sentence",
      );
      expect(sentence.characters).toEqual(characters);
    });
  });

  describe("currentCharacter", () => {
    it("should return the first non-completed character", () => {
      const completedCharacter = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      completedCharacter.input("a");

      const incompleteCharacter = new Character({
        label: "b",
        inputPatterns: ["b"],
      });

      const characters = [completedCharacter, incompleteCharacter];
      const sentence = new Sentence(
        new CharacterSet(characters),
        "test sentence",
      );
      expect(sentence.currentCharacter).toBe(incompleteCharacter);
    });

    it("should return null if all characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const sentence = new Sentence(
        new CharacterSet([character1, character2]),
        "test sentence",
      );
      expect(sentence.currentCharacter).toBeNull();
    });

    it("should return null if there are no characters", () => {
      const sentence = new Sentence(new CharacterSet([]), "empty sentence");
      expect(sentence.currentCharacter).toBeNull();
    });
  });

  describe("completedCharacters", () => {
    it("should return all completed characters", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });

      const sentence = new Sentence(
        new CharacterSet([character1, character2, character3]),
        "test sentence",
      );
      expect(sentence.completedCharacters).toEqual([character1, character2]);
    });

    it("should return empty array when no characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const character2 = new Character({ label: "b", inputPatterns: ["b"] });

      const sentence = new Sentence(
        new CharacterSet([character1, character2]),
        "test sentence",
      );
      expect(sentence.completedCharacters).toEqual([]);
    });
  });

  describe("incompletedCharacters", () => {
    it("should return all incomplete characters", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const character4 = new Character({ label: "d", inputPatterns: ["d"] });

      const sentence = new Sentence(
        new CharacterSet([character1, character2, character3, character4]),
        "test sentence",
      );
      expect(sentence.incompletedCharacters).toEqual([character3, character4]);
    });

    it("should return empty array when all characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const sentence = new Sentence(
        new CharacterSet([character1, character2]),
        "test sentence",
      );
      expect(sentence.incompletedCharacters).toEqual([]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const sentence = new Sentence(
        new CharacterSet([character1, character2]),
        "test sentence",
      );
      expect(sentence.isCompleted()).toBe(true);
    });

    it("should return false when at least one character is incomplete", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });

      const sentence = new Sentence(
        new CharacterSet([character1, character2]),
        "test sentence",
      );
      expect(sentence.isCompleted()).toBe(false);
    });

    it("should return true for an empty sentence", () => {
      const sentence = new Sentence(new CharacterSet([]), "empty sentence");
      expect(sentence.isCompleted()).toBe(true);
    });
  });

  describe("inputLog", () => {
    it("should initialize with null timestamps", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      const log = sentence.inputLog;
      expect(log.startTime).toBeNull();
      expect(log.endTime).toBeNull();
    });

    it("should automatically mark start time when accessing currentCharacter", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      expect(sentence.inputLog.startTime).toBeNull();

      const current = sentence.currentCharacter;

      expect(current).toBe(character);
      expect(sentence.inputLog.startTime).not.toBeNull();
      expect(sentence.inputLog.endTime).toBeNull();
    });

    it("should not overwrite start time if already set", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      sentence.currentCharacter; // Mark start time
      const firstStartTime = sentence.inputLog.startTime;

      sentence.currentCharacter; // Access again

      expect(sentence.inputLog.startTime).toBe(firstStartTime);
    });

    it("should automatically mark end time when sentence is completed", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      sentence.currentCharacter; // Mark start time
      expect(sentence.inputLog.endTime).toBeNull();

      const beforeTime = new Date();
      sentence.inputCurrentCharacter("a"); // Complete sentence
      const afterTime = new Date();

      const log = sentence.inputLog;
      expect(log.endTime).not.toBeNull();
      expect(new Date(log.endTime!)).toBeInstanceOf(Date);
      expect(new Date(log.endTime!).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(log.endTime!).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should not mark end time for failed input", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      sentence.currentCharacter; // Mark start time
      sentence.inputCurrentCharacter("b"); // Failed input

      expect(sentence.inputLog.endTime).toBeNull();
    });

    it("should handle multi-character sentence completion", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const sentence = new Sentence(
        new CharacterSet([character1, character2]),
        "test sentence",
      );

      sentence.currentCharacter; // Mark start time
      sentence.inputCurrentCharacter("a"); // Complete first character
      expect(sentence.inputLog.endTime).toBeNull(); // Sentence not complete yet

      const beforeTime = new Date();
      sentence.inputCurrentCharacter("b"); // Complete second character
      const afterTime = new Date();

      const log = sentence.inputLog;
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
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      sentence.currentCharacter; // Mark start time
      sentence.inputCurrentCharacter("a"); // Mark end time

      const log = sentence.inputLog;
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
      const sentence = new Sentence(
        new CharacterSet([character]),
        "test sentence",
      );

      const log1 = sentence.inputLog;
      const log2 = sentence.inputLog;

      expect(log1).toBe(log2); // Same object
    });
  });
});
