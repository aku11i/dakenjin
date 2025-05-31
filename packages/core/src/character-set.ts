import { Character } from "./character";

export class CharacterSet {
  private _characters: Character[];

  constructor(characters: Character[]) {
    this._characters = characters;
  }

  get characters(): Character[] {
    return this._characters;
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
    return currentChar.input(character, context);
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
