import type { Metadata } from "next";
import { listProposicoes } from "@/features/proposicoes/api";
import { ProposicoesFilters } from "@/features/proposicoes/components/ProposicoesFilters";
import { ProposicoesTable } from "@/features/proposicoes/components/ProposicoesTable";
import type {
  PeriodoFilter,
  ProposicaoTipo,
  ProposicaoTipoFilter,
} from "@/features/proposicoes/types";

export const metadata: Metadata = {
  title: "Proposições",
};

const TIPOS: ProposicaoTipo[] = ["PL", "PEC", "MPV", "PLP", "PDL"];

interface PageSearchParams {
  q?: string;
  tipo?: string;
  periodo?: string;
}

function parseTipo(raw: string | undefined): ProposicaoTipoFilter {
  if (!raw) return "TODOS";
  const upper = raw.toUpperCase();
  return (TIPOS as string[]).includes(upper)
    ? (upper as ProposicaoTipo)
    : "TODOS";
}

function parsePeriodo(
  raw: string | undefined,
): { filter: PeriodoFilter; initial: "30" | "90" | "365" | "TUDO" } {
  switch (raw) {
    case "30":
      return { filter: 30, initial: "30" };
    case "90":
      return { filter: 90, initial: "90" };
    case "365":
      return { filter: 365, initial: "365" };
    default:
      return { filter: "TUDO", initial: "TUDO" };
  }
}

export default async function ProposicoesPage({
  searchParams,
}: {
  // Next 15: searchParams é uma Promise em Server Components.
  searchParams: Promise<PageSearchParams>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const tipo = parseTipo(params.tipo);
  const { filter: periodoDias, initial: periodoInitial } = parsePeriodo(
    params.periodo,
  );

  const proposicoes = await listProposicoes({
    query: query || undefined,
    tipo,
    periodoDias,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Proposições
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {proposicoes.length === 1
            ? "1 proposição encontrada"
            : `${proposicoes.length} proposições encontradas`}
        </p>
      </div>

      <ProposicoesFilters
        initialQuery={query}
        initialTipo={tipo}
        initialPeriodo={periodoInitial}
      />

      <ProposicoesTable proposicoes={proposicoes} />
    </div>
  );
}
