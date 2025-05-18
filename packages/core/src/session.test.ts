import { describe, it, expect } from "vitest";
import { Session } from "./session";
import { Sentence } from "./sentence";
import { Word } from "./word";

describe("Session", () => {
  describe("constructor", () => {
    it("should initialize with an array of Sentences", () => {
      const word = new Word({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence([word]);
      const session = new Session([sentence]);
      expect(session.sentences).toEqual([sentence]);
    });

    it("should throw error when initializing with empty array", () => {
      expect(() => new Session([])).toThrow(
        "Session must have at least one sentence",
      );
    });
  });

  describe("currentSentence", () => {
    it("should return the first incomplete sentence", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const completedSentence = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      const incompleteSentence = new Sentence([word2]);

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.currentSentence).toBe(incompleteSentence);
    });

    it("should return null when all sentences are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const sentence1 = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");
      const sentence2 = new Sentence([word2]);

      const session = new Session([sentence1, sentence2]);
      expect(session.currentSentence).toBeNull();
    });
  });

  describe("completedSentences", () => {
    it("should return all completed sentences", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const completedSentence1 = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");
      const completedSentence2 = new Sentence([word2]);

      const word3 = new Word({ label: "c", inputPatterns: ["c"] });
      const incompleteSentence = new Sentence([word3]);

      const session = new Session([
        completedSentence1,
        completedSentence2,
        incompleteSentence,
      ]);
      expect(session.completedSentences).toEqual([
        completedSentence1,
        completedSentence2,
      ]);
    });

    it("should return empty array when no sentences are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      const sentence1 = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      const sentence2 = new Sentence([word2]);

      const session = new Session([sentence1, sentence2]);
      expect(session.completedSentences).toEqual([]);
    });
  });

  describe("incompletedSentences", () => {
    it("should return all incomplete sentences", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const completedSentence = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      const incompleteSentence1 = new Sentence([word2]);

      const word3 = new Word({ label: "c", inputPatterns: ["c"] });
      const incompleteSentence2 = new Sentence([word3]);

      const session = new Session([
        completedSentence,
        incompleteSentence1,
        incompleteSentence2,
      ]);
      expect(session.incompletedSentences).toEqual([
        incompleteSentence1,
        incompleteSentence2,
      ]);
    });

    it("should return empty array when all sentences are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const sentence1 = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");
      const sentence2 = new Sentence([word2]);

      const session = new Session([sentence1, sentence2]);
      expect(session.incompletedSentences).toEqual([]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all sentences are completed", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const sentence1 = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      word2.input("b");
      const sentence2 = new Sentence([word2]);

      const session = new Session([sentence1, sentence2]);
      expect(session.isCompleted()).toBe(true);
    });

    it("should return false when at least one sentence is incomplete", () => {
      const word1 = new Word({ label: "a", inputPatterns: ["a"] });
      word1.input("a");
      const completedSentence = new Sentence([word1]);

      const word2 = new Word({ label: "b", inputPatterns: ["b"] });
      const incompleteSentence = new Sentence([word2]);

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.isCompleted()).toBe(false);
    });
  });
});
