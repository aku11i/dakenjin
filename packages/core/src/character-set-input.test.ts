import { describe, it, expect } from "vitest";
import { CharacterSet } from "./character-set";
import { createCharacterSetFactory } from "./character-set-factory";

describe("CharacterSet input methods", () => {
  const factory = createCharacterSetFactory();

  describe("getCharacterPreview", () => {
    it("should return context-aware preview for characters", () => {
      const characters = factory.fromText("こんにちは").characters;
      const characterSet = new CharacterSet(characters);

      // Complete "こ"
      characterSet.inputCurrentCharacter("k");
      characterSet.inputCurrentCharacter("o");

      // Check preview for "ん" - should be "nn" when next is "に"
      expect(characterSet.getCharacterPreview(1)).toBe("nn");

      // Check preview for "に" - should be regular
      expect(characterSet.getCharacterPreview(2)).toBe("ni");
    });

    it("should work with different contexts", () => {
      const characters = factory.fromText("あんば").characters;
      const characterSet = new CharacterSet(characters);

      // Complete "あ"
      characterSet.inputCurrentCharacter("a");

      // Check preview for "ん" - should be "n" when next is "ば" (not n-starting and not at end)
      expect(characterSet.getCharacterPreview(1)).toBe("n");
    });

    it("should return nn for ん at the end of sentence", () => {
      const characters = factory.fromText("あん").characters;
      const characterSet = new CharacterSet(characters);

      // Complete "あ"
      characterSet.inputCurrentCharacter("a");

      // Check preview for "ん" - should be "nn" when at the end
      expect(characterSet.getCharacterPreview(1)).toBe("nn");
    });
  });

  describe("inputCurrentCharacter", () => {
    it("should input to current character with context", () => {
      const characters = factory.fromText("こんにちは").characters;
      const characterSet = new CharacterSet(characters);

      // こ - ko
      expect(characterSet.inputCurrentCharacter("k")).toBe(true);
      expect(characterSet.inputCurrentCharacter("o")).toBe(true);

      // Check that "こ" is completed
      expect(characterSet.characters[0].isCompleted()).toBe(true);

      // ん - should require "nn" when followed by "に" (which starts with "n")
      expect(characterSet.inputCurrentCharacter("n")).toBe(true);

      // Check that ん is not completed with just one "n" when next is "に"
      const nnChar = characterSet.characters[1];
      const context = {
        prev: characterSet.characters[0],
        next: characterSet.characters[2],
      };
      expect(nnChar.isCompleted(context)).toBe(false); // Should not be completed with single "n"

      expect(characterSet.inputCurrentCharacter("n")).toBe(true);
      expect(nnChar.isCompleted(context)).toBe(true); // Should be completed with "nn"
    });

    it("should return correct suggestions with context", () => {
      const characters = factory.fromText("こんにちは").characters;
      const characterSet = new CharacterSet(characters);

      // Complete "こ"
      characterSet.inputCurrentCharacter("k");
      characterSet.inputCurrentCharacter("o");

      // Now on "ん" - should only suggest "nn" since next is "に"
      const suggestions = characterSet.getCurrentCharacterSuggestions();
      expect(suggestions).toEqual(["nn"]);
    });

    it("should work with different contexts", () => {
      const characters = factory.fromText("あんば").characters;
      const characterSet = new CharacterSet(characters);

      // Complete "あ"
      characterSet.inputCurrentCharacter("a");

      // ん - should allow single "n" when followed by "ば" (starts with "b")
      expect(characterSet.inputCurrentCharacter("n")).toBe(true);

      // Check that ん is completed with single "n" when next is "ば"
      const nnChar = characterSet.characters[1];
      const context = {
        prev: characterSet.characters[0],
        next: characterSet.characters[2],
      };
      expect(nnChar.isCompleted(context)).toBe(true); // Should be completed with single "n"
    });
  });
});
