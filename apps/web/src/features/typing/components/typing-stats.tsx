import type { Session } from "@dakenjin/core";
import { calculateTypingStats, formatTime } from "../utils/typing-stats";

type TypingStatsProps = {
  session: Session;
};

export function TypingStatsDisplay({ session }: TypingStatsProps) {
  const stats = calculateTypingStats(session);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border">
      <StatCard
        label="経過時間"
        value={formatTime(stats.elapsedTime)}
        className="text-blue-600"
      />
      <StatCard
        label="打鍵数"
        value={stats.totalKeystrokes.toString()}
        subtitle={`成功: ${stats.successfulKeystrokes} / 失敗: ${stats.failedKeystrokes}`}
        className="text-green-600"
      />
      <StatCard
        label="正確性"
        value={`${stats.accuracy}%`}
        className={
          stats.accuracy >= 95
            ? "text-green-600"
            : stats.accuracy >= 85
              ? "text-yellow-600"
              : "text-red-600"
        }
      />
      <StatCard
        label="入力速度"
        value={`${stats.kps} KPS`}
        subtitle={`${stats.cpm} CPM`}
        className="text-purple-600"
      />
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  subtitle?: string;
  className?: string;
};

function StatCard({ label, value, subtitle, className }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${className || ""}`}>{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}
