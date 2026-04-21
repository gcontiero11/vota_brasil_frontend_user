interface AISummaryPlaceholderProps {
  /** Mensagem específica do contexto (proposição, tramitação, votação). */
  message: string;
}

export function AISummaryPlaceholder({ message }: AISummaryPlaceholderProps) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
      <SparkleIcon />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Resumo por IA
        </p>
        <p className="mt-0.5 text-sm text-slate-600">{message}</p>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18 7.5l.35-1.225a2.25 2.25 0 011.575-1.575L21.15 4.5l-1.225-.35a2.25 2.25 0 01-1.575-1.575L18 1.35l-.35 1.225a2.25 2.25 0 01-1.575 1.575L14.85 4.5l1.225.35a2.25 2.25 0 011.575 1.575L18 7.5z"
      />
    </svg>
  );
}
