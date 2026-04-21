"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { ProposicaoTipo } from "../types";

const TIPO_CHIPS: Array<{ value: "TODOS" | ProposicaoTipo; label: string }> = [
  { value: "TODOS", label: "Todos" },
  { value: "PL", label: "PL" },
  { value: "PEC", label: "PEC" },
  { value: "MPV", label: "MPV" },
  { value: "PLP", label: "PLP" },
  { value: "PDL", label: "PDL" },
];

const PERIODO_OPTIONS = [
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
  { value: "365", label: "Últimos 12 meses" },
  { value: "TUDO", label: "Qualquer período" },
];

interface ProposicoesFiltersProps {
  initialQuery: string;
  initialTipo: "TODOS" | ProposicaoTipo;
  initialPeriodo: "30" | "90" | "365" | "TUDO";
}

export function ProposicoesFilters({
  initialQuery,
  initialTipo,
  initialPeriodo,
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
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `/proposicoes?${qs}` : "/proposicoes", {
          scroll: false,
        });
      });
    },
    [router, searchParams],
  );

  const currentTipo = initialTipo;
  const currentPeriodo = initialPeriodo;

  const handleQuerySubmit = useMemo(
    () => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateParam({ q: query.trim() || null });
    },
    [query, updateParam],
  );

  return (
    <section
      aria-label="Filtros de proposições"
      className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
    >
      <form onSubmit={handleQuerySubmit} className="flex flex-col gap-2">
        <Input
          label="Busca"
          type="search"
          placeholder="Buscar por número ou ementa…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => updateParam({ q: query.trim() || null })}
          leadingIcon={<SearchIcon />}
        />
      </form>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Tipo</span>
        <div
          role="group"
          aria-label="Filtro por tipo de proposição"
          className="flex flex-wrap gap-2"
        >
          {TIPO_CHIPS.map((chip) => {
            const active = chip.value === currentTipo;
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

      <Select
        label="Período"
        value={currentPeriodo}
        onChange={(e) =>
          updateParam({
            periodo: e.target.value === "TUDO" ? null : e.target.value,
          })
        }
        options={PERIODO_OPTIONS}
      />
    </section>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 014.383 8.828l3.394 3.395a1 1 0 01-1.414 1.414l-3.395-3.394A5.5 5.5 0 119 3.5zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
        clipRule="evenodd"
      />
    </svg>
  );
}
