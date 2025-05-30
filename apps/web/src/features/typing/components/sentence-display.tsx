type SentenceCharacter = {
  label: string;
};

type SentenceDisplayProps = {
  characters: SentenceCharacter[];
};

export function SentenceDisplay({ characters }: SentenceDisplayProps) {
  return (
    <div className="space-y-1">
      <div className="text-2xl text-gray-800">
        {characters.map((character, index) => (
          <span key={index}>{character.label}</span>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        {characters.map((character, index) => (
          <span key={index}>{character.label}</span>
        ))}
      </div>
    </div>
  );
}
