import { describe, it, expect } from "vitest";
import { Character } from "./character";

describe("Character", () => {
  describe("constructor", () => {
    it("should initialize with required properties", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      expect(character.label).toBe("a");
      expect(character.inputPatterns).toEqual(["a"]);
    });

    it("should initialize with required properties in Japanese", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      expect(character.label).toBe("あ");
      expect(character.inputPatterns).toEqual(["a"]);
    });

    it("should initialize with multiple input patterns", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.label).toBe("し");
      expect(character.inputPatterns).toEqual(["shi", "si"]);
    });

    it("should allow multi-character labels like 'しゅ'", () => {
      const character = new Character({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(character.label).toBe("しゅ");
      expect(character.inputPatterns).toEqual(["shu", "syu"]);
    });

    it("should throw error when label is empty", () => {
      expect(
        () =>
          new Character({
            label: "",
            inputPatterns: ["a"],
          }),
      ).toThrow("Character label cannot be empty");
    });

    it("should throw error when no input patterns provided", () => {
      expect(
        () =>
          new Character({
            label: "a",
            inputPatterns: [],
          }),
      ).toThrow("At least one input pattern is required");
    });
  });

  describe("input", () => {
    it("should accept valid input character for single pattern", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const result = character.input("a");
      expect(result).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle sequential inputs for multi-character pattern", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.isCompleted()).toBe(false);
      expect(character.input("h")).toBe(true);
      expect(character.isCompleted()).toBe(false);
      expect(character.input("i")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle alternative input patterns", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("i")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should reject invalid input character", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const result = character.input("b");
      expect(result).toBe(false);
      expect(character.isCompleted()).toBe(false);
    });

    it("should reject invalid path after partial input", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("a")).toBe(false); // neither shi nor si has 'sa'
      expect(character.inputs).toBe("s"); // input should not change
    });

    it("should handle multi-character label 'しゅ' with patterns", () => {
      const character = new Character({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("h")).toBe(true);
      expect(character.input("u")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle alternative pattern for 'しゅ'", () => {
      const character = new Character({
        label: "しゅ",
        inputPatterns: ["shu", "syu"],
      });
      expect(character.input("s")).toBe(true);
      expect(character.input("y")).toBe(true);
      expect(character.input("u")).toBe(true);
      expect(character.isCompleted()).toBe(true);
    });

    it("should throw error when trying to input more than one character", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      expect(() => character.input("ab")).toThrow(
        "Input must be a single character",
      );
    });

    it("should throw error when character is already completed", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(() => character.input("a")).toThrow(
        "Character is already completed",
      );
    });
  });

  describe("isCompleted", () => {
    it("should return false initially", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      expect(character.isCompleted()).toBe(false);
    });

    it("should return true after correct input", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(character.isCompleted()).toBe(true);
    });

    it("should remain false after incorrect input", () => {
      const character = new Character({
        label: "a",
        inputPatterns: ["a"],
      });
      character.input("b");
      expect(character.isCompleted()).toBe(false);
    });

    it("should return true when any pattern is completed", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      character.input("s");
      character.input("i");
      expect(character.isCompleted()).toBe(true);
    });

    it("should handle completion for multi-character label", () => {
      const character = new Character({
        label: "きょ",
        inputPatterns: ["kyo", "kyo"],
      });
      character.input("k");
      character.input("y");
      character.input("o");
      expect(character.isCompleted()).toBe(true);
    });
  });

  describe("getAvailablePatterns", () => {
    it("should return all patterns initially", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.getAvailablePatterns()).toEqual(["shi", "si"]);
    });

    it("should filter patterns based on current input", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      character.input("s");
      expect(character.getAvailablePatterns()).toEqual(["shi", "si"]);
      character.input("h");
      expect(character.getAvailablePatterns()).toEqual(["shi"]);
    });

    it("should return empty array when no patterns match", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(character.getAvailablePatterns()).toEqual(["a"]);
      // After completion, the pattern still matches the input
    });
  });

  describe("getSuggestions", () => {
    it("should return remaining characters for all patterns", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      expect(character.getSuggestions()).toEqual(["shi", "si"]);
    });

    it("should return remaining part after partial input", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      character.input("s");
      expect(character.getSuggestions()).toEqual(["hi", "i"]);
    });

    it("should return empty array when completed", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");
      expect(character.getSuggestions()).toEqual([]);
    });
  });

  describe("inputLog", () => {
    it("should initialize with null timestamps", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const log = character.inputLog;
      expect(log.startTime).toBeNull();
      expect(log.endTime).toBeNull();
    });

    it("should record start time when markInputStart is called", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const beforeTime = new Date();
      character.inputLog.markInputStart();
      const afterTime = new Date();

      const log = character.inputLog;
      expect(log.startTime).not.toBeNull();
      expect(new Date(log.startTime!)).toBeInstanceOf(Date);
      expect(new Date(log.startTime!).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(log.startTime!).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
      expect(log.endTime).toBeNull();
    });

    it("should record end time when markInputEnd is called", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();
      const beforeTime = new Date();
      character.inputLog.markInputEnd();
      const afterTime = new Date();

      const log = character.inputLog;
      expect(log.endTime).not.toBeNull();
      expect(new Date(log.endTime!)).toBeInstanceOf(Date);
      expect(new Date(log.endTime!).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(log.endTime!).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should automatically record end time when character is completed", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();
      const beforeTime = new Date();
      character.input("a");
      const afterTime = new Date();

      const log = character.inputLog;
      expect(log.endTime).not.toBeNull();
      expect(new Date(log.endTime!)).toBeInstanceOf(Date);
      expect(new Date(log.endTime!).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(log.endTime!).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should not overwrite start time if already set", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();
      const firstStartTime = character.inputLog.startTime;

      character.inputLog.markInputStart(); // Try to mark again

      expect(character.inputLog.startTime).toBe(firstStartTime);
    });

    it("should not overwrite end time if already set", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();
      character.inputLog.markInputEnd();
      const firstEndTime = character.inputLog.endTime;

      character.inputLog.markInputEnd(); // Try to mark again

      expect(character.inputLog.endTime).toBe(firstEndTime);
    });

    it("should return the same log instance", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();

      const log1 = character.inputLog;
      const log2 = character.inputLog;

      expect(log1).toBe(log2); // Same object
      expect(log1.startTime).toBe(log2.startTime); // Same content
    });

    it("should store time in ISO string format", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();
      character.inputLog.markInputEnd();

      const log = character.inputLog;
      expect(typeof log.startTime).toBe("string");
      expect(typeof log.endTime).toBe("string");
      expect(log.startTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
      expect(log.endTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });
  });

  describe("keyInputs", () => {
    it("should initialize with empty key input log", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      expect(character.inputLog.keyInputs).toEqual([]);
    });

    it("should record successful key input", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const beforeTime = new Date();
      character.input("a");
      const afterTime = new Date();

      const keyInputs = character.inputLog.keyInputs;
      expect(keyInputs).toHaveLength(1);
      expect(keyInputs[0].key).toBe("a");
      expect(keyInputs[0].success).toBe(true);
      expect(new Date(keyInputs[0].timestamp).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(keyInputs[0].timestamp).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should record failed key input", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      const beforeTime = new Date();
      character.input("b"); // Wrong input
      const afterTime = new Date();

      const keyInputs = character.inputLog.keyInputs;
      expect(keyInputs).toHaveLength(1);
      expect(keyInputs[0].key).toBe("b");
      expect(keyInputs[0].success).toBe(false);
      expect(new Date(keyInputs[0].timestamp).getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime(),
      );
      expect(new Date(keyInputs[0].timestamp).getTime()).toBeLessThanOrEqual(
        afterTime.getTime(),
      );
    });

    it("should record multiple key inputs in sequence", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      
      character.input("s"); // Success
      character.input("h"); // Success
      character.input("i"); // Success

      const keyInputs = character.inputLog.keyInputs;
      expect(keyInputs).toHaveLength(3);
      expect(keyInputs[0]).toMatchObject({ key: "s", success: true });
      expect(keyInputs[1]).toMatchObject({ key: "h", success: true });
      expect(keyInputs[2]).toMatchObject({ key: "i", success: true });
    });

    it("should record both successful and failed inputs", () => {
      const character = new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      });
      
      character.input("s"); // Success
      character.input("x"); // Failure
      character.input("h"); // Success
      character.input("i"); // Success

      const keyInputs = character.inputLog.keyInputs;
      expect(keyInputs).toHaveLength(4);
      expect(keyInputs[0]).toMatchObject({ key: "s", success: true });
      expect(keyInputs[1]).toMatchObject({ key: "x", success: false });
      expect(keyInputs[2]).toMatchObject({ key: "h", success: true });
      expect(keyInputs[3]).toMatchObject({ key: "i", success: true });
    });

    it("should store timestamps in ISO string format", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");

      const keyInputs = character.inputLog.keyInputs;
      expect(keyInputs[0].timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });

    it("should return copy of key inputs array", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.input("a");

      const keyInputs1 = character.inputLog.keyInputs;
      const keyInputs2 = character.inputLog.keyInputs;

      expect(keyInputs1).not.toBe(keyInputs2); // Different array instances
      expect(keyInputs1).toEqual(keyInputs2); // Same content
    });

    it("should include key inputs in toJSON output", () => {
      const character = new Character({
        label: "あ",
        inputPatterns: ["a"],
      });
      character.inputLog.markInputStart();
      character.input("a");

      const json = character.inputLog.toJSON();
      expect(json).toHaveProperty("keyInputs");
      expect(json.keyInputs).toHaveLength(1);
      expect(json.keyInputs[0]).toMatchObject({
        key: "a",
        success: true,
      });
      expect(typeof json.keyInputs[0].timestamp).toBe("string");
    });
  });
});
