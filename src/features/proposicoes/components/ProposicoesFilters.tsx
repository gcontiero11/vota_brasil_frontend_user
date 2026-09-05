"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

const TIPO_CHIPS: Array<{ value: string; label: string }> = [
  { value: "TODOS", label: "Todos" },
  { value: "PL", label: "PL" },
  { value: "PEC", label: "PEC" },
  { value: "MPV", label: "MPV" },
  { value: "PLP", label: "PLP" },
  { value: "PDL", label: "PDL" },
  { value: "PLN", label: "PLN" },
  { value: "PLV", label: "PLV" },
  { value: "PRC", label: "PRC" },
];

interface ProposicoesFiltersProps {
  initialTipo: string;
  initialMes: string;
  initialQuery: string;
}

export function ProposicoesFilters({
  initialTipo,
  initialMes,
  initialQuery,
}: ProposicoesFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);

  const updateParam = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      // Mudar filtro reseta para a página 1.
      next.delete("page");
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `/proposicoes?${qs}` : "/proposicoes", {
          scroll: false,
        });
      });
    },
    [router, searchParams],
  );

  const submitQuery = useCallback(
    (value: string) => {
      updateParam({ q: value.trim() || null });
    },
    [updateParam],
  );

  return (
    <section
      aria-label="Filtros de proposições"
      className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="filtro-identificador" className="text-sm font-medium text-slate-700">
          Buscar por identificador
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitQuery(query);
          }}
          className="flex gap-2"
        >
          <input
            id="filtro-identificador"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => submitQuery(query)}
            placeholder="Ex: PEC 389/2014"
            className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="submit"
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            Buscar
          </button>
        </form>
        <p className="text-xs text-slate-500">
          Filtra por tipo e ano no servidor; pelo número na página atual.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Tipo</span>
        <div
          role="group"
          aria-label="Filtro por tipo de proposição"
          className="flex flex-wrap gap-2"
        >
          {TIPO_CHIPS.map((chip) => {
            const active = chip.value === initialTipo;
            return (
              <button
                key={chip.value}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  updateParam({
                    tipo: chip.value === "TODOS" ? null : chip.value,
                  })
                }
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="filtro-mes" className="text-sm font-medium text-slate-700">
          Mês de movimentação
        </label>
        <input
          id="filtro-mes"
          type="month"
          value={initialMes}
          onChange={(e) => updateParam({ mes: e.target.value || null })}
          className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <p className="text-xs text-slate-500">Filtra pela data da última tramitação relevante.</p>
      </div>
    </section>
  );
}
