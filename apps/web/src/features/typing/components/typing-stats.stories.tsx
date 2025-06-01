import type { Meta, StoryObj } from "@storybook/nextjs";
import { TypingStatsDisplay } from "./typing-stats";
import { Session, Sentence, Character } from "@dakenjin/core";

const meta: Meta<typeof TypingStatsDisplay> = {
  title: "Features/Typing/TypingStatsDisplay",
  component: TypingStatsDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    session: createSession(),
  },
};

export const Completed: Story = {
  args: {
    session: createCompletedSession(),
  },
};

export const WithErrors: Story = {
  args: {
    session: createSessionWithErrors(),
  },
};

function createSession(): Session {
  const characters = [
    new Character({ label: "あ", inputPatterns: ["a"] }),
    new Character({ label: "い", inputPatterns: ["i"] }),
    new Character({ label: "う", inputPatterns: ["u"] }),
  ];
  const sentence = new Sentence(characters, "あいう");
  return new Session([sentence]);
}

function createCompletedSession(): Session {
  const session = createSession();

  const currentSentence = session.currentSentence;
  const sentence = currentSentence!;
  void sentence.currentCharacter;
  sentence.inputCurrentCharacter("a");
  sentence.inputCurrentCharacter("i");
  sentence.inputCurrentCharacter("u");

  session.isCompleted();

  return session;
}

function createSessionWithErrors(): Session {
  const session = createSession();

  const currentSentence = session.currentSentence;
  const sentence = currentSentence!;
  void sentence.currentCharacter;

  const character = sentence.currentCharacter!;
  character.inputLog.recordKeyInput("x", false);
  character.inputLog.recordKeyInput("y", false);
  sentence.inputCurrentCharacter("a");

  return session;
}
