import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sentence, Character, createSentenceFactory } from "@dakenjin/core";
import { SentenceDisplay } from "./sentence-display";

const meta: Meta<typeof SentenceDisplay> = {
  title: "Features/Typing/SentenceDisplay",
  component: SentenceDisplay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays the sentence characters in both Japanese and corresponding hiragana/katakana.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    sentence: {
      description: "Sentence instance to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    sentence: new Sentence([], "empty sentence"),
  },
};

export const SingleCharacter: Story = {
  args: {
    sentence: new Sentence(
      [new Character({ label: "あ", inputPatterns: ["a"] })],
      "あ",
    ),
  },
};

const factory = createSentenceFactory();

export const ShortSentence: Story = {
  args: {
    sentence: factory.fromText("こんにちは"),
  },
};

export const LongSentence: Story = {
  args: {
    sentence: factory.fromText("わたしはにほんごをよみます"),
  },
};

export const MixedCharacters: Story = {
  args: {
    sentence: factory.fromText("わたしのなまえ"),
  },
};
