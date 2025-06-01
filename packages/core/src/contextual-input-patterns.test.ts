import { describe, it, expect } from "vitest";
import { Character, InputPatternResolver } from "./character";
import { Sentence } from "./sentence";
import { createSentenceFactory } from "./sentence-factory";

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
    const factory = createSentenceFactory();

    it("should create ん character with context-aware input patterns", () => {
      const sentence = factory.fromText("まんなか");
      const nnChar = sentence.characters[1]; // "ん"
      const naChar = sentence.characters[2]; // "な"

      expect(nnChar.label).toBe("ん");
      expect(naChar.label).toBe("な");

      // Context where next character is "な"
      const context = { prev: sentence.characters[0], next: naChar };

      // Should only allow "nn" when next is "な"
      expect(nnChar.getInputPatterns(context)).toEqual(["nn"]);

      // Context where next character is not "な" but not at end
      const baChar = sentence.characters[3]; // "か"
      const contextNoN = { prev: sentence.characters[0], next: baChar };
      expect(nnChar.getInputPatterns(contextNoN)).toEqual(["n", "nn"]);

      // Context where character is at the end of sentence
      const contextEnd = { prev: sentence.characters[0], next: null };
      expect(nnChar.getInputPatterns(contextEnd)).toEqual(["nn"]);
    });

    it("should require nn when ん is followed by vowels", () => {
      // Test with あ
      const sentenceA = factory.fromText("こんあん");
      const nnChar1 = sentenceA.characters[1]; // first "ん"
      const aChar = sentenceA.characters[2]; // "あ"

      const contextA = { prev: sentenceA.characters[0], next: aChar };
      expect(nnChar1.getInputPatterns(contextA)).toEqual(["nn"]);

      // Test with い
      const sentenceI = factory.fromText("しんいん");
      const nnCharI = sentenceI.characters[1]; // "ん"
      const iChar = sentenceI.characters[2]; // "い"

      const contextI = { prev: sentenceI.characters[0], next: iChar };
      expect(nnCharI.getInputPatterns(contextI)).toEqual(["nn"]);

      // Test with う
      const sentenceU = factory.fromText("さんう");
      const nnCharU = sentenceU.characters[1]; // "ん"
      const uChar = sentenceU.characters[2]; // "う"

      const contextU = { prev: sentenceU.characters[0], next: uChar };
      expect(nnCharU.getInputPatterns(contextU)).toEqual(["nn"]);

      // Test with え
      const sentenceE = factory.fromText("けんえき");
      const nnCharE = sentenceE.characters[1]; // "ん"
      const eChar = sentenceE.characters[2]; // "え"

      const contextE = { prev: sentenceE.characters[0], next: eChar };
      expect(nnCharE.getInputPatterns(contextE)).toEqual(["nn"]);

      // Test with お
      const sentenceO = factory.fromText("きんおう");
      const nnCharO = sentenceO.characters[1]; // "ん"
      const oChar = sentenceO.characters[2]; // "お"

      const contextO = { prev: sentenceO.characters[0], next: oChar };
      expect(nnCharO.getInputPatterns(contextO)).toEqual(["nn"]);
    });
  });

  describe("Sentence with contextual patterns", () => {
    const factory = createSentenceFactory();

    it("should provide correct context to characters", () => {
      const sentence = factory.fromText("まんなか");

      // Get the "ん" character
      const nnChar = sentence.characters[1];
      const context = {
        prev: sentence.characters[0],
        next: sentence.characters[2],
      };

      // Test input on the "ん" character with context
      expect(nnChar.input("n", context)).toBe(true); // First "n"
      expect(nnChar.isCompleted(context)).toBe(false); // Should not be completed with single "n" when next is "な"

      expect(nnChar.input("n", context)).toBe(true); // Second "n"
      expect(nnChar.isCompleted(context)).toBe(true); // Should be completed with "nn"
    });

    it("should handle completion correctly with context", () => {
      const sentence = factory.fromText("あんば");

      const nnChar = sentence.characters[1]; // "ん"
      const context = {
        prev: sentence.characters[0],
        next: sentence.characters[2],
      };

      // Since next character is "ば" (starts with "b"), single "n" should be allowed
      expect(nnChar.input("n", context)).toBe(true);
      expect(nnChar.isCompleted(context)).toBe(true); // Should be completed with single "n"
    });

    it("should require nn when ん is at the end of sentence", () => {
      const sentence = factory.fromText("まん");

      const nnChar = sentence.characters[1]; // "ん"
      const context = {
        prev: sentence.characters[0],
        next: null, // End of sentence
      };

      // Should only allow "nn" when at the end of sentence
      expect(nnChar.getInputPatterns(context)).toEqual(["nn"]);

      // Single "n" should not complete when at the end
      expect(nnChar.input("n", context)).toBe(true);
      expect(nnChar.isCompleted(context)).toBe(false);

      // Double "nn" should complete
      expect(nnChar.input("n", context)).toBe(true);
      expect(nnChar.isCompleted(context)).toBe(true);
    });
  });

  describe("Small tsu (っ) with contextual patterns", () => {
    const factory = createSentenceFactory();

    it("should create っ character with context-aware input patterns", () => {
      const sentence = factory.fromText("がっこう");
      const smallTsuChar = sentence.characters[1]; // "っ"
      const koChar = sentence.characters[2]; // "こ"

      expect(smallTsuChar.label).toBe("っ");
      expect(koChar.label).toBe("こ");

      // Context where next character is "こ"
      const context = { prev: sentence.characters[0], next: koChar };

      // Should include "k" pattern when next is "こ"
      const patterns = smallTsuChar.getInputPatterns(context);
      expect(patterns).toContain("xtu");
      expect(patterns).toContain("ltu");
      expect(patterns).toContain("k");
    });

    it("should handle っ before さ行", () => {
      const sentence = factory.fromText("ざっし");
      const smallTsuChar = sentence.characters[1]; // "っ"
      const shiChar = sentence.characters[2]; // "し"

      const context = { prev: sentence.characters[0], next: shiChar };
      const patterns = smallTsuChar.getInputPatterns(context);

      expect(patterns).toContain("s"); // For both "si" and "shi" patterns
    });

    it("should handle っ before た行", () => {
      const sentence = factory.fromText("あった");
      const smallTsuChar = sentence.characters[1]; // "っ"
      const taChar = sentence.characters[2]; // "た"

      const context = { prev: sentence.characters[0], next: taChar };
      const patterns = smallTsuChar.getInputPatterns(context);

      expect(patterns).toContain("t");
    });

    it("should handle っ before ぱ行", () => {
      const sentence = factory.fromText("いっぱい");
      const smallTsuChar = sentence.characters[1]; // "っ"
      const paChar = sentence.characters[2]; // "ぱ"

      const context = { prev: sentence.characters[0], next: paChar };
      const patterns = smallTsuChar.getInputPatterns(context);

      expect(patterns).toContain("p");
    });

    it("should handle っ before ちゃ/ちゅ/ちょ", () => {
      const sentence = factory.fromText("まっちゃ");
      const smallTsuChar = sentence.characters[1]; // "っ"
      const chaChar = sentence.characters[2]; // "ちゃ"

      const context = { prev: sentence.characters[0], next: chaChar };
      const patterns = smallTsuChar.getInputPatterns(context);

      expect(patterns).toContain("t"); // For both "cha" (tch) and "tya" (tt) patterns
    });

    it("should handle っ at the end of sentence", () => {
      const sentence = factory.fromText("あっ");
      const smallTsuChar = sentence.characters[1]; // "っ"

      const context = { prev: sentence.characters[0], next: null };
      const patterns = smallTsuChar.getInputPatterns(context);

      // Should only have base patterns when at the end
      expect(patterns).toEqual(["xtu", "ltu", "xtsu", "ltsu"]);
    });

    it("should accept double consonant input", () => {
      const sentence = factory.fromText("がっこう");

      // Type が
      expect(sentence.inputCurrentCharacter("g")).toBe(true);
      expect(sentence.inputCurrentCharacter("a")).toBe(true);

      // Type っ with single k
      expect(sentence.inputCurrentCharacter("k")).toBe(true);

      // っ should be completed
      expect(sentence.currentCharacterIndex).toBe(2); // Should be at こ

      // Type こう
      expect(sentence.inputCurrentCharacter("k")).toBe(true);
      expect(sentence.inputCurrentCharacter("o")).toBe(true);
      expect(sentence.inputCurrentCharacter("u")).toBe(true);

      expect(sentence.isCompleted()).toBe(true);
    });

    it("should still accept traditional input patterns", () => {
      const sentence = factory.fromText("がっこう");

      // Type が
      expect(sentence.inputCurrentCharacter("g")).toBe(true);
      expect(sentence.inputCurrentCharacter("a")).toBe(true);

      // Type っ with xtu
      expect(sentence.inputCurrentCharacter("x")).toBe(true);
      expect(sentence.inputCurrentCharacter("t")).toBe(true);
      expect(sentence.inputCurrentCharacter("u")).toBe(true);

      // っ should be completed
      expect(sentence.currentCharacterIndex).toBe(2); // Should be at こ
    });

    it("should handle katakana ッ", () => {
      const sentence = factory.fromText("サッカー");
      const smallTsuChar = sentence.characters[1]; // "ッ"
      const kaChar = sentence.characters[2]; // "カ"

      const context = { prev: sentence.characters[0], next: kaChar };
      const patterns = smallTsuChar.getInputPatterns(context);

      expect(patterns).toContain("k");
    });
  });
});
