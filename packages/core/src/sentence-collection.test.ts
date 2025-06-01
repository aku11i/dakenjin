import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SentenceCollection } from "./sentence-collection";
import { createSentenceFactory } from "./sentence-factory";

describe("SentenceCollection", () => {
  const factory = createSentenceFactory();

  it("should create a sentence collection with name, description, and sentences", () => {
    const sentences = [
      factory.fromText("こんにちは"),
      factory.fromText("ありがとう"),
    ];

    const collection = new SentenceCollection({
      name: "基本的な挨拶",
      description: "日常的に使われる基本的な挨拶の練習",
      sentences,
    });

    expect(collection.name).toBe("基本的な挨拶");
    expect(collection.description).toBe("日常的に使われる基本的な挨拶の練習");
    expect(collection.sentences).toEqual(sentences);
    expect(collection.sentences.length).toBe(2);
  });

  it("should handle empty sentences array", () => {
    const collection = new SentenceCollection({
      name: "空のコレクション",
      description: "文章が含まれていないコレクション",
      sentences: [],
    });

    expect(collection.name).toBe("空のコレクション");
    expect(collection.description).toBe("文章が含まれていないコレクション");
    expect(collection.sentences).toEqual([]);
    expect(collection.sentences.length).toBe(0);
  });

  it("should maintain sentence order", () => {
    const sentence1 = factory.fromText("あいうえお");
    const sentence2 = factory.fromText("かきくけこ");
    const sentence3 = factory.fromText("さしすせそ");

    const collection = new SentenceCollection({
      name: "五十音順",
      description: "五十音の順序で並んだ文章",
      sentences: [sentence1, sentence2, sentence3],
    });

    expect(collection.sentences[0]).toBe(sentence1);
    expect(collection.sentences[1]).toBe(sentence2);
    expect(collection.sentences[2]).toBe(sentence3);
  });

  describe("pick", () => {
    let mockRandom: any;

    beforeEach(() => {
      mockRandom = vi.spyOn(Math, "random");
    });

    afterEach(() => {
      mockRandom.mockRestore();
    });

    it("should return all sentences when count is greater than available sentences", () => {
      const collection1 = new SentenceCollection({
        name: "Collection 1",
        description: "Test collection 1",
        sentences: [
          factory.fromText("あいうえお"),
          factory.fromText("かきくけこ"),
        ],
      });

      const collection2 = new SentenceCollection({
        name: "Collection 2",
        description: "Test collection 2",
        sentences: [factory.fromText("さしすせそ")],
      });

      const result = SentenceCollection.pick([collection1, collection2], 5);

      expect(result).toHaveLength(3);
      expect(result.map((s) => s.label)).toEqual([
        "あいうえお",
        "かきくけこ",
        "さしすせそ",
      ]);
    });

    it("should pick random sentences without duplication", () => {
      const collection = new SentenceCollection({
        name: "Test Collection",
        description: "Test collection",
        sentences: [
          factory.fromText("あいうえお"),
          factory.fromText("かきくけこ"),
          factory.fromText("さしすせそ"),
          factory.fromText("たちつてと"),
          factory.fromText("なにぬねの"),
        ],
      });

      mockRandom
        .mockReturnValueOnce(0.1) // index 0
        .mockReturnValueOnce(0.9) // index 4
        .mockReturnValueOnce(0.5); // index 2

      const result = SentenceCollection.pick([collection], 3);

      expect(result).toHaveLength(3);
      expect(result.map((s) => s.label)).toEqual([
        "あいうえお",
        "なにぬねの",
        "さしすせそ",
      ]);
    });

    it("should handle duplicate random indices correctly", () => {
      const collection = new SentenceCollection({
        name: "Test Collection",
        description: "Test collection",
        sentences: [
          factory.fromText("あいうえお"),
          factory.fromText("かきくけこ"),
          factory.fromText("さしすせそ"),
        ],
      });

      mockRandom
        .mockReturnValueOnce(0.1) // index 0
        .mockReturnValueOnce(0.1) // index 0 (duplicate, should be skipped)
        .mockReturnValueOnce(0.5) // index 1
        .mockReturnValueOnce(0.9); // index 2

      const result = SentenceCollection.pick([collection], 3);

      expect(result).toHaveLength(3);
      expect(result.map((s) => s.label)).toEqual([
        "あいうえお",
        "かきくけこ",
        "さしすせそ",
      ]);
    });

    it("should pick from multiple collections", () => {
      const collection1 = new SentenceCollection({
        name: "Collection 1",
        description: "Test collection 1",
        sentences: [
          factory.fromText("あいうえお"),
          factory.fromText("かきくけこ"),
        ],
      });

      const collection2 = new SentenceCollection({
        name: "Collection 2",
        description: "Test collection 2",
        sentences: [
          factory.fromText("さしすせそ"),
          factory.fromText("たちつてと"),
        ],
      });

      mockRandom
        .mockReturnValueOnce(0.1) // index 0 (Collection 1 - Sentence 1)
        .mockReturnValueOnce(0.7) // index 2 (Collection 2 - Sentence 1)
        .mockReturnValueOnce(0.9); // index 3 (Collection 2 - Sentence 2)

      const result = SentenceCollection.pick([collection1, collection2], 3);

      expect(result).toHaveLength(3);
      expect(result.map((s) => s.label)).toEqual([
        "あいうえお",
        "さしすせそ",
        "たちつてと",
      ]);
    });

    it("should return empty array when count is 0", () => {
      const collection = new SentenceCollection({
        name: "Test Collection",
        description: "Test collection",
        sentences: [
          factory.fromText("あいうえお"),
          factory.fromText("かきくけこ"),
        ],
      });

      const result = SentenceCollection.pick([collection], 0);

      expect(result).toHaveLength(0);
    });

    it("should handle empty collections array", () => {
      const result = SentenceCollection.pick([], 5);

      expect(result).toHaveLength(0);
    });
  });
});
