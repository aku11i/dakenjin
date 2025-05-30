import { describe, it, expect } from "vitest";
import { Session } from "./session";
import { Sentence } from "./sentence";
import { Character } from "./character";

describe("Session", () => {
  describe("constructor", () => {
    it("should initialize with an array of Sentences", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence = new Sentence([character], "test sentence");
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
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const completedSentence = new Sentence(
        [character1],
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const incompleteSentence = new Sentence(
        [character2],
        "incomplete sentence",
      );

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.currentSentence).toBe(incompleteSentence);
    });

    it("should return null when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const sentence1 = new Sentence([character1], "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const sentence2 = new Sentence([character2], "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.currentSentence).toBeNull();
    });
  });

  describe("completedSentences", () => {
    it("should return all completed sentences", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const completedSentence1 = new Sentence(
        [character1],
        "completed sentence 1",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const completedSentence2 = new Sentence(
        [character2],
        "completed sentence 2",
      );

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const incompleteSentence = new Sentence(
        [character3],
        "incomplete sentence",
      );

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
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      const sentence1 = new Sentence([character1], "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const sentence2 = new Sentence([character2], "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.completedSentences).toEqual([]);
    });
  });

  describe("incompletedSentences", () => {
    it("should return all incomplete sentences", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const completedSentence = new Sentence(
        [character1],
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const incompleteSentence1 = new Sentence(
        [character2],
        "incomplete sentence 1",
      );

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const incompleteSentence2 = new Sentence(
        [character3],
        "incomplete sentence 2",
      );

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
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const sentence1 = new Sentence([character1], "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const sentence2 = new Sentence([character2], "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.incompletedSentences).toEqual([]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const sentence1 = new Sentence([character1], "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const sentence2 = new Sentence([character2], "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.isCompleted()).toBe(true);
    });

    it("should return false when at least one sentence is incomplete", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const completedSentence = new Sentence(
        [character1],
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const incompleteSentence = new Sentence(
        [character2],
        "incomplete sentence",
      );

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.isCompleted()).toBe(false);
    });
  });
});
