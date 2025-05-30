import { describe, test, expect } from "vitest";
import { fromText } from "./japanese";

describe("fromText", () => {
  test("単一のひらがなを変換する", () => {
    const result = fromText("あ");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("あ");
    expect(result[0].inputPatterns).toEqual(["a"]);
  });

  test("単一のカタカナを変換する", () => {
    const result = fromText("ア");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("ア");
    expect(result[0].inputPatterns).toEqual(["a"]);
  });

  test("複数文字のひらがなを変換する", () => {
    const result = fromText("こんにちは");
    expect(result).toHaveLength(5);
    expect(result[0].label).toBe("こ");
    expect(result[1].label).toBe("ん");
    expect(result[2].label).toBe("に");
    expect(result[3].label).toBe("ち");
    expect(result[4].label).toBe("は");
  });

  test("拗音（2文字組み合わせ）を正しく変換する", () => {
    const result = fromText("しゃ");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("しゃ");
    expect(result[0].inputPatterns).toEqual(["sha", "sya"]);
  });

  test("拗音を含む文字列を変換する", () => {
    const result = fromText("きょう");
    expect(result).toHaveLength(2);
    expect(result[0].label).toBe("きょ");
    expect(result[0].inputPatterns).toEqual(["kyo"]);
    expect(result[1].label).toBe("う");
    expect(result[1].inputPatterns).toEqual(["u"]);
  });

  test("ひらがなとカタカナが混在する文字列を変換する", () => {
    const result = fromText("ひらがなカタカナ");
    expect(result).toHaveLength(8);
    expect(result[0].label).toBe("ひ");
    expect(result[1].label).toBe("ら");
    expect(result[2].label).toBe("が");
    expect(result[3].label).toBe("な");
    expect(result[4].label).toBe("カ");
    expect(result[5].label).toBe("タ");
    expect(result[6].label).toBe("カ");
    expect(result[7].label).toBe("ナ");
  });

  test("複数の入力パターンを持つ文字を変換する", () => {
    const result = fromText("し");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("し");
    expect(result[0].inputPatterns).toEqual(["shi", "si"]);
  });

  test("小さいつを変換する", () => {
    const result = fromText("っ");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("っ");
    expect(result[0].inputPatterns).toEqual(["xtu", "ltu", "xtsu", "ltsu"]);
  });

  test("サポートされていない文字でエラーを投げる", () => {
    expect(() => fromText("hello")).toThrow(
      "Unsupported character: h at position 0",
    );
    expect(() => fromText("あa")).toThrow(
      "Unsupported character: a at position 1",
    );
    expect(() => fromText("123")).toThrow(
      "Unsupported character: 1 at position 0",
    );
  });

  test("空文字列を変換する", () => {
    const result = fromText("");
    expect(result).toHaveLength(0);
  });

  test("長い拗音を含む複雑な文字列を変換する", () => {
    const result = fromText("しゃべりゅう");
    expect(result).toHaveLength(4);
    expect(result[0].label).toBe("しゃ");
    expect(result[1].label).toBe("べ");
    expect(result[2].label).toBe("りゅ");
    expect(result[3].label).toBe("う");
  });
});
