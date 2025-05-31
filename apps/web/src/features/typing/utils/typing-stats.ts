import { SessionAnalyzer } from "@dakenjin/core";
import type { Session } from "@dakenjin/core";
import type { UseTypingStatsReturn } from "@dakenjin/react";

export type TypingStats = UseTypingStatsReturn;

export function calculateTypingStats(session: Session): TypingStats {
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
