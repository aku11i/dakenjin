import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sentence } from "@dakenjin/core";
import { fromText } from "@dakenjin/core/src/characters/japanese";
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
      description: "Array of Sentence instances to be typed",
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
    sentences: [new Sentence(fromText("こんにちは"), "こんにちは")],
    onComplete: () => console.log("Session completed!"),
  },
};

export const MultipleSentences: Story = {
  args: {
    sentences: [
      new Sentence(fromText("こんにちは"), "こんにちは"),
      new Sentence(fromText("ありがとう"), "ありがとう"),
      new Sentence(fromText("さようなら"), "さようなら"),
    ],
    onComplete: () => console.log("All sentences completed!"),
  },
};

export const LongSentence: Story = {
  args: {
    sentences: [
      new Sentence(
        fromText("わたしはにほんごをよみます"),
        "わたしはにほんごをよみます",
      ),
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
