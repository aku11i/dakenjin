import { describe, it, expect } from "vitest";
import { SentenceFactory } from "./sentence-factory";
import { Character } from "./character";

describe("SentenceFactory", () => {
  const createJapaneseCharacters = () => [
    new Character({ label: "こ", inputPatterns: ["ko"] }),
    new Character({ label: "ん", inputPatterns: ["nn", "n"] }),
    new Character({ label: "に", inputPatterns: ["ni"] }),
    new Character({ label: "ち", inputPatterns: ["chi", "ti"] }),
    new Character({ label: "は", inputPatterns: ["ha"] }),
    new Character({ label: "あ", inputPatterns: ["a"] }),
    new Character({ label: "きゃ", inputPatterns: ["kya"] }),
  ];

  describe("constructor", () => {
    it("should create a SentenceFactory with characters", () => {
      const characters = [
        new Character({ label: "あ", inputPatterns: ["a"] }),
        new Character({ label: "い", inputPatterns: ["i"] }),
      ];
      const factory = new SentenceFactory(characters);
      expect(factory).toBeInstanceOf(SentenceFactory);
    });
  });

  describe("fromText", () => {
    it("should create a Sentence from Japanese text", () => {
      const characters = createJapaneseCharacters();
      const factory = new SentenceFactory(characters);
      const sentence = factory.fromText("こんにちは");

      expect(sentence.label).toBe("こんにちは");
      expect(sentence.characters).toHaveLength(5);
      expect(sentence.characters[0].label).toBe("こ");
      expect(sentence.characters[1].label).toBe("ん");
      expect(sentence.characters[2].label).toBe("に");
      expect(sentence.characters[3].label).toBe("ち");
      expect(sentence.characters[4].label).toBe("は");
    });

    it("should handle single character text", () => {
      const characters = createJapaneseCharacters();
      const factory = new SentenceFactory(characters);
      const sentence = factory.fromText("あ");

      expect(sentence.label).toBe("あ");
      expect(sentence.characters).toHaveLength(1);
      expect(sentence.characters[0].label).toBe("あ");
    });

    it("should handle complex characters like きゃ", () => {
      const characters = createJapaneseCharacters();
      const factory = new SentenceFactory(characters);
      const sentence = factory.fromText("きゃ");

      expect(sentence.label).toBe("きゃ");
      expect(sentence.characters).toHaveLength(1);
      expect(sentence.characters[0].label).toBe("きゃ");
      expect(sentence.characters[0].inputPatterns).toContain("kya");
    });
  });
});
