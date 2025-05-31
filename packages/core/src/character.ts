export type InputPatternResolver = (context: {
  prev: Character | null;
  next: Character | null;
}) => string[];

export class Character {
  private _label: string;
  private _inputPatterns: string[];
  private _inputs: string = "";
  private _inputPatternResolver?: InputPatternResolver;

  constructor({
    label,
    inputPatterns,
    inputPatternResolver,
  }: {
    label: string;
    inputPatterns: string[];
    inputPatternResolver?: InputPatternResolver;
  }) {
    if (label.length === 0) {
      throw new Error("Character label cannot be empty");
    }
    if (inputPatterns.length === 0) {
      throw new Error("At least one input pattern is required");
    }
    this._label = label;
    this._inputPatterns = inputPatterns;
    this._inputPatternResolver = inputPatternResolver;
  }

  get label(): string {
    return this._label;
  }

  get inputPatterns(): string[] {
    return this._inputPatterns;
  }

  get preview(): string {
    return this._inputPatterns[0];
  }

  get inputPatternResolver(): InputPatternResolver | undefined {
    return this._inputPatternResolver;
  }

  getInputPatterns(context?: {
    prev: Character | null;
    next: Character | null;
  }): string[] {
    if (this._inputPatternResolver && context) {
      return this._inputPatternResolver(context);
    }
    return this._inputPatterns;
  }

  get inputs(): string {
    return this._inputs;
  }

  input(
    character: string,
    context?: { prev: Character | null; next: Character | null },
  ): boolean {
    if (character.length !== 1) {
      throw new Error("Input must be a single character");
    }

    if (this.isCompleted(context)) {
      throw new Error("Character is already completed");
    }

    const nextInputs = this._inputs + character;
    const patterns = this.getInputPatterns(context);
    const availablePatterns = patterns.filter((pattern) =>
      pattern.startsWith(nextInputs),
    );

    if (availablePatterns.length === 0) {
      return false;
    }

    this._inputs = nextInputs;
    return true;
  }

  isCompleted(context?: {
    prev: Character | null;
    next: Character | null;
  }): boolean {
    const patterns = this.getInputPatterns(context);
    return patterns.includes(this._inputs);
  }

  getAvailablePatterns(context?: {
    prev: Character | null;
    next: Character | null;
  }): string[] {
    const patterns = this.getInputPatterns(context);
    return patterns.filter((pattern) => pattern.startsWith(this._inputs));
  }

  getSuggestions(context?: {
    prev: Character | null;
    next: Character | null;
  }): string[] {
    return this.getAvailablePatterns(context)
      .map((pattern) => pattern.slice(this._inputs.length))
      .filter(Boolean);
  }
}
