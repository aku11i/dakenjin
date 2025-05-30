import type { Meta, StoryObj } from "@storybook/nextjs";
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
    characters: {
      description: "Array of characters that make up the sentence",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    characters: [],
  },
};

export const SingleCharacter: Story = {
  args: {
    characters: [{ label: "あ" }],
  },
};

export const ShortSentence: Story = {
  args: {
    characters: [
      { label: "こ" },
      { label: "ん" },
      { label: "に" },
      { label: "ち" },
      { label: "は" },
    ],
  },
};

export const LongSentence: Story = {
  args: {
    characters: [
      { label: "わ" },
      { label: "た" },
      { label: "し" },
      { label: "は" },
      { label: "に" },
      { label: "ほ" },
      { label: "ん" },
      { label: "ご" },
      { label: "を" },
      { label: "よ" },
      { label: "み" },
      { label: "ま" },
      { label: "す" },
    ],
  },
};

export const MixedCharacters: Story = {
  args: {
    characters: [
      { label: "わ" },
      { label: "た" },
      { label: "し" },
      { label: "の" },
      { label: "な" },
      { label: "ま" },
      { label: "え" },
    ],
  },
};
