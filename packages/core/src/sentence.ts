import { Character } from "./character";
import { CharacterSet } from "./character-set";

export class Sentence {
  private _characterSet: CharacterSet;
  private _label: string;

  constructor(characterSet: CharacterSet, label: string) {
    this._characterSet = characterSet;
    this._label = label;
  }

  get characters(): Character[] {
    return this._characterSet.characters;
  }

  get label(): string {
    return this._label;
  }

  get currentCharacter(): Character | null {
    return this._characterSet.currentCharacter;
  }

  get completedCharacters(): Character[] {
    return this._characterSet.completedCharacters;
  }

  get incompletedCharacters(): Character[] {
    return this._characterSet.incompletedCharacters;
  }

  isCompleted(): boolean {
    return this._characterSet.isCompleted();
  }

  inputCurrentCharacter(character: string): boolean {
    return this._characterSet.inputCurrentCharacter(character);
  }

  getCurrentCharacterSuggestions(): string[] {
    return this._characterSet.getCurrentCharacterSuggestions();
  }

  getCharacterPreview(index: number): string {
    return this._characterSet.getCharacterPreview(index);
  }
}
