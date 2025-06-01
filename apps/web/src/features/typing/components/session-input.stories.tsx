import type { Meta, StoryObj } from "@storybook/nextjs";
import { createSentenceFactory } from "@dakenjin/core";
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

const factory = createSentenceFactory();

export const SingleSentence: Story = {
  args: {
    sentences: [factory.fromText("こんにちは")],
    onComplete: () => console.log("Session completed!"),
  },
};

export const MultipleSentences: Story = {
  args: {
    sentences: [
      factory.fromText("こんにちは"),
      factory.fromText("ありがとう"),
      factory.fromText("さようなら"),
    ],
    onComplete: () => console.log("All sentences completed!"),
  },
};

export const LongSentence: Story = {
  args: {
    sentences: [factory.fromText("わたしはにほんごをよみます")],
    onComplete: () => console.log("Long sentence completed!"),
  },
};

export const EmptySentences: Story = {
  args: {
    sentences: [],
    onComplete: () => console.log("No sentences to complete!"),
  },
};
