import { describe, test, expect } from "vitest";
import { createSentenceFactory } from "../sentence-factory";

describe("fromJapaneseText", () => {
  test("単一のひらがなを変換する", () => {
    const result = createSentenceFactory().fromText("あ");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("あ");
    expect(result.characters[0].inputPatterns).toEqual(["a"]);
  });

  test("単一のカタカナを変換する", () => {
    const result = createSentenceFactory().fromText("ア");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("ア");
    expect(result.characters[0].inputPatterns).toEqual(["a"]);
  });

  test("複数文字のひらがなを変換する", () => {
    const result = createSentenceFactory().fromText("こんにちは");
    expect(result.characters).toHaveLength(5);
    expect(result.characters[0].label).toBe("こ");
    expect(result.characters[1].label).toBe("ん");
    expect(result.characters[2].label).toBe("に");
    expect(result.characters[3].label).toBe("ち");
    expect(result.characters[4].label).toBe("は");
  });

  test("拗音（2文字組み合わせ）を正しく変換する", () => {
    const result = createSentenceFactory().fromText("しゃ");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("しゃ");
    expect(result.characters[0].inputPatterns).toEqual(["sya", "sha"]);
  });

  test("拗音を含む文字列を変換する", () => {
    const result = createSentenceFactory().fromText("きょう");
    expect(result.characters).toHaveLength(2);
    expect(result.characters[0].label).toBe("きょ");
    expect(result.characters[0].inputPatterns).toEqual(["kyo"]);
    expect(result.characters[1].label).toBe("う");
    expect(result.characters[1].inputPatterns).toEqual(["u"]);
  });

  test("ひらがなとカタカナが混在する文字列を変換する", () => {
    const result = createSentenceFactory().fromText("ひらがなカタカナ");
    expect(result.characters).toHaveLength(8);
    expect(result.characters[0].label).toBe("ひ");
    expect(result.characters[1].label).toBe("ら");
    expect(result.characters[2].label).toBe("が");
    expect(result.characters[3].label).toBe("な");
    expect(result.characters[4].label).toBe("カ");
    expect(result.characters[5].label).toBe("タ");
    expect(result.characters[6].label).toBe("カ");
    expect(result.characters[7].label).toBe("ナ");
  });

  test("複数の入力パターンを持つ文字を変換する", () => {
    const result = createSentenceFactory().fromText("し");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("し");
    expect(result.characters[0].inputPatterns).toEqual(["si", "shi"]);
  });

  test("小さいつを変換する", () => {
    const result = createSentenceFactory().fromText("っ");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("っ");
    expect(result.characters[0].inputPatterns).toEqual([
      "xtu",
      "ltu",
      "xtsu",
      "ltsu",
    ]);
  });

  test("サポートされていない文字でエラーを投げる", () => {
    expect(() => createSentenceFactory().fromText("hello")).toThrow(
      "Unsupported character: h at position 0",
    );
    expect(() => createSentenceFactory().fromText("あa")).toThrow(
      "Unsupported character: a at position 1",
    );
    expect(() => createSentenceFactory().fromText("123")).toThrow(
      "Unsupported character: 1 at position 0",
    );
  });

  test("空文字列を変換する", () => {
    const result = createSentenceFactory().fromText("");
    expect(result.characters).toHaveLength(0);
  });

  test("長い拗音を含む複雑な文字列を変換する", () => {
    const result = createSentenceFactory().fromText("しゃべりゅう");
    expect(result.characters).toHaveLength(4);
    expect(result.characters[0].label).toBe("しゃ");
    expect(result.characters[1].label).toBe("べ");
    expect(result.characters[2].label).toBe("りゅ");
    expect(result.characters[3].label).toBe("う");
  });

  test("てぃ（ひらがな）を変換する", () => {
    const result = createSentenceFactory().fromText("てぃ");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("てぃ");
    expect(result.characters[0].inputPatterns).toEqual(["thi", "texi", "teli"]);
  });

  test("ティ（カタカナ）を変換する", () => {
    const result = createSentenceFactory().fromText("ティ");
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].label).toBe("ティ");
    expect(result.characters[0].inputPatterns).toEqual(["thi", "texi", "teli"]);
  });

  test("てぃ/ティを含む単語を変換する", () => {
    const result = createSentenceFactory().fromText("パーティー");
    expect(result.characters).toHaveLength(4);
    expect(result.characters[0].label).toBe("パ");
    expect(result.characters[1].label).toBe("ー");
    expect(result.characters[2].label).toBe("ティ");
    expect(result.characters[2].inputPatterns).toEqual(["thi", "texi", "teli"]);
    expect(result.characters[3].label).toBe("ー");
  });
});
