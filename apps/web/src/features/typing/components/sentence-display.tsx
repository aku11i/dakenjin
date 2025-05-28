type SentenceWord = {
  label: string;
  ruby?: string;
};

type SentenceDisplayProps = {
  words: SentenceWord[];
};

export function SentenceDisplay({ words }: SentenceDisplayProps) {
  return (
    <div className="space-y-1">
      <div className="text-2xl text-gray-800">
        {words.map((word, index) => (
          <span key={index}>{word.label}</span>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        {words.map((word, index) => (
          <span key={index}>{word.ruby || word.label}</span>
        ))}
      </div>
    </div>
  );
}
