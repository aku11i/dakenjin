import { describe, it, expect } from "vitest";
import { Sentence } from "./sentence";
import { Word } from "./word";

describe("Sentence", () => {
  describe("constructor", () => {
    it("should initialize with an array of Words", () => {
      const words = [
        new Word({ label: "a", inputPatterns: ["a"] }),
        new Word({ label: "b", inputPatterns: ["b"] }),
      ];
      const sentence = new Sentence(words);
      expect(sentence.words).toEqual(words);
    });
  });

  describe("currentWord", () => {
    it("should return the first non-completed word", () => {
      const completedWord = new Word({ label: "a", inputPatterns: ["a"] });
      completedWord.input("a");

      const incompleteWord = new Word({ label: "b", inputPatterns: ["b"] });

      const words = [completedWord, incompleteWord];
      const sentence = new Sentence(words);
      expect(sentence.currentWord).toBe(incompleteWord);
    });

    it("should return null if all words are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");

      const sentence = new Sentence([word1, word2]);
      expect(sentence.currentWord).toBeNull();
    });

    it("should return null if there are no words", () => {
      const sentence = new Sentence([]);
      expect(sentence.currentWord).toBeNull();
    });
  });

  describe("completedWords", () => {
    it("should return all completed words", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");

      const word3 = new Word({ label: "c", inputPatterns: ["c"] });

      const sentence = new Sentence([word1, word2, word3]);
      expect(sentence.completedWords).toEqual([word1, word2]);
    });

    it("should return empty array when no words are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      const word2 = new Word({ label: "b", inputPatterns: ["b"] });

      const sentence = new Sentence([word1, word2]);
      expect(sentence.completedWords).toEqual([]);
    });
  });

  describe("incompletedWords", () => {
    it("should return all incomplete words", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");

      const word3 = new Word({ label: "c", inputPatterns: ["c"] });
      const word4 = new Word({ label: "d", inputPatterns: ["d"] });

      const sentence = new Sentence([word1, word2, word3, word4]);
      expect(sentence.incompletedWords).toEqual([word3, word4]);
    });

    it("should return empty array when all words are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");

      const sentence = new Sentence([word1, word2]);
      expect(sentence.incompletedWords).toEqual([]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all words are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");

      const sentence = new Sentence([word1, word2]);
      expect(sentence.isCompleted()).toBe(true);
    });

    it("should return false when at least one word is incomplete", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });

      const sentence = new Sentence([word1, word2]);
      expect(sentence.isCompleted()).toBe(false);
    });

    it("should return true for an empty sentence", () => {
      const sentence = new Sentence([]);
      expect(sentence.isCompleted()).toBe(true);
    });
  });
});
