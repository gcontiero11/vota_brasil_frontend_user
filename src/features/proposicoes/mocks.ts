import type {
  ListProposicoesParams,
  ListVotosParams,
  Paginated,
  Proposicao,
  ProposicaoDetalhe,
  Tramitacao,
  Votacao,
  VotacaoDetalhe,
  VotoNominal,
} from "./types";

/**
 * Dados fictícios — nomes e propostas inventados, sem correspondência com
 * parlamentares ou proposições reais. Servem apenas como toggle quando
 * `NEXT_PUBLIC_USE_MOCKS=true`.
 */

const proposicoes: Proposicao[] = [
  {
    id: 1,
    externalId: 1001,
    tipo: "PL",
    numero: 2345,
    ano: 2024,
    ementa:
      "Institui o Programa Nacional de Incentivo à Leitura em escolas públicas de ensino fundamental.",
    status: "Aguardando designação de Relator",
    ultimaMovimentacaoAt: daysAgo(2),
  },
  {
    id: 2,
    externalId: 1002,
    tipo: "PEC",
    numero: 17,
    ano: 2024,
    ementa:
      "Altera o art. 208 da Constituição para ampliar o direito ao ensino médio em tempo integral.",
    status: "Pronta para Pauta no Plenário",
    ultimaMovimentacaoAt: hoursAgo(5),
  },
  {
    id: 3,
    externalId: 1003,
    tipo: "MPV",
    numero: 1188,
    ano: 2025,
    ementa:
      "Dispõe sobre medidas emergenciais de apoio à agricultura familiar em regiões afetadas por estiagem.",
    status: "Transformada em Lei",
    ultimaMovimentacaoAt: daysAgo(9),
  },
  {
    id: 4,
    externalId: 1004,
    tipo: "PLP",
    numero: 42,
    ano: 2023,
    ementa:
      "Dispõe sobre normas gerais para a cobrança de tributos municipais sobre plataformas digitais de transporte.",
    status: "Arquivada",
    ultimaMovimentacaoAt: daysAgo(220),
  },
  {
    id: 5,
    externalId: 1005,
    tipo: "PDL",
    numero: 301,
    ano: 2024,
    ementa:
      "Susta os efeitos do Decreto nº 9.999/2024 que regulamenta a concessão de subsídios à aviação regional.",
    status: "Rejeitada",
    ultimaMovimentacaoAt: daysAgo(45),
  },
  {
    id: 6,
    externalId: 1006,
    tipo: "PL",
    numero: 501,
    ano: 2025,
    ementa:
      "Cria a Política Nacional de Dados Abertos para Municípios e institui diretrizes para interoperabilidade.",
    status: "Em tramitação",
    ultimaMovimentacaoAt: daysAgo(14),
  },
  {
    id: 7,
    externalId: 1007,
    tipo: "PL",
    numero: 8820,
    ano: 2023,
    ementa:
      "Regulamenta o trabalho por aplicativos e estabelece direitos mínimos para motoristas e entregadores.",
    status: "Pronta para Pauta no Plenário",
    ultimaMovimentacaoAt: daysAgo(30),
  },
  {
    id: 8,
    externalId: 1008,
    tipo: "PEC",
    numero: 9,
    ano: 2025,
    ementa:
      "Inclui o saneamento básico universal como direito social no art. 6º da Constituição Federal.",
    status: "Em tramitação",
    ultimaMovimentacaoAt: hoursAgo(18),
  },
];

