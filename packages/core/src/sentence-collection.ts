import { Sentence } from "./sentence";

type SentenceCollectionParams = {
  name: string;
  description: string;
  sentences: Sentence[];
};

export class SentenceCollection {
  private _name: string;
  private _description: string;
  private _sentences: Sentence[];

  constructor({ name, description, sentences }: SentenceCollectionParams) {
    this._name = name;
    this._description = description;
    this._sentences = sentences;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get sentences(): Sentence[] {
    return this._sentences;
  }

  static pick(collections: SentenceCollection[], count: number): Sentence[] {
    const allSentences = collections.flatMap(
      (collection) => collection.sentences,
    );

    if (allSentences.length <= count) {
      return allSentences;
    }

    const picked: Sentence[] = [];
    const indices = new Set<number>();

    while (picked.length < count) {
      const randomIndex = Math.floor(Math.random() * allSentences.length);
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex);
        picked.push(allSentences[randomIndex]);
      }
    }

    return picked;
  }
}
