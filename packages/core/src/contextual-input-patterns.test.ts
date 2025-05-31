import { describe, it, expect } from "vitest";
import { Character, InputPatternResolver } from "./character";
import { CharacterSet } from "./character-set";
import { fromJapaneseText } from "./characters/japanese";

describe("Contextual Input Patterns", () => {
  describe("Character class", () => {
    describe("preview getter", () => {
      it("should return the first input pattern", () => {
        const character = new Character({
          label: "ん",
          inputPatterns: ["nn", "n"],
        });
        expect(character.getPreview()).toBe("nn");
      });
    });

    describe("getInputPatterns with context", () => {
      it("should return original patterns when no resolver is provided", () => {
        const character = new Character({
          label: "ん",
          inputPatterns: ["nn", "n"],
        });
        const context = { prev: null, next: null };
        expect(character.getInputPatterns(context)).toEqual(["nn", "n"]);
      });

      it("should use resolver when provided", () => {
        const resolver: InputPatternResolver = (context) => {
          if (context.next && context.next.getPreview().startsWith("n")) {
            return ["nn"];
          }
          return ["nn", "n"];
        };

        const character = new Character({
          label: "ん",
          inputPatterns: ["nn", "n"],
          inputPatternResolver: resolver,
        });

        const nextChar = new Character({
          label: "な",
          inputPatterns: ["na"],
        });

        const context = { prev: null, next: nextChar };
        expect(character.getInputPatterns(context)).toEqual(["nn"]);
      });
    });

    describe("input with context", () => {
      it("should accept valid input based on context", () => {
        const resolver: InputPatternResolver = (context) => {
          if (context.next && context.next.getPreview().startsWith("n")) {
            return ["nn"];
          }
          return ["nn", "n"];
        };

        const nnChar = new Character({
          label: "ん",
          inputPatterns: ["nn", "n"],
          inputPatternResolver: resolver,
        });

        const naChar = new Character({
          label: "な",
          inputPatterns: ["na"],
        });

        const context = { prev: null, next: naChar };

        // When next character starts with "n", should require "nn"
        expect(nnChar.input("n", context)).toBe(true);
        expect(nnChar.input("n", context)).toBe(true);
        expect(nnChar.isCompleted(context)).toBe(true);
      });

      it("should reject invalid input based on context", () => {
        const resolver: InputPatternResolver = (context) => {
          if (context.next && context.next.getPreview().startsWith("n")) {
            return ["nn"];
          }
          return ["nn", "n"];
        };

        const nnChar = new Character({
          label: "ん",
          inputPatterns: ["nn", "n"],
          inputPatternResolver: resolver,
        });

        const naChar = new Character({
          label: "な",
          inputPatterns: ["na"],
        });

        const context = { prev: null, next: naChar };

        // Single "n" should not complete when next character starts with "n"
        expect(nnChar.input("n", context)).toBe(true);
        expect(nnChar.isCompleted(context)).toBe(false);
      });

      it("should allow single n when next character doesn't start with n", () => {
        const resolver: InputPatternResolver = (context) => {
          if (context.next && context.next.getPreview().startsWith("n")) {
            return ["nn"];
          }
          return ["nn", "n"];
        };

        const nnChar = new Character({
          label: "ん",
          inputPatterns: ["nn", "n"],
          inputPatternResolver: resolver,
        });

        const baChar = new Character({
          label: "ば",
          inputPatterns: ["ba"],
        });

        const context = { prev: null, next: baChar };

        // Single "n" should complete when next character doesn't start with "n"
        expect(nnChar.input("n", context)).toBe(true);
        expect(nnChar.isCompleted(context)).toBe(true);
      });
    });
  });

  describe("fromJapaneseText with contextual patterns", () => {
    it("should create ん character with context-aware input patterns", () => {
      const characters = fromJapaneseText("まんなか");
      const nnChar = characters[1]; // "ん"
      const naChar = characters[2]; // "な"

      expect(nnChar.label).toBe("ん");
      expect(naChar.label).toBe("な");

      // Context where next character is "な"
      const context = { prev: characters[0], next: naChar };

      // Should only allow "nn" when next is "な"
      expect(nnChar.getInputPatterns(context)).toEqual(["nn"]);

      // Context where next character is not "な"
      const contextNoN = { prev: characters[0], next: null };
      expect(nnChar.getInputPatterns(contextNoN)).toEqual(["nn", "n"]);
    });
  });

  describe("CharacterSet with contextual patterns", () => {
    it("should provide correct context to characters", () => {
      const characters = fromJapaneseText("まんなか");
      const characterSet = new CharacterSet(characters);

      // Get the "ん" character
      const nnChar = characterSet.characters[1];
      const context = {
        prev: characterSet.characters[0],
        next: characterSet.characters[2],
      };

      // Test input on the "ん" character with context
      expect(nnChar.input("n", context)).toBe(true); // First "n"
      expect(nnChar.isCompleted(context)).toBe(false); // Should not be completed with single "n" when next is "な"

      expect(nnChar.input("n", context)).toBe(true); // Second "n"
      expect(nnChar.isCompleted(context)).toBe(true); // Should be completed with "nn"
    });

    it("should handle completion correctly with context", () => {
      const characters = fromJapaneseText("あんば");
      const characterSet = new CharacterSet(characters);

      const nnChar = characterSet.characters[1]; // "ん"
      const context = {
        prev: characterSet.characters[0],
        next: characterSet.characters[2],
      };

      // Since next character is "ば" (starts with "b"), single "n" should be allowed
      expect(nnChar.input("n", context)).toBe(true);
      expect(nnChar.isCompleted(context)).toBe(true); // Should be completed with single "n"
    });
  });
});
