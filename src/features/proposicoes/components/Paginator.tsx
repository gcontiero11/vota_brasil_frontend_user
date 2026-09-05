"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface PaginatorProps {
  page: number;
  limit: number;
  total: number;
  /** Path base — ex.: "/proposicoes". */
  basePath: string;
}

export function Paginator({ page, limit, total, basePath }: PaginatorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goTo = useCallback(
    (target: number) => {
      const next = new URLSearchParams(searchParams.toString());
      if (target <= 1) next.delete("page");
      else next.set("page", String(target));
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
      });
    },
    [basePath, router, searchParams],
  );

  if (total === 0) return null;

  const inicio = (page - 1) * limit + 1;
  const fim = Math.min(page * limit, total);

  return (
    <nav
      aria-label="Paginação"
      className="flex flex-col items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-soft sm:flex-row"
    >
      <p className="text-sm text-slate-600">
        Mostrando <span className="font-medium">{inicio}</span>–
        <span className="font-medium">{fim}</span> de{" "}
        <span className="font-medium">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <PageButton
          disabled={!hasPrev}
          onClick={() => goTo(page - 1)}
          label="Anterior"
        />
        <span className="text-sm text-slate-600">
          Página <span className="font-medium">{page}</span> de{" "}
          <span className="font-medium">{totalPages}</span>
        </span>
        <PageButton
          disabled={!hasNext}
          onClick={() => goTo(page + 1)}
          label="Próxima"
        />
      </div>
    </nav>
  );
}

function PageButton({
  disabled,
  onClick,
  label,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