const tramitacoesPorProposicao: Record<number, Tramitacao[]> = {
  1: [
    {
      id: 101,
      proposicaoId: 1,
      externalId: null,
      sequencia: 1,
      dataHora: daysAgo(120),
      siglaOrgao: "PLEN",
      descricaoSituacao: "Apresentação do projeto",
      despacho: "Apresentação do projeto em plenário.",
      regime: "Ordinário",
    },
    {
      id: 102,
      proposicaoId: 1,
      externalId: null,
      sequencia: 2,
      dataHora: daysAgo(110),
      siglaOrgao: "CEDUC",
      descricaoSituacao: "Distribuição",
      despacho: "Distribuição à Comissão de Educação.",
      regime: "Ordinário",
    },
    {
      id: 103,
      proposicaoId: 1,
      externalId: null,
      sequencia: 3,
      dataHora: daysAgo(90),
      siglaOrgao: "CEDUC",
      descricaoSituacao: "Designação de Relator",
      despacho: "Designação do relator na Comissão de Educação.",
      regime: "Ordinário",
    },
    {
      id: 104,
      proposicaoId: 1,
      externalId: null,
      sequencia: 4,
      dataHora: daysAgo(30),
      siglaOrgao: "CEDUC",
      descricaoSituacao: "Apresentação de Parecer",
      despacho: "Apresentação de parecer favorável com emendas.",
      regime: "Ordinário",
    },
    {
      id: 105,
      proposicaoId: 1,
      externalId: null,
      sequencia: 5,
      dataHora: daysAgo(30),
      siglaOrgao: "CEDUC",
      descricaoSituacao: "Aprovação de Parecer",
      despacho: "Aprovação do parecer do relator.",
      regime: "Ordinário",
    },
    {
      id: 106,
      proposicaoId: 1,
      externalId: null,
      sequencia: 6,
      dataHora: daysAgo(2),
      siglaOrgao: "MESA",
      descricaoSituacao: "Requerimento de Urgência",
      despacho: "Requerimento de urgência em análise.",
      regime: "Ordinário",
    },
  ],
  2: [
    {
      id: 201,
      proposicaoId: 2,
      externalId: null,
      sequencia: 1,
      dataHora: daysAgo(200),
      siglaOrgao: "MESA",
      descricaoSituacao: "Apresentação",
      despacho: "Protocolo da Proposta de Emenda à Constituição.",
      regime: "Especial",
    },
    {
      id: 202,
      proposicaoId: 2,
      externalId: null,
      sequencia: 2,
      dataHora: daysAgo(150),
      siglaOrgao: "CCJC",
      descricaoSituacao: "Aprovação de Admissibilidade",
      despacho: "Admissibilidade aprovada pela CCJ.",
      regime: "Especial",
    },
    {
      id: 203,
      proposicaoId: 2,
      externalId: null,
      sequencia: 3,
      dataHora: daysAgo(120),
      siglaOrgao: "MESA",
      descricaoSituacao: "Designação de Comissão Especial",
      despacho: "Designação de Comissão Especial.",
      regime: "Especial",
    },
    {
      id: 204,
      proposicaoId: 2,
      externalId: null,
      sequencia: 4,
      dataHora: daysAgo(20),
      siglaOrgao: "CESP",
      descricaoSituacao: "Aprovação de Parecer",
      despacho: "Aprovação do parecer do relator na Comissão Especial.",
      regime: "Especial",
    },
  ],
  3: [
    {
      id: 301,
      proposicaoId: 3,
      externalId: null,
      sequencia: 1,
      dataHora: daysAgo(80),
      siglaOrgao: "PR",
      descricaoSituacao: "Edição",
      despacho: "Edição da Medida Provisória pelo Poder Executivo.",
      regime: "Urgência",
    },
    {
      id: 302,
      proposicaoId: 3,
      externalId: null,
      sequencia: 2,
      dataHora: daysAgo(60),
      siglaOrgao: "CMMPV",
      descricaoSituacao: "Instalação de Comissão Mista",
      despacho: "Instalação da comissão mista.",
      regime: "Urgência",
    },
    {
      id: 303,
      proposicaoId: 3,
      externalId: null,
      sequencia: 3,
      dataHora: daysAgo(20),
      siglaOrgao: "PLEN",
      descricaoSituacao: "Aprovação na Câmara",
      despacho: "Aprovação na Câmara dos Deputados.",
      regime: "Urgência",
    },
  ],
  // 4 propositalmente sem tramitações para exercitar empty state.
  5: [
    {
      id: 501,
      proposicaoId: 5,
      externalId: null,
      sequencia: 1,
      dataHora: daysAgo(45),
      siglaOrgao: "PLEN",
      descricaoSituacao: "Votação Nominal",
      despacho: "Votação nominal do PDL em plenário.",
      regime: "Ordinário",
    },
  ],
  6: [
    {
      id: 601,
      proposicaoId: 6,
      externalId: null,
      sequencia: 1,
      dataHora: daysAgo(60),
      siglaOrgao: "PLEN",
      descricaoSituacao: "Apresentação",
      despacho: "Apresentação em plenário.",
      regime: "Ordinário",
    },
    {
      id: 602,
      proposicaoId: 6,
      externalId: null,
      sequencia: 2,
      dataHora: daysAgo(14),
      siglaOrgao: "CCTCI",
      descricaoSituacao: "Encaminhamento",
      despacho: "Encaminhamento para CCTCI.",
      regime: "Ordinário",
    },
  ],
  7: [
    {
      id: 701,
      proposicaoId: 7,
      externalId: null,
      sequencia: 1,
      dataHora: daysAgo(60),
      siglaOrgao: "CESP",
      descricaoSituacao: "Audiência Pública",
      despacho: "Audiência pública realizada em comissão especial.",
      regime: "Ordinário",
    },
    {
      id: 702,
      proposicaoId: 7,
      externalId: null,
      sequencia: 2,
      dataHora: daysAgo(45),
      siglaOrgao: "CESP",
      descricaoSituacao: "Apresentação de Parecer",
      despacho: "Parecer do relator apresentado.",
      regime: "Ordinário",
    },
    {
      id: 703,
      proposicaoId: 7,
      externalId: null,
      sequencia: 3,
      dataHora: daysAgo(45),
      siglaOrgao: "CESP",
      descricaoSituacao: "Aprovação de Parecer",
      despacho: "Aprovação do parecer na Comissão Especial.",
      regime: "Ordinário",
    },
    {
      id: 704,
      proposicaoId: 7,
      externalId: null,
      sequencia: 4,
      dataHora: daysAgo(30),
      siglaOrgao: "PLEN",
      descricaoSituacao: "Aguardando Pauta",
      despacho: "Aguardando designação em plenário.",
      regime: "Urgência",
    },
  ],
  8: [
    {
      id: 801,
      proposicaoId: 8,
      externalId: null,
      sequencia: 1,
      dataHora: hoursAgo(36),
      siglaOrgao: "MESA",
      descricaoSituacao: "Apresentação",
      despacho: "Apresentação da PEC.",
      regime: "Especial",
    },
  ],
};

