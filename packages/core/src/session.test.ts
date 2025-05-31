import { describe, it, expect } from "vitest";
import { Session } from "./session";
import { Sentence } from "./sentence";
import { Character } from "./character";
import { CharacterSet } from "./character-set";

describe("Session", () => {
  describe("constructor", () => {
    it("should initialize with an array of Sentences", () => {
      const character = new Character({ label: "a", inputPatterns: ["a"] });
      const characterSet = new CharacterSet([character]);
      const sentence = new Sentence(characterSet, "test sentence");
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
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence = new Sentence(
        characterSet1,
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const incompleteSentence = new Sentence(
        characterSet2,
        "incomplete sentence",
      );

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.currentSentence).toBe(incompleteSentence);
    });

    it("should return null when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.currentSentence).toBeNull();
    });
  });

  describe("completedSentences", () => {
    it("should return all completed sentences", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence1 = new Sentence(
        characterSet1,
        "completed sentence 1",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const completedSentence2 = new Sentence(
        characterSet2,
        "completed sentence 2",
      );

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const characterSet3 = new CharacterSet([character3]);
      const incompleteSentence = new Sentence(
        characterSet3,
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
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.completedSentences).toEqual([]);
    });
  });

  describe("incompletedSentences", () => {
    it("should return all incomplete sentences", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence = new Sentence(
        characterSet1,
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const incompleteSentence1 = new Sentence(
        characterSet2,
        "incomplete sentence 1",
      );

      const character3 = new Character({ label: "c", inputPatterns: ["c"] });
      const characterSet3 = new CharacterSet([character3]);
      const incompleteSentence2 = new Sentence(
        characterSet3,
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
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.incompletedSentences).toEqual([]);
    });
  });

  describe("isCompleted", () => {
    it("should return true when all sentences are completed", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const sentence1 = new Sentence(characterSet1, "sentence 1");

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      character2.input("b");
      const characterSet2 = new CharacterSet([character2]);
      const sentence2 = new Sentence(characterSet2, "sentence 2");

      const session = new Session([sentence1, sentence2]);
      expect(session.isCompleted()).toBe(true);
    });

    it("should return false when at least one sentence is incomplete", () => {
      const character1 = new Character({ label: "a", inputPatterns: ["a"] });
      character1.input("a");
      const characterSet1 = new CharacterSet([character1]);
      const completedSentence = new Sentence(
        characterSet1,
        "completed sentence",
      );

      const character2 = new Character({ label: "b", inputPatterns: ["b"] });
      const characterSet2 = new CharacterSet([character2]);
      const incompleteSentence = new Sentence(
        characterSet2,
        "incomplete sentence",
      );

      const session = new Session([completedSentence, incompleteSentence]);
      expect(session.isCompleted()).toBe(false);
    });
  });
});
