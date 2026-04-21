"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface VotosFiltersProps {
  partidos: string[];
  selected: string | null;
}

export function VotosFilters({ partidos, selected }: VotosFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updatePartido = useCallback(
    (value: string | null) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) next.set("partido", value);
      else next.delete("partido");
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <section
      aria-label="Filtros de votos"
      className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
    >
      <span className="text-sm font-medium text-slate-700">Partido</span>
      <div
        role="group"
        aria-label="Filtro por partido"
        className="flex flex-wrap gap-2"
      >
        <Chip
          active={selected === null}
          onClick={() => updatePartido(null)}
          label="Todos"
        />
        {partidos.map((partido) => (
          <Chip
            key={partido}
            active={selected === partido}
            onClick={() => updatePartido(partido)}
            label={partido}
          />
        ))}
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm transition-colors ${
        active
          ? "bg-brand-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}
