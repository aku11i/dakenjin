import { Character } from "./character";

export class Sentence {
  private _characters: Character[];

  constructor(characters: Character[]) {
    this._characters = characters;
  }

  get characters(): Character[] {
    return this._characters;
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
