export type ProposicaoTipo = "PL" | "PEC" | "MPV" | "PLP" | "PDL";

export type ProposicaoStatus =
  | "em_tramitacao"
  | "pronta_para_pauta"
  | "aprovada"
  | "arquivada"
  | "rejeitada";

export interface Autoria {
  nome: string;
  partido?: string;
  uf?: string;
}

export interface Proposicao {
  id: string;
  tipo: ProposicaoTipo;
  numero: number;
  ano: number;
  ementa: string;
  autoria: Autoria;
  status: ProposicaoStatus;
  /** Data da última movimentação (ISO-8601). */
  ultimaMovimentacaoAt: string;
}

export type TramitacaoTipo =
  | "DISTRIBUICAO"
  | "RELATOR"
  | "PARECER"
  | "VOTACAO"
  | "ENCAMINHAMENTO"
  | "FINALIZACAO"
  | "REATIVACAO";

export interface Tramitacao {
  id: string;
  proposicaoId: string;
  tipo: TramitacaoTipo;
  descricao: string;
  orgao: string;
  /** Data em que a tramitação ocorreu (ISO-8601). */
  ocorridaEm: string;
  /** Presente quando `tipo === "VOTACAO"`: detalhes da votação realizada. */
  votacao?: Votacao;
}

export type VotacaoResultado = "aprovada" | "rejeitada" | "pendente";

export interface VotacaoPlacar {
  sim?: number;
  nao?: number;
  abstencao?: number;
  ausente?: number;
}

export interface Votacao {
  id: string;
  proposicaoId: string;
  titulo: string;
  /** Data da votação (ISO-8601). */
  ocorridaEm: string;
  resultado: VotacaoResultado;
  placar?: VotacaoPlacar;
  /** Texto curto explicando do que se trata a votação. */
  resumo?: string;
}

export interface ProposicaoDetalhe extends Proposicao {
  tramitacoes: Tramitacao[];
  /** Resumo gerado por IA. `null` indica que ainda não há resumo disponível. */
  descricaoIA: string | null;
}

export type VotoResultado =
  | "sim"
  | "nao"
  | "abstencao"
  | "ausente"
  | "obstrucao";

export interface VotoIndividual {
  id: string;
  deputado: string;
  partido: string;
  uf: string;
  resultado: VotoResultado;
}

export interface VotacaoDetalhe extends Votacao {
  votos: VotoIndividual[];
}

export interface ListVotosParams {
  partido?: string;
}

export type ProposicaoTipoFilter = ProposicaoTipo | "TODOS";
export type PeriodoFilter = 30 | 90 | 365 | "TUDO";

export interface ListProposicoesParams {
  query?: string;
  tipo?: ProposicaoTipoFilter;
  periodoDias?: PeriodoFilter;
}
