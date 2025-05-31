import type { Meta, StoryObj } from "@storybook/nextjs";
import { Character } from "@dakenjin/core";
import { TypingDisplay } from "./typing-display";

const meta: Meta<typeof TypingDisplay> = {
  title: "Features/Typing/TypingDisplay",
  component: TypingDisplay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays the current typing state including completed, current, and future characters.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    completedCharacters: {
      description: "Array of completed characters with their inputs",
    },
    currentCharacter: {
      description: "Current character being typed",
    },
    currentInputs: {
      description: "Current user inputs for the character",
    },
    suggestions: {
      description: "Array of suggestions for the current character",
    },
    error: {
      description: "Whether there is an error in typing",
    },
    futureCharacters: {
      description: "Array of future characters to be typed",
    },
    getFutureCharacterPreview: {
      description: "Function to get preview for future characters with context",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultGetFutureCharacterPreview = (character: Character) =>
  character.getPreview();

export const Empty: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: null,
    currentInputs: "",
    suggestions: [],
    error: false,
    futureCharacters: [],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};

export const SingleCharacter: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: new Character({ label: "あ", inputPatterns: ["a"] }),
    currentInputs: "",
    suggestions: ["a"],
    error: false,
    futureCharacters: [],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};

export const PartiallyTyped: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: new Character({ label: "き", inputPatterns: ["ki"] }),
    currentInputs: "k",
    suggestions: ["ki"],
    error: false,
    futureCharacters: [],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};

export const WithError: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: new Character({
      label: "し",
      inputPatterns: ["shi", "si"],
    }),
    currentInputs: "z",
    suggestions: ["shi", "si"],
    error: true,
    futureCharacters: [],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};

export const CompletedCharacters: Story = {
  args: {
    completedCharacters: [
      (() => {
        const char = new Character({ label: "あ", inputPatterns: ["a"] });
        char.input("a");
        return char;
      })(),
      (() => {
        const char = new Character({ label: "り", inputPatterns: ["ri"] });
        char.input("r");
        char.input("i");
        return char;
      })(),
      (() => {
        const char = new Character({ label: "が", inputPatterns: ["ga"] });
        char.input("g");
        char.input("a");
        return char;
      })(),
    ],
    currentCharacter: new Character({ label: "と", inputPatterns: ["to"] }),
    currentInputs: "t",
    suggestions: ["to"],
    error: false,
    futureCharacters: [],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};

export const WithFutureCharacters: Story = {
  args: {
    completedCharacters: [
      (() => {
        const char = new Character({ label: "こ", inputPatterns: ["ko"] });
        char.input("k");
        char.input("o");
        return char;
      })(),
      (() => {
        const char = new Character({ label: "ん", inputPatterns: ["n", "nn"] });
        char.input("n");
        return char;
      })(),
    ],
    currentCharacter: new Character({ label: "に", inputPatterns: ["ni"] }),
    currentInputs: "",
    suggestions: ["ni"],
    error: false,
    futureCharacters: [
      new Character({ label: "ち", inputPatterns: ["chi", "ti"] }),
      new Character({ label: "は", inputPatterns: ["wa", "ha"] }),
    ],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};

export const LongSentence: Story = {
  args: {
    completedCharacters: [
      (() => {
        const char = new Character({ label: "わ", inputPatterns: ["wa"] });
        char.input("w");
        char.input("a");
        return char;
      })(),
      (() => {
        const char = new Character({ label: "た", inputPatterns: ["ta"] });
        char.input("t");
        char.input("a");
        return char;
      })(),
      (() => {
        const char = new Character({
          label: "し",
          inputPatterns: ["shi", "si"],
        });
        char.input("s");
        char.input("h");
        char.input("i");
        return char;
      })(),
      (() => {
        const char = new Character({
          label: "は",
          inputPatterns: ["ha", "wa"],
        });
        char.input("w");
        char.input("a");
        return char;
      })(),
    ],
    currentCharacter: new Character({ label: "に", inputPatterns: ["ni"] }),
    currentInputs: "n",
    suggestions: ["ni"],
    error: false,
    futureCharacters: [
      new Character({ label: "ほ", inputPatterns: ["ho"] }),
      new Character({ label: "ん", inputPatterns: ["n", "nn"] }),
      new Character({ label: "ご", inputPatterns: ["go"] }),
      new Character({ label: "を", inputPatterns: ["wo"] }),
      new Character({ label: "よ", inputPatterns: ["yo"] }),
      new Character({ label: "み", inputPatterns: ["mi"] }),
      new Character({ label: "ま", inputPatterns: ["ma"] }),
      new Character({ label: "す", inputPatterns: ["su"] }),
    ],
    getFutureCharacterPreview: defaultGetFutureCharacterPreview,
  },
};
