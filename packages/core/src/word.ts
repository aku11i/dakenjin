export class Word {
  private _label: string;
  private _ruby: string;
  private _inputPatterns: string[];
  private _inputs: string = "";

  constructor({
    label,
    ruby,
    inputPatterns,
  }: {
    label: string;
    ruby?: string;
    inputPatterns: string[];
  }) {
    this._label = label;
    this._ruby = ruby || "";
    this._inputPatterns = inputPatterns;
  }

  get label(): string {
    return this._label;
  }

  get ruby(): string {
    return this._ruby;
  }

  input(input: string): boolean {
    if (this.isCompleted()) {
      throw new Error("Word is already completed");
    }

    if (this.getAvailableInputPatterns(input).length === 0) {
      return false;
    }

    this._inputs += input;
    return true;
  }

  getSuggestions(): string[] {
    return this.getAvailableInputPatterns()
      .map((pattern) => pattern.slice(this._inputs.length))
      .filter(Boolean);
  }

  getAvailableInputPatterns(input?: string): string[] {
    const inputs = this._inputs + (input ?? "");

    return this._inputPatterns.filter((pattern) => pattern.startsWith(inputs));
  }

  isCompleted(): boolean {
    return this._inputPatterns.includes(this._inputs);
  }
}