const votacoesPorProposicao: Record<number, Votacao[]> = {
  1: [
    {
      id: 1001,
      externalId: "1-1",
      proposicaoPrincipalId: 1,
      dataHora: daysAgo(30),
      descricao: "Aprovação do parecer do relator",
      resultado: "aprovado",
      tipoRaw: "Nominal",
    },
  ],
  2: [
    {
      id: 2001,
      externalId: "2-1",
      proposicaoPrincipalId: 2,
      dataHora: daysAgo(150),
      descricao: "Admissibilidade na CCJ",
      resultado: "aprovado",
      tipoRaw: "Nominal",
    },
    {
      id: 2002,
      externalId: "2-2",
      proposicaoPrincipalId: 2,
      dataHora: daysAgo(20),
      descricao: "Aprovação de parecer — Comissão Especial",
      resultado: "aprovado",
      tipoRaw: "Nominal",
    },
  ],
  3: [
    {
      id: 3001,
      externalId: "3-1",
      proposicaoPrincipalId: 3,
      dataHora: daysAgo(20),
      descricao: "Aprovação em plenário",
      resultado: "aprovado",
      tipoRaw: "Nominal",
    },
  ],
  5: [
    {
      id: 5001,
      externalId: "5-1",
      proposicaoPrincipalId: 5,
      dataHora: daysAgo(45),
      descricao: "Votação nominal do PDL em plenário",
      resultado: "rejeitado",
      tipoRaw: "Nominal",
    },
  ],
  7: [
    {
      id: 7001,
      externalId: "7-1",
      proposicaoPrincipalId: 7,
      dataHora: daysAgo(45),
      descricao: "Aprovação de parecer na Comissão Especial",
      resultado: "aprovado",
      tipoRaw: "Nominal",
    },
    {
      id: 7002,
      externalId: "7-2",
      proposicaoPrincipalId: 7,
      dataHora: daysAgo(30),
      descricao: "Urgência — votação pendente",
      resultado: null,
      tipoRaw: "Nominal",
    },
  ],
};

