import { describe, it, expect } from "vitest";
import { CharacterSet } from "./character-set";
import { Character } from "./character";

describe("CharacterSet", () => {
  const createCharacters = () => [
    new Character({ label: "あ", inputPatterns: ["a"] }),
    new Character({ label: "い", inputPatterns: ["i"] }),
    new Character({ label: "う", inputPatterns: ["u"] }),
  ];

  describe("constructor", () => {
    it("should create a CharacterSet with characters", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      expect(characterSet.characters).toEqual(characters);
    });
  });

  describe("currentCharacter", () => {
    it("should return the first incomplete character", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      expect(characterSet.currentCharacter).toBe(characters[0]);
    });

    it("should return null when all characters are completed", () => {
      const characters = createCharacters();
      characters.forEach((char) => char.input(char.inputPatterns[0]));
      const characterSet = new CharacterSet(characters);
      expect(characterSet.currentCharacter).toBeNull();
    });

    it("should return the next incomplete character after completing one", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      characters[0].input("a");
      expect(characterSet.currentCharacter).toBe(characters[1]);
    });
  });

  describe("completedCharacters", () => {
    it("should return empty array when no characters are completed", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      expect(characterSet.completedCharacters).toEqual([]);
    });

    it("should return completed characters", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      characters[0].input("a");
      characters[2].input("u");
      expect(characterSet.completedCharacters).toEqual([
        characters[0],
        characters[2],
      ]);
    });
  });

  describe("incompletedCharacters", () => {
    it("should return all characters when none are completed", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      expect(characterSet.incompletedCharacters).toEqual(characters);
    });

    it("should return incomplete characters", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      characters[0].input("a");
      characters[2].input("u");
      expect(characterSet.incompletedCharacters).toEqual([characters[1]]);
    });
  });

  describe("isCompleted", () => {
    it("should return false when not all characters are completed", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      expect(characterSet.isCompleted()).toBe(false);
    });

    it("should return true when all characters are completed", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);
      characters[0].input("a");
      characters[1].input("i");
      characters[2].input("u");
      expect(characterSet.isCompleted()).toBe(true);
    });
  });
});
