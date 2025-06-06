import type { Meta, StoryObj } from "@storybook/nextjs";
import { Character, Sentence } from "@dakenjin/core";
import { TypingDisplay } from "./typing-display";

// Helper function to convert Sentence to TypingDisplay props
function createTypingDisplayProps(
  sentence: Sentence,
  currentInputs: string,
  error: boolean,
) {
  const completedCharacters = sentence.completedCharacters;
  const currentCharacter = sentence.currentCharacter;
  const futureCharacters = currentCharacter
    ? sentence.incompletedCharacters.slice(1)
    : sentence.incompletedCharacters;

  const futureCharacterPreviews = futureCharacters.map((character) => {
    const actualIndex = sentence.characters.findIndex((c) => c === character);
    return actualIndex !== -1
      ? sentence.getCharacterPreview(actualIndex)
      : character.getPreview();
  });

  const currentCharacterPreview = currentCharacter
    ? sentence.getCharacterPreview(
        sentence.characters.findIndex((c) => c === currentCharacter),
      )
    : "";

  return {
    completedCharacters,
    currentCharacter,
    futureCharacters,
    futureCharacterPreviews,
    currentInputs,
    currentCharacterPreview,
    error,
  };
}

const meta: Meta<typeof TypingDisplay> = {
  title: "Features/Typing/TypingDisplay",
  component: TypingDisplay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays the current typing state using explicit props.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    completedCharacters: {
      description: "Array of completed characters",
    },
    currentCharacter: {
      description: "Current character being typed",
    },
    futureCharacters: {
      description: "Array of future characters to be typed",
    },
    futureCharacterPreviews: {
      description: "Preview strings for future characters",
    },
    currentInputs: {
      description: "Current user inputs for the current character",
    },
    currentCharacterPreview: {
      description: "Preview string for the current character",
    },
    error: {
      description: "Whether there is an error in typing",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: createTypingDisplayProps(new Sentence([], ""), "", false),
};

export const SingleCharacter: Story = {
  args: createTypingDisplayProps(
    new Sentence([new Character({ label: "あ", inputPatterns: ["a"] })], "あ"),
    "",
    false,
  ),
};

export const PartiallyTyped: Story = {
  args: createTypingDisplayProps(
    (() => {
      const char = new Character({ label: "き", inputPatterns: ["ki"] });
      char.input("k");
      return new Sentence([char], "き");
    })(),
    "k",
    false,
  ),
};

export const WithError: Story = {
  args: createTypingDisplayProps(
    new Sentence(
      [
        new Character({
          label: "し",
          inputPatterns: ["shi", "si"],
        }),
      ],
      "し",
    ),
    "z",
    true,
  ),
};

export const CompletedCharacters: Story = {
  args: createTypingDisplayProps(
    (() => {
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

      return new Sentence(chars, "ありがと");
    })(),
    "t",
    false,
  ),
};

export const WithFutureCharacters: Story = {
  args: createTypingDisplayProps(
    (() => {
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

      return new Sentence(chars, "こんにちは");
    })(),
    "",
    false,
  ),
};

export const LongSentence: Story = {
  args: createTypingDisplayProps(
    (() => {
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

      return new Sentence(chars, "わたしはにほんごをよみます");
    })(),
    "n",
    false,
  ),
};

export const AllCompleted: Story = {
  args: createTypingDisplayProps(
    (() => {
      const chars = [
        new Character({ label: "す", inputPatterns: ["su"] }),
        new Character({ label: "し", inputPatterns: ["shi", "si"] }),
      ];

      // Complete all characters
      chars[0].input("s");
      chars[0].input("u");
      chars[1].input("s");
      chars[1].input("h");
      chars[1].input("i");

      return new Sentence(chars, "すし");
    })(),
    "",
    false,
  ),
};
