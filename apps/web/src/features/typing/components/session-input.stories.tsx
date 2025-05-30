import type { Meta, StoryObj } from "@storybook/nextjs";
import { SessionInput } from "./session-input";

const meta: Meta<typeof SessionInput> = {
  title: "Features/Typing/SessionInput",
  component: SessionInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A complete typing session component that combines sentence display, typing display, and input handling with progress tracking.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    sentences: {
      description: "Array of sentences to be typed",
    },
    onComplete: {
      description: "Callback function called when the session is completed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSentence: Story = {
  args: {
    sentences: [
      {
        label: "こんにちは",
        characters: [
          { label: "こ", inputPatterns: ["ko"] },
          { label: "ん", inputPatterns: ["n"] },
          { label: "に", inputPatterns: ["ni"] },
          { label: "ち", inputPatterns: ["chi", "ti"] },
          { label: "は", inputPatterns: ["ha", "wa"] },
        ],
      },
    ],
    onComplete: () => console.log("Session completed!"),
  },
};

export const MultipleSentences: Story = {
  args: {
    sentences: [
      {
        label: "こんにちは",
        characters: [
          { label: "こ", inputPatterns: ["ko"] },
          { label: "ん", inputPatterns: ["n"] },
          { label: "に", inputPatterns: ["ni"] },
          { label: "ち", inputPatterns: ["chi", "ti"] },
          { label: "は", inputPatterns: ["ha", "wa"] },
        ],
      },
      {
        label: "ありがとう",
        characters: [
          { label: "あ", inputPatterns: ["a"] },
          { label: "り", inputPatterns: ["ri"] },
          { label: "が", inputPatterns: ["ga"] },
          { label: "と", inputPatterns: ["to"] },
          { label: "う", inputPatterns: ["u"] },
        ],
      },
      {
        label: "さようなら",
        characters: [
          { label: "さ", inputPatterns: ["sa"] },
          { label: "よ", inputPatterns: ["yo"] },
          { label: "う", inputPatterns: ["u"] },
          { label: "な", inputPatterns: ["na"] },
          { label: "ら", inputPatterns: ["ra"] },
        ],
      },
    ],
    onComplete: () => console.log("All sentences completed!"),
  },
};

export const LongSentence: Story = {
  args: {
    sentences: [
      {
        label: "わたしはにほんごをよみます",
        characters: [
          { label: "わ", inputPatterns: ["wa"] },
          { label: "た", inputPatterns: ["ta"] },
          { label: "し", inputPatterns: ["shi", "si"] },
          { label: "は", inputPatterns: ["ha", "wa"] },
          { label: "に", inputPatterns: ["ni"] },
          { label: "ほ", inputPatterns: ["ho"] },
          { label: "ん", inputPatterns: ["n"] },
          { label: "ご", inputPatterns: ["go"] },
          { label: "を", inputPatterns: ["wo", "o"] },
          { label: "よ", inputPatterns: ["yo"] },
          { label: "み", inputPatterns: ["mi"] },
          { label: "ま", inputPatterns: ["ma"] },
          { label: "す", inputPatterns: ["su"] },
        ],
      },
    ],
    onComplete: () => console.log("Long sentence completed!"),
  },
};

export const EmptySentences: Story = {
  args: {
    sentences: [],
    onComplete: () => console.log("No sentences to complete!"),
  },
};