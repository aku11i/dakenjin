import { AlertTriangle, ExternalLink } from "lucide-react";

export function BetaNotice() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 sm:p-4 max-w-md mx-auto">
      <div className="flex items-start gap-2 sm:gap-3">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          <p className="font-semibold text-amber-900 dark:text-amber-100">
            このアプリはベータ版です
          </p>
          <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
            開発中のため、予期しない動作が発生する可能性があります。
          </p>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 sm:gap-x-1.5">
            <span className="text-amber-800 dark:text-amber-200">
              フィードバックは
            </span>
            <a
              href="https://github.com/aku11i/dakenjin/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 sm:gap-1 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline underline-offset-2"
            >
              GitHub
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </a>
            <span className="text-amber-800 dark:text-amber-200">
              までお願いします
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}