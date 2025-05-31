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
    return (
      this._characters.find((character, index) => {
        const context = this.getContext(index);
        return !character.isCompleted(context);
      }) ?? null
    );
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
