type CompletedWord = {
  inputs: string;
};

type CurrentWord = {
  label: string;
  ruby?: string;
};

type TypingDisplayProps = {
  completedWords: CompletedWord[];
  currentWord: CurrentWord | null;
  currentInputs: string;
  suggestions: string[];
  error: boolean;
  futureWords: { getSuggestions: () => string[] }[];
};

export function TypingDisplay({
  completedWords,
  currentWord,
  currentInputs,
  suggestions,
  error,
  futureWords,
}: TypingDisplayProps) {
  const firstSuggestion = suggestions[0] || "";

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {completedWords.map((word, index) => (
        <span key={index} className="text-lg font-mono text-green-500">
          {word.inputs}
        </span>
      ))}
      {currentWord && (
        <div
          className={`text-lg font-mono inline-flex ${
            error ? "animate-pulse" : ""
          }`}
        >
          <span className="text-green-500">{currentInputs}</span>
          <span className={error ? "text-red-400" : "text-gray-400"}>
            {firstSuggestion}
          </span>
        </div>
      )}
      {futureWords.map((word, index) => {
        const futureSuggestions = word.getSuggestions();
        return (
          <span
            key={`future-${index}`}
            className="text-lg font-mono text-gray-400"
          >
            {futureSuggestions[0] || ""}
          </span>
        );
      })}
    </div>
  );
}
