"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

interface ExpandablePanelProps {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Rótulo acessível para leitores de tela (ex.: "Expandir tramitação"). */
  ariaLabel?: string;
  className?: string;
}

export function ExpandablePanel({
  header,
  children,
  defaultOpen = false,
  ariaLabel,
  className = "",
}: ExpandablePanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        <div className="min-w-0 flex-1">{header}</div>
        <ChevronIcon open={open} />
      </button>
      {open ? (
        <div
          id={panelId}
          className="border-t border-slate-200 bg-slate-50/50 px-4 py-4"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
