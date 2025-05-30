import type { Meta, StoryObj } from "@storybook/nextjs";
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: null,
    currentInputs: "",
    suggestions: [],
    error: false,
    futureCharacters: [],
  },
};

export const SingleCharacter: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: { label: "あ" },
    currentInputs: "",
    suggestions: ["a"],
    error: false,
    futureCharacters: [],
  },
};

export const PartiallyTyped: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: { label: "き" },
    currentInputs: "k",
    suggestions: ["ki"],
    error: false,
    futureCharacters: [],
  },
};

export const WithError: Story = {
  args: {
    completedCharacters: [],
    currentCharacter: { label: "し" },
    currentInputs: "z",
    suggestions: ["shi", "si"],
    error: true,
    futureCharacters: [],
  },
};

export const CompletedCharacters: Story = {
  args: {
    completedCharacters: [{ inputs: "a" }, { inputs: "ri" }, { inputs: "ga" }],
    currentCharacter: { label: "と" },
    currentInputs: "t",
    suggestions: ["to"],
    error: false,
    futureCharacters: [],
  },
};

export const WithFutureCharacters: Story = {
  args: {
    completedCharacters: [{ inputs: "ko" }, { inputs: "n" }],
    currentCharacter: { label: "に" },
    currentInputs: "",
    suggestions: ["ni"],
    error: false,
    futureCharacters: [
      { getSuggestions: () => ["chi"] },
      { getSuggestions: () => ["wa"] },
    ],
  },
};

export const LongSentence: Story = {
  args: {
    completedCharacters: [
      { inputs: "wa" },
      { inputs: "ta" },
      { inputs: "shi" },
      { inputs: "wa" },
    ],
    currentCharacter: { label: "に" },
    currentInputs: "n",
    suggestions: ["ni"],
    error: false,
    futureCharacters: [
      { getSuggestions: () => ["ho"] },
      { getSuggestions: () => ["n"] },
      { getSuggestions: () => ["go"] },
      { getSuggestions: () => ["wo"] },
      { getSuggestions: () => ["yo"] },
      { getSuggestions: () => ["mi"] },
      { getSuggestions: () => ["ma"] },
      { getSuggestions: () => ["su"] },
    ],
  },
};
