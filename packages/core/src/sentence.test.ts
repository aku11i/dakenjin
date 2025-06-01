import { describe, it, expect } from "vitest";
import { Sentence } from "./sentence";
import { Character } from "./character";

describe("Sentence", () => {
  const createCharacters = () => [
    new Character({ label: "あ", inputPatterns: ["a"] }),
    new Character({ label: "い", inputPatterns: ["i"] }),
    new Character({ label: "う", inputPatterns: ["u"] }),
  ];

  describe("constructor", () => {
    it("should initialize with an array of Characters", () => {
      const characters = [
        new Character({ label: "a", inputPatterns: ["a"] }),
        new Character({ label: "b", inputPatterns: ["b"] }),
      ];
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.characters).toEqual(characters);
    });

    it("should create a Sentence with characters", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
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
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.currentCharacter).toBe(incompleteCharacter);
    });

    it("should return null if all characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const sentence = new Sentence([character1, character2], "test sentence");
      expect(sentence.currentCharacter).toBeNull();
    });

    it("should return null if there are no characters", () => {
      const sentence = new Sentence([], "empty sentence");
      expect(sentence.currentCharacter).toBeNull();
    });

    it("should return the first incomplete character", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.currentCharacter).toBe(characters[0]);
    });

    it("should return null when all characters are completed", () => {
      const characters = createCharacters();
      characters.forEach((char) => char.input(char.inputPatterns[0]));
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.currentCharacter).toBeNull();
    });

    it("should return the next incomplete character after completing one", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      characters[0].input("a");
      expect(sentence.currentCharacter).toBe(characters[1]);
    });
  });

  describe("currentCharacterIndex", () => {
    it("should return the index of the first incomplete character", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.currentCharacterIndex).toBe(0);

      characters[0].input("a");
      expect(sentence.currentCharacterIndex).toBe(1);
    });

    it("should return -1 when all characters are completed", () => {
      const characters = createCharacters();
      characters.forEach((char) => char.input(char.inputPatterns[0]));
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.currentCharacterIndex).toBe(-1);
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
        [character1, character2, character3],
        "test sentence",
      );
      expect(sentence.completedCharacters).toEqual([character1, character2]);
    });

    it("should return empty array when no characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const character2 = new Character({ label: "b", inputPatterns: ["b"] });

      const sentence = new Sentence([character1, character2], "test sentence");
      expect(sentence.completedCharacters).toEqual([]);
    });

    it("should return completed characters", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      characters[0].input("a");
      characters[2].input("u");
      expect(sentence.completedCharacters).toEqual([
        characters[0],
        characters[2],
      ]);
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
        [character1, character2, character3, character4],
        "test sentence",
      );
      expect(sentence.incompletedCharacters).toEqual([character3, character4]);
    });

    it("should return empty array when all characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const sentence = new Sentence([character1, character2], "test sentence");
      expect(sentence.incompletedCharacters).toEqual([]);
    });

    it("should return all characters when none are completed", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.incompletedCharacters).toEqual(characters);
    });

    it("should return incomplete characters", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      characters[0].input("a");
      characters[2].input("u");
      expect(sentence.incompletedCharacters).toEqual([characters[1]]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all characters are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");

      const sentence = new Sentence([character1, character2], "test sentence");
      expect(sentence.isCompleted()).toBe(true);
    });

    it("should return false when at least one character is incomplete", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });

      const sentence = new Sentence([character1, character2], "test sentence");
      expect(sentence.isCompleted()).toBe(false);
    });

    it("should return true for an empty sentence", () => {
      const sentence = new Sentence([], "empty sentence");
      expect(sentence.isCompleted()).toBe(true);
    });

    it("should return false when not all characters are completed", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      expect(sentence.isCompleted()).toBe(false);
    });

    it("should return true when all characters are completed", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");
      characters[0].input("a");
      characters[1].input("i");
      characters[2].input("u");
      expect(sentence.isCompleted()).toBe(true);
    });
  });

  describe("inputCurrentCharacter", () => {
    it("should input to current character", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.inputCurrentCharacter("a")).toBe(true);
      expect(characters[0].isCompleted()).toBe(true);

      expect(sentence.inputCurrentCharacter("i")).toBe(true);
      expect(characters[1].isCompleted()).toBe(true);
    });

    it("should return false for incorrect input", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.inputCurrentCharacter("x")).toBe(false);
      expect(characters[0].isCompleted()).toBe(false);
    });

    it("should return false when all characters are completed", () => {
      const characters = createCharacters();
      characters.forEach((char) => char.input(char.inputPatterns[0]));
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.inputCurrentCharacter("a")).toBe(false);
    });
  });

  describe("getCurrentCharacterSuggestions", () => {
    it("should return suggestions for current character", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.getCurrentCharacterSuggestions()).toEqual(["a"]);

      characters[0].input("a");
      expect(sentence.getCurrentCharacterSuggestions()).toEqual(["i"]);
    });

    it("should return empty array when all characters are completed", () => {
      const characters = createCharacters();
      characters.forEach((char) => char.input(char.inputPatterns[0]));
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.getCurrentCharacterSuggestions()).toEqual([]);
    });
  });

  describe("getCharacterPreview", () => {
    it("should return preview for character at index", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.getCharacterPreview(0)).toBe("a");
      expect(sentence.getCharacterPreview(1)).toBe("i");
      expect(sentence.getCharacterPreview(2)).toBe("u");
    });

    it("should return empty string for invalid index", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      expect(sentence.getCharacterPreview(-1)).toBe("");
      expect(sentence.getCharacterPreview(3)).toBe("");
    });
  });

  describe("character input logging", () => {
    it("should automatically mark input start when accessing currentCharacter", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      expect(characters[0].inputLog.startTime).toBeNull();

      const current = sentence.currentCharacter;

      expect(current).toBe(characters[0]);
      expect(characters[0].inputLog.startTime).not.toBeNull();
    });

    it("should not overwrite start time if already set", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      characters[0].inputLog.markInputStart();
      const firstStartTime = characters[0].inputLog.startTime;

      sentence.currentCharacter; // Access again

      expect(characters[0].inputLog.startTime).toBe(firstStartTime);
    });

    it("should mark start time for next character when current is completed", () => {
      const characters = createCharacters();
      const sentence = new Sentence(characters, "test sentence");

      // Access first character (should mark start time)
      sentence.currentCharacter;
      expect(characters[0].inputLog.startTime).not.toBeNull();
      expect(characters[1].inputLog.startTime).toBeNull();

      // Complete first character
      characters[0].input("a");

      // Access current character again (should be second character and mark its start time)
      const current = sentence.currentCharacter;
      expect(current).toBe(characters[1]);
      expect(characters[1].inputLog.startTime).not.toBeNull();
    });
  });

  describe("sentence inputLog", () => {
    it("should initialize with null timestamps", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence([character], "test sentence");

      const log = sentence.inputLog;
      expect(log.startTime).toBeNull();
      expect(log.endTime).toBeNull();
    });

    it("should automatically mark start time when accessing currentCharacter", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence([character], "test sentence");

      expect(sentence.inputLog.startTime).toBeNull();

      const current = sentence.currentCharacter;

      expect(current).toBe(character);
      expect(sentence.inputLog.startTime).not.toBeNull();
      expect(sentence.inputLog.endTime).toBeNull();
    });

    it("should not overwrite start time if already set", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence([character], "test sentence");

      sentence.currentCharacter; // Mark start time
      const firstStartTime = sentence.inputLog.startTime;

      sentence.currentCharacter; // Access again

      expect(sentence.inputLog.startTime).toBe(firstStartTime);
    });

    it("should automatically mark end time when sentence is completed", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence([character], "test sentence");

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
      const sentence = new Sentence([character], "test sentence");

      sentence.currentCharacter; // Mark start time
      sentence.inputCurrentCharacter("b"); // Failed input

      expect(sentence.inputLog.endTime).toBeNull();
    });

    it("should handle multi-character sentence completion", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const sentence = new Sentence([character1, character2], "test sentence");

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
      const sentence = new Sentence([character], "test sentence");

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
      const sentence = new Sentence([character], "test sentence");

      const log1 = sentence.inputLog;
      const log2 = sentence.inputLog;

      expect(log1).toBe(log2); // Same object
    });
  });
});
