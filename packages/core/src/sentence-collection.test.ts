import { describe, it, expect } from "vitest";
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
});
