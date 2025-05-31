"use client";

import { useMemo } from "react";
import type { Session } from "@dakenjin/core";
import { SessionAnalyzer } from "@dakenjin/core";

export type UseTypingStatsReturn = {
  elapsedTime: number;
  totalKeystrokes: number;
  successfulKeystrokes: number;
  failedKeystrokes: number;
  accuracy: number;
  kps: number;
  cpm: number;
  isActive: boolean;
};

export function useTypingStats(session: Session): UseTypingStatsReturn {
  const analyzer = useMemo(() => new SessionAnalyzer(session), [session]);

  return useMemo(
    () => ({
      elapsedTime: analyzer.getDuration(),
      totalKeystrokes: analyzer.getTotalKeystrokes(),
      successfulKeystrokes: analyzer.getSuccessfulKeystrokes(),
      failedKeystrokes: analyzer.getFailedKeystrokes(),
      accuracy: analyzer.calcAccuracy(),
      kps: analyzer.calcKps(),
      cpm: analyzer.calcCpm(),
      isActive: analyzer.isActive(),
    }),
    [analyzer],
  );
}
