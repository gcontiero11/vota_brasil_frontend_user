import type { Metadata } from "next";
import { listProposicoes } from "@/features/proposicoes/api";
import { Paginator } from "@/features/proposicoes/components/Paginator";
import { ProposicoesFilters } from "@/features/proposicoes/components/ProposicoesFilters";
import { ProposicoesTable } from "@/features/proposicoes/components/ProposicoesTable";
import { isValidYearMonth, yearMonthToRange } from "@/features/proposicoes/periodo";

export const metadata: Metadata = {
  title: "Proposições",
};

const TIPOS_VALIDOS = new Set(["PL", "PEC", "MPV", "PLP", "PDL"]);
const DEFAULT_LIMIT = 20;

interface PageSearchParams {
  tipo?: string;
  mes?: string;
  page?: string;
  q?: string;
}

interface ParsedIdentifier {
  tipo?: string;
  numero?: number;
  ano?: number;
}

function parseIdentifier(q: string): ParsedIdentifier {
  const trimmed = q.trim();
  // "PEC 389/2014", "pec389/2014", "PL 2630 2020"
  const full = trimmed.match(/^([a-zA-Z]+)\s*(\d+)[\/\s](\d{4})$/i);
  if (full) {
    return {
      tipo: full[1]!.toUpperCase(),
      numero: Number(full[2]!),
      ano: Number(full[3]!),
    };
  }
  // "PEC 389" or "pec389" — tipo + número sem ano
  const partial = trimmed.match(/^([a-zA-Z]+)\s*(\d+)$/i);
  if (partial) {
    return { tipo: partial[1]!.toUpperCase(), numero: Number(partial[2]!) };
  }
  return {};
}

function parseTipo(raw: string | undefined): string {
  if (!raw) return "TODOS";
  const upper = raw.toUpperCase();
  return TIPOS_VALIDOS.has(upper) ? upper : "TODOS";
}

function parseMes(raw: string | undefined): string {
  if (!raw) return "";
  return isValidYearMonth(raw) ? raw : "";
}

function parsePage(raw: string | undefined): number {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

export default async function ProposicoesPage({
  searchParams,
}: {
  // Next 15: searchParams é uma Promise em Server Components.
  searchParams: Promise<PageSearchParams>;
}) {
  const params = await searchParams;
  const tipo = parseTipo(params.tipo);
  const mes = parseMes(params.mes);
  const page = parsePage(params.page);
  const q = params.q?.trim() ?? "";

  const identifier = q ? parseIdentifier(q) : {};
  // Identifier tipo+ano override the chip/mes filters when q is set.
  const effectiveTipo = identifier.tipo ?? (tipo === "TODOS" ? undefined : tipo);
  const effectiveAno = identifier.ano;

  const range = !effectiveAno && mes ? yearMonthToRange(mes) : null;

  const { data: rawProposicoes, pagination } = await listProposicoes({
    tipo: effectiveTipo,
    ano: effectiveAno,
    page,
    limit: DEFAULT_LIMIT,
    dataInicio: range?.dataInicio,
    dataFim: range?.dataFim,
  });

  // Numero filter is client-side only (backend doesn't support ?numero=).
  const proposicoes =
    identifier.numero !== undefined
      ? rawProposicoes.filter((p) => p.numero === identifier.numero)
      : rawProposicoes;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Proposições
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {pagination.total === 1
            ? "1 proposição encontrada"
            : `${pagination.total} proposições encontradas`}
        </p>
      </div>

      <ProposicoesFilters initialTipo={tipo} initialMes={mes} initialQuery={q} />

      <ProposicoesTable proposicoes={proposicoes} />

      <Paginator
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        basePath="/proposicoes"
      />
    </div>
  );
}
