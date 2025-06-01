import { Character } from "./character";
import { Sentence } from "./sentence";
import { JAPANESE_CHARACTERS } from "./characters/japanese";

export function createSentenceFactory(): SentenceFactory {
  const japaneseCharacters = JAPANESE_CHARACTERS.map((data) => {
    return new Character({
      label: data.label,
      inputPatterns: [...data.inputPatterns],
      inputPatternResolver: (data as any).inputPatternResolver,
    });
  });
  return new SentenceFactory(japaneseCharacters);
}

export class SentenceFactory {
  private _characters: Character[];

  constructor(characters: Character[]) {
    this._characters = characters;
  }

  fromText(text: string, label?: string): Sentence {
    const characters: Character[] = [];
    let i = 0;

    while (i < text.length) {
      let matched = false;

      for (const character of this._characters) {
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

    return new Sentence(characters, label ?? text);
  }
}
