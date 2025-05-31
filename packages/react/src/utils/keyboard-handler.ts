import type { KeyboardEvent } from "react";

export type KeyboardHandlerOptions = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
};

export function createKeyboardHandler(
  onInput: (key: string) => boolean,
  options: KeyboardHandlerOptions = {},
) {
  const {
    preventDefault = true,
    stopPropagation = false,
    onSuccess,
    onError,
  } = options;

  return (event: KeyboardEvent<HTMLElement>) => {
    if (preventDefault) {
      event.preventDefault();
    }
    if (stopPropagation) {
      event.stopPropagation();
    }

    const isValid = onInput(event.key);

    if (isValid) {
      onSuccess?.();
    } else {
      onError?.();
    }
  };
}
