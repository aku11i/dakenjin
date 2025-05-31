export type KeyInputEntry = {
  key: string;
  timestamp: string;
  success: boolean;
};

export class CharacterInputLog {
  private _startTime: string | null = null;
  private _endTime: string | null = null;
  private _keyInputs: KeyInputEntry[] = [];

  get startTime(): string | null {
    return this._startTime;
  }

  get endTime(): string | null {
    return this._endTime;
  }

  get keyInputs(): KeyInputEntry[] {
    return [...this._keyInputs];
  }

  markInputStart(): void {
    if (this._startTime === null) {
      this._startTime = new Date().toISOString();
    }
  }

  markInputEnd(): void {
    if (this._endTime === null) {
      this._endTime = new Date().toISOString();
    }
  }

  recordKeyInput(key: string, success: boolean): void {
    this._keyInputs.push({
      key,
      timestamp: new Date().toISOString(),
      success,
    });
  }

  toJSON(): {
    startTime: string | null;
    endTime: string | null;
    keyInputs: KeyInputEntry[];
  } {
    return {
      startTime: this._startTime,
      endTime: this._endTime,
      keyInputs: this._keyInputs,
    };
  }
}
