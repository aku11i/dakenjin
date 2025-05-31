import { describe, it, expect, vi } from "vitest";
import { createKeyboardHandler } from "./keyboard-handler";

describe("createKeyboardHandler", () => {
  it("should call onInput with the key", () => {
    const onInput = vi.fn().mockReturnValue(true);
    const handler = createKeyboardHandler(onInput);

    const event = {
      key: "a",
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as any;

    handler(event);

    expect(onInput).toHaveBeenCalledWith("a");
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();
  });

  it("should call onSuccess when input is valid", () => {
    const onInput = vi.fn().mockReturnValue(true);
    const onSuccess = vi.fn();
    const handler = createKeyboardHandler(onInput, { onSuccess });

    const event = {
      key: "a",
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as any;

    handler(event);

    expect(onSuccess).toHaveBeenCalled();
  });

  it("should call onError when input is invalid", () => {
    const onInput = vi.fn().mockReturnValue(false);
    const onError = vi.fn();
    const handler = createKeyboardHandler(onInput, { onError });

    const event = {
      key: "x",
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as any;

    handler(event);

    expect(onError).toHaveBeenCalled();
  });

  it("should respect preventDefault option", () => {
    const onInput = vi.fn().mockReturnValue(true);
    const handler = createKeyboardHandler(onInput, { preventDefault: false });

    const event = {
      key: "a",
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as any;

    handler(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it("should respect stopPropagation option", () => {
    const onInput = vi.fn().mockReturnValue(true);
    const handler = createKeyboardHandler(onInput, { stopPropagation: true });

    const event = {
      key: "a",
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as any;

    handler(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
