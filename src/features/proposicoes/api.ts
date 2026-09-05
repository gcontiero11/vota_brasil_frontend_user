import { httpRequest } from "@/lib/http";
import {
  getProposicaoDetalheMock,
  getVotacaoDetalheMock,
  listProposicoesMock,
} from "./mocks";
import type {
  ListProposicoesParams,
  ListVotacoesPorProposicaoParams,
  ListVotosParams,
  Paginated,
  Pagination,
  Proposicao,
  ProposicaoDetalhe,
  Tramitacao,
  Votacao,
  VotacaoDetalhe,
  VotoNominal,
} from "./types";

/**
 * Camada de API. Por padrão consome o backend em `NEXT_PUBLIC_API_BASE_URL`.
 * Se `NEXT_PUBLIC_USE_MOCKS=true`, retorna os dados estáticos de `mocks.ts`.
 */

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

// --- Shapes brutos do backend (snake_case) ---------------------------------

interface RawPagination {
  page: number;
  limit: number;
  total: number;
}

interface RawPaginated<T> {
  data: T[];
  pagination: RawPagination;
}

interface RawProposicao {
  id: number;
  external_id: number;
  tipo: string;
  numero: number;
  ano: number;
  ementa: string | null;
  status: string | null;
  keywords: string | null;
  priority_level: number;
  last_synced_at: string | null;
  last_relevant_change_at: string | null;
  created_at: string;
  updated_at: string;
}

interface RawTramitacao {
  id: number;
  proposicao_id: number;
  external_id: number | null;
  sequencia: number;
  data_hora: string;
  sigla_orgao: string | null;
  descricao_situacao: string | null;
  despacho: string | null;
  regime: string | null;
  created_at: string;
}

interface RawVotacao {
  id: number;
  external_id: string;
  proposicao_principal_id: number | null;
  data_hora: string;
  descricao: string | null;
  resultado: string | null;
  tipo_raw: string | null;
  created_at: string;
}

interface RawDeputadoResumo {
  id: number;
  nome: string;
  sigla_partido: string | null;
  sigla_uf: string | null;
}

interface RawVotoNominal {
  id: number;
  votacao_id: number;
  deputado_id: number;
  voto_raw: string;
  created_at: string;
  deputado: RawDeputadoResumo | null;
}

// --- Mappers ---------------------------------------------------------------

// Backend Go usa `omitempty` em campos nullable: o JSON pode trazer `null`,
// `undefined` (campo ausente) ou o valor real. Normalizamos pra `null` na
// borda — assim o domínio fica consistente.
function nullable<T>(v: T | null | undefined): T | null {
  return v ?? null;
}

function toProposicao(r: RawProposicao): Proposicao {
  return {
    id: r.id,
    externalId: r.external_id,
    tipo: r.tipo,
    numero: r.numero,
    ano: r.ano,
    ementa: nullable(r.ementa),
    status: nullable(r.status),
    ultimaMovimentacaoAt: nullable(r.last_relevant_change_at),
  };
}

function toTramitacao(r: RawTramitacao): Tramitacao {
  return {
    id: r.id,
    proposicaoId: r.proposicao_id,
    externalId: nullable(r.external_id),
    sequencia: r.sequencia,
    dataHora: r.data_hora,
    siglaOrgao: nullable(r.sigla_orgao),
    descricaoSituacao: nullable(r.descricao_situacao),
    despacho: nullable(r.despacho),
    regime: nullable(r.regime),
  };
}

function toVotacao(r: RawVotacao): Votacao {
  return {
    id: r.id,
    externalId: r.external_id,
    proposicaoPrincipalId: nullable(r.proposicao_principal_id),
    dataHora: r.data_hora,
    descricao: nullable(r.descricao),
    resultado: nullable(r.resultado),
    tipoRaw: nullable(r.tipo_raw),
  };
}

