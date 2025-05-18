import { Sentence } from "./sentence";

export class Session {
  private _sentences: Sentence[];

  constructor(sentences: Sentence[]) {
    if (sentences.length === 0) {
      throw new Error("Session must have at least one sentence");
    }
    this._sentences = sentences;
  }

  get sentences(): Sentence[] {
    return this._sentences;
  }

  get completedSentences(): Sentence[] {
    return this._sentences.filter((sentence) => sentence.isCompleted());
  }

  get incompletedSentences(): Sentence[] {
    return this._sentences.filter((sentence) => !sentence.isCompleted());
  }

  get currentSentence(): Sentence | null {
    return this._sentences.find((sentence) => !sentence.isCompleted()) ?? null;
  }

  isCompleted(): boolean {
    return this._sentences.every((sentence) => sentence.isCompleted());
  }
}