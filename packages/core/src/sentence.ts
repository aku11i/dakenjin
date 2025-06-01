import { Character } from "./character";
import { SentenceInputLog } from "./sentence-input-log";

export class Sentence {
  private _characters: Character[];
  private _label: string;
  private _inputLog: SentenceInputLog = new SentenceInputLog();

  constructor(characters: Character[], label: string) {
    this._characters = characters;
    this._label = label;
  }

  get characters(): Character[] {
    return this._characters;
  }

  get label(): string {
    return this._label;
  }

  get currentCharacter(): Character | null {
    const current =
      this._characters.find((character, index) => {
        const context = this.getContext(index);
        return !character.isCompleted(context);
      }) ?? null;

    if (current && current.inputLog.startTime === null) {
      current.inputLog.markInputStart();
    }

    // Mark sentence start when first character becomes current
    if (current && this._inputLog.startTime === null) {
      this._inputLog.markInputStart();
    }

    return current;
  }

  get currentCharacterIndex(): number {
    return this._characters.findIndex((character, index) => {
      const context = this.getContext(index);
      return !character.isCompleted(context);
    });
  }

  get completedCharacters(): Character[] {
    return this._characters.filter((character, index) => {
      const context = this.getContext(index);
      return character.isCompleted(context);
    });
  }

  get incompletedCharacters(): Character[] {
    return this._characters.filter((character, index) => {
      const context = this.getContext(index);
      return !character.isCompleted(context);
    });
  }

  isCompleted(): boolean {
    return this._characters.every((character, index) => {
      const context = this.getContext(index);
      return character.isCompleted(context);
    });
  }

  inputCurrentCharacter(character: string): boolean {
    const currentIndex = this.currentCharacterIndex;
    if (currentIndex === -1) {
      return false;
    }

    const currentChar = this._characters[currentIndex];
    const context = this.getContext(currentIndex);
    const result = currentChar.input(character, context);

    // Mark sentence end when all characters are completed
    if (result && this.isCompleted()) {
      this._inputLog.markInputEnd();
    }

    return result;
  }

  getCurrentCharacterSuggestions(): string[] {
    const currentIndex = this.currentCharacterIndex;
    if (currentIndex === -1) {
      return [];
    }

    const currentChar = this._characters[currentIndex];
    const context = this.getContext(currentIndex);
    return currentChar.getSuggestions(context);
  }

  getCharacterPreview(index: number): string {
    if (index < 0 || index >= this._characters.length) {
      return "";
    }

    const character = this._characters[index];
    const context = this.getContext(index);
    return character.getPreview(context);
  }

  get inputLog(): SentenceInputLog {
    return this._inputLog;
  }

  private getContext(index: number): {
    prev: Character | null;
    next: Character | null;
  } {
    return {
      prev: index > 0 ? this._characters[index - 1] : null,
      next:
        index < this._characters.length - 1
          ? this._characters[index + 1]
          : null,
    };
  }
}
