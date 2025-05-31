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
});
