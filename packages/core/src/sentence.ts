import { Character } from "./character";

export class Sentence {
  private _characters: Character[];
  private _label: string;

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
    return (
      this._characters.find((character) => !character.isCompleted()) ?? null
    );
  }

  get completedCharacters(): Character[] {
    return this._characters.filter((character) => character.isCompleted());
  }

  get incompletedCharacters(): Character[] {
    return this._characters.filter((character) => !character.isCompleted());
  }

  isCompleted(): boolean {
    return this._characters.every((character) => character.isCompleted());
  }
}