const DEPUTADOS_POOL: Array<{
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
}> = [
  { id: 1, nome: "Ana Ribeiro", siglaPartido: "PFAM", siglaUf: "SP" },
  { id: 2, nome: "Bruno Teixeira", siglaPartido: "PPRO", siglaUf: "MG" },
  { id: 3, nome: "Clara Monteiro", siglaPartido: "PNOV", siglaUf: "RS" },
  { id: 4, nome: "Daniel Barros", siglaPartido: "PLIB", siglaUf: "BA" },
  { id: 5, nome: "Felipe Araújo", siglaPartido: "PTRA", siglaUf: "RJ" },
  { id: 6, nome: "Giovana Souza", siglaPartido: "PDEM", siglaUf: "CE" },
  { id: 7, nome: "Eduarda Lima", siglaPartido: "PCID", siglaUf: "PE" },
  { id: 8, nome: "Helena Cardoso", siglaPartido: "PFAM", siglaUf: "SC" },
  { id: 9, nome: "Igor Pimenta", siglaPartido: "PPRO", siglaUf: "GO" },
  { id: 10, nome: "Juliana Freitas", siglaPartido: "PNOV", siglaUf: "ES" },
  { id: 11, nome: "Karla Mendonça", siglaPartido: "PLIB", siglaUf: "PA" },
  { id: 12, nome: "Marcos Vieira", siglaPartido: "PTRA", siglaUf: "PR" },
  { id: 13, nome: "Nathalia Ramos", siglaPartido: "PDEM", siglaUf: "MT" },
  { id: 14, nome: "Lucas Andrade", siglaPartido: "PCID", siglaUf: "AM" },
  { id: 15, nome: "Otávio Correia", siglaPartido: "PFAM", siglaUf: "DF" },
  { id: 16, nome: "Patrícia Moura", siglaPartido: "PPRO", siglaUf: "AL" },
  { id: 17, nome: "Rafael Dias", siglaPartido: "PNOV", siglaUf: "PB" },
  { id: 18, nome: "Sofia Nascimento", siglaPartido: "PLIB", siglaUf: "MS" },
  { id: 19, nome: "Úrsula Pinto", siglaPartido: "PTRA", siglaUf: "MA" },
  { id: 20, nome: "Vinicius Castro", siglaPartido: "PDEM", siglaUf: "PI" },
  { id: 21, nome: "Tiago Batista", siglaPartido: "PCID", siglaUf: "TO" },
  { id: 22, nome: "Wagner Siqueira", siglaPartido: "PFAM", siglaUf: "SE" },
  { id: 23, nome: "Yasmin Rocha", siglaPartido: "PPRO", siglaUf: "RN" },
  { id: 24, nome: "Zeca Nogueira", siglaPartido: "PNOV", siglaUf: "AC" },
  { id: 25, nome: "Alice Farias", siglaPartido: "PLIB", siglaUf: "RR" },
  { id: 26, nome: "Cíntia Brandão", siglaPartido: "PTRA", siglaUf: "AP" },
  { id: 27, nome: "Diego Henriques", siglaPartido: "PDEM", siglaUf: "RO" },
  { id: 28, nome: "Breno Tavares", siglaPartido: "PCID", siglaUf: "SP" },
  { id: 29, nome: "Érica Pires", siglaPartido: "PFAM", siglaUf: "MG" },
  { id: 30, nome: "Fábio Moura", siglaPartido: "PPRO", siglaUf: "RJ" },
  { id: 31, nome: "Gabriela Ferraz", siglaPartido: "PNOV", siglaUf: "BA" },
  { id: 32, nome: "Hugo Vasconcelos", siglaPartido: "PLIB", siglaUf: "RS" },
  { id: 33, nome: "João Fontes", siglaPartido: "PTRA", siglaUf: "PE" },
  { id: 34, nome: "Larissa Moraes", siglaPartido: "PDEM", siglaUf: "CE" },
  { id: 35, nome: "Isabela Neves", siglaPartido: "PCID", siglaUf: "PR" },
  { id: 36, nome: "Murilo Paiva", siglaPartido: "PFAM", siglaUf: "GO" },
  { id: 37, nome: "Nina Guedes", siglaPartido: "PPRO", siglaUf: "SC" },
  { id: 38, nome: "Orlando Sampaio", siglaPartido: "PNOV", siglaUf: "ES" },
  { id: 39, nome: "Paula Azevedo", siglaPartido: "PLIB", siglaUf: "PA" },
  { id: 40, nome: "Ricardo Tonelli", siglaPartido: "PTRA", siglaUf: "DF" },
  { id: 41, nome: "Sabrina Lobo", siglaPartido: "PDEM", siglaUf: "MT" },
  { id: 42, nome: "Quésia Ventura", siglaPartido: "PCID", siglaUf: "AM" },
  { id: 43, nome: "Túlio Marinho", siglaPartido: "PFAM", siglaUf: "AL" },
  { id: 44, nome: "Viviane Caldas", siglaPartido: "PPRO", siglaUf: "PB" },
  { id: 45, nome: "Xavier Rezende", siglaPartido: "PNOV", siglaUf: "MS" },
  { id: 46, nome: "Yuri Campelo", siglaPartido: "PLIB", siglaUf: "MA" },
  { id: 47, nome: "Zélia Paz", siglaPartido: "PTRA", siglaUf: "PI" },
  { id: 48, nome: "Antônio Cabral", siglaPartido: "PDEM", siglaUf: "TO" },
  { id: 49, nome: "Beatriz Magalhães", siglaPartido: "PCID", siglaUf: "SE" },
  { id: 50, nome: "Celso Furlan", siglaPartido: "PFAM", siglaUf: "RN" },
];

