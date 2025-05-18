import { Word } from "./word";

export class Sentence {
  private _words: Word[];

  constructor(words: Word[]) {
    this._words = words;
  }

  get words(): Word[] {
    return this._words;
  }

  get currentWord(): Word | null {
    return this._words.find((word) => !word.isCompleted()) ?? null;
  }

  get completedWords(): Word[] {
    return this._words.filter((word) => word.isCompleted());
  }

  get remainingWords(): Word[] {
    return this._words.filter((word) => !word.isCompleted());
  }

  isCompleted(): boolean {
    return this._words.every((word) => word.isCompleted());
  }

  input(character: string): boolean {
    if (character.length !== 1) {
      throw new Error("Input must be a single character");
    }

    const currentWord = this.currentWord;

    if (!currentWord) {
      throw new Error("No current word to input into");
    }

    return currentWord.input(character);
  }
}
