import { SessionAnalyzer } from "@dakenjin/core";

export type TypingStats = {
  elapsedTime: number;
  totalKeystrokes: number;
  successfulKeystrokes: number;
  failedKeystrokes: number;
  accuracy: number;
  kps: number;
  cpm: number;
  isActive: boolean;
};

export function calculateTypingStats(
  session: ConstructorParameters<typeof SessionAnalyzer>[0],
): TypingStats {
  const analyzer = new SessionAnalyzer(session);
  return {
    elapsedTime: analyzer.getDuration(),
    totalKeystrokes: analyzer.getTotalKeystrokes(),
    successfulKeystrokes: analyzer.getSuccessfulKeystrokes(),
    failedKeystrokes: analyzer.getFailedKeystrokes(),
    accuracy: analyzer.calcAccuracy(),
    kps: analyzer.calcKps(),
    cpm: analyzer.calcCpm(),
    isActive: analyzer.isActive(),
  };
}

export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(1).padStart(4, "0")}`;
}
