import { describe, it, expect } from "vitest";
import { Word } from "./word";

describe("Word", () => {
  describe("constructor", () => {
    it("should initialize with required properties", () => {
      const word = new Word({
        label: "a",
        inputPatterns: ["a"],
      });
      expect(word.label).toBe("a");
    });

    it("should initialize with required properties in Japanese", () => {
      const word = new Word({
        label: "あ",
        inputPatterns: ["a"],
      });
      expect(word.label).toBe("あ");
    });

    it("should initialize with ruby", () => {
      const word = new Word({
        label: "亜",
        ruby: "あ",
        inputPatterns: ["a"],
      });
      expect(word.label).toBe("亜");
      expect(word.ruby).toBe("あ");
    });
  });

  describe("getAvailableInputPatterns", () => {
    it("should return available input patterns", () => {
      const word = new Word({
        label: "a",
        inputPatterns: ["a"],
      });
      expect(word.getAvailableInputPatterns()).toEqual(["a"]);
    });

    it("should return multiple available input patterns", () => {
      const word = new Word({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(word.getAvailableInputPatterns()).toEqual(["shu", "syu"]);
    });

    it("should filter patterns with input parameter", () => {
      const word = new Word({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(word.getAvailableInputPatterns("s")).toEqual(["shu", "syu"]);
    });

    it("should consider previous inputs when filtering patterns", () => {
      const word = new Word({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      word.input("s");
      expect(word.getAvailableInputPatterns()).toEqual(["shu", "syu"]);
      expect(word.getAvailableInputPatterns("h")).toEqual(["shu"]);
      expect(word.getAvailableInputPatterns("y")).toEqual(["syu"]);
    });

    it("should return empty array when no patterns match", () => {
      const word = new Word({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(word.getAvailableInputPatterns("x")).toEqual([]);

      word.input("s");
      expect(word.getAvailableInputPatterns("x")).toEqual([]);
    });

    it("should handle sequential inputs correctly", () => {
      const word = new Word({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      word.input("s");
      word.input("h");
      expect(word.getAvailableInputPatterns()).toEqual(["shu"]);
      expect(word.getAvailableInputPatterns("u")).toEqual(["shu"]);
    });
  });

  describe("getSuggestions", () => {
    it("should return suggestions for all available patterns", () => {
      const word = new Word({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(word.getSuggestions()).toEqual(["shi", "si"]);
    });

    it("should return remaining part of patterns after current input", () => {
      const word = new Word({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      word.input("s");
      expect(word.getSuggestions()).toEqual(["hi", "i"]);
    });

    it("should return correctly after multiple inputs", () => {
      const word = new Word({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      word.input("s");
      word.input("h");
      expect(word.getSuggestions()).toEqual(["u"]);
    });

    it("should return empty array when input is complete", () => {
      const word = new Word({
        label: "し",
        inputPatterns: ["shi"],
      });
      word.input("s");
      word.input("h");
      word.input("i");
      expect(word.getSuggestions()).toEqual([]);
    });
  });
});
