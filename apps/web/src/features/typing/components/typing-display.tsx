type CompletedCharacter = {
  inputs: string;
};

type CurrentCharacter = {
  label: string;
  ruby?: string;
};

type TypingDisplayProps = {
  completedCharacters: CompletedCharacter[];
  currentCharacter: CurrentCharacter | null;
  currentInputs: string;
  suggestions: string[];
  error: boolean;
  futureCharacters: { getSuggestions: () => string[] }[];
};

export function TypingDisplay({
  completedCharacters,
  currentCharacter,
  currentInputs,
  suggestions,
  error,
  futureCharacters,
}: TypingDisplayProps) {
  const firstSuggestion = suggestions[0] || "";

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {completedCharacters.map((character, index) => (
        <span key={index} className="text-lg font-mono text-green-500">
          {character.inputs}
        </span>
      ))}
      {currentCharacter && (
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
      {futureCharacters.map((character, index) => {
        const futureSuggestions = character.getSuggestions();
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
