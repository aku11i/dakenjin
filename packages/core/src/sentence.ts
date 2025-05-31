import { Character } from "./character";
import { CharacterSet } from "./character-set";
import { SentenceInputLog } from "./sentence-input-log";

export class Sentence {
  private _characterSet: CharacterSet;
  private _label: string;
  private _inputLog: SentenceInputLog = new SentenceInputLog();

  constructor(characterSet: CharacterSet, label: string) {
    this._characterSet = characterSet;
    this._label = label;
  }

  get characters(): Character[] {
    return this._characterSet.characters;
  }

  get characterSet(): CharacterSet {
    return this._characterSet;
  }

  get label(): string {
    return this._label;
  }

  get currentCharacter(): Character | null {
    const current = this._characterSet.currentCharacter;

    // Mark sentence start when first character becomes current
    if (current && this._inputLog.startTime === null) {
      this._inputLog.markInputStart();
    }

    return current;
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
    const result = this._characterSet.inputCurrentCharacter(character);

    // Mark sentence end when all characters are completed
    if (result && this.isCompleted()) {
      this._inputLog.markInputEnd();
    }

    return result;
  }

  getCurrentCharacterSuggestions(): string[] {
    return this._characterSet.getCurrentCharacterSuggestions();
  }

  getCharacterPreview(index: number): string {
    return this._characterSet.getCharacterPreview(index);
  }

  get inputLog(): SentenceInputLog {
    return this._inputLog;
  }
}
