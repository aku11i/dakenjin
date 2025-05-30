import type { Character } from "@dakenjin/core";

type TypingDisplayProps = {
  completedCharacters: Character[];
  currentCharacter: Character | null;
  currentInputs: string;
  suggestions: string[];
  error: boolean;
  futureCharacters: Character[];
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
    <div className="space-y-2">
      <div className="flex flex-wrap justify-center gap-0.5">
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
      <div className="flex flex-wrap justify-center gap-0.5">
        {completedCharacters.map((character, index) => (
          <span key={`label-${index}`} className="text-lg text-green-500">
            {character.label}
          </span>
        ))}
        {currentCharacter && (
          <span className="text-lg text-gray-400">
            {currentCharacter.label}
          </span>
        )}
        {futureCharacters.map((character, index) => (
          <span key={`future-label-${index}`} className="text-lg text-gray-400">
            {character.label}
          </span>
        ))}
      </div>
    </div>
  );
}