function toVotoNominal(r: RawVotoNominal): VotoNominal {
  return {
    id: r.id,
    votacaoId: r.votacao_id,
    deputadoId: r.deputado_id,
    votoRaw: r.voto_raw,
    deputado: r.deputado
      ? {
          id: r.deputado.id,
          nome: r.deputado.nome,
          siglaPartido: nullable(r.deputado.sigla_partido),
          siglaUf: nullable(r.deputado.sigla_uf),
        }
      : null,
  };
}

function toPagination(r: RawPagination): Pagination {
  return { page: r.page, limit: r.limit, total: r.total };
}

// --- API pública -----------------------------------------------------------

export async function listProposicoes(
  params: ListProposicoesParams = {},
): Promise<Paginated<Proposicao>> {
  if (USE_MOCKS) return listProposicoesMock(params);

  const query: Record<string, string | number | undefined> = {
    page: params.page,
    limit: params.limit,
    tipo: params.tipo && params.tipo !== "TODOS" ? params.tipo : undefined,
    ano: params.ano,
    status: params.status,
    data_inicio: params.dataInicio,
    data_fim: params.dataFim,
  };

  const raw = await httpRequest<RawPaginated<RawProposicao>>("/proposicoes", {
    query,
  });
  return {
    data: raw.data.map(toProposicao),
    pagination: toPagination(raw.pagination),
  };
}

export async function getProposicaoById(
  id: number,
): Promise<ProposicaoDetalhe | null> {
  if (USE_MOCKS) return getProposicaoDetalheMock(id);

  const proposicao = await httpRequest<RawProposicao | null>(
    `/proposicoes/${id}`,
  ).catch((err) => {
    if (isNotFound(err)) return null;
    throw err;
  });
  if (!proposicao) return null;

  // Carrega tramitações e votações em paralelo. limit=100 para minimizar
  // round-trips; paginação pode ser adicionada depois se algum caso real
  // exceder isso.
  const [tramitacoesRaw, votacoesRaw] = await Promise.all([
    httpRequest<RawPaginated<RawTramitacao>>(
      `/proposicoes/${id}/tramitacoes`,
      { query: { limit: 100 } },
    ),
    httpRequest<RawPaginated<RawVotacao>>(
      `/proposicoes/${id}/votacoes`,
      { query: { limit: 100 } },
    ),
  ]);

  return {
    proposicao: toProposicao(proposicao),
    tramitacoes: tramitacoesRaw.data.map(toTramitacao),
    votacoes: votacoesRaw.data.map(toVotacao),
  };
}

export async function listVotacoesPorProposicao(
  proposicaoId: number,
  params: ListVotacoesPorProposicaoParams = {},
): Promise<Paginated<Votacao>> {
  const raw = await httpRequest<RawPaginated<RawVotacao>>(
    `/proposicoes/${proposicaoId}/votacoes`,
    { query: { page: params.page, limit: params.limit } },
  );
  return {
    data: raw.data.map(toVotacao),
    pagination: toPagination(raw.pagination),
  };
}

export async function getVotacaoById(
  votacaoId: number,
  params: ListVotosParams = {},
): Promise<VotacaoDetalhe | null> {
  if (USE_MOCKS) return getVotacaoDetalheMock(votacaoId, params);

  const votacao = await httpRequest<RawVotacao | null>(
    `/votacoes/${votacaoId}`,
  ).catch((err) => {
    if (isNotFound(err)) return null;
    throw err;
  });
  if (!votacao) return null;

  const votosRaw = await httpRequest<RawPaginated<RawVotoNominal>>(
    `/votacoes/${votacaoId}/votos`,
    { query: { limit: 100 } },
  );

  let votos = votosRaw.data.map(toVotoNominal);

  const partido = params.partido?.trim().toUpperCase();
  if (partido) {
    votos = votos.filter((v) => v.deputado?.siglaPartido === partido);
  }

  return {
    votacao: toVotacao(votacao),
    votos,
  };
}

function isNotFound(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    (err as { status: number }).status === 404
  );
}
