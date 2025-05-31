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

  describe("input logging", () => {
    it("should automatically mark input start when accessing currentCharacter", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);

      expect(characters[0].inputLog.startTime).toBeNull();

      const current = characterSet.currentCharacter;

      expect(current).toBe(characters[0]);
      expect(characters[0].inputLog.startTime).not.toBeNull();
    });

    it("should not overwrite start time if already set", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);

      characters[0].inputLog.markInputStart();
      const firstStartTime = characters[0].inputLog.startTime;

      characterSet.currentCharacter; // Access again

      expect(characters[0].inputLog.startTime).toBe(firstStartTime);
    });

    it("should mark start time for next character when current is completed", () => {
      const characters = createCharacters();
      const characterSet = new CharacterSet(characters);

      // Access first character (should mark start time)
      characterSet.currentCharacter;
      expect(characters[0].inputLog.startTime).not.toBeNull();
      expect(characters[1].inputLog.startTime).toBeNull();

      // Complete first character
      characters[0].input("a");

      // Access current character again (should be second character and mark its start time)
      const current = characterSet.currentCharacter;
      expect(current).toBe(characters[1]);
      expect(characters[1].inputLog.startTime).not.toBeNull();
    });
  });
});
