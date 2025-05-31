export class SessionInputLog {
  private _startTime: string | null = null;
  private _endTime: string | null = null;

  get startTime(): string | null {
    return this._startTime;
  }

  get endTime(): string | null {
    return this._endTime;
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

  toJSON(): { startTime: string | null; endTime: string | null } {
    return {
      startTime: this._startTime,
      endTime: this._endTime,
    };
  }
}
