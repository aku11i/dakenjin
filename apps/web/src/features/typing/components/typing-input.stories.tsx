import type { Meta, StoryObj } from "@storybook/nextjs";
import { TypingInput } from "./typing-input";

const meta: Meta<typeof TypingInput> = {
  title: "Features/Typing/TypingInput",
  component: TypingInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A hidden input component that handles keyboard input for typing practice. Shows a start button when not focused and handles validation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "Current input value",
    },
    onInput: {
      description: "Function called when a character is typed, returns validation result",
    },
    onComplete: {
      description: "Callback function called when typing is completed",
    },
    isCompleted: {
      description: "Whether the typing session is completed",
    },
    onError: {
      description: "Callback function called when there is a typing error",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    value: "",
    onInput: (character: string) => {
      console.log("Input:", character);
      return true;
    },
    isCompleted: false,
    onComplete: () => console.log("Completed!"),
    onError: () => console.log("Error occurred!"),
  },
};

export const WithValue: Story = {
  args: {
    value: "konni",
    onInput: (character: string) => {
      console.log("Input:", character);
      return character === "c";
    },
    isCompleted: false,
    onComplete: () => console.log("Completed!"),
    onError: () => console.log("Error occurred!"),
  },
};

export const Completed: Story = {
  args: {
    value: "konnichiwa",
    onInput: () => false,
    isCompleted: true,
    onComplete: () => console.log("Already completed!"),
    onError: () => console.log("Error occurred!"),
  },
};

export const WithErrorHandling: Story = {
  args: {
    value: "kon",
    onInput: (character: string) => {
      console.log("Input:", character);
      if (character === "n") return true;
      console.log("Invalid input:", character);
      return false;
    },
    isCompleted: false,
    onComplete: () => console.log("Completed!"),
    onError: () => {
      console.log("Error feedback triggered!");
      alert("入力エラーが発生しました！");
    },
  },
};