import type { Meta, StoryObj } from "@storybook/nextjs";
import { Character, CharacterSet } from "@dakenjin/core";
import { TypingDisplay } from "./typing-display";

const meta: Meta<typeof TypingDisplay> = {
  title: "Features/Typing/TypingDisplay",
  component: TypingDisplay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays the current typing state using a CharacterSet.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    characterSet: {
      description: "CharacterSet containing all character state information",
    },
    currentInputs: {
      description: "Current user inputs for the current character",
    },
    error: {
      description: "Whether there is an error in typing",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    characterSet: new CharacterSet([]),
    currentInputs: "",
    error: false,
  },
};

export const SingleCharacter: Story = {
  args: {
    characterSet: new CharacterSet([
      new Character({ label: "あ", inputPatterns: ["a"] }),
    ]),
    currentInputs: "",
    error: false,
  },
};

export const PartiallyTyped: Story = {
  args: {
    characterSet: (() => {
      const char = new Character({ label: "き", inputPatterns: ["ki"] });
      char.input("k");
      return new CharacterSet([char]);
    })(),
    currentInputs: "k",
    error: false,
  },
};

export const WithError: Story = {
  args: {
    characterSet: new CharacterSet([
      new Character({
        label: "し",
        inputPatterns: ["shi", "si"],
      }),
    ]),
    currentInputs: "z",
    error: true,
  },
};

export const CompletedCharacters: Story = {
  args: {
    characterSet: (() => {
      const chars = [
        new Character({ label: "あ", inputPatterns: ["a"] }),
        new Character({ label: "り", inputPatterns: ["ri"] }),
        new Character({ label: "が", inputPatterns: ["ga"] }),
        new Character({ label: "と", inputPatterns: ["to"] }),
      ];

      // Complete first three characters
      chars[0].input("a");
      chars[1].input("r");
      chars[1].input("i");
      chars[2].input("g");
      chars[2].input("a");

      // Partially type the fourth character
      chars[3].input("t");

      return new CharacterSet(chars);
    })(),
    currentInputs: "t",
    error: false,
  },
};

export const WithFutureCharacters: Story = {
  args: {
    characterSet: (() => {
      const chars = [
        new Character({ label: "こ", inputPatterns: ["ko"] }),
        new Character({ label: "ん", inputPatterns: ["nn", "n"] }),
        new Character({ label: "に", inputPatterns: ["ni"] }),
        new Character({ label: "ち", inputPatterns: ["chi", "ti"] }),
        new Character({ label: "は", inputPatterns: ["wa", "ha"] }),
      ];

      // Complete first two characters
      chars[0].input("k");
      chars[0].input("o");
      chars[1].input("n");
      chars[1].input("n");

      return new CharacterSet(chars);
    })(),
    currentInputs: "",
    error: false,
  },
};

export const LongSentence: Story = {
  args: {
    characterSet: (() => {
      const chars = [
        new Character({ label: "わ", inputPatterns: ["wa"] }),
        new Character({ label: "た", inputPatterns: ["ta"] }),
        new Character({ label: "し", inputPatterns: ["shi", "si"] }),
        new Character({ label: "は", inputPatterns: ["ha", "wa"] }),
        new Character({ label: "に", inputPatterns: ["ni"] }),
        new Character({ label: "ほ", inputPatterns: ["ho"] }),
        new Character({ label: "ん", inputPatterns: ["nn", "n"] }),
        new Character({ label: "ご", inputPatterns: ["go"] }),
        new Character({ label: "を", inputPatterns: ["wo"] }),
        new Character({ label: "よ", inputPatterns: ["yo"] }),
        new Character({ label: "み", inputPatterns: ["mi"] }),
        new Character({ label: "ま", inputPatterns: ["ma"] }),
        new Character({ label: "す", inputPatterns: ["su"] }),
      ];

      // Complete first four characters
      chars[0].input("w");
      chars[0].input("a");
      chars[1].input("t");
      chars[1].input("a");
      chars[2].input("s");
      chars[2].input("h");
      chars[2].input("i");
      chars[3].input("w");
      chars[3].input("a");

      // Partially type the fifth character
      chars[4].input("n");

      return new CharacterSet(chars);
    })(),
    currentInputs: "n",
    error: false,
  },
};
