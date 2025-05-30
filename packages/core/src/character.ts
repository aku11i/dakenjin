export class Character {
  private _label: string;
  private _inputPatterns: string[];
  private _inputs: string = "";

  constructor({
    label,
    inputPatterns,
  }: {
    label: string;
    inputPatterns: string[];
  }) {
    if (label.length === 0) {
      throw new Error("Character label cannot be empty");
    }
    if (inputPatterns.length === 0) {
      throw new Error("At least one input pattern is required");
    }
    this._label = label;
    this._inputPatterns = inputPatterns;
  }

  get label(): string {
    return this._label;
  }

  get inputPatterns(): string[] {
    return this._inputPatterns;
  }

  get inputs(): string {
    return this._inputs;
  }

  input(character: string): boolean {
    if (character.length !== 1) {
      throw new Error("Input must be a single character");
    }

    if (this.isCompleted()) {
      throw new Error("Character is already completed");
    }

    const nextInputs = this._inputs + character;
    const availablePatterns = this._inputPatterns.filter(pattern => 
      pattern.startsWith(nextInputs)
    );

    if (availablePatterns.length === 0) {
      return false;
    }

    this._inputs = nextInputs;
    return true;
  }

  isCompleted(): boolean {
    return this._inputPatterns.includes(this._inputs);
  }

  getAvailablePatterns(): string[] {
    return this._inputPatterns.filter(pattern => 
      pattern.startsWith(this._inputs)
    );
  }

  getSuggestions(): string[] {
    return this.getAvailablePatterns()
      .map(pattern => pattern.slice(this._inputs.length))
      .filter(Boolean);
  }
}
