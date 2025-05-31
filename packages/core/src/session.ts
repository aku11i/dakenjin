import { Sentence } from "./sentence";
import { SessionInputLog } from "./session-input-log";

export class Session {
  private _sentences: Sentence[];
  private _inputLog: SessionInputLog = new SessionInputLog();
  private _isStarted: boolean = false;

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
    const completed = this._sentences.every((sentence) =>
      sentence.isCompleted(),
    );

    // Mark session end when all sentences are completed
    if (completed && this._inputLog.endTime === null) {
      this._inputLog.markInputEnd();
    }

    return completed;
  }

  get inputLog(): SessionInputLog {
    return this._inputLog;
  }

  get isStarted(): boolean {
    return this._isStarted;
  }

  start(): void {
    this._isStarted = true;
    if (this._inputLog.startTime === null) {
      this._inputLog.markInputStart();
    }
  }
}
