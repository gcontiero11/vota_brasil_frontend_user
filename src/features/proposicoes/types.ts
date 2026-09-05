/**
 * Tipos do domínio de proposições.
 *
 * Os nomes seguem camelCase no frontend; a tradução do snake_case do backend
 * é feita na borda em `api.ts`. Strings livres do backend (status, resultado,
 * descricao_situacao, despacho) são preservadas — qualquer mapeamento para
 * cores/categorias é heurístico e local ao componente.
 */

/** Tipos da Câmara são abertos (PL, PEC, MPV, REQ, DOC, …) — string livre. */
export type ProposicaoTipoFilter = string | "TODOS";

export interface Proposicao {
  id: number;
  externalId: number;
  tipo: string;
  numero: number;
  ano: number;
  ementa: string | null;
  status: string | null;
  /** Data da última tramitação relevante (ISO-8601). Pode estar ausente. */
  ultimaMovimentacaoAt: string | null;
}

export interface Tramitacao {
  id: number;
  proposicaoId: number;
  externalId: number | null;
  sequencia: number;
  /** ISO-8601. */
  dataHora: string;
  siglaOrgao: string | null;
  descricaoSituacao: string | null;
  despacho: string | null;
  regime: string | null;
}

export interface Votacao {
  id: number;
  externalId: string;
  proposicaoPrincipalId: number | null;
  /** ISO-8601. */
  dataHora: string;
  descricao: string | null;
  /** Texto bruto do backend ("aprovado", "rejeitado", …). Sem enum. */
  resultado: string | null;
  tipoRaw: string | null;
}

export interface DeputadoResumo {
  id: number;
  nome: string;
  siglaPartido: string | null;
  siglaUf: string | null;
}

export interface VotoNominal {
  id: number;
  votacaoId: number;
  deputadoId: number;
  /** Texto bruto da Câmara ("Sim", "Não", "Abstenção", "Obstrução", …). */
  votoRaw: string;
  /** Hidratado pelo backend via JOIN. */
  deputado: DeputadoResumo | null;
}

export interface ProposicaoDetalhe {
  proposicao: Proposicao;
  tramitacoes: Tramitacao[];
  votacoes: Votacao[];
}

export interface VotacaoDetalhe {
  votacao: Votacao;
  votos: VotoNominal[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface Paginated<T> {
  data: T[];
  pagination: Pagination;
}

export interface ListProposicoesParams {
  page?: number;
  limit?: number;
  tipo?: ProposicaoTipoFilter;
  ano?: number;
  status?: string;
  /** RFC3339 — filtra `last_relevant_change_at >=`. */
  dataInicio?: string;
  /** RFC3339 — filtra `last_relevant_change_at <=`. */
  dataFim?: string;
}

export interface ListVotacoesPorProposicaoParams {
  page?: number;
  limit?: number;
}

export interface ListVotosParams {
  page?: number;
  limit?: number;
  /** Filtro client-side por sigla de partido — não suportado pelo backend. */
  partido?: string;
}
