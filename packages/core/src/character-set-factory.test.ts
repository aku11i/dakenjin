import { describe, it, expect } from "vitest";
import { CharacterSetFactory } from "./character-set-factory";
import { Character } from "./character";

describe("CharacterSetFactory", () => {
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
    it("should create a CharacterSetFactory with characters", () => {
      const characters = [
        new Character({ label: "あ", inputPatterns: ["a"] }),
        new Character({ label: "い", inputPatterns: ["i"] }),
      ];
      const factory = new CharacterSetFactory(characters);
      expect(factory).toBeInstanceOf(CharacterSetFactory);
    });
  });

  describe("fromText", () => {
    it("should create a CharacterSet from Japanese text", () => {
      const characters = createJapaneseCharacters();
      const factory = new CharacterSetFactory(characters);
      const characterSet = factory.fromText("こんにちは");

      expect(characterSet.characters).toHaveLength(5);
      expect(characterSet.characters[0].label).toBe("こ");
      expect(characterSet.characters[1].label).toBe("ん");
      expect(characterSet.characters[2].label).toBe("に");
      expect(characterSet.characters[3].label).toBe("ち");
      expect(characterSet.characters[4].label).toBe("は");
    });

    it("should handle single character text", () => {
      const characters = createJapaneseCharacters();
      const factory = new CharacterSetFactory(characters);
      const characterSet = factory.fromText("あ");

      expect(characterSet.characters).toHaveLength(1);
      expect(characterSet.characters[0].label).toBe("あ");
    });

    it("should handle complex characters like きゃ", () => {
      const characters = createJapaneseCharacters();
      const factory = new CharacterSetFactory(characters);
      const characterSet = factory.fromText("きゃ");

      expect(characterSet.characters).toHaveLength(1);
      expect(characterSet.characters[0].label).toBe("きゃ");
      expect(characterSet.characters[0].inputPatterns).toContain("kya");
    });
  });
});
