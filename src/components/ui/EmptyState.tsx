import type { ReactNode } from "react";

interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center ${className}`}
    >
      {icon ?? <DefaultIcon />}
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

function DefaultIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-8 w-8 text-slate-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3.75H5.25A1.5 1.5 0 003.75 5.25v13.5A1.5 1.5 0 005.25 20.25h13.5a1.5 1.5 0 001.5-1.5V15"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3.75h3.75v3.75M20.25 3.75L12 12"
      />
    </svg>
  );
}