const VOTO_ORDER = ["Sim", "Não", "Abstenção", "Ausente", "Obstrução"] as const;

function buildVotos(
  votacaoId: number,
  counts: Partial<Record<(typeof VOTO_ORDER)[number], number>>,
): VotoNominal[] {
  const sequence: string[] = [];
  for (const voto of VOTO_ORDER) {
    const n = counts[voto] ?? 0;
    for (let i = 0; i < n; i++) sequence.push(voto);
  }
  if (sequence.length > DEPUTADOS_POOL.length) {
    throw new Error(
      `buildVotos: ${votacaoId} excede o pool de ${DEPUTADOS_POOL.length} deputados.`,
    );
  }
  return sequence.map((votoRaw, i) => {
    const dep = DEPUTADOS_POOL[i]!;
    return {
      id: votacaoId * 100 + i + 1,
      votacaoId,
      deputadoId: dep.id,
      votoRaw,
      deputado: {
        id: dep.id,
        nome: dep.nome,
        siglaPartido: dep.siglaPartido,
        siglaUf: dep.siglaUf,
      },
    };
  });
}

const votosPorVotacao: Record<number, VotoNominal[]> = {
  1001: buildVotos(1001, { Sim: 30, Não: 12, Abstenção: 6, Ausente: 2 }),
  2001: buildVotos(2001, { Sim: 32, Não: 14, Abstenção: 2, Ausente: 2 }),
  2002: buildVotos(2002, { Sim: 28, Não: 16, Abstenção: 4, Ausente: 2 }),
  3001: buildVotos(3001, { Sim: 30, Não: 10, Abstenção: 3, Ausente: 7 }),
  5001: buildVotos(5001, { Sim: 18, Não: 28, Abstenção: 3, Ausente: 1 }),
  7001: buildVotos(7001, { Sim: 26, Não: 18, Abstenção: 4, Ausente: 2 }),
  7002: [],
};

function findVotacaoById(votacaoId: number): Votacao | null {
  for (const lista of Object.values(votacoesPorProposicao)) {
    const found = lista.find((v) => v.id === votacaoId);
    if (found) return found;
  }
  return null;
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function hoursAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

export function listProposicoesMock(
  params: ListProposicoesParams = {},
): Paginated<Proposicao> {
  let result = [...proposicoes];

  if (params.tipo && params.tipo !== "TODOS") {
    result = result.filter((p) => p.tipo === params.tipo);
  }
  if (params.ano) {
    result = result.filter((p) => p.ano === params.ano);
  }
  if (params.dataInicio) {
    const cutoff = new Date(params.dataInicio).getTime();
    result = result.filter(
      (p) =>
        p.ultimaMovimentacaoAt !== null &&
        new Date(p.ultimaMovimentacaoAt).getTime() >= cutoff,
    );
  }
  if (params.dataFim) {
    const cutoff = new Date(params.dataFim).getTime();
    result = result.filter(
      (p) =>
        p.ultimaMovimentacaoAt !== null &&
        new Date(p.ultimaMovimentacaoAt).getTime() <= cutoff,
    );
  }

  result.sort((a, b) => {
    const da = a.ultimaMovimentacaoAt
      ? new Date(a.ultimaMovimentacaoAt).getTime()
      : 0;
    const db = b.ultimaMovimentacaoAt
      ? new Date(b.ultimaMovimentacaoAt).getTime()
      : 0;
    return db - da;
  });

  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  const total = result.length;
  const start = (page - 1) * limit;
  const data = result.slice(start, start + limit);

  return { data, pagination: { page, limit, total } };
}

export function getProposicaoDetalheMock(
  id: number,
): ProposicaoDetalhe | null {
  const proposicao = proposicoes.find((p) => p.id === id);
  if (!proposicao) return null;
  return {
    proposicao,
    tramitacoes: [...(tramitacoesPorProposicao[id] ?? [])],
    votacoes: [...(votacoesPorProposicao[id] ?? [])],
  };
}

export function getVotacaoDetalheMock(
  votacaoId: number,
  params: ListVotosParams = {},
): VotacaoDetalhe | null {
  const votacao = findVotacaoById(votacaoId);
  if (!votacao) return null;

  let votos = [...(votosPorVotacao[votacaoId] ?? [])];
  const partido = params.partido?.trim().toUpperCase();
  if (partido) {
    votos = votos.filter((v) => v.deputado?.siglaPartido === partido);
  }

  return { votacao, votos };
}
