import { Character } from "./character";
import { CharacterSet } from "./character-set";
import { JAPANESE_CHARACTERS } from "./characters/japanese";

export function createCharacterSetFactory(): CharacterSetFactory {
  const japaneseCharacters = JAPANESE_CHARACTERS.map((data) => {
    return new Character({
      label: data.label,
      inputPatterns: [...data.inputPatterns],
      inputPatternResolver: (data as any).inputPatternResolver,
    });
  });
  return new CharacterSetFactory(japaneseCharacters);
}

export class CharacterSetFactory {
  private _characters: Character[];

  constructor(characters: Character[]) {
    this._characters = characters;
  }

  fromText(text: string): CharacterSet {
    const characters: Character[] = [];
    let i = 0;

    while (i < text.length) {
      let matched = false;

      for (const character of [...this._characters].reverse()) {
        if (text.slice(i, i + character.label.length) === character.label) {
          characters.push(
            new Character({
              label: character.label,
              inputPatterns: [...character.inputPatterns],
              inputPatternResolver: character.inputPatternResolver,
            }),
          );
          i += character.label.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        throw new Error(`Unsupported character: ${text[i]} at position ${i}`);
      }
    }

    return new CharacterSet(characters);
  }
}
