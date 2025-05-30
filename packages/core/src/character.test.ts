import { describe, it, expect } from "vitest";
import { Character } from "./character";

describe("Character", () => {
  describe("constructor", () => {
    it("should initialize with required properties", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      expect(character.label).toBe("a");
      expect(character.inputPatterns).toEqual(["a"]);
    });

    it("should initialize with required properties in Japanese", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      expect(character.label).toBe("あ");
      expect(character.inputPatterns).toEqual(["a"]);
    });

    it("should initialize with multiple input patterns", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.label).toBe("し");
      expect(character.inputPatterns).toEqual(["shi", "si"]);
    });

    it("should allow multi-character labels like 'しゅ'", () => {
      const character = new Character({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(character.label).toBe("しゅ");
      expect(character.inputPatterns).toEqual(["shu", "syu"]);
    });


    it("should throw error when label is empty", () => {
      expect(() => new Character({
        label: "",
        inputPatterns: ["a"],
      })).toThrow("Character label cannot be empty");
    });

    it("should throw error when no input patterns provided", () => {
      expect(() => new Character({
        label: "a",
        inputPatterns: [],
      })).toThrow("At least one input pattern is required");
    });
  });

  describe("input", () => {
    it("should accept valid input character for single pattern", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const result = character.input("a");
      expect(result).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle sequential inputs for multi-character pattern", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.isCompleted()).toBe(false);
      expect(character.input("h")).toBe(true);
      expect(character.isCompleted()).toBe(false);
      expect(character.input("i")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle alternative input patterns", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("i")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should reject invalid input character", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const result = character.input("b");
      expect(result).toBe(false);
      expect(character.isCompleted()).toBe(false);
    });

    it("should reject invalid path after partial input", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("a")).toBe(false); // neither shi nor si has 'sa'
      expect(character.inputs).toBe("s"); // input should not change
    });

    it("should handle multi-character label 'しゅ' with patterns", () => {
      const character = new Character({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("h")).toBe(true);
      expect(character.input("u")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle alternative pattern for 'しゅ'", () => {
      const character = new Character({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("y")).toBe(true);
      expect(character.input("u")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should throw error when trying to input more than one character", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      expect(() => character.input("ab")).toThrow(
        "Input must be a single character",
      );
    });

    it("should throw error when character is already completed", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(() => character.input("a")).toThrow("Character is already completed");
    });
  });

  describe("isCompleted", () => {
    it("should return false initially", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      expect(character.isCompleted()).toBe(false);
    });

    it("should return true after correct input", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(character.isCompleted()).toBe(true);
    });

    it("should remain false after incorrect input", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      character.input("b");
      expect(character.isCompleted()).toBe(false);
    });

    it("should return true when any pattern is completed", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      character.input("s");
      character.input("i");
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle completion for multi-character label", () => {
      const character = new Character({
        label: "きょ",
        inputPatterns: ["kyo", "kyo"],
      });
      character.input("k");
      character.input("y");
      character.input("o");
      expect(character.isCompleted()).toBe(true);
    });
  });

  describe("getAvailablePatterns", () => {
    it("should return all patterns initially", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.getAvailablePatterns()).toEqual(["shi", "si"]);
    });

    it("should filter patterns based on current input", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      character.input("s");
      expect(character.getAvailablePatterns()).toEqual(["shi", "si"]);
      character.input("h");
      expect(character.getAvailablePatterns()).toEqual(["shi"]);
    });

    it("should return empty array when no patterns match", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(character.getAvailablePatterns()).toEqual(["a"]);
      // After completion, the pattern still matches the input
    });
  });

  describe("getSuggestions", () => {
    it("should return remaining characters for all patterns", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.getSuggestions()).toEqual(["shi", "si"]);
    });

    it("should return remaining part after partial input", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      character.input("s");
      expect(character.getSuggestions()).toEqual(["hi", "i"]);
    });

    it("should return empty array when completed", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(character.getSuggestions()).toEqual([]);
    });
  });
});
